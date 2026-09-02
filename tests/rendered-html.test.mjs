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

  assert.doesNotMatch(html, /class="topic-focus"/i);
  assert.doesNotMatch(text, /Topic focus\./i);

  assert.match(html, /<title>CS 886: Learning Theory for Modern AI (?:--|–|—) Fall 2026<\/title>/i);
  const metadataDescription =
    "Fall 2026 University of Waterloo graduate theory seminar on transformer expressivity, computational complexity, trainability, self-attention learning, in-context learning, and reasoning, with paper presentations and a required research project.";
  const escapedMetadataDescription = metadataDescription.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
  assert.match(
    html,
    new RegExp(`<meta name="description" content="${escapedMetadataDescription}"`, "i"),
  );
  assert.match(
    html,
    new RegExp(`<meta property="og:description" content="${escapedMetadataDescription}"`, "i"),
  );
  assert.match(
    html,
    new RegExp(`<meta name="twitter:description" content="${escapedMetadataDescription}"`, "i"),
  );
  assert.match(
    text,
    /graduate research seminar on the theoretical foundations of transformers and large language models/i,
  );
  assert.match(text, /course begins with an instructor-led case study in exact algorithmic learning, certification, and hardness/i);
  assert.match(
    text,
    /Module I moves from expressivity and computational complexity to trainability and finite-sample learning of attention/i,
  );
  assert.match(
    text,
    /Module IV is devoted to student project presentations/i,
  );
  assert.match(text, /Recommended preparation/i);
  assert.match(text, /algorithms, asymptotic notation/i);
  assert.match(text, /Familiarity with reading proofs is expected/i);
  assert.match(
    text,
    /No textbook is required, and all assigned papers are linked from this website\./i,
  );
  assert.doesNotMatch(text, /Familiarity with reading and writing proofs is expected/i);
  assert.doesNotMatch(text, /at no additional cost/i);
  assert.doesNotMatch(
    text,
    /Submission and feedback instructions will be announced before the first graded deliverable/i,
  );
  assert.match(text, /Note for non-theory students/i);
  assert.match(
    text,
    /The course is open to students without a theory background\. You can still gain substantial insight into how transformers work and use the course project to scrutinize existing theoretical claims through empirical evidence\./i,
  );
  assert.match(text, /Preparatory Background/i);
  for (const title of [
    "Transformer architecture",
    "Algorithms and computational complexity",
    "Statistical learning theory",
  ]) assert.match(text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  assert.match(text, /Kimon Fountoulakis/);
  assert.match(text, /DC 3611/);
  assert.match(text, /Office hours:?\s*To be announced before the first meeting/i);
  assert.match(text, /Location:?\s*To be announced before the first meeting/i);
  assert.match(text, /Course platform:?\s*To be announced before the first graded deliverable/i);
  assert.match(text, /Fridays/);
  assert.match(text, /1:30.{0,3}4:20 p\.m\./i);
  assert.match(text, /Scheduled seminar meetings:?\s*September 11.{0,3}December 4, 2026/i);
  assert.match(text, /University class period:?\s*September 9.{0,3}December 8, 2026/i);
  assert.match(text, /No class on October 16, 2026/i);
  assert.match(text, /Last updated:?\s*September 2, 2026/i);
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
    "Paper Presentations",
    "Required Course Project",
    "Project Milestones and Deadlines",
    "Project Presentation Requirements",
    "Assessment",
    "Use of Generative AI",
    "Suggested Additional Readings and Project Starting Points",
    "University Policies and Supports",
  ]) assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  for (const moduleTitle of [
    "Exact Algorithmic Learning, Certification, and Hardness",
    "Transformer Capacity, Computation, and Learning",
    "Theory of In-Context Learning",
    "Theory of Reasoning",
    "Projects",
  ]) assert.match(text, new RegExp(moduleTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  for (const moduleDescription of [
    "A motivating case study contrasting exact learning of discrete algorithms with statistical-query and certification hardness.",
    "From representational power and formal limitations to computational resources, trainability, and finite-sample learning of attention.",
    "Statistical targets and benchmarks, optimization and training dynamics, and finite-sample generalization with optimal rates.",
    "Learning with autoregressive reasoning traces, followed by scratchpads, curricula, self-training, and length extrapolation.",
  ]) assert.match(text, new RegExp(moduleDescription.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  assert.doesNotMatch(
    text,
    /Thematically organized project presentations culminating in a synthesis of results, recurring assumptions, barriers, and open problems/i,
  );
  assert.equal((html.match(/class="schedule-module-row"/g) ?? []).length, 5);
  assert.equal((html.match(/class="mobile-schedule-module"/g) ?? []).length, 5);
  assert.equal((html.match(/class="detailed-module"/g) ?? []).length, 4);

  assert.match(text, /Week 1 is instructor-led: the instructor will present all four papers/i);
  assert.doesNotMatch(text, /does not count toward students' presentation workload/i);
  assert.match(text, /Student paper presentations run from Week 2 through Week 10/i);
  assert.match(text, /with 3 individual paper presentations each week/i);
  assert.match(text, /meeting format below applies to the student-led meetings in Weeks 2.{0,3}10/i);
  assert.doesNotMatch(text, /Each reading meeting includes four paper presentations and ends with a cross-paper synthesis/i);
  assert.match(
    text,
    /Each of the 27 students will give 1 individual paper presentation/i,
  );
  assert.match(text, /The 27 student presentation slots match the enrollment exactly/i);
  assert.doesNotMatch(
    text,
    /one solo presentation|one shared presentation|25 papers will have a solo presenter|presented by pairs|teams of three|Students sharing a paper divide|these two paper presentations|solo and shared presentations|Exact paper assignments will be announced/i,
  );
  assert.doesNotMatch(text, /Depending on enrollment and assignments|two or three of those papers|instructor overview, a structured comparison, or a focused group discussion/i);
  assert.doesNotMatch(text, /A missed presentation with an approved reason/i);
  assert.doesNotMatch(text, /Extensions should be arranged before the deadline whenever possible|Approved accommodations and University procedures supersede this default policy/i);
  assert.doesNotMatch(
    text,
    /Biases and Optimization of Self-Attention|The Lipschitz Constant of Self-Attention|The Implicit Bias of Gradient Descent on Separable Data/i,
  );
  assert.match(text, /Student-Presentation Meeting Format/i);
  assert.doesNotMatch(text, /Instructor framing/i);
  assert.doesNotMatch(text, /Cross-paper conclusion/i);
  assert.match(text, /35-minute presentation/i);
  assert.match(text, /14 minutes of discussion and questions/i);
  assert.match(text, /1-minute transition/i);
  assert.match(text, /20 minutes\s*:?\s*Break/i);
  assert.doesNotMatch(text, /12 minutes\s*:?\s*Cross-paper synthesis/i);
  assert.doesNotMatch(text, /Cross-paper synthesis/i);
  assert.doesNotMatch(text, /Weekly Cross-Paper Synthesis/i);
  assert.doesNotMatch(text, /What conclusion can be drawn only after considering all four papers together/i);
  assert.match(text, /State the formal problem, including the data-generating process/i);
  assert.doesNotMatch(text, /comparison slide prepared for the weekly synthesis/i);
  assert.doesNotMatch(text, /30-minute presentation/i);
  assert.doesNotMatch(text, /12 minutes\s*:?\s*discussion and questions/i);
  assert.doesNotMatch(text, /designated discussant|lead presentation|lead presenter|complete presentation slot/i);
  assert.match(text, /27 individual project presentations/i);
  assert.match(text, /Week 11 will have 14 presentations, and Week 12 will have 13/i);
  assert.match(text, /Presentations will be approximately 12.{0,3}13 minutes, including questions/i);
  assert.doesNotMatch(text, /Timing will be strict/i);
  assert.match(text, /The project presentation does not count toward the required paper presentation/i);
  assert.doesNotMatch(text, /The final meeting reserves 14 minutes for course synthesis and open problems/i);
  assert.doesNotMatch(text, /Presentation Order and Themes/i);
  assert.doesNotMatch(
    text,
    /Presentations will be ordered thematically rather than alphabetically, randomly, by sign-up time, or by perceived project quality/i,
  );
  assert.doesNotMatch(text, /The final 14 minutes of Week 12 will synthesize/i);
  assert.match(text, /November 26, 2026/);
  assert.match(text, /Project topic approval/i);
  assert.match(text, /October 23, 2026/);
  assert.match(text, /ungraded three-to-five-sentence description/i);
  assert.match(text, /November 27 or December 4, 2026/i);
  assert.doesNotMatch(text, /Late Work, Missed Work, and Extensions/i);
  assert.doesNotMatch(text, /48-hour grace period/i);
  assert.doesNotMatch(text, /approved missed paper or project presentation will be rescheduled or replaced/i);
  assert.doesNotMatch(text, /unapproved missed presentation normally receives a grade of zero/i);
  assert.doesNotMatch(text, /does not apply to scheduled live paper or project presentations/i);
  assert.doesNotMatch(text, /project-report grade is reduced/i);
  assert.doesNotMatch(text, /(?:five|5) percentage points for each additional 24-hour period/i);
  assert.match(text, /Generative-AI tools may be used for coursework in this class\./i);
  assert.doesNotMatch(text, /unless an assignment states otherwise/i);
  assert.doesNotMatch(text, /documented, cited, or acknowledged/i);
  assert.match(text, /fully responsible for the accuracy, originality, and integrity/i);
  assert.doesNotMatch(text, /retain relevant prompts, notes, sources, research records, and intermediate drafts/i);
  assert.doesNotMatch(text, /confidential, private, unpublished/i);
  assert.doesNotMatch(text, /may be addressed under Policy 71/i);
  assert.doesNotMatch(text, /will result in less marks/i);
  assert.match(text, /one paper presentation \(40%\), the required course project \(40%\), and class participation \(20%\)/i);
  assert.doesNotMatch(html, /<table\b[^>]*class="assessment-table"/i);
  assert.doesNotMatch(html, /<h3>Participation<\/h3>/i);
  assert.doesNotMatch(text, /attendance alone is not sufficient/i);
  assert.doesNotMatch(text, /Approved absences will not by themselves reduce the participation grade/i);
  assert.doesNotMatch(text, /Projects are individual by default/i);
  assert.match(text, /For empirical projects, reproducible code and configurations\./i);
  assert.doesNotMatch(text, /clear account of the experimental protocol/i);
  assert.doesNotMatch(text, /Every project must identify at least one course paper, theorem, formal model, or module/i);
  assert.match(text, /The project may stress-test or challenge an existing theoretical claim/i);
  assert.doesNotMatch(text, /The project may reproduce, verify, stress-test, or challenge/i);
  assert.doesNotMatch(text, /An empirical project must be hypothesis-driven and anchored/i);
  assert.match(text, /A project from a previous offering of CS 886 was subsequently developed into a NeurIPS 2024 publication/i);
  assert.match(text, /Project Presentations I/i);
  assert.match(text, /Project Presentations II/i);
  assert.doesNotMatch(text, /Foundations, Architecture, and Learning/i);
  assert.doesNotMatch(text, /In-Context Learning, Reasoning, and Open Problems/i);
  assert.doesNotMatch(
    text,
    /What do the projects establish about exact learning, expressivity, computational complexity, trainability, and self-attention learning/i,
  );
  assert.doesNotMatch(
    text,
    /The meeting presents a recent research program on exact algorithmic learning, certification, and hardness/i,
  );
  assert.doesNotMatch(
    text,
    /NTK-based exact learning of arithmetic and graph algorithms, statistical-query hardness for semiautomata, and certification lower bounds under minimal overparameterization/i,
  );
  assert.match(text, /paper's result type and its decisive assumption/i);
  assert.match(text, /not expected to read every technical detail in the appendix/i);
  assert.doesNotMatch(text, /one connection or tension with another paper assigned that week/i);
  assert.doesNotMatch(text, /technical appendix of all four weekly papers/i);
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
    /Why does self-attention favor sparse dependencies, and how does gradient descent select and learn task-relevant tokens/i,
  );
  assert.match(text, /Part I: Statistical learnability and implicit bias/i);
  assert.match(text, /Part II: Provable token-selection learning and length generalization/i);
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
    "Computational Expressivity, Formal Languages, and Circuit Classes",
    "Parallel and Fine-Grained Complexity of Transformers",
    "Transformer Trainability: Normalization, Depth, and Rank Collapse",
  ]) assert.match(text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  for (const heading of [
    "Part I: Exact execution learned from examples",
    "Part II: Hardness of exact learning and certification",
    "Part I: Normalization and depth-induced rank collapse",
    "Part II: Gradient consequences and residual scaling",
    "Part I: Computational universality and exact language characterization",
    "Part II: Finite-precision circuit upper bounds",
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
    "Bayesian and Frequentist Foundations of In-Context Prediction",
    "Optimization and Training Dynamics of In-Context Learning",
    "Finite-Sample Generalization and Minimax Optimality of In-Context Learning",
    "Sample Complexity of Autoregressive Chain-of-Thought",
    "Curricula, Scratchpads, and Length Generalization for Reasoning",
  ]) assert.match(text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  for (const heading of [
    "Part I: Bayesian interpretation and information-theoretic rates",
    "Part II: Frequentist consistency",
    "Part I: One-step population optima and training",
    "Part II: Multi-step learned optimization",
    "Part I: Finite-sample learnability and stability",
    "Part II: Minimax nonparametric rates",
    "Part I: General framework and tight capacity bounds",
    "Part II: Sample-efficiency gains from sparse reasoning traces",
    "Part I: Learning barriers and easy-to-hard curriculum",
    "Part II: Self-training and length generalization",
  ]) assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

  assert.match(
    text,
    /When does next-token pretraining approximate Bayesian inference/i,
  );
  assert.match(text, /Connection to the previous week\./i);
  assert.equal((html.match(/class="week-connection"/gi) ?? []).length, 9);
  assert.match(text, /Week 2 steps back to ask what transformer architectures can compute at all/i);
  assert.match(text, /Week 3 asks what depth, parallel communication, and running time are required/i);
  assert.match(text, /Efficiently representable transformer computations are useful only if training remains stable/i);
  assert.match(text, /Stable signals and gradients do not guarantee that training discovers task-relevant structure/i);
  assert.match(text, /Week 8 turns from optimization to finite-sample learnability/i);
  assert.match(text, /Revisiting Week 5's sparse-dependence theme/i);
  assert.match(text, /returning to Week 1's contrast between structured positive results and learning hardness/i);
  assert.match(text, /Why exact or approximate attention can require quadratic time/i);
  assert.doesNotMatch(
    text,
    /Learnability and Inductive Bias of Self-Attention|Bayesian and Statistical Foundations of In-Context Learning/i,
  );
  assert.doesNotMatch(
    text,
    /Theoretical Foundations of Transformer Trainability: Initialization, Width, and Depth|Statistical Foundations of Pretrained In-Context Prediction|Generalization, Learnability, and Minimax Theory of In-Context Learning/i,
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
  for (const heading of [
    "Transformer Architecture, Expressivity, and Computation",
    "Attention, Memory, and In-Context-Learning Mechanisms",
    "Reasoning and Autoregressive Limitations",
    "Fine-Tuning, Preference Learning, and Exploration",
    "Reliability, Hallucination, and Provenance",
  ]) assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  assert.match(text, /This website is a companion to the official University of Waterloo course outline/i);
  assert.match(text, /official University of Waterloo course outline is the authoritative source/i);
  assert.match(text, /official course-outline link will be added before the first meeting/i);
  assert.doesNotMatch(text, /Official course outline:\s*TBA/i);
  assert.doesNotMatch(text, /through TBA/i);
  assert.doesNotMatch(
    text,
    /Memory and Bayesian Theories of In-Context Learning|In-Context Learning as Optimization|Generalization and Algorithm Selection in In-Context Learning|Optimal In-Context Learning and Chain-of-Thought Theory|Reasoning Generalization and Misspecified Next-Token Prediction/i,
  );

  assert.doesNotMatch(html, /TODO_INSTRUCTOR_/i);
  assert.doesNotMatch(text, /Assignment Screening|assignment-screening|automated screening software/i);
  assert.doesNotMatch(text, /45 minutes, including questions|one or two paper presentations|40 scheduled paper slots|approximately 25 individual project presentations|final two three-hour meetings|22 solo presentation slots|14 co-presented slots|9 × 4|25 × 2|8 × 2|two 170-minute meetings provide|presentations use 325 minutes|meeting uses 156 minutes/i);
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
    additionalReadingGroups, additionalReadings, assessmentSummary,
    courseDescription, courseFacts, courseModules, courseProject, courseSchedule, courseSummary,
    generativeAiPolicy, learningOutcomes, navigationItems, paperPresentationPlan,
    pendingLogistics, presentationRequirements, presentationWorkload,
    projectDeadlines, projectPresentation, projectPresentationPlan, projectPresentationSchedule,
    readingExpectations, universityPolicies,
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
      [2, "Computational Expressivity, Formal Languages, and Circuit Classes"],
      [3, "Parallel and Fine-Grained Complexity of Transformers"],
      [4, "Transformer Trainability: Normalization, Depth, and Rank Collapse"],
      [5, "Sparse Structure and Token Selection in Self-Attention"],
    ],
  );
  assert.match(courseSchedule[0].guidingQuestion, /behavioral certification provably hard/i);
  assert.match(
    courseSchedule[1].guidingQuestion,
    /Turing completeness coexist with exact formal-language and circuit upper bounds/i,
  );
  assert.match(courseSchedule[1].guidingQuestion, /depth, precision, masking, recurrence, and positional information/i);
  assert.match(courseSchedule[2].guidingQuestion, /depth, parallel communication, entry magnitudes/i);
  assert.match(courseSchedule[3].guidingQuestion, /layer normalization, residual structure, and depth/i);
  assert.match(courseSchedule[3].guidingQuestion, /initialization and during early training/i);
  assert.match(courseSchedule[4].guidingQuestion, /favor sparse dependencies/i);
  assert.deepEqual(
    courseSchedule.slice(5, 10).map(({ week, title }) => [week, title]),
    [
      [6, "Bayesian and Frequentist Foundations of In-Context Prediction"],
      [7, "Optimization and Training Dynamics of In-Context Learning"],
      [8, "Finite-Sample Generalization and Minimax Optimality of In-Context Learning"],
      [9, "Sample Complexity of Autoregressive Chain-of-Thought"],
      [10, "Curricula, Scratchpads, and Length Generalization for Reasoning"],
    ],
  );
  assert.match(courseSchedule[5].guidingQuestion, /next-token pretraining approximate Bayesian inference/i);
  assert.match(courseSchedule[5].guidingQuestion, /statistically consistent from a frequentist viewpoint/i);
  assert.match(courseSchedule[6].guidingQuestion, /one-step or multi-step learned optimization rules/i);
  assert.match(courseSchedule[7].guidingQuestion, /how many tasks and prompt examples/i);
  assert.match(courseSchedule[8].guidingQuestion, /observed or latent reasoning traces/i);
  assert.match(courseSchedule[9].guidingQuestion, /curriculum design, and self-training/i);
  assert.equal(courseSchedule[0].papers.length, 4);
  assert.ok(courseSchedule.slice(1, 10).every((week) => week.papers.length === 3));
  assert.ok(courseSchedule.slice(10).every((week) => week.papers.length === 0));
  assert.equal(courseSchedule.slice(1, 10).flatMap((week) => week.papers).length, 27);
  assert.equal(scheduledPapers.length, 31);
  assert.equal(additionalReadings.length, 31);
  assert.equal(allPapers.length, 62);
  assert.equal(new Set(allPapers.map((paper) => paper.title)).size, 62);
  assert.equal(new Set(allPapers.map((paper) => paper.link)).size, 62);

  assert.equal(additionalReadingGroups.length, 5);
  assert.deepEqual(
    additionalReadingGroups.map(({ id, title }) => [id, title]),
    [
      [
        "architecture-expressivity-computation",
        "Transformer Architecture, Expressivity, and Computation",
      ],
      [
        "attention-memory-icl-mechanisms",
        "Attention, Memory, and In-Context-Learning Mechanisms",
      ],
      [
        "reasoning-autoregressive-limitations",
        "Reasoning and Autoregressive Limitations",
      ],
      [
        "fine-tuning-preferences-exploration",
        "Fine-Tuning, Preference Learning, and Exploration",
      ],
      [
        "reliability-hallucination-provenance",
        "Reliability, Hallucination, and Provenance",
      ],
    ],
  );
  const groupedAdditionalTitles = additionalReadingGroups.flatMap(
    ({ paperTitles }) => paperTitles,
  );
  const actualAdditionalTitles = additionalReadings.map(({ title }) => title);
  assert.equal(groupedAdditionalTitles.length, 31);
  assert.equal(new Set(groupedAdditionalTitles).size, 31);
  assert.deepEqual(
    [...groupedAdditionalTitles].sort(),
    [...actualAdditionalTitles].sort(),
  );
  const additionalGroupCountById = new Map(
    additionalReadingGroups.map(({ id, paperTitles }) => [id, paperTitles.length]),
  );
  assert.equal(additionalGroupCountById.get("architecture-expressivity-computation"), 8);
  assert.equal(additionalGroupCountById.get("attention-memory-icl-mechanisms"), 11);
  assert.equal(additionalGroupCountById.get("reasoning-autoregressive-limitations"), 4);
  assert.equal(additionalGroupCountById.get("fine-tuning-preferences-exploration"), 6);
  assert.equal(additionalGroupCountById.get("reliability-hallucination-provenance"), 2);

  assert.match(
    courseSummary,
    /transformer representation, computation, trainability, self-attention learning, in-context learning, and reasoning/i,
  );
  assert.equal(courseDescription.preparatoryBackground.length, 3);
  assert.deepEqual(
    courseDescription.preparatoryBackground.map(({ title }) => title),
    [
      "Transformer architecture",
      "Algorithms and computational complexity",
      "Statistical learning theory",
    ],
  );
  assert.match(courseDescription.recommendedBackground, /algorithms, asymptotic notation/i);
  assert.match(courseDescription.recommendedBackground, /reading proofs is expected/i);
  assert.doesNotMatch(courseDescription.recommendedBackground, /reading and writing proofs/i);
  assert.equal(
    courseDescription.nonTheoryStudents,
    "The course is open to students without a theory background. You can still gain substantial insight into how transformers work and use the course project to scrutinize existing theoretical claims through empirical evidence.",
  );
  assert.match(
    courseDescription.officialOutlineNotice,
    /official University of Waterloo course outline is the authoritative source/i,
  );
  assert.match(courseDescription.pendingOfficialOutlineNotice, /added before the first meeting/i);
  assert.match(pendingLogistics.officeHours, /before the first meeting/i);
  assert.match(pendingLogistics.meetingLocation, /before the first meeting/i);
  assert.match(pendingLogistics.coursePlatform, /before the first graded deliverable/i);
  if (courseFacts.coursePlatform === "TBA") {
    assert.equal(
      courseDescription.requiredMaterials,
      "No textbook is required, and all assigned papers are linked from this website.",
    );
    assert.doesNotMatch(courseDescription.requiredMaterials, /through TBA/i);
    assert.doesNotMatch(courseDescription.requiredMaterials, /at no additional cost/i);
    assert.doesNotMatch(courseDescription.requiredMaterials, /Submission and feedback instructions/i);
  }
  assert.equal(
    courseDescription.preparatoryBackground.find(
      ({ title }) => title === "Algorithms and computational complexity",
    ).description,
    "Asymptotic notation, reductions, randomized and conditional lower bounds, circuit classes such as AC0 and TC0, communication or parallel models.",
  );

  assert.equal(learningOutcomes.length, 7);
  assert.match(learningOutcomes[0], /certification claims/i);
  assert.match(learningOutcomes[1], /precision, conditioning, and task complexity/i);
  assert.match(learningOutcomes[2], /apparently conflicting theoretical conclusions/i);
  assert.match(learningOutcomes[3], /circuit and communication reductions/i);
  assert.match(learningOutcomes[4], /omitted features/i);
  assert.match(learningOutcomes[5], /reproducible empirical investigation/i);
  assert.match(learningOutcomes[6], /synthesize multiple papers/i);
  assert.match(readingExpectations, /paper's result type/i);
  assert.match(readingExpectations, /decisive assumption/i);
  assert.match(readingExpectations, /supplementary material/i);
  assert.match(readingExpectations, /technical detail in the appendix/i);
  assert.doesNotMatch(readingExpectations, /one connection or tension/i);
  assert.doesNotMatch(readingExpectations, /technical appendix of all four weekly papers/i);

  assert.equal(presentationRequirements.length, 8);
  assert.match(presentationRequirements[0], /formal problem/i);
  assert.match(presentationRequirements[1], /certification/i);
  assert.match(presentationRequirements[2], /quantifiers/i);
  assert.match(presentationRequirements[3], /proof mechanism/i);
  assert.match(presentationRequirements[4], /modern transformer or large language model/i);
  assert.match(presentationRequirements[5], /experimental evidence, conjectures/i);
  assert.match(presentationRequirements[6], /assumptions of the adjacent papers/i);
  assert.doesNotMatch(presentationRequirements[6], /weekly synthesis|comparison slide/i);
  assert.match(presentationRequirements[7], /one precise limitation/i);
  assert.equal(
    presentationWorkload,
    "Each of the 27 students will give 1 individual paper presentation. The 27 student presentation slots match the enrollment exactly. The required project presentation is separate and does not count toward this paper presentation.",
  );

  assert.deepEqual(
    courseModules.map(({ id, label, title, weekNumbers }) => ({
      id,
      label,
      title,
      weekNumbers: [...weekNumbers],
    })),
    [
      {
        id: "opening-case-study",
        label: "Instructor-led opening case study",
        title: "Exact Algorithmic Learning, Certification, and Hardness",
        weekNumbers: [1],
      },
      {
        id: "transformer-foundations",
        label: "Module I",
        title: "Transformer Capacity, Computation, and Learning",
        weekNumbers: [2, 3, 4, 5],
      },
      {
        id: "in-context-learning",
        label: "Module II",
        title: "Theory of In-Context Learning",
        weekNumbers: [6, 7, 8],
      },
      {
        id: "reasoning",
        label: "Module III",
        title: "Theory of Reasoning",
        weekNumbers: [9, 10],
      },
      {
        id: "projects",
        label: "Module IV",
        title: "Projects",
        weekNumbers: [11, 12],
      },
    ],
  );
  const moduleWeekNumbers = courseModules.flatMap((module) => module.weekNumbers);
  assert.deepEqual(moduleWeekNumbers, Array.from({ length: 12 }, (_, index) => index + 1));
  assert.equal(new Set(moduleWeekNumbers).size, 12);
  assert.equal(new Set(courseModules.map(({ id }) => id)).size, courseModules.length);
  assert.ok(courseModules.slice(0, -1).every(({ description }) => description.length > 0));
  assert.equal(courseModules.at(-1).description, undefined);
  assert.ok(courseSchedule.every((week) => !("module" in week)));

  const openingModule = courseModules.find(({ id }) => id === "opening-case-study");
  assert.equal(
    openingModule.title,
    "Exact Algorithmic Learning, Certification, and Hardness",
  );

  assert.equal(
    assessmentSummary,
    "The final grade consists of one paper presentation (40%), the required course project (40%), and class participation (20%).",
  );
  assert.equal("assessment" in data, false);
  assert.equal("participationPolicy" in data, false);

  assert.equal(projectDeadlines.length, 3);
  assert.deepEqual(
    projectDeadlines.map(({ milestone, deadline }) => [milestone, deadline]),
    [
      ["Project topic approval", "October 23, 2026"],
      [
        "Final project report and reproducibility materials",
        "November 26, 2026",
      ],
      ["Final project presentation", "November 27 or December 4, 2026"],
    ],
  );
  assert.match(projectDeadlines[0].description, /ungraded three-to-five-sentence description/i);
  assert.doesNotMatch(projectDeadlines[0].description, /course paper, theorem, formal model, or module that anchors/i);
  assert.match(projectDeadlines[1].description, /worth 30%/i);
  assert.match(projectDeadlines[2].description, /worth 10%/i);

  assert.doesNotMatch(
    courseProject.introduction,
    /30% for the final report|10% for the final presentation/i,
  );
  assert.doesNotMatch(courseProject.introduction, /classify the contribution as primarily/i);
  assert.doesNotMatch(
    courseProject.introduction,
    /Every project must identify at least one course paper, theorem, formal model, or module/i,
  );
  assert.equal(
    courseProject.acceptableForms.find(({ title }) => title === "Empirical validation or scrutiny of theory").description,
    "The project may stress-test or challenge an existing theoretical claim.",
  );
  assert.equal(
    courseProject.empiricalStandard,
    "A generic model comparison, benchmark leaderboard, prompt-engineering exercise, or systems implementation is not sufficient by itself.",
  );
  assert.match(
    courseProject.evaluationCriteria[0],
    /representation, computational complexity, trainability, optimization, learnability, generalization, certification, or reasoning/i,
  );
  assert.equal("lateWorkPolicy" in data, false);
  assert.equal("groupWorkPolicy" in courseProject, false);
  assert.equal(courseProject.deliverables[1], "For empirical projects, reproducible code and configurations.");
  assert.doesNotMatch(JSON.stringify(courseProject), /clear account of the experimental protocol/i);
  assert.equal(generativeAiPolicy.length, 2);
  assert.equal(generativeAiPolicy[0], "Generative-AI tools may be used for coursework in this class.");
  assert.match(
    generativeAiPolicy[1],
    /fully responsible for the accuracy, originality, and integrity/i,
  );
  assert.match(generativeAiPolicy[1], /graded as errors regardless of whether AI was used/i);
  assert.doesNotMatch(JSON.stringify(generativeAiPolicy), /unless an assignment states otherwise/i);
  assert.doesNotMatch(JSON.stringify(generativeAiPolicy), /documented, cited, or acknowledged/i);
  assert.doesNotMatch(JSON.stringify(generativeAiPolicy), /retain relevant prompts, notes, sources/i);
  assert.doesNotMatch(JSON.stringify(generativeAiPolicy), /confidential, private, unpublished/i);
  assert.doesNotMatch(JSON.stringify(generativeAiPolicy), /Policy 71/i);
  assert.match(
    universityPolicies.introduction,
    /This website is a companion to the official University of Waterloo course outline/i,
  );
  assert.match(universityPolicies.pendingOfficialOutlineText, /added before the first meeting/i);
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
    ["Overview", "#overview"], ["Outcomes", "#learning-outcomes"], ["Schedule", "#schedule"],
    ["Presentations", "#paper-presentations"], ["Project", "#project"],
    ["Assessment", "#assessment"], ["Additional Readings", "#additional-readings"],
    ["Policies", "#policies"],
  ]);
  assert.equal(projectPresentationSchedule.title, "Project Presentations");
  assert.equal("centralQuestion" in projectPresentationSchedule, false);
  assert.equal(courseFacts.meetingCount, 12);
  assert.equal(courseFacts.scheduledPapersPerMeeting, 3);
  assert.equal(courseFacts.meetingTime, "1:30–4:20 p.m.");
  assert.equal(courseFacts.meetingDurationMinutes, 170);
  assert.equal(courseFacts.plannedEnrollment, 27);
  assert.equal(courseFacts.expectedProjectPresentations, 27);
  assert.equal(courseFacts.lastUpdated, "September 2, 2026");
  for (const key of ["officeHours", "meetingLocation", "coursePlatform", "officialOutlineUrl"]) assert.equal(courseFacts[key], "TBA");

  assert.equal(paperPresentationPlan.plannedEnrollment, 27);
  assert.equal(paperPresentationPlan.instructorLedWeek, 1);
  assert.equal(paperPresentationPlan.firstStudentPresentationWeek, 2);
  assert.equal(paperPresentationPlan.lastStudentPresentationWeek, 10);
  assert.equal(paperPresentationPlan.studentPaperMeetingCount, 9);
  assert.equal(paperPresentationPlan.papersPerMeeting, 3);
  assert.equal(paperPresentationPlan.studentPaperPresentationSlots, 27);
  assert.equal(paperPresentationPlan.paperPresentationsPerStudent, 1);
  assert.equal(paperPresentationPlan.studentPaperPresentationAssignments, 27);
  assert.equal(
    paperPresentationPlan.studentPaperPresentationSlots,
    paperPresentationPlan.studentPaperPresentationAssignments,
  );
  for (const removedField of [
    "minimumPaperPresentationsPerStudent",
    "soloPaperPresentationSlots",
    "sharedPaperPresentationSlots",
    "sharedPaperPresentationAssignments",
    "pairedPaperPresentationSlots",
    "threePersonPaperPresentationSlots",
  ]) assert.equal(removedField in paperPresentationPlan, false);
  assert.equal("openingFramingMinutes" in paperPresentationPlan, false);
  assert.equal(paperPresentationPlan.paperPresentationMinutes, 35);
  assert.equal(paperPresentationPlan.paperDiscussionMinutes, 14);
  assert.equal(paperPresentationPlan.paperTransitionMinutes, 1);
  assert.equal(paperPresentationPlan.paperSlotMinutes, 50);
  assert.equal(
    paperPresentationPlan.paperSlotMinutes,
    paperPresentationPlan.paperPresentationMinutes
      + paperPresentationPlan.paperDiscussionMinutes
      + paperPresentationPlan.paperTransitionMinutes,
  );
  assert.equal("papersPerHalf" in paperPresentationPlan, false);
  assert.equal("halfMeetingPaperMinutes" in paperPresentationPlan, false);
  assert.equal(paperPresentationPlan.papersBeforeBreak, 2);
  assert.equal(paperPresentationPlan.papersAfterBreak, 1);
  assert.equal(paperPresentationPlan.firstPaperBlockMinutes, 100);
  assert.equal(paperPresentationPlan.secondPaperBlockMinutes, 50);
  assert.equal(
    paperPresentationPlan.firstPaperBlockMinutes,
    paperPresentationPlan.papersBeforeBreak * paperPresentationPlan.paperSlotMinutes,
  );
  assert.equal(
    paperPresentationPlan.secondPaperBlockMinutes,
    paperPresentationPlan.papersAfterBreak * paperPresentationPlan.paperSlotMinutes,
  );
  assert.equal(paperPresentationPlan.midMeetingBreakMinutes, 20);
  assert.equal("weeklySynthesisMinutes" in paperPresentationPlan, false);
  assert.equal(paperPresentationPlan.scheduledPaperMinutesPerMeeting, 150);
  assert.equal(
    paperPresentationPlan.scheduledPaperMinutesPerMeeting,
    paperPresentationPlan.papersPerMeeting * paperPresentationPlan.paperSlotMinutes,
  );
  assert.equal(paperPresentationPlan.totalPlannedMeetingMinutes, 170);
  assert.equal(
    paperPresentationPlan.totalPlannedMeetingMinutes,
    paperPresentationPlan.firstPaperBlockMinutes
      + paperPresentationPlan.midMeetingBreakMinutes
      + paperPresentationPlan.secondPaperBlockMinutes,
  );
  assert.equal(paperPresentationPlan.totalPlannedMeetingMinutes, courseFacts.meetingDurationMinutes);

  assert.equal(projectPresentationPlan.presentationCount, 27);
  assert.equal(projectPresentationPlan.meetingCount, 2);
  assert.deepEqual([...projectPresentationPlan.presentationsByMeeting], [14, 13]);
  assert.deepEqual([...projectPresentationPlan.minutesPerPresentationByMeeting], [12, 13]);
  assert.deepEqual([...projectPresentationPlan.usedMinutesByMeeting], [168, 169]);
  assert.deepEqual([...projectPresentationPlan.bufferMinutesByMeeting], [2, 1]);
  assert.equal(projectPresentationPlan.totalPresentationMinutes, 337);
  assert.equal(projectPresentationPlan.totalAvailableMinutes, 340);
  assert.equal(projectPresentationPlan.remainingMinutes, 3);
  for (const removedField of [
    "talkMinutes",
    "questionMinutes",
    "transitionMinutes",
    "minutesPerPresentation",
    "finalSynthesisMinutes",
  ]) assert.equal(removedField in projectPresentationPlan, false);
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
  assert.equal(firstWeek.topicFocus, undefined);
  assert.equal(firstWeek.presentationNote, undefined);
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
    "Transformers, Parallel Computation, and Logarithmic Depth",
    "An Information-Theoretic Analysis of In-Context Learning",
    "Can Looped Transformers Learn to Implement Multi-step Gradient Descent for In-context Learning?",
    "From Sparse Dependence to Sparse Attention: Unveiling How Chain-of-Thought Enhances Transformer Sample Efficiency",
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
  const movedFromRequiredToAdditional = [
    "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
    "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
    "Infinite Attention: NNGP and NTK for Deep Attention Networks",
    "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
    "Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining",
    "In-Context Convergence of Transformers",
    "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
    "Training Nonlinear Transformers for Chain-of-Thought Inference: A Theoretical Generalization Analysis",
    "Learning to Reason with Curriculum I: Provable Benefits of Autocurriculum",
  ];
  const scheduledTitleSet = new Set(scheduledTitles);
  const additionalTitleSet = new Set(additionalTitles);

  const additionalByTitle = new Map(additionalReadings.map((paper) => [paper.title, paper]));
  assert.match(
    additionalByTitle.get("Improving Transformer Optimization Through Better Initialization").presentationFocus,
    /background for Week 4/i,
  );
  assert.match(
    additionalByTitle.get("Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models").presentationFocus,
    /complements Week 4's theorem-centered core/i,
  );
  assert.match(
    additionalByTitle.get("Theoretical Limitations of Self-Attention in Neural Sequence Models").presentationFocus,
    /supports Week 2/i,
  );

  for (const title of newlyRequiredTitles) {
    assert.equal(scheduledTitleSet.has(title), true, `${title} must be a scheduled paper`);
    assert.equal(additionalTitleSet.has(title), false, `${title} must not be duplicated in additional readings`);
  }
  for (const title of movedToAdditionalTitles) {
    assert.equal(scheduledTitleSet.has(title), false, `${title} must not remain in the required schedule`);
    assert.equal(additionalTitleSet.has(title), true, `${title} must be retained as an additional reading`);
  }
  for (const title of movedFromRequiredToAdditional) {
    assert.equal(scheduledTitleSet.has(title), false, `${title} must not remain in the required schedule`);
    assert.equal(additionalTitleSet.has(title), true, `${title} must be retained in Additional Readings`);
    assert.equal(
      additionalTitles.filter((candidate) => candidate === title).length,
      1,
      `${title} must appear exactly once in Additional Readings`,
    );
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
  assert.equal(
    new Set(
      courseSchedule[0].subtopics.flatMap((subtopic) => subtopic.paperTitles),
    ).size,
    4,
  );
  for (const week of courseSchedule.slice(1, 10)) {
    assert.equal(week.subtopics.length, 2);
    assert.equal(
      new Set(week.subtopics.flatMap((subtopic) => subtopic.paperTitles)).size,
      3,
    );
  }
  const weekTwo = courseSchedule.find(({ week }) => week === 2);
  assert.deepEqual(weekTwo.papers.map((paper) => paper.title), [
    "Attention Is Turing Complete",
    "Masked Hard-Attention Transformers Recognize Exactly the Star-Free Languages",
    "Saturated Transformers Are Constant-Depth Threshold Circuits",
  ]);
  assert.match(weekTwo.guidingQuestion, /Turing completeness coexist with exact formal-language and circuit upper bounds/i);
  assert.match(weekTwo.guidingQuestion, /depth, precision, masking, recurrence, and positional information/i);

  const weekThree = courseSchedule.find(({ week }) => week === 3);
  assert.deepEqual(weekThree.papers.map((paper) => paper.title), [
    "Transformers, Parallel Computation, and Logarithmic Depth",
    "On the Computational Complexity of Self-Attention",
    "Fast Attention Requires Bounded Entries",
  ]);
  assert.match(weekThree.topicFocus, /Massively Parallel Computation/i);
  assert.match(weekThree.topicFocus, /SETH-based lower bounds/i);
  assert.doesNotMatch(weekThree.topicFocus, /automata shortcuts|programmable looped computation|RASP/i);
  assert.match(weekThree.subtopics[0].description, /transformer layers correspond to Massively Parallel Computation rounds/i);
  assert.match(weekThree.subtopics[1].description, /exact or approximate attention can require quadratic time/i);
  assert.match(weekThree.subtopics[1].description, /bounded entries produce a sharp transition/i);

  const weekFour = courseSchedule.find(({ week }) => week === 4);
  assert.deepEqual(weekFour.papers.map((paper) => paper.title), [
    "On Layer Normalization in the Transformer Architecture",
    "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
    "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
  ]);
  assert.equal(weekFour.title, "Transformer Trainability: Normalization, Depth, and Rank Collapse");
  assert.match(weekFour.topicFocus, /initialization-time gradient scaling/i);
  assert.match(weekFour.topicFocus, /depth-induced token uniformity/i);
  assert.match(weekFour.topicFocus, /vanishing query and key gradients/i);
  assert.equal(weekFour.subtopics[0].title, "Part I: Normalization and depth-induced rank collapse");
  assert.equal(weekFour.subtopics[1].title, "Part II: Gradient consequences and residual scaling");

  const weekFourTitleSet = new Set(weekFour.papers.map((paper) => paper.title));
  assert.equal(weekFourTitleSet.has("Infinite Attention: NNGP and NTK for Deep Attention Networks"), false);
  assert.equal(
    weekFourTitleSet.has("Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models"),
    false,
  );
  assert.equal(additionalTitleSet.has("Infinite Attention: NNGP and NTK for Deep Attention Networks"), true);
  assert.equal(
    additionalTitleSet.has("Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models"),
    true,
  );

  const additionalByTitleForPlacement = new Map(
    additionalReadings.map((paper) => [paper.title, paper.presentationFocus]),
  );
  assert.match(
    additionalByTitleForPlacement.get("Infinite Attention: NNGP and NTK for Deep Attention Networks"),
    /neural-network Gaussian-process and neural-tangent-kernel limits/i,
  );
  assert.match(
    additionalByTitleForPlacement.get("Infinite Attention: NNGP and NTK for Deep Attention Networks"),
    /single-head attention need not become Gaussian/i,
  );
  assert.match(
    additionalByTitleForPlacement.get("Infinite Attention: NNGP and NTK for Deep Attention Networks"),
    /multi-head attention converges to a Gaussian process/i,
  );

  const weekFive = courseSchedule.find(({ week }) => week === 5);
  assert.equal(weekFive.date, "October 9, 2026");
  assert.equal(weekFive.title, "Sparse Structure and Token Selection in Self-Attention");
  assert.equal(
    weekFive.guidingQuestion,
    "Why does self-attention favor sparse dependencies, and how does gradient descent select and learn task-relevant tokens?",
  );
  assert.equal(
    weekFive.topicFocus,
    "Norm-based sample complexity, implicit max-margin bias, sparse token selection, architectural separation, and out-of-distribution length generalization.",
  );
  assert.deepEqual(weekFive.subtopics.map(({ title, paperTitles }) => ({
    title,
    paperTitles: [...paperTitles],
    })), [
    {
      title: "Part I: Statistical learnability and implicit bias",
      paperTitles: [
        "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
        "Max-Margin Token Selection in Attention Mechanism",
      ],
    },
    {
      title: "Part II: Provable token-selection learning and length generalization",
      paperTitles: [
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
    additionalByTitleForPlacement.get("Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer"),
    /scan-and-snap dynamic/i,
  );
  for (const removedTitle of [
    "Your Transformer May Not Be as Powerful as You Expect",
    "Position Coupling: Improving Length Generalization of Arithmetic Transformers Using Task Structure",
    "Infinite Attention: NNGP and NTK for Deep Attention Networks",
    "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
  ]) assert.ok(!weekFive.papers.some(({ title }) => title === removedTitle));

  const weekSix = courseSchedule.find(({ week }) => week === 6);
  assert.equal(weekSix.title, "Bayesian and Frequentist Foundations of In-Context Prediction");
  assert.match(weekSix.guidingQuestion, /next-token pretraining approximate Bayesian inference/i);
  assert.match(weekSix.guidingQuestion, /statistically consistent from a frequentist viewpoint/i);
  assert.deepEqual(weekSix.papers.map((paper) => paper.title), [
    "An Explanation of In-Context Learning as Implicit Bayesian Inference",
    "An Information-Theoretic Analysis of In-Context Learning",
    "Statistical Foundations of Prior-Data Fitted Networks",
  ]);
  assert.equal(
    weekSix.subtopics[0].title,
    "Part I: Bayesian interpretation and information-theoretic rates",
  );
  assert.equal(
    weekSix.subtopics[1].title,
    "Part II: Frequentist consistency",
  );

  const weekEight = courseSchedule.find(({ week }) => week === 8);
  assert.equal(
    weekEight.title,
    "Finite-Sample Generalization and Minimax Optimality of In-Context Learning",
  );
  assert.match(weekEight.guidingQuestion, /how many tasks and prompt examples/i);
  assert.equal(weekEight.subtopics[0].title, "Part I: Finite-sample learnability and stability");

  const weekNine = courseSchedule.find(({ week }) => week === 9);
  assert.match(weekNine.subtopics[1].description, /Revisiting Week 5's sparse-dependence theme/i);

  const weekTen = courseSchedule.find(({ week }) => week === 10);
  assert.match(
    weekTen.connection,
    /returning to Week 1's contrast between structured positive results and learning hardness/i,
  );

  const expectedConnections = new Map([
    [
      2,
      "Week 1 showed that exact algorithmic behavior can be learned in carefully structured regimes. Week 2 steps back to ask what transformer architectures can compute at all, and why different assumptions yield Turing completeness or severe formal limitations.",
    ],
    [
      3,
      "Week 2 characterized transformer computational expressivity under different architectural and numerical assumptions. Week 3 asks what depth, parallel communication, and running time are required to realize those computations.",
    ],
    [
      4,
      "Efficiently representable transformer computations are useful only if training remains stable. Week 4 studies how normalization, residual structure, and depth govern representations and gradients.",
    ],
    [
      5,
      "Stable signals and gradients do not guarantee that training discovers task-relevant structure. Week 5 studies the statistical and optimization biases that drive attention toward sparse, informative tokens.",
    ],
    [
      6,
      "Week 5 studied how training organizes attention around informative tokens. Week 6 asks what statistical inference procedure emerges when those learned attention mechanisms operate over an entire prompt.",
    ],
    [
      7,
      "Week 6 identified Bayesian and frequentist target descriptions for prompt-conditioned prediction. Week 7 asks whether transformer pretraining reaches such predictors and which optimization dynamics produce them.",
    ],
    [
      8,
      "Week 7 analyzed how training reaches in-context algorithms. Week 8 turns from optimization to finite-sample learnability, task transfer, stability, and minimax rates.",
    ],
    [
      9,
      "Week 8 studied direct prompt-to-prediction generalization. Week 9 asks how the sample and computational complexity of learning change when the model generates intermediate reasoning traces autoregressively.",
    ],
    [
      10,
      "Week 9 established how reasoning traces change sample complexity. Week 10 asks which scratchpads, curricula, and self-training procedures overcome barriers on harder or longer problems, returning to Week 1's contrast between structured positive results and learning hardness.",
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
    "Project Presentations I",
  );
  assert.equal(weekEleven.guidingQuestion, undefined);
  assert.equal(weekEleven.topicFocus, undefined);
  assert.equal(
    weekTwelve.title,
    "Project Presentations II",
  );
  assert.equal(weekTwelve.guidingQuestion, undefined);
  assert.equal(weekTwelve.topicFocus, undefined);
  assert.equal("weekThemes" in projectPresentation, false);
  assert.equal("orderingPrinciple" in projectPresentation, false);
  assert.equal("closingSynthesis" in projectPresentation, false);
  assert.deepEqual(
    courseSchedule.slice(10).map(({ week, date, title }) => [week, date, title]),
    [
      [
        11,
        "November 27, 2026",
        "Project Presentations I",
      ],
      [
        12,
        "December 4, 2026",
        "Project Presentations II",
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
        "Attention Is Turing Complete",
        "Masked Hard-Attention Transformers Recognize Exactly the Star-Free Languages",
        "Saturated Transformers Are Constant-Depth Threshold Circuits",
      ],
    ],
    [
      3,
      [
        "Transformers, Parallel Computation, and Logarithmic Depth",
        "On the Computational Complexity of Self-Attention",
        "Fast Attention Requires Bounded Entries",
      ],
    ],
    [
      4,
      [
        "On Layer Normalization in the Transformer Architecture",
        "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
        "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
      ],
    ],
    [
      5,
      [
        "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
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
      ],
    ],
    [
      7,
      [
        "One Step of Gradient Descent Is Provably the Optimal In-Context Learner with One Layer of Linear Self-Attention",
        "Trained Transformers Learn Linear Models In-Context",
        "Can Looped Transformers Learn to Implement Multi-step Gradient Descent for In-context Learning?",
      ],
    ],
    [
      8,
      [
        "The Learnability of In-Context Learning",
        "Transformers as Algorithms: Generalization and Stability in In-Context Learning",
        "Transformers Are Minimax Optimal Nonparametric In-Context Learners",
      ],
    ],
    [
      9,
      [
        "A Theory of Learning with Autoregressive Chain of Thought",
        "Tight Sample Complexity of Transformers",
        "From Sparse Dependence to Sparse Attention: Unveiling How Chain-of-Thought Enhances Transformer Sample Efficiency",
      ],
    ],
    [
      10,
      [
        "How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad",
        "Learning Compositional Functions with Transformers from Easy-to-Hard Data",
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
  assert.ok(tableHeaders.every((match) => /\bscope="(?:col|row|rowgroup)"/i.test(match[1])));
  const labelledSections = [...html.matchAll(/<section\b[^>]*aria-labelledby="([^"]+)"[^>]*>/gi)];
  assert.ok(labelledSections.length >= 9);
  for (const [, headingId] of labelledSections) assert.ok(ids.includes(headingId));

  assert.doesNotMatch(html, /<table\b[^>]*class="assessment-table"/i);
  assert.doesNotMatch(html, /<h3>Participation<\/h3>/i);

  const generativeAiSection = html.match(
    /<section\b[^>]*id="generative-ai"[^>]*>([\s\S]*?)<\/section>/i,
  )?.[1];
  assert.ok(generativeAiSection);
  assert.equal((generativeAiSection.match(/<p\b/gi) ?? []).length, 2);
  assert.equal(
    (html.match(/<section\b[^>]*class="additional-reading-group"/gi) ?? []).length,
    5,
  );

  assert.match(html, /class="[^"]*schedule-desktop[^"]*"/i);
  assert.match(html, /<ol\b[^>]*class="[^"]*(?:mobile-schedule|schedule-mobile)[^"]*"/i);
  assert.match(html, /class="[^"]*back-to-schedule[^"]*"[^>]*href="#schedule"/i);

  const desktopModuleGroups = [
    ...html.matchAll(/<tbody\b[^>]*class="schedule-module-group"[^>]*>([\s\S]*?)<\/tbody>/gi),
  ].map((match) => match[1]);
  assert.equal(desktopModuleGroups.length, 5);
  assert.deepEqual(
    desktopModuleGroups.map((group) => (group.match(/<tr\b/gi) ?? []).length - 1),
    [1, 4, 3, 2, 2],
  );
  assert.equal(
    desktopModuleGroups.reduce(
      (total, group) => total + (group.match(/<tr\b/gi) ?? []).length - 1,
      0,
    ),
    12,
  );
  assert.ok(
    desktopModuleGroups.every(
      (group) => /class="schedule-module-row"/i.test(group)
        && /scope="rowgroup"/i.test(group)
        && /colspan="4"/i.test(group),
    ),
  );

  const mobileModuleGroups = [
    ...html.matchAll(/<section\b[^>]*class="mobile-schedule-module"[^>]*>([\s\S]*?)<\/section>/gi),
  ].map((match) => match[1]);
  assert.equal(mobileModuleGroups.length, 5);
  assert.deepEqual(
    mobileModuleGroups.map((group) => (group.match(/<li\b/gi) ?? []).length),
    [1, 4, 3, 2, 2],
  );
  assert.equal(
    mobileModuleGroups.reduce((total, group) => total + (group.match(/<li\b/gi) ?? []).length, 0),
    12,
  );

  const detailedModuleGroups = [
    ...html.matchAll(/<section\b[^>]*class="detailed-module"[^>]*>([\s\S]*?)<\/section>/gi),
  ].map((match) => match[1]);
  assert.equal(detailedModuleGroups.length, 4);
  assert.deepEqual(
    detailedModuleGroups.map((group) => (group.match(/<article\b[^>]*class="week"/gi) ?? []).length),
    [1, 4, 3, 2],
  );
  assert.equal((html.match(/<h4\b[^>]*class="week-title"/gi) ?? []).length, 10);
  assert.equal((html.match(/<h5\b[^>]*class="subtopic-label"/gi) ?? []).length, 20);
  assert.doesNotMatch(html, /<h3\b[^>]*class="week-title"|<h4\b[^>]*class="subtopic-label"/i);

  const meetingFormatHtml = html.match(
    /<ul\b[^>]*class="meeting-format"[^>]*>([\s\S]*?)<\/ul>/i,
  )?.[1];
  assert.ok(meetingFormatHtml);
  const meetingDurations = [...meetingFormatHtml.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((match) => Number.parseInt(textContent(match[1]).match(/^(\d+) minutes/)?.[1] ?? "", 10));
  assert.deepEqual(meetingDurations, [100, 20, 50]);
  assert.equal(meetingDurations.reduce((total, minutes) => total + minutes, 0), 170);
  assert.doesNotMatch(
    textContent(meetingFormatHtml),
    /Instructor framing|introduction|connection.{0,20}(?:to )?(?:the )?previous week|previous[- ]week|Cross-paper conclusion|synthesis|designated discussant|instructor summary/i,
  );
  for (const weekNumber of Array.from({ length: 10 }, (_, index) => index + 1)) {
    assert.equal((html.match(new RegExp(`href="#week-${weekNumber}"`, "g")) ?? []).length, 2);
  }
  assert.doesNotMatch(html, /href="#week-(?:11|12)"|id="week-(?:11|12)"/i);

  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(([, href, content]) => ({ href: decodeHtml(href), text: textContent(content) }));
  const allPapers = [...courseSchedule.flatMap((week) => week.papers), ...additionalReadings];
  for (const paper of allPapers) {
    assert.equal(
      anchors.filter(
        (anchor) => anchor.href === paper.link && anchor.text === paper.title,
      ).length,
      1,
      `Paper title must be linked exactly once: ${paper.title}`,
    );
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
  assert.match(css, /schedule-module-row/i);
  assert.match(css, /mobile-schedule-module/i);
  assert.match(css, /detailed-module/i);
  assert.match(css, /preparatory-background/i);
  assert.match(css, /additional-reading-groups/i);
  assert.match(css, /additional-reading-group-description/i);
  assert.match(css, /h4,\s*\n?h5\s*\{/i);
  assert.match(css, /scroll-margin-top/i);
  assert.match(css, /@media\s+print/i);
  assert.match(css, /prefers-reduced-motion/i);
  assert.match(layout, /CS 886: Learning Theory for Modern AI (?:--|–|—) Fall 2026/);
  assert.match(
    layout,
    /transformer expressivity, computational complexity, trainability, self-attention learning, in-context learning, and reasoning/i,
  );
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
