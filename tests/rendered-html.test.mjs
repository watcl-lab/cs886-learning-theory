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
  assert.match(html, /how transformers and large language models learn, what they can compute, and why they sometimes fail/i);
  assert.match(html, /Additional readings connect these ideas to efficient fine-tuning/i);
  assert.match(html, /Biases and Optimization of Self-Attention/);
  assert.match(html, /Project Presentations/);
  assert.match(html, /href="#weeks-11-12"/);
  assert.doesNotMatch(html, /Project Presentations I|Project Presentations II|href="#week-(?:11|12)"/);
  assert.match(html, /The Lipschitz Constant of Self-Attention/);
  assert.match(html, /Transformers Are Minimax Optimal Nonparametric In-Context Learners/);
  assert.match(html, /Masked Hard-Attention Transformers Recognize Exactly the Star-Free Languages/);
  assert.match(html, /A Theory of Learning with Autoregressive Chain of Thought/);
  assert.match(html, /Learning Compositional Functions with Transformers from Easy-to-Hard Data/);
  assert.match(html, /Computational-Statistical Tradeoffs at the Next-Token Prediction Barrier/);
  assert.match(html, /Is a Good Foundation Necessary for Efficient Reinforcement Learning/);
  assert.match(html, /Undetectable Watermarks for Language Models/);
  assert.match(html, /September 11, 2026/);
  assert.match(html, /December 4, 2026/);
  assert.match(html, /No class on[\s\S]{0,80}October 16, 2026/);
  assert.match(html, /Tentative schedule:[\s\S]{0,120}current schedule is a work in progress/i);
  assert.match(html, /Detailed 12-Week Schedule/);
  assert.match(html, /Required Course Project/);
  assert.match(html, /Project Presentation Requirements/);
  assert.match(html, />Assessment</);
  assert.match(html, /Paper presentations/);
  assert.match(html, /Class participation/);
  assert.match(html, /Course project/);
  assert.match(html, /40%/);
  assert.match(html, /20%/);
  assert.match(html, /approximately 25 project presentations/);
  assert.match(html, /one or two paper presentations/);
  assert.match(html, /40 scheduled paper slots/);
  assert.match(html, /45 minutes, including questions/);
  assert.match(html, /or an equivalent amount of assessed presentation work/);
  assert.match(html, /10-minute presentation/);
  assert.match(html, /2 minutes of questions/);
  assert.match(html, /Project Deliverables/);
  assert.match(html, /Project Evaluation/);
  assert.match(html, /Suggested Additional Readings and Project Starting Points/);
  assert.match(html, /University of Waterloo Academic Integrity Policy/);
  assert.match(html, /Robert Wang published his final project/);
  assert.match(html, /Learning-theory focus:/);
  assert.doesNotMatch(html, /paper-impact|Highly cited|Strong recent uptake|>Established<|>Landmark</i);
  const paperLinkMentions = (html.match(/\[paper\]/g) ?? []).length;
  assert.ok(paperLinkMentions >= 48);
  assert.equal(paperLinkMentions % 48, 0);
  assert.doesNotMatch(
    html,
    /24 weekly meetings|96 papers|theorem-first|useful maximum is ten substantive slides|Scope of the Course|Paper-Selection and Citation Policy|Recommended Weekly Meeting Format|Reading Expectations|Learning Outcomes|Optional Project|Additional Marks|80%|at least two presentations|The first ten weekly meetings are organized around four influential papers|The required course project may pursue a new theoretical result|Exact proposal, checkpoint, and final-report deadlines will be announced by the instructor|computational and statistical principles underlying modern sequence models/i,
  );
  assert.doesNotMatch(html, /Parameter-Efficient Adaptation and Preference Learning|RLHF Exploration, Hallucination, and Watermarking/);
  assert.doesNotMatch(
    html,
    /How can a course theme be extended, challenged, or tested through a precise and technically rigorous project\?|What new theoretical conclusions, counterexamples, or empirical evidence emerge from the completed projects\?/,
  );
  assert.doesNotMatch(
    html,
    /Reconciling Modern Machine-Learning Practice|Deep Double Descent|Scaling Laws for Neural Language Models|AI Models Collapse When Trained on Recursively Generated Data|Direct Preference Optimization: Your Language Model Is Secretly a Reward Model|On the Ability and Limitations of Transformers to Recognize Formal Languages|On Limitations of the Transformer Architecture|Mechanics of Next Token Prediction with Self-Attention|A General Theoretical Paradigm to Understand Learning from Human Preferences|Value-Incentivized Preference Optimization|Towards Revealing the Mystery Behind Chain of Thought|What Algorithms Can Transformers Learn\?|Hallucination Is Inevitable/i,
  );
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("the source contains 10 paper meetings, two project meetings, and 48 total readings", async () => {
  const dataUrl = new URL("../app/courseData.ts", import.meta.url);
  dataUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { additionalReadings, assessment, courseSchedule, projectPresentationSchedule } = await import(dataUrl.href);
  const scheduledPapers = courseSchedule.flatMap((week) => week.papers);
  const allPapers = [...scheduledPapers, ...additionalReadings];

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
  assert.ok(courseSchedule.slice(0, 10).every((week) => week.papers.length === 4));
  assert.ok(courseSchedule.slice(10).every((week) => week.papers.length === 0));
  assert.deepEqual(courseSchedule.slice(10).map((week) => week.title), [
    "Project Presentations",
    "Project Presentations",
  ]);
  assert.equal(projectPresentationSchedule.weeks, "11–12");
  assert.equal(projectPresentationSchedule.dates, "November 27 and December 4, 2026");
  assert.equal(scheduledPapers.length, 40);
  assert.equal(additionalReadings.length, 8);
  assert.equal(allPapers.length, 48);
  assert.equal(new Set(allPapers.map((paper) => paper.title)).size, 48);
  assert.equal(new Set(allPapers.map((paper) => paper.link)).size, 48);
  assert.deepEqual(assessment.map(({ component, weight }) => [component, weight]), [
    ["Course project", "40%"],
    ["Paper presentations", "40%"],
    ["Class participation", "20%"],
  ]);
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
  assert.doesNotMatch(`${page}\n${data}`, /Optional Project|Additional Marks|80%|at least two presentations/i);
  assert.doesNotMatch(
    data,
    /Reconciling Modern Machine-Learning Practice|Deep Double Descent|Scaling Laws for Neural Language Models|AI Models Collapse When Trained on Recursively Generated Data|Direct Preference Optimization: Your Language Model Is Secretly a Reward Model|On the Ability and Limitations of Transformers to Recognize Formal Languages|On Limitations of the Transformer Architecture|Mechanics of Next Token Prediction with Self-Attention|A General Theoretical Paradigm to Understand Learning from Human Preferences|Value-Incentivized Preference Optimization|Towards Revealing the Mystery Behind Chain of Thought|What Algorithms Can Transformers Learn\?|Hallucination Is Inevitable/i,
  );
  assert.doesNotMatch(css, /linear-gradient|radial-gradient|backdrop-filter/i);
  assert.doesNotMatch(css, /max-width:\s*1140px|#0875c1/i);
  assert.match(css, /border-top:\s*6px solid var\(--gold\)/i);
  assert.match(css, /max-width:\s*960px/i);
  assert.match(css, /font-family:\s*Georgia/i);
  assert.doesNotMatch(layout, /codex-preview|_sites-preview/i);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/i);
});
