import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the updated CS 886 course page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>CS 886: Learning Theory for Modern AI<\/title>/i);
  assert.match(html, /Generalization and Implicit Bias in Overparameterized Models/);
  assert.match(html, /Preference Optimization, Transfer, and Fine-Tuning/);
  assert.match(html, /September 11, 2026/);
  assert.match(html, /December 4, 2026/);
  assert.match(html, /No class on[\s\S]{0,80}October 16, 2026/);
  assert.match(html, /Detailed 12-Week Schedule/);
  assert.match(html, /Suggested Assessment/);
  assert.match(html, /Paper presentations/);
  assert.match(html, /Class participation/);
  assert.match(html, /80%/);
  assert.match(html, /20%/);
  assert.match(html, /Optional Project \(Additional Marks\)/);
  assert.match(html, /at least two presentations/);
  assert.match(html, /University of Waterloo Academic Integrity Policy/);
  assert.match(html, /Robert Wang published his final project/);
  assert.match(html, /Learning-theory focus:/);
  const paperLinkMentions = (html.match(/\[paper\]/g) ?? []).length;
  assert.ok(paperLinkMentions >= 48);
  assert.equal(paperLinkMentions % 48, 0);
  assert.doesNotMatch(
    html,
    /24 weekly meetings|96 papers|theorem-first|Scope of the Course|Paper-Selection and Citation Policy|Recommended Weekly Meeting Format|Reading Expectations|Learning Outcomes/i,
  );
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("the source contains exactly 12 Friday meetings and 48 readings", async () => {
  const dataUrl = new URL("../app/courseData.ts", import.meta.url);
  dataUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { courseSchedule } = await import(dataUrl.href);
  const papers = courseSchedule.flatMap((week) => week.papers);

  assert.deepEqual(
    courseSchedule.map((week) => week.week),
    Array.from({ length: 12 }, (_, index) => index + 1),
  );
  assert.deepEqual(courseSchedule.map((week) => week.date), [
    "September 11, 2026",
    "September 18, 2026",
    "September 25, 2026",
    "October 2, 2026",
    "October 9, 2026",
    "October 23, 2026",
    "October 30, 2026",
    "November 6, 2026",
    "November 13, 2026",
    "November 20, 2026",
    "November 27, 2026",
    "December 4, 2026",
  ]);
  assert.ok(courseSchedule.every((week) => week.papers.length === 4));
  assert.equal(papers.length, 48);
  assert.equal(new Set(papers.map((paper) => paper.title)).size, 48);
  assert.equal(new Set(papers.map((paper) => paper.link)).size, 48);
});

test("keeps the implementation simple while using a distinct academic style", async () => {
  const [page, layout, data, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/courseData.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /hero|card|gradient|SkeletonPreview/i);
  assert.doesNotMatch(page, /Wenhu|referenceCourse/i);
  assert.doesNotMatch(`${page}\n${layout}\n${data}`, /theorem-first|24 weekly meetings|96 papers/i);
  assert.doesNotMatch(
    page,
    /Scope of the Course|Paper-Selection and Citation Policy|Recommended Weekly Meeting Format|Reading Expectations|Learning Outcomes/i,
  );
  assert.doesNotMatch(css, /linear-gradient|radial-gradient|backdrop-filter/i);
  assert.doesNotMatch(css, /max-width:\s*1140px|#0875c1/i);
  assert.match(css, /border-top:\s*6px solid var\(--gold\)/i);
  assert.match(css, /max-width:\s*960px/i);
  assert.match(css, /font-family:\s*Georgia/i);
  assert.doesNotMatch(layout, /codex-preview|_sites-preview/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/i);
});
