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
  assert.match(html, /Modern Generalization in Overparameterized Models/);
  assert.match(html, /Transformer Expressivity and Universality/);
  assert.match(html, /In-Context Learning as Implicit Optimization/);
  assert.match(html, /Theory of Pretraining, Transfer, and Fine-Tuning/);
  assert.match(html, /Recommended Weekly Meeting Format/);
  assert.match(html, /Detailed 24-Week Schedule/);
  assert.match(html, /Suggested Assessment/);
  assert.match(html, /Learning-theory focus:/);
  const paperLinkMentions = (html.match(/\[paper\]/g) ?? []).length;
  assert.ok(paperLinkMentions >= 96);
  assert.equal(paperLinkMentions % 96, 0);
  assert.doesNotMatch(html, /Attention Is All You Need|SWE-agent|Tool Use and Language-Model Agents/);
  assert.doesNotMatch(html, /Wenhu (?:Chen|Che)/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("the source contains exactly 24 theory weeks and 96 readings", async () => {
  const data = await readFile(new URL("../app/courseData.ts", import.meta.url), "utf8");
  const weeks = [...data.matchAll(/"week"\s*:\s*(\d+)/g)].map((match) => Number(match[1]));
  const links = [...data.matchAll(/"link"\s*:/g)];
  const impacts = [...data.matchAll(/"impact"\s*:/g)];

  assert.deepEqual(weeks, Array.from({ length: 24 }, (_, index) => index + 1));
  assert.equal(links.length, 96);
  assert.equal(impacts.length, 96);
  assert.doesNotMatch(data, /Attention Is All You Need|BERT: Pre-training|SWE-agent/);
});

test("keeps the implementation simple while using a distinct academic style", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /hero|card|gradient|SkeletonPreview/i);
  assert.doesNotMatch(page, /Wenhu|referenceCourse/i);
  assert.doesNotMatch(css, /linear-gradient|radial-gradient|backdrop-filter/i);
  assert.doesNotMatch(css, /max-width:\s*1140px|#0875c1/i);
  assert.match(css, /border-top:\s*6px solid var\(--gold\)/i);
  assert.match(css, /max-width:\s*960px/i);
  assert.match(css, /font-family:\s*Georgia/i);
  assert.doesNotMatch(layout, /codex-preview|_sites-preview/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/i);
});
