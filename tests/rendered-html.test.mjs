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
  assert.match(text, /Last updated:?\s*August 31, 2026/i);
  assert.match(text, /Exact Algorithmic Learning, Certification, and Hardness/i);
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
  assert.doesNotMatch(
    text,
    /Biases and Optimization of Self-Attention|The Lipschitz Constant of Self-Attention|The Implicit Bias of Gradient Descent on Separable Data/i,
  );
  assert.match(text, /30 minutes\s*:?\s*presentation/i);
  assert.match(text, /12 minutes\s*:?\s*discussion and questions/i);
  assert.doesNotMatch(text, /5 minutes\s*:?\s*open questions and discussion|2 minutes\s*:?\s*transition/i);
  assert.doesNotMatch(text, /designated discussant|lead presentation|lead presenter|complete presentation slot|short break and a concluding synthesis/i);
  assert.match(text, /10-minute talk/i);
  assert.match(text, /2 minutes of questions/i);
  assert.match(text, /1-minute transition/i);
  assert.match(text, /25 individual project presentations/i);
  assert.match(text, /Week 11 will have 13 presentations, and Week 12 will have 12/i);
  assert.match(text, /Each presentation has a 13-minute slot/i);
  assert.match(text, /Timing will be strict/i);
  assert.match(text, /Project presentations do not count toward the two required paper presentations/i);
  assert.match(text, /The final meeting reserves 14 minutes for course synthesis and open problems/i);
  assert.match(text, /Presentation Order and Themes/i);
  assert.match(
    text,
    /Presentations will be ordered thematically rather than alphabetically, randomly, by sign-up time, or by perceived project quality/i,
  );
  assert.match(text, /Week 11\s*:\s*Foundations, Architecture, and Learning/i);
  assert.match(text, /Week 12\s*:\s*In-Context Learning, Reasoning, and Open Problems/i);
  assert.match(text, /Exact learning and certification/i);
  assert.match(text, /Autoregressive chain-of-thought/i);
  assert.match(text, /The final 14 minutes of Week 12 will synthesize/i);
  assert.match(text, /November 26, 2026/);
  assert.match(text, /48-hour grace period/i);
  assert.match(text, /(?:five|5) percentage points for each additional 24-hour period/i);
  assert.match(text, /Generative-AI tools are allowed throughout the course/i);
  assert.match(text, /will result in less marks/i);
  assert.match(text, /Projects are individual by default/i);
  assert.match(text, /A project from a previous offering of CS 886 was subsequently developed into a NeurIPS 2024 publication/i);
  assert.match(text, /Project Presentations I: Foundations, Architecture, and Learning/i);
  assert.match(text, /Project Presentations II: In-Context Learning, Reasoning, and Open Problems/i);
  assert.match(text, /Tight Sample Complexity of Transformers/);
  assert.match(text, /Transformers Provably Learn Chain-of-Thought Reasoning with Length Generalization/);
  assert.match(text, /Bingbin Liu, Jordan T\. Ash, Surbhi Goel, Akshay Krishnamurthy, and Cyril Zhang/i);
  assert.match(text, /Transformers Learn Shortcuts to Automata/i);
  assert.match(text, /ICLR 2023 oral/i);
  assert.match(text, /exactly simulate any finite-state automaton using O\(log T\) depth/i);
  assert.match(text, /Angeliki Giannou, Shashank Rajput, Jy-Yong Sohn, Kangwook Lee, Jason D\. Lee, and Dimitris Papailiopoulos/i);
  assert.match(text, /Looped Transformers as Programmable Computers/i);
  assert.match(text, /explicit instruction-set architecture/i);
  assert.match(text, /Sparse Structure and Token Selection in Self-Attention/i);
  assert.match(
    text,
    /Why does self-attention favor sparse dependencies, and how does gradient-based training discover, combine, and select task-relevant tokens/i,
  );
  assert.match(text, /Part I: Statistical bias and emergent token composition/i);
  assert.match(text, /Part II: Margin maximization and provable token-selection learning/i);
  for (const title of [
    "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
    "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
    "Max-Margin Token Selection in Attention Mechanism",
    "Transformers Provably Learn Sparse Token Selection While Fully-Connected Nets Cannot",
  ]) assert.match(text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  assert.match(html, /e359ebe56ba306b674e8952349c6049e-Abstract-Conference\.html/);
  assert.match(text, /Yuandong Tian, Yiping Wang, Beidi Chen, and Simon S\. Du/i);
  assert.match(text, /learning-rate-controlled phase transition/i);

  for (const title of [
    "Exact Algorithmic Learning, Certification, and Hardness",
    "Theoretical Foundations of Transformer Trainability: Initialization, Width, and Depth",
    "Expressivity, Formal Languages, and Circuit Classes",
    "Parallel and Fine-Grained Complexity of Transformers",
  ]) assert.match(text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  for (const heading of [
    "Part I: Exact execution learned from examples",
    "Part II: Hardness of exact learning and certification",
    "Part I: Initialization, normalization, and infinite-width limits",
    "Part II: Depth-induced rank collapse and gradient failure",
    "Part I: Positive expressivity and computational universality",
    "Part II: Exact characterizations and upper bounds",
    "Part I: Parallel depth and communication",
    "Part II: Fine-grained complexity of attention",
  ]) assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  for (const title of [
    "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
    "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
    "Infinite Attention: NNGP and NTK for Deep Attention Networks",
    "Transformers, Parallel Computation, and Logarithmic Depth",
  ]) assert.match(text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  assert.match(text, /Theoretical focus:/i);
  assert.doesNotMatch(text, /Learning-theory focus:/i);
  assert.doesNotMatch(
    text,
    /Trainability, Signal Propagation, and Infinite-Width Theory of Transformers|Trainability and Signal Propagation in Deep Transformers|Trainability, Expressivity, and Approximation|Formal Languages, Logic, and Circuit Complexity|Computational Limits and Programmable Transformers/i,
  );

  for (const title of [
    "Statistical Foundations of Pretrained In-Context Prediction",
    "Optimization and Training Dynamics of In-Context Learning",
    "Generalization, Learnability, and Minimax Theory of In-Context Learning",
    "Learning Theory of Autoregressive Chain-of-Thought",
    "Curricula, Scratchpads, and Length Generalization for Reasoning",
  ]) assert.match(text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  for (const heading of [
    "Part I: Bayesian interpretation and information-theoretic rates",
    "Part II: Frequentist consistency and empirical-Bayes adaptation",
    "Part I: Population optima and single-step training",
    "Part II: Softmax dynamics and multi-step learned optimization",
    "Part I: PAC learnability and stability",
    "Part II: Algorithm selection and minimax rates",
    "Part I: Formal frameworks and tight sample complexity",
    "Part II: Statistical benefits and training dynamics",
    "Part I: Learning barriers and curriculum design",
    "Part II: Adaptive curriculum and length extrapolation",
  ]) assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  assert.match(
    text,
    /When can pretrained sequence predictors be interpreted as Bayesian, frequentist, or empirical-Bayes procedures/i,
  );
  assert.match(text, /Connection to the previous week\./i);
  assert.equal((html.match(/class="week-connection"/gi) ?? []).length, 9);
  assert.match(text, /Stable optimization does not determine what a transformer can represent/i);
  assert.match(text, /Efficient representation does not imply learnability from finite data/i);
  assert.match(text, /Convergence to an in-context algorithm does not by itself guarantee generalization/i);
  assert.match(
    text,
    /After Part I studies the parallel computational power of the complete transformer architecture/i,
  );
  assert.doesNotMatch(
    text,
    /Learnability and Inductive Bias of Self-Attention|Bayesian and Statistical Foundations of In-Context Learning/i,
  );
  assert.doesNotMatch(
    text,
    /Part I: Statistical learnability and model identification|Part II: Optimization bias and learned token selection|Part I: Bayesian and frequentist interpretations|Part II: Information-theoretic rates and universal priors/i,
  );

  for (const title of [
    "An Information-Theoretic Analysis of In-Context Learning",
    "Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining",
    "Can Looped Transformers Learn to Implement Multi-step Gradient Descent for In-context Learning?",
    "From Sparse Dependence to Sparse Attention: Unveiling How Chain-of-Thought Enhances Transformer Sample Efficiency",
    "Training Nonlinear Transformers for Chain-of-Thought Inference: A Theoretical Generalization Analysis",
    "Learning to Reason with Curriculum I: Provable Benefits of Autocurriculum",
  ]) assert.match(text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  assert.match(
    text,
    /foundational representational, mechanistic, and adjacent theory papers that support the seminar's learning-theory core/i,
  );
  assert.doesNotMatch(
    text,
    /Memory and Bayesian Theories of In-Context Learning|In-Context Learning as Optimization|Generalization and Algorithm Selection in In-Context Learning|Optimal In-Context Learning and Chain-of-Thought Theory|Reasoning Generalization and Misspecified Next-Token Prediction/i,
  );

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
  assert.doesNotMatch(text, /Length Generalization and Infinite-Limit Theory/i);
  assert.match(html, /openreview\.net\/forum\?id=De4FYqjFueZ/);
  assert.match(html, /v202\/giannou23a\.html/);
  assert.match(html, /v235\/huang24d\.html/);
  assert.match(html, /v235\/jeon24a\.html/);
  assert.match(html, /v336\/cannella26a\.html/);
  assert.match(html, /v235\/gatmiry24b\.html/);
  assert.match(html, /fa6d4d2020aac4bd8f7cdb2771fc1ae2-Abstract-Conference\.html/);
  assert.match(html, /b295b3a940706f431076c86b78907757-Abstract-Conference\.html/);
  assert.match(html, /v336\/rajaraman26a\.html/);
  assert.match(html, /arxiv\.org\/abs\/2502\.12465/);
  assert.match(html, /v119\/xiong20b\.html/);
  assert.match(html, /v139\/dong21a\.html/);
  assert.match(html, /ae0cba715b60c4052359b3d52a2cff7f-Abstract-Conference\.html/);
  assert.match(html, /v119\/hron20a\.html/);
  assert.match(html, /v235\/kedia24a\.html/);
  assert.match(html, /2023\.tacl-1\.31/);
  assert.match(html, /v235\/sanford24a\.html/);
  assert.match(html, /v201\/duman-keles23a\.html/);
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
  assert.deepEqual(
    courseSchedule.slice(0, 5).map(({ week, title }) => [week, title]),
    [
      [1, "Exact Algorithmic Learning, Certification, and Hardness"],
      [2, "Theoretical Foundations of Transformer Trainability: Initialization, Width, and Depth"],
      [3, "Expressivity, Formal Languages, and Circuit Classes"],
      [4, "Parallel and Fine-Grained Complexity of Transformers"],
      [5, "Sparse Structure and Token Selection in Self-Attention"],
    ],
  );
  assert.match(courseSchedule[0].guidingQuestion, /behavioral certification provably hard/i);
  assert.match(
    courseSchedule[1].guidingQuestion,
    /normalization, width, number of attention heads, residual structure, and depth/i,
  );
  assert.match(courseSchedule[1].guidingQuestion, /initialization and during early training/i);
  assert.match(courseSchedule[2].guidingQuestion, /universal approximation and Turing completeness coexist/i);
  assert.match(courseSchedule[3].guidingQuestion, /depth, precision, parallel communication, entry magnitudes/i);
  assert.match(courseSchedule[4].guidingQuestion, /favor sparse dependencies/i);
  assert.deepEqual(
    courseSchedule.slice(5, 10).map(({ week, title }) => [week, title]),
    [
      [6, "Statistical Foundations of Pretrained In-Context Prediction"],
      [7, "Optimization and Training Dynamics of In-Context Learning"],
      [8, "Generalization, Learnability, and Minimax Theory of In-Context Learning"],
      [9, "Learning Theory of Autoregressive Chain-of-Thought"],
      [10, "Curricula, Scratchpads, and Length Generalization for Reasoning"],
    ],
  );
  assert.match(courseSchedule[5].guidingQuestion, /Bayesian, frequentist, or empirical-Bayes procedures/i);
  assert.match(courseSchedule[6].guidingQuestion, /gradient-based pretraining actually converge/i);
  assert.match(courseSchedule[7].guidingQuestion, /generalize across examples and tasks/i);
  assert.match(courseSchedule[8].guidingQuestion, /observed or latent reasoning traces/i);
  assert.match(courseSchedule[9].guidingQuestion, /adaptive data selection, and self-training/i);
  assert.ok(courseSchedule.slice(0, 10).every((week) => week.papers.length === 4));
  assert.equal(courseSchedule.slice(1, 10).flatMap((week) => week.papers).length, 36);
  assert.ok(courseSchedule.slice(10).every((week) => week.papers.length === 0));
  assert.equal(scheduledPapers.length, 40);
  assert.equal(additionalReadings.length, 22);
  assert.equal(allPapers.length, 62);
  assert.equal(new Set(allPapers.map((paper) => paper.title)).size, 62);
  assert.equal(new Set(allPapers.map((paper) => paper.link)).size, 62);

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
  assert.equal(projectPresentationSchedule.title, "Project Presentations and Course Synthesis");
  assert.match(projectPresentationSchedule.centralQuestion, /across the course's major themes/i);
  assert.match(projectPresentationSchedule.centralQuestion, /theoretical questions remain open/i);
  assert.equal(courseFacts.meetingCount, 12);
  assert.equal(courseFacts.scheduledPapersPerMeeting, 4);
  assert.equal(courseFacts.meetingTime, "1:30–4:20 p.m.");
  assert.equal(courseFacts.meetingDurationMinutes, 170);
  assert.equal(courseFacts.plannedEnrollment, 25);
  assert.equal(courseFacts.expectedProjectPresentations, 25);
  assert.equal(courseFacts.lastUpdated, "August 31, 2026");
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
  assert.deepEqual([...projectPresentationPlan.presentationsByMeeting], [13, 12]);
  assert.equal(projectPresentationPlan.talkMinutes, 10);
  assert.equal(projectPresentationPlan.questionMinutes, 2);
  assert.equal(projectPresentationPlan.transitionMinutes, 1);
  assert.equal(projectPresentationPlan.minutesPerPresentation, 13);
  assert.deepEqual(projectPresentationPlan.usedMinutesByMeeting, [169, 156]);
  assert.equal(projectPresentationPlan.totalPresentationMinutes, 325);
  assert.equal(projectPresentationPlan.totalAvailableMinutes, 340);
  assert.equal(projectPresentationPlan.remainingMinutes, 15);
  assert.equal(projectPresentationPlan.finalSynthesisMinutes, 14);
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
  assert.equal(firstWeek.title, "Exact Algorithmic Learning, Certification, and Hardness");
  assert.match(firstWeek.guidingQuestion, /learn discrete algorithms exactly/i);
  assert.match(firstWeek.guidingQuestion, /behavioral certification provably hard/i);
  assert.match(firstWeek.presentationNote, /All four papers will be presented by the instructor/i);
  assert.match(firstWeek.presentationNote, /recent research program/i);
  assert.match(firstWeek.presentationNote, /Student paper presentations begin in Week 2/i);
  assert.deepEqual(firstWeek.papers.map((paper) => paper.title), [
    "Learning to Add, Multiply, and Execute Algorithmic Instructions Exactly with Neural Networks",
    "Learning to Execute Graph Algorithms Exactly with Graph Neural Networks",
    "On the Statistical Query Complexity of Learning Semiautomata: a Random Walk Approach",
    "Certification from Examples is Hard for Circuits and Transformers under Minimal Overparametrization",
  ]);
  assert.deepEqual(firstWeek.papers.map((paper) => paper.link), [
    "https://proceedings.nips.cc/paper_files/paper/2025/hash/71553eb7d97b9c332d9c520c5de724d9-Abstract-Conference.html",
    "https://arxiv.org/abs/2601.23207",
    "https://proceedings.mlr.press/v336/giapitzakis26a.html",
    "https://arxiv.org/abs/2605.22964",
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
    "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
    "Attention Is Turing Complete",
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

  const newlyRequiredTitles = [
    "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
    "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
    "Infinite Attention: NNGP and NTK for Deep Attention Networks",
    "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
    "Transformers, Parallel Computation, and Logarithmic Depth",
    "An Information-Theoretic Analysis of In-Context Learning",
    "Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining",
    "Can Looped Transformers Learn to Implement Multi-step Gradient Descent for In-context Learning?",
    "From Sparse Dependence to Sparse Attention: Unveiling How Chain-of-Thought Enhances Transformer Sample Efficiency",
    "Training Nonlinear Transformers for Chain-of-Thought Inference: A Theoretical Generalization Analysis",
    "Learning to Reason with Curriculum I: Provable Benefits of Autocurriculum",
  ];
  const movedToAdditionalTitles = [
    "Improving Transformer Optimization Through Better Initialization",
    "Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models",
    "Theoretical Limitations of Self-Attention in Neural Sequence Models",
    "Transformers Learn Shortcuts to Automata",
    "Looped Transformers as Programmable Computers",
    "From Self-Attention to Markov Models: Unveiling the Dynamics of Generative Transformers",
    "Hopfield Networks Is All You Need",
    "Birth of a Transformer: A Memory Viewpoint",
    "What Learning Algorithm Is In-Context Learning? Investigations with Linear Models",
    "Transformers Learn In-Context by Gradient Descent",
    "Chain of Thought Empowers Transformers to Solve Inherently Serial Problems",
    "Computational-Statistical Tradeoffs at the Next-Token Prediction Barrier: Autoregressive and Imitation Learning under Misspecification",
  ];
  const scheduledTitleSet = new Set(scheduledTitles);
  const additionalTitleSet = new Set(additionalTitles);
  assert.deepEqual(additionalTitles.slice(0, 2), [
    "Improving Transformer Optimization Through Better Initialization",
    "Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models",
  ]);
  assert.equal(
    additionalTitles.indexOf("From Self-Attention to Markov Models: Unveiling the Dynamics of Generative Transformers"),
    additionalTitles.indexOf("Looped Transformers as Programmable Computers") + 1,
  );

  for (const title of newlyRequiredTitles) {
    assert.equal(scheduledTitleSet.has(title), true, `${title} must be a scheduled paper`);
    assert.equal(additionalTitleSet.has(title), false, `${title} must not be duplicated in additional readings`);
  }
  for (const title of movedToAdditionalTitles) {
    assert.equal(scheduledTitleSet.has(title), false, `${title} must not remain in the required schedule`);
    assert.equal(additionalTitleSet.has(title), true, `${title} must be retained as an additional reading`);
  }

  for (const week of courseSchedule.filter((candidate) => candidate.subtopics?.length)) {
    const groupedTitles = week.subtopics.flatMap((subtopic) => subtopic.paperTitles);
    const weekPaperTitles = week.papers.map((paper) => paper.title);

    assert.deepEqual(
      groupedTitles,
      weekPaperTitles,
      `Week ${week.week} subtopic order must exactly match its paper order`,
    );
    assert.equal(
      new Set(groupedTitles).size,
      weekPaperTitles.length,
      `Week ${week.week} must assign every paper to exactly one subtopic`,
    );
  }
  for (const weekNumber of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    const week = courseSchedule.find(({ week }) => week === weekNumber);
    assert.equal(week.subtopics.length, 2);
    assert.equal(new Set(week.subtopics.flatMap((subtopic) => subtopic.paperTitles)).size, 4);
  }
  const weekTwo = courseSchedule.find(({ week }) => week === 2);
  assert.deepEqual(weekTwo.papers.map((paper) => paper.title), [
    "On Layer Normalization in the Transformer Architecture",
    "Infinite Attention: NNGP and NTK for Deep Attention Networks",
    "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
    "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
  ]);
  assert.equal(
    weekTwo.title,
    "Theoretical Foundations of Transformer Trainability: Initialization, Width, and Depth",
  );
  assert.match(weekTwo.topicFocus, /initialization-time gradient scaling/i);
  assert.match(weekTwo.topicFocus, /Gaussian-process and neural-tangent-kernel limits/i);
  assert.match(weekTwo.topicFocus, /depth-induced token uniformity/i);
  assert.match(weekTwo.topicFocus, /vanishing query and key gradients/i);
  assert.equal(
    weekTwo.subtopics[0].title,
    "Part I: Initialization, normalization, and infinite-width limits",
  );
  assert.deepEqual([...weekTwo.subtopics[0].paperTitles], [
    "On Layer Normalization in the Transformer Architecture",
    "Infinite Attention: NNGP and NTK for Deep Attention Networks",
  ]);
  assert.equal(
    weekTwo.subtopics[1].title,
    "Part II: Depth-induced rank collapse and gradient failure",
  );
  assert.deepEqual([...weekTwo.subtopics[1].paperTitles], [
    "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
    "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
  ]);

  const weekTwoTitleSet = new Set(weekTwo.papers.map((paper) => paper.title));
  assert.equal(weekTwoTitleSet.has("Infinite Attention: NNGP and NTK for Deep Attention Networks"), true);
  assert.equal(
    weekTwoTitleSet.has("Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models"),
    false,
  );
  assert.equal(additionalTitleSet.has("Infinite Attention: NNGP and NTK for Deep Attention Networks"), false);
  assert.equal(
    additionalTitleSet.has("Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models"),
    true,
  );

  const weekTwoByTitle = new Map(weekTwo.papers.map((paper) => [paper.title, paper.presentationFocus]));
  assert.match(
    weekTwoByTitle.get("Infinite Attention: NNGP and NTK for Deep Attention Networks"),
    /neural-network Gaussian-process and neural-tangent-kernel limits/i,
  );
  assert.match(
    weekTwoByTitle.get("Infinite Attention: NNGP and NTK for Deep Attention Networks"),
    /single-head attention need not become Gaussian/i,
  );
  assert.match(
    weekTwoByTitle.get("Infinite Attention: NNGP and NTK for Deep Attention Networks"),
    /multi-head attention converges to a Gaussian process/i,
  );

  const weekThree = courseSchedule.find(({ week }) => week === 3);
  assert.deepEqual(weekThree.papers.map((paper) => paper.title), [
    "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
    "Attention Is Turing Complete",
    "Masked Hard-Attention Transformers Recognize Exactly the Star-Free Languages",
    "Saturated Transformers Are Constant-Depth Threshold Circuits",
  ]);
  assert.match(weekThree.guidingQuestion, /universal approximation and Turing completeness coexist/i);
  assert.match(weekThree.guidingQuestion, /depth, precision, masking, recurrence, and positional information/i);

  const weekFour = courseSchedule.find(({ week }) => week === 4);
  assert.deepEqual(weekFour.papers.map((paper) => paper.title), [
    "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
    "Transformers, Parallel Computation, and Logarithmic Depth",
    "On the Computational Complexity of Self-Attention",
    "Fast Attention Requires Bounded Entries",
  ]);
  assert.match(weekFour.topicFocus, /Threshold-circuit simulation/i);
  assert.match(weekFour.topicFocus, /Massively Parallel Computation/i);
  assert.match(weekFour.topicFocus, /SETH-based lower bounds/i);
  assert.doesNotMatch(weekFour.topicFocus, /automata shortcuts|programmable looped computation|RASP/i);
  assert.match(
    weekFour.subtopics[1].description,
    /After Part I studies the parallel computational power of the complete transformer architecture/i,
  );
  assert.match(weekFour.subtopics[1].description, /zooms in on its principal computational primitive/i);
  assert.match(weekFour.subtopics[1].description, /faster than quadratic time/i);

  const weekFive = courseSchedule.find(({ week }) => week === 5);
  assert.equal(weekFive.date, "October 9, 2026");
  assert.equal(weekFive.title, "Sparse Structure and Token Selection in Self-Attention");
  assert.equal(
    weekFive.guidingQuestion,
    "Why does self-attention favor sparse dependencies, and how does gradient-based training discover, combine, and select task-relevant tokens?",
  );
  assert.equal(
    weekFive.topicFocus,
    "Norm-based sample complexity, SGD-driven token composition, implicit max-margin bias, sparse token selection, architectural separation, and out-of-distribution length generalization.",
  );
  assert.deepEqual(weekFive.subtopics.map(({ title, paperTitles }) => ({
    title,
    paperTitles: [...paperTitles],
    })), [
    {
      title: "Part I: Statistical bias and emergent token composition",
      paperTitles: [
        "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
        "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
      ],
    },
    {
      title: "Part II: Margin maximization and provable token-selection learning",
      paperTitles: [
        "Max-Margin Token Selection in Attention Mechanism",
        "Transformers Provably Learn Sparse Token Selection While Fully-Connected Nets Cannot",
      ],
    },
  ]);
  assert.deepEqual(weekFive.papers.map(({ title, link }) => ({ title, link })), [
    {
      title: "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
      link: "https://proceedings.mlr.press/v162/edelman22a.html",
    },
    {
      title: "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
      link: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/e359ebe56ba306b674e8952349c6049e-Abstract-Conference.html",
    },
    {
      title: "Max-Margin Token Selection in Attention Mechanism",
      link: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/970f59b22f4c72aec75174aae63c7459-Abstract-Conference.html",
    },
    {
      title: "Transformers Provably Learn Sparse Token Selection While Fully-Connected Nets Cannot",
      link: "https://proceedings.mlr.press/v235/wang24ca.html",
    },
  ]);
  const weekFiveByTitle = new Map(
    weekFive.papers.map((paper) => [paper.title, paper.presentationFocus]),
  );
  assert.match(
    weekFiveByTitle.get("Max-Margin Token Selection in Attention Mechanism"),
    /gradient descent on the attention parameter/i,
  );
  assert.match(
    weekFiveByTitle.get("Max-Margin Token Selection in Attention Mechanism"),
    /joint optimization with the prediction head/i,
  );
  assert.match(
    weekFiveByTitle.get("Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer"),
    /no-positional-encoding/i,
  );
  assert.match(
    weekFiveByTitle.get("Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer"),
    /long-sequence/i,
  );
  assert.match(
    weekFiveByTitle.get("Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer"),
    /decoder-timescale assumptions/i,
  );
  assert.match(
    weekFiveByTitle.get("Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer"),
    /scan-and-snap dynamic/i,
  );
  for (const removedTitle of [
    "Your Transformer May Not Be as Powerful as You Expect",
    "Position Coupling: Improving Length Generalization of Arithmetic Transformers Using Task Structure",
    "Infinite Attention: NNGP and NTK for Deep Attention Networks",
    "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
  ]) assert.ok(!weekFive.papers.some(({ title }) => title === removedTitle));

  const weekSix = courseSchedule.find(({ week }) => week === 6);
  assert.equal(weekSix.title, "Statistical Foundations of Pretrained In-Context Prediction");
  assert.deepEqual(weekSix.papers.map((paper) => paper.title), [
    "An Explanation of In-Context Learning as Implicit Bayesian Inference",
    "An Information-Theoretic Analysis of In-Context Learning",
    "Statistical Foundations of Prior-Data Fitted Networks",
    "Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining",
  ]);
  assert.equal(
    weekSix.subtopics[0].title,
    "Part I: Bayesian interpretation and information-theoretic rates",
  );
  assert.equal(
    weekSix.subtopics[1].title,
    "Part II: Frequentist consistency and empirical-Bayes adaptation",
  );

  const expectedConnections = new Map([
    [
      2,
      "Week 1 established exact learning results in idealized neural regimes; Week 2 asks which architectural conditions make deep transformer training stable enough for such learning to occur.",
    ],
    [
      3,
      "Stable optimization does not determine what a transformer can represent; Week 3 separates trainability from representational and computational expressivity.",
    ],
    [
      4,
      "Expressibility does not imply computational efficiency; Week 4 studies the depth, parallelism, precision, and running time needed to realize transformer computations.",
    ],
    [
      5,
      "Efficient representation does not imply learnability from finite data; Week 5 studies the statistical and optimization biases through which attention discovers relevant tokens.",
    ],
    [
      6,
      "After studying how attention learns token relationships, Week 6 asks what statistical inference procedure the resulting prompt-conditioned predictor implements.",
    ],
    [
      7,
      "A statistical description of an ideal in-context predictor does not show that pretraining finds it; Week 7 analyzes population optima and optimization dynamics.",
    ],
    [
      8,
      "Convergence to an in-context algorithm does not by itself guarantee generalization; Week 8 studies finite-sample learnability and optimal statistical rates.",
    ],
    [
      9,
      "Standard in-context learning produces an answer in one forward computation; Week 9 asks how learning changes when the model generates a sequence of intermediate reasoning steps.",
    ],
    [
      10,
      "Once reasoning traces can be learned, Week 10 asks which scratchpads, curricula, and self-training procedures make them effective on harder and longer problems.",
    ],
  ]);

  assert.equal(courseSchedule[0].connection, undefined);
  for (const [weekNumber, expectedConnection] of expectedConnections) {
    const week = courseSchedule.find(({ week }) => week === weekNumber);
    assert.equal(week.connection, expectedConnection);
  }

  const weekEleven = courseSchedule.find(({ week }) => week === 11);
  const weekTwelve = courseSchedule.find(({ week }) => week === 12);
  assert.equal(
    weekEleven.title,
    "Project Presentations I: Foundations, Architecture, and Learning",
  );
  assert.match(weekEleven.guidingQuestion, /exact learning, trainability, expressivity/i);
  assert.match(weekEleven.topicFocus, /Thirteen project presentations/i);
  assert.equal(
    weekTwelve.title,
    "Project Presentations II: In-Context Learning, Reasoning, and Open Problems",
  );
  assert.match(weekTwelve.guidingQuestion, /in-context learning and reasoning/i);
  assert.match(weekTwelve.topicFocus, /Twelve project presentations/i);
  assert.match(weekTwelve.topicFocus, /final course synthesis/i);
  assert.deepEqual(
    courseSchedule.slice(10).map(({ week, date, title }) => [week, date, title]),
    [
      [
        11,
        "November 27, 2026",
        "Project Presentations I: Foundations, Architecture, and Learning",
      ],
      [
        12,
        "December 4, 2026",
        "Project Presentations II: In-Context Learning, Reasoning, and Open Problems",
      ],
    ],
  );

  const expectedPapersByWeek = new Map([
    [
      1,
      [
        "Learning to Add, Multiply, and Execute Algorithmic Instructions Exactly with Neural Networks",
        "Learning to Execute Graph Algorithms Exactly with Graph Neural Networks",
        "On the Statistical Query Complexity of Learning Semiautomata: a Random Walk Approach",
        "Certification from Examples is Hard for Circuits and Transformers under Minimal Overparametrization",
      ],
    ],
    [
      2,
      [
        "On Layer Normalization in the Transformer Architecture",
        "Infinite Attention: NNGP and NTK for Deep Attention Networks",
        "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
        "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
      ],
    ],
    [
      3,
      [
        "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
        "Attention Is Turing Complete",
        "Masked Hard-Attention Transformers Recognize Exactly the Star-Free Languages",
        "Saturated Transformers Are Constant-Depth Threshold Circuits",
      ],
    ],
    [
      4,
      [
        "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
        "Transformers, Parallel Computation, and Logarithmic Depth",
        "On the Computational Complexity of Self-Attention",
        "Fast Attention Requires Bounded Entries",
      ],
    ],
    [
      5,
      [
        "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
        "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
        "Max-Margin Token Selection in Attention Mechanism",
        "Transformers Provably Learn Sparse Token Selection While Fully-Connected Nets Cannot",
      ],
    ],
    [
      6,
      [
        "An Explanation of In-Context Learning as Implicit Bayesian Inference",
        "An Information-Theoretic Analysis of In-Context Learning",
        "Statistical Foundations of Prior-Data Fitted Networks",
        "Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining",
      ],
    ],
    [
      7,
      [
        "One Step of Gradient Descent Is Provably the Optimal In-Context Learner with One Layer of Linear Self-Attention",
        "Trained Transformers Learn Linear Models In-Context",
        "In-Context Convergence of Transformers",
        "Can Looped Transformers Learn to Implement Multi-step Gradient Descent for In-context Learning?",
      ],
    ],
    [
      8,
      [
        "The Learnability of In-Context Learning",
        "Transformers as Algorithms: Generalization and Stability in In-Context Learning",
        "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
        "Transformers Are Minimax Optimal Nonparametric In-Context Learners",
      ],
    ],
    [
      9,
      [
        "A Theory of Learning with Autoregressive Chain of Thought",
        "Tight Sample Complexity of Transformers",
        "From Sparse Dependence to Sparse Attention: Unveiling How Chain-of-Thought Enhances Transformer Sample Efficiency",
        "Training Nonlinear Transformers for Chain-of-Thought Inference: A Theoretical Generalization Analysis",
      ],
    ],
    [
      10,
      [
        "How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad",
        "Learning Compositional Functions with Transformers from Easy-to-Hard Data",
        "Learning to Reason with Curriculum I: Provable Benefits of Autocurriculum",
        "Transformers Provably Learn Chain-of-Thought Reasoning with Length Generalization",
      ],
    ],
  ]);

  for (const [weekNumber, expectedTitles] of expectedPapersByWeek) {
    const week = courseSchedule.find((candidate) => candidate.week === weekNumber);
    assert.ok(week, `Week ${weekNumber} must exist`);
    assert.deepEqual(
      week.papers.map((paper) => paper.title),
      expectedTitles,
      `Week ${weekNumber} must contain the intended papers in the intended order`,
    );
  }

  const linkByTitle = new Map(allPapers.map((paper) => [paper.title, paper.link]));
  assert.equal(
    linkByTitle.get("Computational-Statistical Tradeoffs at the Next-Token Prediction Barrier: Autoregressive and Imitation Learning under Misspecification"),
    "https://arxiv.org/abs/2502.12465",
  );
  assert.equal(
    linkByTitle.get("Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining"),
    "https://proceedings.mlr.press/v336/cannella26a.html",
  );
  assert.equal(
    linkByTitle.get("Learning to Reason with Curriculum I: Provable Benefits of Autocurriculum"),
    "https://proceedings.mlr.press/v336/rajaraman26a.html",
  );
  assert.equal(
    linkByTitle.get("On Layer Normalization in the Transformer Architecture"),
    "https://proceedings.mlr.press/v119/xiong20b.html",
  );
  assert.equal(
    linkByTitle.get("Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth"),
    "https://proceedings.mlr.press/v139/dong21a.html",
  );
  assert.equal(
    linkByTitle.get("Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse"),
    "https://proceedings.neurips.cc/paper_files/paper/2022/hash/ae0cba715b60c4052359b3d52a2cff7f-Abstract-Conference.html",
  );
  assert.equal(
    linkByTitle.get("Infinite Attention: NNGP and NTK for Deep Attention Networks"),
    "https://proceedings.mlr.press/v119/hron20a.html",
  );
  assert.equal(
    linkByTitle.get("Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer"),
    "https://proceedings.neurips.cc/paper_files/paper/2023/hash/e359ebe56ba306b674e8952349c6049e-Abstract-Conference.html",
  );
  assert.equal(
    linkByTitle.get("From Self-Attention to Markov Models: Unveiling the Dynamics of Generative Transformers"),
    "https://proceedings.mlr.press/v235/ildiz24a.html",
  );
  assert.equal(
    linkByTitle.get("Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models"),
    "https://proceedings.mlr.press/v235/kedia24a.html",
  );
  assert.equal(
    linkByTitle.get("The Parallelism Tradeoff: Limitations of Log-Precision Transformers"),
    "https://aclanthology.org/2023.tacl-1.31/",
  );
  assert.equal(
    linkByTitle.get("Transformers, Parallel Computation, and Logarithmic Depth"),
    "https://proceedings.mlr.press/v235/sanford24a.html",
  );
  assert.equal(
    linkByTitle.get("On the Computational Complexity of Self-Attention"),
    "https://proceedings.mlr.press/v201/duman-keles23a.html",
  );

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

  const topicsTableBody = html.match(/<table\b[^>]*class="[^"]*topics-table[^"]*"[^>]*>[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/i)?.[1];
  assert.ok(topicsTableBody);
  assert.equal((topicsTableBody.match(/<tr\b/gi) ?? []).length, 12);
  const mobileSchedule = html.match(/<ol\b[^>]*class="[^"]*mobile-schedule[^"]*"[^>]*>([\s\S]*?)<\/ol>/i)?.[1];
  assert.ok(mobileSchedule);
  assert.equal((mobileSchedule.match(/<li\b/gi) ?? []).length, 12);
  for (const weekNumber of Array.from({ length: 10 }, (_, index) => index + 1)) {
    assert.equal((html.match(new RegExp(`href="#week-${weekNumber}"`, "g")) ?? []).length, 2);
  }
  assert.doesNotMatch(html, /href="#week-(?:11|12)"/i);

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
