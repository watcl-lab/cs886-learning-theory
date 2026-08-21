import { pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const courseDataUrl = pathToFileURL(join(projectRoot, "app", "courseData.ts"));
courseDataUrl.searchParams.set("link-check", `${process.pid}-${Date.now()}`);
const courseData = await import(courseDataUrl.href);

const scheduledPapers = courseData.courseSchedule.flatMap((week) => week.papers);
const allPapers = [...scheduledPapers, ...courseData.additionalReadings];

function duplicates(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts].filter(([, count]) => count > 1).map(([value]) => value);
}

const duplicateTitles = duplicates(allPapers.map((paper) => paper.title));
const duplicatePaperUrls = duplicates(allPapers.map((paper) => paper.link));

if (duplicateTitles.length || duplicatePaperUrls.length) {
  for (const title of duplicateTitles) console.error(`Duplicate paper title: ${title}`);
  for (const url of duplicatePaperUrls) console.error(`Duplicate paper URL: ${url}`);
  process.exitCode = 1;
}

const urlLabels = new Map();

function collectUrls(value, label, seen = new Set()) {
  if (typeof value === "string") {
    const matches = value.match(/https?:\/\/[^\s<>"')]+/g) ?? [];
    for (const match of matches) {
      const url = match.replace(/[.,;:]$/, "");
      const labels = urlLabels.get(url) ?? new Set();
      labels.add(label);
      urlLabels.set(url, labels);
    }
    return;
  }

  if (value === null || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const itemLabel = item && typeof item === "object" && "title" in item
        ? String(item.title)
        : `${label}[${index}]`;
      collectUrls(item, itemLabel, seen);
    });
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    const childLabel = "title" in value && typeof value.title === "string"
      ? value.title
      : `${label}.${key}`;
    collectUrls(child, childLabel, seen);
  }
}

for (const [name, value] of Object.entries(courseData)) collectUrls(value, name);

const invalidProtocols = [...urlLabels.keys()].filter((url) => !url.startsWith("https://"));
for (const url of invalidProtocols) {
  console.error(`Non-HTTPS course URL: ${url} (${[...urlLabels.get(url)].join(", ")})`);
}
if (invalidProtocols.length) process.exitCode = 1;

const urls = [...urlLabels.keys()].filter((url) => url.startsWith("https://"));
const timeoutMilliseconds = 15_000;
const concurrency = 6;

async function request(url, method) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMilliseconds);
  try {
    const response = await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        accept: "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8",
        "user-agent": "Mozilla/5.0 (compatible; CS886-course-site-link-check/1.0; +https://watcl-lab.github.io/cs886-learning-theory/)",
      },
    });
    await response.body?.cancel();
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function checkUrl(url) {
  let method = "HEAD";
  let response;
  try {
    response = await request(url, method);
    if (response.status < 200 || response.status >= 400) {
      method = "GET";
      response = await request(url, method);
    }

    if (response.status >= 200 && response.status < 400) return null;
    return { url, method, status: response.status, reason: response.statusText || "HTTP failure" };
  } catch (error) {
    if (method === "HEAD") {
      try {
        method = "GET";
        response = await request(url, method);
        if (response.status >= 200 && response.status < 400) return null;
        return { url, method, status: response.status, reason: response.statusText || "HTTP failure" };
      } catch (getError) {
        error = getError;
      }
    }

    const reason = error instanceof Error ? error.message : String(error);
    return { url, method, status: "network", reason };
  }
}

const failures = [];
let nextIndex = 0;

async function worker() {
  while (nextIndex < urls.length) {
    const url = urls[nextIndex++];
    const failure = await checkUrl(url);
    if (failure) failures.push(failure);
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));

for (const failure of failures) {
  const labels = [...urlLabels.get(failure.url)].join("; ");
  console.error(
    `External link failed\n  title/field: ${labels}\n  URL: ${failure.url}\n  method/status: ${failure.method} ${failure.status}\n  reason: ${failure.reason}`,
  );
}

if (failures.length) process.exitCode = 1;

if (process.exitCode) {
  console.error(`Link validation failed (${failures.length} request failure(s)).`);
} else {
  console.log(`Validated ${urls.length} unique HTTPS course links.`);
}
