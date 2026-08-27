import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replace(/&#(?:x27|39);/gi, "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function textContent(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

async function loadCourseData() {
  const dataUrl = new URL("../app/courseData.ts", import.meta.url);
  dataUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return import(dataUrl.href);
}

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the corrected course content and operational policies", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const text = textContent(html);

  assert.match(html, /<title>CS 886: Learning Theory for Modern AI (?:--|–|—) Fall 2026<\/title>/i);
  assert.match(text, /how transformers and large language models learn, what they can compute, how they generalize, and why they sometimes fail/i);
  assert.match(text, /main schedule places particular emphasis on the theory of in-context learning and reasoning/i);
  assert.match(text, /Recommended background/i);
  assert.match(text, /No textbook is required/i);
  assert.match(text, /Note for non-theory students/i);
  assert.match(text, /course is open to students without a theory background/i);
  assert.match(text, /insight into how transformers work/i);
  assert.match(text, /scrutinize existing theoretical claims through empirical evidence/i);
  assert.match(text, /Kimon Fountoulakis/);
  assert.match(text, /DC 3611/);
  assert.match(text, /Fridays/);
  assert.match(text, /1:30.{0,3}4:20 p\.m\./i);
  assert.match(text, /Scheduled seminar meetings:?\s*September 11.{0,3}December 4, 2026/i);
  assert.match(text, /University class period:?\s*September 9.{0,3}December 8, 2026/i);
  assert.match(text, /No class on October 16, 2026/i);
  assert.match(text, /Last updated:?\s*August 27, 2026/i);
  assert.match(text, /Exact Learning/i);
  for (const title of [
    "Certification from Examples is Hard for Circuits and Transformers under Minimal Overparametrization",
    "Learning to Execute Graph Algorithms Exactly with Graph Neural Networks",
    "On the Statistical Query Complexity of Learning Semiautomata: a Random Walk Approach",
    "Learning to Add, Multiply, and Execute Algorithmic Instructions Exactly with Neural Networks",
  ]) assert.match(text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  for (const heading of [
    "Course Overview and Logistics",
    "Learning Outcomes",
    "Topics at a Glance",
    "Reading Expectations",
    "Detailed Paper Schedule",
    "Paper Presentation Requirements",
    "Required Course Project",
    "Project Milestones and Deadlines",
    "Project Presentation Requirements",
    "Assessment",
    "Late Work, Missed Work, and Extensions",
    "Use of Generative AI",
    "Suggested Additional Readings and Project Starting Points",
    "University Policies and Supports",
  ]) assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  assert.match(text, /Week 1 is instructor-led: the instructor will present all four papers/i);
  assert.match(text, /does not count toward students' presentation workload/i);
  assert.match(text, /Student paper presentations run from Week 2 through Week 10/i);
  assert.match(text, /with 4 paper presentations each week/i);
  assert.match(text, /Each student will give 2 paper presentations: one solo presentation and one shared presentation/i);
  assert.match(text, /25 papers will have a solo presenter, 8 will be presented by pairs, and 3 will be presented by teams of three/i);
  assert.match(text, /Students sharing a paper divide the 30-minute presentation/i);
  assert.match(text, /must each make a substantive contribution/i);
  assert.match(text, /project presentation is separate and does not count toward these two paper presentations/i);
  assert.match(text, /Exact paper assignments will be announced after enrollment is confirmed/i);
  assert.doesNotMatch(text, /Depending on enrollment and assignments|two or three of those papers|instructor overview, a structured comparison, or a focused group discussion/i);
  assert.doesNotMatch(text, /A missed presentation with an approved reason/i);
  assert.doesNotMatch(text, /Extensions should be arranged before the deadline whenever possible|Approved accommodations and University procedures supersede this default policy/i);
  assert.doesNotMatch(text, /Biases and Optimization of Self-Attention|Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth|The Lipschitz Constant of Self-Attention|The Implicit Bias of Gradient Descent on Separable Data|Max-Margin Token Selection in Attention Mechanism/i);
  assert.match(text, /30 minutes\s*:?\s*presentation/i);
  assert.match(text, /12 minutes\s*:?\s*discussion and questions/i);
  assert.doesNotMatch(text, /5 minutes\s*:?\s*open questions and discussion|2 minutes\s*:?\s*transition/i);
  assert.doesNotMatch(text, /designated discussant|lead presentation|lead presenter|complete presentation slot|short break and a concluding synthesis/i);
  assert.match(text, /10-minute talk/i);
  assert.match(text, /2 minutes of questions/i);
  assert.match(text, /1-minute transition/i);
  assert.match(text, /25 individual project presentations/i);
  assert.match(text, /Week 11 will have 12 presentations, and Week 12 will have 13/i);
  assert.match(text, /Each presentation has a 13-minute slot/i);
  assert.match(text, /Timing will be strict/i);
  assert.match(text, /Project presentations do not count toward the two required paper presentations/i);
  assert.match(text, /November 26, 2026/);
  assert.match(text, /48-hour grace period/i);
  assert.match(text, /(?:five|5) percentage points for each additional 24-hour period/i);
  assert.match(text, /Generative-AI tools are allowed throughout the course/i);
  assert.match(text, /will result in less marks/i);
  assert.match(text, /Projects are individual by default/i);
  assert.match(text, /A project from a previous offering of CS 886 was subsequently developed into a NeurIPS 2024 publication/i);
  assert.match(text, /What did the projects establish, and which theoretical questions remain open\?/i);
  assert.match(text, /Tight Sample Complexity of Transformers/);
  assert.match(text, /Transformers Provably Learn Chain-of-Thought Reasoning with Length Generalization/);
  assert.match(text, /Bingbin Liu, Jordan T\. Ash, Surbhi Goel, Akshay Krishnamurthy, and Cyril Zhang/i);
  assert.match(text, /Transformers Learn Shortcuts to Automata/i);
  assert.match(text, /ICLR 2023 oral/i);
  assert.match(text, /exactly simulate any finite-state automaton using O\(log T\) depth/i);
  assert.match(text, /Angeliki Giannou, Shashank Rajput, Jy-Yong Sohn, Kangwook Lee, Jason D\. Lee, and Dimitris Papailiopoulos/i);
  assert.match(text, /Looped Transformers as Programmable Computers/i);
  assert.match(text, /explicit instruction-set architecture/i);

  assert.doesNotMatch(html, /TODO_INSTRUCTOR_/i);
  assert.doesNotMatch(text, /Assignment Screening|assignment-screening|automated screening software/i);
  assert.doesNotMatch(text, /45 minutes, including questions|one or two paper presentations|40 scheduled paper slots|approximately 25 individual project presentations|final two three-hour meetings|22 solo presentation slots|14 co-presented slots|9 × 4|25 × 2|8 × 2|two 170-minute meetings provide|presentations use 325 minutes|meeting uses 156 minutes|meeting uses 169 minutes/i);
  assert.doesNotMatch(text, /Robert Wang published his final project/i);
  assert.doesNotMatch(text, /Project proposal and progress checkpoint|progress checkpoint deadline/i);
  assert.doesNotMatch(html, /\[paper\]/i);
  assert.doesNotMatch(html, /paper-impact|Highly cited|Strong recent uptake|>Established<|>Landmark</i);
  assert.doesNotMatch(html, /href="#weeks-11-12"|id="weeks-11-12"|href="#week-(?:11|12)"/i);
  assert.doesNotMatch(html, /2020\.conll-1\.(?:25|37)|v139\/weiss21a\.html|v235\/huang24l\.html/i);
  assert.doesNotMatch(text, /Thinking Like Transformers|On the Computational Power of Transformers and Its Implications in Sequence Modeling|RASP program constructions/i);
  assert.match(html, /openreview\.net\/forum\?id=De4FYqjFueZ/);
  assert.match(html, /v202\/giannou23a\.html/);
  assert.match(html, /v235\/huang24d\.html/);
});

test("course data preserves the schedule arithmetic, readings, and user-confirmed policies", async () => {
  const data = await loadCourseData();
  const {
    additionalReadings, assessment, courseFacts, courseProject, courseSchedule,
    generativeAiPolicy, lateWorkPolicy, navigationItems, paperPresentationPlan,
    projectDeadlines, projectPresentationPlan, projectPresentationSchedule, universityPolicies,
  } = data;
  const scheduledPapers = courseSchedule.flatMap((week) => week.papers);
  const allPapers = [...scheduledPapers, ...additionalReadings];

  assert.deepEqual(courseSchedule.map((week) => week.week), Array.from({ length: 12 }, (_, index) => index + 1));
  assert.deepEqual(courseSchedule.map((week) => week.date), [
    "September 11, 2026", "September 18, 2026", "September 25, 2026",
    "October 2, 2026", "October 9, 2026", "October 23, 2026",
    "October 30, 2026", "November 6, 2026", "November 13, 2026",
    "November 20, 2026", "November 27, 2026", "December 4, 2026",
  ]);
  assert.ok(courseSchedule.slice(0, 10).every((week) => week.papers.length === 4));
  assert.equal(courseSchedule.slice(1, 10).flatMap((week) => week.papers).length, 36);
  assert.ok(courseSchedule.slice(10).every((week) => week.papers.length === 0));
  assert.equal(scheduledPapers.length, 40);
  assert.equal(additionalReadings.length, 10);
  assert.equal(allPapers.length, 50);
  assert.equal(new Set(allPapers.map((paper) => paper.title)).size, 50);
  assert.equal(new Set(allPapers.map((paper) => paper.link)).size, 50);

  assert.deepEqual(assessment.map(({ component, weight }) => [component, weight]), [
    ["Course project", "40%"], ["Paper-presentation work", "40%"], ["Class participation", "20%"],
  ]);
  assert.equal(projectDeadlines.length, 1);
  assert.deepEqual(projectDeadlines[0], {
    milestone: "Final project report and materials",
    deadline: "November 26, 2026",
    description: "The final project report and any required reproducibility materials are due before project presentations begin.",
  });
  assert.equal(lateWorkPolicy.latePolicyConfirmedByInstructor, true);
  assert.equal(lateWorkPolicy.gracePeriodHours, 48);
  assert.equal(lateWorkPolicy.penaltyPercentagePoints, 5);
  assert.equal(lateWorkPolicy.penaltyPeriodHours, 24);
  assert.match(courseProject.groupWorkPolicy, /requires written approval from the instructor/i);
  assert.match(generativeAiPolicy, /allowed throughout the course/i);
  assert.deepEqual(universityPolicies.resources.map(({ label }) => label), [
    "Academic integrity",
    "Policy 70: Student Petitions and Grievances",
    "Policy 71: Student Discipline",
    "Policy 72: Student Appeals",
    "AccessAbility Services",
    "Counselling appointments and mental-health supports",
  ]);
  assert.ok(universityPolicies.resources.every(({ url }) => url.startsWith("https://")));

  assert.deepEqual(navigationItems.map(({ label, href }) => [label, href]), [
    ["Overview", "#overview"], ["Schedule", "#schedule"],
    ["Paper Presentations", "#paper-presentations"], ["Project", "#project"],
    ["Assessment", "#assessment"], ["Additional Readings", "#additional-readings"],
    ["Policies", "#policies"],
  ]);
  assert.match(projectPresentationSchedule.centralQuestion, /theoretical questions remain open/i);
  assert.equal(courseFacts.meetingCount, 12);
  assert.equal(courseFacts.scheduledPapersPerMeeting, 4);
  assert.equal(courseFacts.meetingTime, "1:30–4:20 p.m.");
  assert.equal(courseFacts.meetingDurationMinutes, 170);
  assert.equal(courseFacts.plannedEnrollment, 25);
  assert.equal(courseFacts.expectedProjectPresentations, 25);
  for (const key of ["officeHours", "meetingLocation", "coursePlatform", "officialOutlineUrl"]) assert.equal(courseFacts[key], "TBA");

  assert.equal(paperPresentationPlan.instructorLedWeek, 1);
  assert.equal(paperPresentationPlan.firstStudentPresentationWeek, 2);
  assert.equal(paperPresentationPlan.lastStudentPresentationWeek, 10);
  assert.equal(paperPresentationPlan.studentPaperMeetingCount, 9);
  assert.equal(paperPresentationPlan.papersPerMeeting, 4);
  assert.equal(paperPresentationPlan.studentPaperPresentationSlots, 36);
  assert.equal(paperPresentationPlan.minimumPaperPresentationsPerStudent, 2);
  assert.equal(paperPresentationPlan.studentPaperPresentationAssignments, 50);
  assert.equal(paperPresentationPlan.soloPaperPresentationSlots, 25);
  assert.equal(paperPresentationPlan.sharedPaperPresentationSlots, 11);
  assert.equal(paperPresentationPlan.sharedPaperPresentationAssignments, 25);
  assert.equal(paperPresentationPlan.pairedPaperPresentationSlots, 8);
  assert.equal(paperPresentationPlan.threePersonPaperPresentationSlots, 3);
  assert.equal(
    paperPresentationPlan.soloPaperPresentationSlots + paperPresentationPlan.sharedPaperPresentationSlots,
    paperPresentationPlan.studentPaperPresentationSlots,
  );
  assert.equal(
    paperPresentationPlan.soloPaperPresentationSlots
      + 2 * paperPresentationPlan.pairedPaperPresentationSlots
      + 3 * paperPresentationPlan.threePersonPaperPresentationSlots,
    paperPresentationPlan.studentPaperPresentationAssignments,
  );
  assert.equal(paperPresentationPlan.paperPresentationMinutes, 30);
  assert.equal(paperPresentationPlan.paperDiscussionMinutes, 12);
  assert.equal(paperPresentationPlan.minutesPerPaper, 42);
  assert.equal(paperPresentationPlan.scheduledPaperMinutesPerMeeting, 168);
  assert.ok(paperPresentationPlan.scheduledPaperMinutesPerMeeting <= courseFacts.meetingDurationMinutes);

  assert.equal(projectPresentationPlan.presentationCount, 25);
  assert.equal(projectPresentationPlan.meetingCount, 2);
  assert.deepEqual([...projectPresentationPlan.presentationsByMeeting], [12, 13]);
  assert.equal(projectPresentationPlan.talkMinutes, 10);
  assert.equal(projectPresentationPlan.questionMinutes, 2);
  assert.equal(projectPresentationPlan.transitionMinutes, 1);
  assert.equal(projectPresentationPlan.minutesPerPresentation, 13);
  assert.deepEqual(projectPresentationPlan.usedMinutesByMeeting, [156, 169]);
  assert.equal(projectPresentationPlan.totalPresentationMinutes, 325);
  assert.equal(projectPresentationPlan.totalAvailableMinutes, 340);
  assert.equal(projectPresentationPlan.remainingMinutes, 15);
  assert.equal(
    projectPresentationPlan.presentationsByMeeting.reduce((total, count) => total + count, 0),
    projectPresentationPlan.presentationCount,
  );
  assert.ok(
    projectPresentationPlan.usedMinutesByMeeting.every(
      (minutes) => minutes <= courseFacts.meetingDurationMinutes,
    ),
  );

  const firstWeek = courseSchedule[0];
  assert.equal(firstWeek.title, "Exact Learning");
  assert.match(firstWeek.guidingQuestion, /execute algorithms exactly/i);
  assert.match(firstWeek.presentationNote, /All four papers will be presented by the instructor/i);
  assert.match(firstWeek.presentationNote, /Student paper presentations begin in Week 2/i);
  assert.deepEqual(firstWeek.papers.map((paper) => paper.title), [
    "Certification from Examples is Hard for Circuits and Transformers under Minimal Overparametrization",
    "Learning to Execute Graph Algorithms Exactly with Graph Neural Networks",
    "On the Statistical Query Complexity of Learning Semiautomata: a Random Walk Approach",
    "Learning to Add, Multiply, and Execute Algorithmic Instructions Exactly with Neural Networks",
  ]);
  assert.deepEqual(firstWeek.papers.map((paper) => paper.link), [
    "https://arxiv.org/abs/2605.22964",
    "https://arxiv.org/abs/2601.23207",
    "https://proceedings.mlr.press/v336/giapitzakis26a.html",
    "https://proceedings.nips.cc/paper_files/paper/2025/hash/71553eb7d97b9c332d9c520c5de724d9-Abstract-Conference.html",
  ]);

  const allUrls = allPapers.map((paper) => paper.link);
  for (const url of [
    "https://openreview.net/forum?id=De4FYqjFueZ",
    "https://proceedings.mlr.press/v202/giannou23a.html",
    "https://proceedings.mlr.press/v235/huang24d.html",
  ]) assert.ok(allUrls.includes(url));
  for (const url of [
    "https://proceedings.mlr.press/v139/weiss21a.html",
    "https://aclanthology.org/2020.conll-1.37/",
    "https://aclanthology.org/2020.conll-1.25/",
    "https://proceedings.mlr.press/v235/huang24l.html",
  ]) assert.ok(!allUrls.includes(url));

  const scheduledTitles = scheduledPapers.map((paper) => paper.title);
  for (const title of [
    "Tight Sample Complexity of Transformers",
    "Transformers Provably Learn Chain-of-Thought Reasoning with Length Generalization",
    "Transformers Learn Shortcuts to Automata",
    "Looped Transformers as Programmable Computers",
  ]) {
    assert.equal(scheduledTitles.filter((candidate) => candidate === title).length, 1);
  }
  for (const title of [
    "Thinking Like Transformers",
    "On the Computational Power of Transformers and Its Implications in Sequence Modeling",
  ]) assert.ok(!scheduledTitles.includes(title));
  const additionalTitles = additionalReadings.map((paper) => paper.title);
  for (const title of [
    "How Do Transformers Learn In-Context Beyond Simple Functions? A Case Study on Learning with Representations",
    "How Do Transformers Learn Topic Structure: Towards a Mechanistic Understanding",
  ]) {
    assert.equal(additionalTitles.filter((candidate) => candidate === title).length, 1);
    assert.ok(!scheduledTitles.includes(title));
  }

  for (const week of courseSchedule) {
    for (const subtopic of week.subtopics ?? []) {
      for (const title of subtopic.paperTitles) {
        assert.equal(week.papers.filter((paper) => paper.title === title).length, 1, `Week ${week.week} subtopic reference must resolve exactly once: ${title}`);
      }
    }
  }
  for (const weekNumber of [2, 5]) {
    const week = courseSchedule.find(({ week }) => week === weekNumber);
    assert.equal(week.subtopics.length, 2);
    assert.equal(new Set(week.subtopics.flatMap((subtopic) => subtopic.paperTitles)).size, 4);
  }
  const weekTwo = courseSchedule.find(({ week }) => week === 2);
  const requestedWeekTwoOrder = [
    "Improving Transformer Optimization Through Better Initialization",
    "On Layer Normalization in the Transformer Architecture",
  ];
  assert.deepEqual(weekTwo.papers.slice(0, 2).map((paper) => paper.title), requestedWeekTwoOrder);
  assert.deepEqual([...weekTwo.subtopics[0].paperTitles], requestedWeekTwoOrder);
  const weekFour = courseSchedule.find(({ week }) => week === 4);
  assert.deepEqual(weekFour.papers.map((paper) => paper.title), [
    "On the Computational Complexity of Self-Attention",
    "Fast Attention Requires Bounded Entries",
    "Transformers Learn Shortcuts to Automata",
    "Looped Transformers as Programmable Computers",
  ]);
  assert.match(weekFour.topicFocus, /automata shortcuts.*programmable looped computation/i);
  assert.doesNotMatch(weekFour.topicFocus, /RASP/i);

  const serializedData = JSON.stringify(data);
  assert.doesNotMatch(serializedData, /TODO_INSTRUCTOR_|"impact"\s*:|subweights?|assignment.?screening/i);
});

test("rendered structure has valid navigation, meaningful paper links, and accessible schedule views", async () => {
  const [{ courseSchedule, additionalReadings, navigationItems }, response] = await Promise.all([loadCourseData(), render()]);
  const html = await response.text();
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "Every rendered id must be unique.");
  const internalLinks = [...html.matchAll(/\bhref="#([^"]+)"/g)].map((match) => match[1]);
  for (const target of internalLinks) assert.ok(ids.includes(target), `Missing anchor target #${target}`);
  for (const { href } of navigationItems) assert.ok(internalLinks.includes(href.slice(1)));

  assert.match(html, /<a\b[^>]*class="[^"]*skip-link[^"]*"[^>]*href="#main-content"/i);
  assert.equal((html.match(/<main\b/gi) ?? []).length, 1);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  const tableHeaders = [...html.matchAll(/<th\b([^>]*)>/gi)];
  assert.ok(tableHeaders.length > 0);
  assert.ok(tableHeaders.every((match) => /\bscope="(?:col|row)"/i.test(match[1])));
  const labelledSections = [...html.matchAll(/<section\b[^>]*aria-labelledby="([^"]+)"[^>]*>/gi)];
  assert.ok(labelledSections.length >= 10);
  for (const [, headingId] of labelledSections) assert.ok(ids.includes(headingId));

  assert.match(html, /class="[^"]*schedule-desktop[^"]*"/i);
  assert.match(html, /<ol\b[^>]*class="[^"]*(?:mobile-schedule|schedule-mobile)[^"]*"/i);
  assert.match(html, /class="[^"]*back-to-schedule[^"]*"[^>]*href="#schedule"/i);

  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(([, href, content]) => ({ href: decodeHtml(href), text: textContent(content) }));
  const allPapers = [...courseSchedule.flatMap((week) => week.papers), ...additionalReadings];
  for (const paper of allPapers) {
    assert.ok(anchors.some((anchor) => anchor.href === paper.link && anchor.text === paper.title), `Paper title must be the link text: ${paper.title}`);
  }
});

test("source preserves the restrained responsive style and required metadata", async () => {
  const [page, layout, data, css, packageJson, exporter, readme, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/courseData.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../scripts/export-static.mjs", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
  ]);
  assert.doesNotMatch(`${page}\n${data}\n${readme}`, /Assignment Screening|assignment-screening|screening software/i);
  assert.doesNotMatch(`${page}\n${layout}\n${data}`, /TODO_INSTRUCTOR_|theorem-first|24 weekly meetings|96 papers/i);
  assert.doesNotMatch(data, /\bimpact\s*[?:,]|Highly cited|Strong recent uptake/i);
  assert.doesNotMatch(css, /linear-gradient|radial-gradient|backdrop-filter/i);
  assert.match(css, /@media\s*\(max-width:\s*640px\)/i);
  assert.match(css, /schedule-(?:mobile|desktop)|mobile-schedule/i);
  assert.match(css, /scroll-margin-top/i);
  assert.match(css, /@media\s+print/i);
  assert.match(css, /prefers-reduced-motion/i);
  assert.match(layout, /CS 886: Learning Theory for Modern AI (?:--|–|—) Fall 2026/);
  assert.match(layout, /icons:\s*\{[\s\S]*?icon:\s*["']\/favicon\.svg["']/);
  assert.match(packageJson, /"check:links"\s*:\s*"node scripts\/check-links\.mjs"/);
  assert.match(exporter, /public["'],\s*["']favicon\.svg/);
  assert.match(readme, /Do not\s+publish a `TODO_INSTRUCTOR_\*` placeholder/i);
  assert.match(workflow, /npm run lint[\s\S]*npm test[\s\S]*npm run check:links[\s\S]*npm run build[\s\S]*export-static\.mjs/i);
});

test("static export keeps canonical, Open Graph, and favicon URLs under the Pages project path", async () => {
  const siteUrl = "https://watcl-lab.github.io/cs886-learning-theory/";
  await execFileAsync(process.execPath, ["scripts/export-static.mjs"], {
    cwd: projectRoot,
    env: { ...process.env, SITE_URL: siteUrl },
    timeout: 30_000,
  });
  const [html, exportedFavicon, sourceFavicon] = await Promise.all([
    readFile(resolve(projectRoot, "_site", "index.html"), "utf8"),
    readFile(resolve(projectRoot, "_site", "favicon.svg"), "utf8"),
    readFile(resolve(projectRoot, "public", "favicon.svg"), "utf8"),
  ]);
  assert.match(html, /<link rel="canonical" href="https:\/\/watcl-lab\.github\.io\/cs886-learning-theory\/"\s*\/>/i);
  assert.match(html, /content="https:\/\/watcl-lab\.github\.io\/cs886-learning-theory\/og\.png"/i);
  assert.match(html, /href="https:\/\/watcl-lab\.github\.io\/cs886-learning-theory\/favicon\.svg"/i);
  assert.doesNotMatch(html, /https:\/\/watcl-lab\.github\.io\/(?:og\.png|favicon\.svg)/i);
  assert.doesNotMatch(html, /TODO_INSTRUCTOR_|2020\.conll-1\.25|v235\/huang24l\.html|\[paper\]/i);
  assert.equal(exportedFavicon, sourceFavicon);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const [, target] of html.matchAll(/\bhref="#([^"]+)"/g)) assert.ok(ids.has(target), `Static export is missing anchor target #${target}`);
});
