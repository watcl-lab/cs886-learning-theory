export type CoursePaper = {
  authors: string;
  title: string;
  publication: string;
  presentationFocus: string;
  link: string;
};

export type CourseSubtopic = {
  title: string;
  description: string;
  paperTitles: readonly string[];
};

export type CourseModule = {
  id: string;
  label: string;
  title: string;
  description: string;
  weekNumbers: readonly number[];
};

export type CourseWeek = {
  week: number;
  date: string;
  title: string;
  guidingQuestion: string;
  topicFocus: string;
  connection?: string;
  presentationNote?: string;
  papers: readonly CoursePaper[];
  subtopics?: readonly CourseSubtopic[];
};

export const courseFacts = {
  code: "CS 886",
  institution: "University of Waterloo",
  title: "Learning Theory for Modern AI",
  subtitle: "Transformers and Large Language Models",
  format: "Computational Learning Theory Research Seminar",
  term: "Fall 2026",
  instructor: "Kimon Fountoulakis",
  instructorTitle: "Associate Professor",
  instructorEmail: "kimon.fountoulakis@uwaterloo.ca",
  instructorOffice: "DC 3611",
  officeHours: "TBA",
  deliveryMode: "In person",
  meetingDay: "Fridays",
  meetingTime: "1:30–4:20 p.m.",
  meetingDurationMinutes: 170,
  meetingLocation: "TBA",
  coursePlatform: "TBA",
  officialOutlineUrl: "TBA",
  scheduledMeetingRange: "September 11–December 4, 2026",
  universityClassPeriod: "September 9–December 8, 2026",
  firstMeeting: "September 11, 2026",
  lastMeeting: "December 4, 2026",
  skippedMeeting: "October 16, 2026",
  readingWeek: "October 10–18, 2026",
  readingWeekUrl: "https://uwaterloo.ca/important-dates/graduate/2026-2027/reading-week",
  meetingCount: 12,
  scheduledPapersPerMeeting: 4,
  paperMeetings: "Weeks 1–10",
  projectMeetings: "Weeks 11–12",
  plannedEnrollment: 25,
  expectedProjectPresentations: 25,
  lastUpdated: "September 1, 2026",
} as const;

export const courseSummary =
  "A graduate research seminar on learning theory for transformers and large language models, culminating in a required course project.";

export const courseDescription = {
  paragraphs: [
    "Learning Theory for Modern AI is a graduate research seminar about how transformers and large language models learn, what they can represent and compute, how efficiently they can compute it, how they generalize, and why they sometimes fail. The course begins with an instructor-led case study in exact algorithmic learning, certification, and hardness.",
    "The remaining schedule is organized as a cumulative sequence: transformer expressivity and formal limitations; parallel and fine-grained computational complexity; trainability and signal propagation; finite-sample learning of self-attention; statistical, optimization, and generalization theories of in-context learning; and the learning theory of autoregressive reasoning, curricula, and length extrapolation. The course culminates in an individual research project that may develop a new theoretical result or rigorously test an existing theoretical prediction.",
  ],
  recommendedBackground:
    "Students should have mathematical maturity and working knowledge of probability, linear algebra, optimization, and introductory machine learning. Prior familiarity with transformers is helpful but not required.",
  requiredMaterials: `No textbook is required. All assigned papers are linked from this website. Final project reports and reproducibility materials will be submitted through ${courseFacts.coursePlatform}, where marked work and feedback will also be returned.`,
  nonTheoryStudents:
    "The course is open to students without a theory background. You can still gain substantial insight into how transformers work and use the course project to scrutinize existing theoretical claims through empirical evidence.",
} as const;

export const navigationItems = [
  { label: "Overview", href: "#overview" },
  { label: "Schedule", href: "#schedule" },
  { label: "Paper Presentations", href: "#paper-presentations" },
  { label: "Project", href: "#project" },
  { label: "Assessment", href: "#assessment" },
  { label: "Additional Readings", href: "#additional-readings" },
  { label: "Policies", href: "#policies" },
] as const;

export const learningOutcomes = [
  "Distinguish representation, optimization, learnability, generalization, and computational-complexity results for transformers.",
  "State and interpret theoretical results with their assumptions, quantifiers, and parameter dependence.",
  "Explain the principal proof mechanisms used in modern learning-theory papers.",
  "Evaluate how closely an idealized theoretical model corresponds to a modern transformer or large language model.",
  "Develop a theoretical extension or rigorously test a formal theoretical prediction through reproducible empirical work.",
  "Communicate technical research clearly in written and oral form.",
] as const;

export const readingExpectations =
  "For every scheduled paper, all students should read at least the abstract, introduction, formal setup, main theorem or principal result, and discussion or limitations. The presenter or presenting team is responsible for the proof details and appendices needed to explain the result accurately. Students are not expected to read every technical appendix of all four weekly papers.";

const openingFramingMinutes = 5;
const paperPresentationMinutes = 25;
const paperDiscussionMinutes = 10;
const paperTransitionMinutes = 1;
const midMeetingBreakMinutes = 10;
const weeklySynthesisMinutes = 11;
const paperSlotMinutes =
  paperPresentationMinutes + paperDiscussionMinutes + paperTransitionMinutes;
const papersPerHalf = courseFacts.scheduledPapersPerMeeting / 2;
const halfMeetingPaperMinutes = papersPerHalf * paperSlotMinutes;
const scheduledPaperMinutesPerMeeting =
  courseFacts.scheduledPapersPerMeeting * paperSlotMinutes;
const totalPlannedMeetingMinutes =
  openingFramingMinutes
  + scheduledPaperMinutesPerMeeting
  + midMeetingBreakMinutes
  + weeklySynthesisMinutes;

export const meetingFormat = [
  {
    duration: `${openingFramingMinutes} minutes`,
    activity:
      "Instructor framing: connection to the previous week, the current week's central question, and the relationship among the four papers",
  },
  {
    duration: `${halfMeetingPaperMinutes} minutes`,
    activity:
      `Papers 1–2; each paper receives a ${paperPresentationMinutes}-minute presentation, ${paperDiscussionMinutes} minutes of discussion and questions, and a ${paperTransitionMinutes}-minute transition`,
  },
  {
    duration: `${midMeetingBreakMinutes} minutes`,
    activity: "Break",
  },
  {
    duration: `${halfMeetingPaperMinutes} minutes`,
    activity:
      `Papers 3–4; each paper receives a ${paperPresentationMinutes}-minute presentation, ${paperDiscussionMinutes} minutes of discussion and questions, and a ${paperTransitionMinutes}-minute transition`,
  },
  {
    duration: `${weeklySynthesisMinutes} minutes`,
    activity:
      "Cross-paper synthesis: compare assumptions and result types, identify the week's main conclusion, and motivate the following week",
  },
] as const;

const instructorLedWeek = 1;
const firstStudentPresentationWeek = 2;
const lastStudentPresentationWeek = 10;
const studentPaperMeetingCount = lastStudentPresentationWeek - firstStudentPresentationWeek + 1;
const studentPaperPresentationSlots = studentPaperMeetingCount * courseFacts.scheduledPapersPerMeeting;
const minimumPaperPresentationsPerStudent = 2;
const studentPaperPresentationAssignments =
  courseFacts.plannedEnrollment * minimumPaperPresentationsPerStudent;
const soloPaperPresentationSlots = courseFacts.plannedEnrollment;
const sharedPaperPresentationSlots = studentPaperPresentationSlots - soloPaperPresentationSlots;
const sharedPaperPresentationAssignments =
  studentPaperPresentationAssignments - soloPaperPresentationSlots;
const threePersonPaperPresentationSlots =
  sharedPaperPresentationAssignments - 2 * sharedPaperPresentationSlots;
const pairedPaperPresentationSlots =
  sharedPaperPresentationSlots - threePersonPaperPresentationSlots;

export const paperPresentationPlan = {
  plannedEnrollment: courseFacts.plannedEnrollment,
  instructorLedWeek,
  firstStudentPresentationWeek,
  lastStudentPresentationWeek,
  studentPaperMeetingCount,
  papersPerMeeting: courseFacts.scheduledPapersPerMeeting,
  studentPaperPresentationSlots,
  minimumPaperPresentationsPerStudent,
  studentPaperPresentationAssignments,
  soloPaperPresentationSlots,
  sharedPaperPresentationSlots,
  sharedPaperPresentationAssignments,
  pairedPaperPresentationSlots,
  threePersonPaperPresentationSlots,
  openingFramingMinutes,
  paperPresentationMinutes,
  paperDiscussionMinutes,
  paperTransitionMinutes,
  paperSlotMinutes,
  papersPerHalf,
  halfMeetingPaperMinutes,
  midMeetingBreakMinutes,
  weeklySynthesisMinutes,
  scheduledPaperMinutesPerMeeting,
  totalPlannedMeetingMinutes,
} as const;

export const presentationGuidance =
  `Week ${instructorLedWeek} is instructor-led: the instructor will present all four papers, and that week does not count toward students' presentation workload. Student paper presentations run from Week ${firstStudentPresentationWeek} through Week ${lastStudentPresentationWeek}, with ${courseFacts.scheduledPapersPerMeeting} paper presentations each week. Each reading meeting begins with instructor framing and ends with a cross-paper synthesis that connects the week's conclusions to the following week.`;

export const presentationWorkload =
  `Each student will give ${minimumPaperPresentationsPerStudent} paper presentations: one solo presentation and one shared presentation. ${soloPaperPresentationSlots} papers will have a solo presenter, ${pairedPaperPresentationSlots} will be presented by pairs, and ${threePersonPaperPresentationSlots} will be presented by teams of three. Students sharing a paper divide the ${paperPresentationMinutes}-minute presentation and must each make a substantive contribution. The required project presentation is separate and does not count toward these two paper presentations. Exact paper assignments will be announced after enrollment is confirmed.`;

export const presentationRequirements = [
  "What is the formal problem? State the data-generating process, hypothesis or architecture class, loss, training rule, and test criterion.",
  "What kind of result is obtained? Distinguish representation, optimization, learnability, generalization, and computational-complexity claims.",
  "What is the main theorem? State it precisely enough that the dependence on dimension, sample size, sequence length, width, depth, and conditioning is visible.",
  "How does this paper fit the week's story? Coordinate with the other presenters, use common notation where practical, avoid repeating shared background, and state explicitly whether the paper strengthens, limits, contrasts with, or changes assumptions from the preceding paper.",
  "What is the proof mechanism? Is the main tool stability, concentration, kernelization, mean-field dynamics, margin maximization, circuit complexity, communication complexity, or an explicit transformer construction?",
  "Which assumption carries the result? Examples include Gaussian tasks, linear attention, population loss, infinite width, bounded precision, realizability, or synthetic data.",
  "How close is the theorem to a modern LLM? Identify exactly which architectural or statistical features are omitted.",
  "What would falsify or materially strengthen the claim? End with a concrete lower bound, counterexample, experiment, or theorem.",
  "Distinguish carefully between what the paper proves, what its experiments suggest, and what the authors conjecture or claim informally.",
  "Prepare one concise comparison slide for the weekly synthesis, listing the paper's result type, decisive assumptions, principal guarantee or lower bound, and relationship to the adjacent papers.",
  "End with one precise limitation and one concrete theorem, counterexample, or experiment that would materially strengthen or challenge the paper.",
] as const;

export const weeklySynthesisQuestions = [
  "What result type did each paper establish: representation, computational complexity, trainability, optimization, learnability, or generalization?",
  "Which assumptions changed from paper to paper, and which assumption carried the strongest conclusion?",
  "Did a later paper strengthen an earlier result, explain a mechanism behind it, provide a limitation, or study a genuinely different regime?",
  "What conclusion can be drawn only after considering all four papers together?",
  "Which unresolved question motivates the following week?",
] as const;

export const assessment = [
  {
    component: "Course project",
    weight: "40%",
    standard:
      "A technically substantive project that either develops a new theoretical contribution or rigorously validates, verifies, reproduces, stress-tests, or scrutinizes an existing theoretical result. The grade includes the written report and final project presentation.",
  },
  {
    component: "Paper-presentation work",
    weight: "40%",
    standard:
      "Accurate and insightful presentation of assigned papers, including a precise account of the formal problem, theorem, proof mechanism, assumptions, limitations, and responses to questions.",
  },
  {
    component: "Class participation",
    weight: "20%",
    standard:
      "Consistent and substantive participation in weekly paper discussions and project presentations, including preparation, constructive questions, and engagement with other students' work.",
  },
] as const;

export const courseProject = {
  introduction:
    "The project accounts for 40% of the course grade. The topic must be discussed with and approved by the instructor.",
  acceptableForms: [
    {
      title: "New theoretical contribution",
      description:
        "Examples include a new theorem, proof, lower or upper bound, sharper rate, weaker assumption, impossibility result, counterexample, or extension of an existing result to a more realistic transformer or language-model setting.",
    },
    {
      title: "Empirical validation or scrutiny of theory",
      description:
        "The project may reproduce, verify, stress-test, or challenge an existing theoretical claim.",
      examples: [
        "Measuring whether the predicted dependence on sample size, sequence length, depth, width, number of heads, task diversity, or conditioning appears in finite models.",
        "Checking how a theorem behaves when idealized assumptions such as linear attention, Gaussian data, population loss, infinite width, or realizability are relaxed.",
        "Reproducing a paper's core theoretical experiment and identifying robustness or failure regimes.",
        "Comparing a formal bound with observed behavior and explaining the gap.",
        "Searching systematically for counterexamples to a conjectured extension or informal interpretation of a theorem.",
      ],
    },
  ],
  empiricalStandard:
    "An empirical project must be hypothesis-driven and anchored in a specific theorem, proposition, conjecture, or formal theoretical prediction. A generic model comparison, benchmark leaderboard, prompt-engineering exercise, or systems implementation is not sufficient by itself.",
  groupWorkPolicy:
    "Projects are individual by default. A small-group project requires written approval from the instructor in advance. The final report must state the division of work and include an individual contribution statement. Every student must be able to explain the complete project, individual grades may differ, and a group project must have scope commensurate with the number of participants.",
  deliverables: [
    "A final written report that clearly separates known results from the student's contribution and provides sufficient technical detail to evaluate correctness.",
    "For empirical projects, reproducible code, configurations, and a clear account of the experimental protocol.",
    "An individual final presentation during Week 11 or Week 12. The project presentation is assessed as part of the project grade, not as a paper presentation.",
  ],
  evaluationCriteria: [
    "Relevance to learning theory for transformers or large language models.",
    "Precision and importance of the research question.",
    "Technical correctness and depth.",
    "Originality of a theoretical contribution, or rigor and informativeness of an empirical validation or scrutiny.",
    "Understanding of assumptions, limitations, and related work.",
    "Clarity of the written report and final presentation.",
    "Reproducibility, where applicable.",
  ],
  evaluationNote:
    "A complete publishable theorem is not required. Careful negative results, counterexamples, unsuccessful proof attempts that isolate a genuine obstruction, and rigorous empirical audits can all constitute strong projects when the analysis is technically substantive and clearly documented.",
  publicationSupport:
    "Although publication is not required, the instructor is happy to help develop strong projects toward publication.",
  publicationExample: {
    leadIn: "A project from a previous offering of CS 886 was subsequently developed into a",
    linkText: "NeurIPS 2024 publication",
    url: "https://nips.cc/virtual/2024/poster/95519",
  },
} as const;

export const projectDeadlines = [
  {
    milestone: "Final project report and materials",
    deadline: "November 26, 2026",
    description:
      "The final project report and any required reproducibility materials are due before project presentations begin.",
  },
] as const;

const projectTalkMinutes = 10;
const projectQuestionMinutes = 2;
const projectTransitionMinutes = 1;
const projectPresentationMinutes = projectTalkMinutes + projectQuestionMinutes + projectTransitionMinutes;
const projectPresentationsByMeeting = [13, 12] as const;
const finalProjectSynthesisMinutes =
  courseFacts.meetingDurationMinutes
  - projectPresentationsByMeeting[1] * projectPresentationMinutes;
const projectPresentationMeetingCount = projectPresentationsByMeeting.length;
const totalProjectPresentationMinutes =
  courseFacts.expectedProjectPresentations * projectPresentationMinutes;
const totalProjectMeetingMinutes = projectPresentationMeetingCount * courseFacts.meetingDurationMinutes;

export const projectPresentationPlan = {
  presentationCount: courseFacts.expectedProjectPresentations,
  meetingCount: projectPresentationMeetingCount,
  presentationsByMeeting: projectPresentationsByMeeting,
  talkMinutes: projectTalkMinutes,
  questionMinutes: projectQuestionMinutes,
  transitionMinutes: projectTransitionMinutes,
  minutesPerPresentation: projectPresentationMinutes,
  usedMinutesByMeeting: projectPresentationsByMeeting.map(
    (count) => count * projectPresentationMinutes,
  ),
  totalPresentationMinutes: totalProjectPresentationMinutes,
  totalAvailableMinutes: totalProjectMeetingMinutes,
  remainingMinutes: totalProjectMeetingMinutes - totalProjectPresentationMinutes,
  finalSynthesisMinutes: finalProjectSynthesisMinutes,
} as const;

export const projectPresentation = {
  introduction:
    `Weeks 11–12 are reserved for ${courseFacts.expectedProjectPresentations} individual project presentations. Week 11 will have ${projectPresentationsByMeeting[0]} presentations, and Week 12 will have ${projectPresentationsByMeeting[1]}. Each presentation has a ${projectPresentationMinutes}-minute slot: a ${projectTalkMinutes}-minute talk, ${projectQuestionMinutes} minutes of questions, and a ${projectTransitionMinutes}-minute transition. Timing will be strict. Project presentations do not count toward the two required paper presentations. The final meeting reserves ${finalProjectSynthesisMinutes} minutes for course synthesis and open problems.`,
  orderingPrinciple:
    "Presentations will be ordered thematically rather than alphabetically, randomly, by sign-up time, or by perceived project quality.",
  weekThemes: [
    {
      week: 11,
      title: "Foundations, Architecture, and Learning",
      presentationCount: projectPresentationsByMeeting[0],
      themes: [
        "Exact learning and certification.",
        "Expressivity and formal limitations.",
        "Parallel and fine-grained computational complexity.",
        "Trainability and signal propagation.",
        "Self-attention learnability and early in-context-learning theory.",
      ],
    },
    {
      week: 12,
      title: "In-Context Learning, Reasoning, and Open Problems",
      presentationCount: projectPresentationsByMeeting[1],
      themes: [
        "In-context-learning optimization and generalization.",
        "Autoregressive chain-of-thought.",
        "Curricula and scratchpads.",
        "Length generalization.",
        "Empirical tests of theoretical predictions.",
      ],
    },
  ],
  requirements: [
    "The precise research question and its connection to the course.",
    "The existing theoretical result, conjecture, or limitation being extended or examined.",
    "The student's original contribution.",
    "The methods, assumptions, and experimental or proof setup.",
    "The main theorem, counterexample, quantitative finding, or negative result.",
    "The strongest limitation and the most important next step.",
  ],
  guidance:
    "For empirical projects, plots and tables should be chosen to test the stated theoretical prediction rather than merely summarize benchmark performance. For theoretical projects, the talk should state the result with its quantifiers and parameter dependence, and should explain the main proof idea or obstruction.",
  closingSynthesis:
    `The final ${finalProjectSynthesisMinutes} minutes of Week 12 will synthesize which assumptions repeatedly enabled positive results, which barriers persisted across models, which theoretical predictions were supported or challenged by the projects, and which open problems appear most tractable.`,
} as const;

const lateGracePeriodHours = 48;
const latePenaltyPercentagePoints = 5;
const latePenaltyPeriodHours = 24;

export const lateWorkPolicy = {
  latePolicyConfirmedByInstructor: true,
  gracePeriodHours: lateGracePeriodHours,
  penaltyPercentagePoints: latePenaltyPercentagePoints,
  penaltyPeriodHours: latePenaltyPeriodHours,
  contactStatement:
    "Students should contact the instructor as soon as reasonably possible when illness, emergency, or another serious circumstance affects coursework.",
  scopeStatement: `The final project report and required reproducibility materials have a ${lateGracePeriodHours}-hour grace period. After that grace period, and in the absence of an approved extension, the project grade is reduced by ${latePenaltyPercentagePoints} percentage points for each additional ${latePenaltyPeriodHours}-hour period or part thereof.`,
} as const;

export const generativeAiPolicy =
  "Generative-AI tools are allowed throughout the course. Students remain responsible for verifying every mathematical statement, citation, proof step, experimental result, and piece of submitted code. Fabricated references, unverifiable claims, or generated mathematical content submitted without careful verification will result in less marks.";

// Official University policy and support links checked against Waterloo source pages on August 21, 2026.
export const universityPolicies = {
  introduction:
    "The official University of Waterloo course outline contains the current institutional policies and support information governing this course, including academic integrity, grievances, discipline, appeals, accessibility, and mental-health resources. Students should consult the official outline and the linked University resources for the current wording.",
  outlineGuidanceUrl:
    "https://uwaterloo.ca/associate-vice-president-academic/course-outlines-waterloo",
  resources: [
    {
      label: "Academic integrity",
      url: "https://uwaterloo.ca/academic-integrity/",
    },
    {
      label: "Policy 70: Student Petitions and Grievances",
      url: "https://uwaterloo.ca/secretariat/policy-70-student-petitions-grievances-and-requests",
    },
    {
      label: "Policy 71: Student Discipline",
      url: "https://uwaterloo.ca/secretariat/policies-procedures-guidelines/policy-71",
    },
    {
      label: "Policy 72: Student Appeals",
      url: "https://uwaterloo.ca/secretariat/policies-procedures-guidelines/policy-72",
    },
    {
      label: "AccessAbility Services",
      url: "https://uwaterloo.ca/accessability-services/",
    },
    {
      label: "Counselling appointments and mental-health supports",
      url: "https://uwaterloo.ca/students/health-and-well-being/counselling-appointments",
    },
  ],
} as const;

function paper(
  authors: string,
  title: string,
  publication: string,
  presentationFocus: string,
  link: string,
): CoursePaper {
  return { authors, title, publication, presentationFocus, link };
}

export const projectPresentationSchedule = {
  weeks: "11–12",
  dates: "November 27 and December 4, 2026",
  title: "Project Presentations and Course Synthesis",
  centralQuestion:
    "What did the projects establish across the course's major themes, and which theoretical questions remain open?",
} as const;

export const courseModules: readonly CourseModule[] = [
  {
    id: "opening-case-study",
    label: "Instructor-led opening case study",
    title: "Exact Algorithmic Learning and Hardness",
    description:
      "A motivating case study contrasting exact learning of discrete algorithms with statistical-query and certification hardness.",
    weekNumbers: [1],
  },
  {
    id: "transformer-foundations",
    label: "Module I",
    title: "Transformer Capacity, Computation, and Learning",
    description:
      "From representational power and formal limitations to computational resources, trainability, and finite-sample learning of attention.",
    weekNumbers: [2, 3, 4, 5],
  },
  {
    id: "in-context-learning",
    label: "Module II",
    title: "Theory of In-Context Learning",
    description:
      "Statistical targets and benchmarks, optimization and training dynamics, and finite-sample generalization with optimal rates.",
    weekNumbers: [6, 7, 8],
  },
  {
    id: "reasoning",
    label: "Module III",
    title: "Theory of Reasoning",
    description:
      "Learning with autoregressive reasoning traces, followed by scratchpads, curricula, self-training, and length extrapolation.",
    weekNumbers: [9, 10],
  },
  {
    id: "projects-and-synthesis",
    label: "Module IV",
    title: "Projects and Synthesis",
    description:
      "Thematically organized project presentations culminating in a synthesis of results, recurring assumptions, barriers, and open problems.",
    weekNumbers: [11, 12],
  },
] as const;

// Week 1 is instructor-led. Weeks 2–10 contain student paper presentations.
// Weeks 11–12 are reserved for project presentations and contain no readings.
export const courseSchedule: readonly CourseWeek[] = [
  {
    week: 1,
    date: "September 11, 2026",
    title: "Exact Algorithmic Learning, Certification, and Hardness",
    guidingQuestion:
      "When can neural models learn discrete algorithms exactly from small structured samples, and when are exact learning or behavioral certification provably hard?",
    topicFocus:
      "NTK-based exact learning of arithmetic and graph algorithms, statistical-query hardness for semiautomata, and certification lower bounds under minimal overparameterization.",
    presentationNote:
      "All four papers will be presented by the instructor. The meeting presents a recent research program on exact algorithmic learning, certification, and hardness. Student paper presentations begin in Week 2.",
    subtopics: [
      {
        title: "Part I: Exact execution learned from examples",
        description:
          "How NTK-regime neural models can learn local update rules, arithmetic operations, and algorithmic instructions exactly from small structured training sets.",
        paperTitles: [
          "Learning to Add, Multiply, and Execute Algorithmic Instructions Exactly with Neural Networks",
          "Learning to Execute Graph Algorithms Exactly with Graph Neural Networks",
        ],
      },
      {
        title: "Part II: Hardness of exact learning and certification",
        description:
          "Why exact transition behavior can be statistically hard to learn and why verifying exact behavior from examples can become exponentially hard after minimal overparameterization.",
        paperTitles: [
          "On the Statistical Query Complexity of Learning Semiautomata: a Random Walk Approach",
          "Certification from Examples is Hard for Circuits and Transformers under Minimal Overparametrization",
        ],
      },
    ],
    papers: [
      paper(
        "Artur Back de Luca, George Giapitzakis, and Kimon Fountoulakis",
        "Learning to Add, Multiply, and Execute Algorithmic Instructions Exactly with Neural Networks",
        "NeurIPS 2025",
        "Proves that ensembles of infinite-width two-layer networks in the neural-tangent-kernel regime can exactly execute binary permutations, addition, multiplication, and a Turing-complete SBN instruction set with high probability from logarithmically many structured examples.",
        "https://proceedings.nips.cc/paper_files/paper/2025/hash/71553eb7d97b9c332d9c520c5de724d9-Abstract-Conference.html",
      ),
      paper(
        "Muhammad Fetrat Qharabagh, Artur Back de Luca, George Giapitzakis, and Kimon Fountoulakis",
        "Learning to Execute Graph Algorithms Exactly with Graph Neural Networks",
        "ICML 2026 (Spotlight)",
        "Uses neural-tangent-kernel theory to learn local update instructions from a small training set and composes them in a graph neural network that exactly executes bounded-degree, finite-precision graph algorithms with high probability.",
        "https://arxiv.org/abs/2601.23207",
      ),
      paper(
        "George Giapitzakis, Kimon Fountoulakis, Eshaan Nichani, and Jason D. Lee",
        "On the Statistical Query Complexity of Learning Semiautomata: a Random Walk Approach",
        "COLT 2026",
        "Proves the first statistical-query hardness result for learning semiautomata under a uniform distribution over words and initial states, using random walks, Fourier analysis, representation theory, and spectral-gap bounds.",
        "https://proceedings.mlr.press/v336/giapitzakis26a.html",
      ),
      paper(
        "Artur Back de Luca and Kimon Fountoulakis",
        "Certification from Examples is Hard for Circuits and Transformers under Minimal Overparametrization",
        "Preprint 2026",
        "Proves that one additional threshold gate can make behavioral certification from examples exponentially hard and gives an analogous lower bound for a specific log-precision transformer model under constant architectural overhead.",
        "https://arxiv.org/abs/2605.22964",
      ),
    ],
  },
  {
    week: 2,
    date: "September 18, 2026",
    connection:
      "Week 1 showed that exact algorithmic behavior can be learned in carefully structured regimes. Week 2 steps back to ask what transformer architectures can represent at all, and why different assumptions yield universality, Turing completeness, or severe formal limitations.",
    title: "Expressivity, Formal Languages, and Circuit Classes",
    guidingQuestion:
      "How can universal approximation and Turing completeness coexist with exact formal-language and circuit upper bounds, and which assumptions about depth, precision, masking, recurrence, and positional information explain the difference?",
    topicFocus:
      "Universal approximation, hard-attention Turing completeness, star-free language characterization, and finite-precision threshold-circuit upper bounds.",
    subtopics: [
      {
        title: "Part I: Positive expressivity and computational universality",
        description:
          "What transformers can approximate or compute when suitable parameters, positional information, precision, and architectural mechanisms are available.",
        paperTitles: [
          "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
          "Attention Is Turing Complete",
        ],
      },
      {
        title: "Part II: Exact characterizations and upper bounds",
        description:
          "How masking, positional information, attention saturation, floating-point precision, and constant depth restrict formal-language recognition.",
        paperTitles: [
          "Masked Hard-Attention Transformers Recognize Exactly the Star-Free Languages",
          "Saturated Transformers Are Constant-Depth Threshold Circuits",
        ],
      },
    ],
    papers: [
      paper(
        "Chulhee Yun, Srinadh Bhojanapalli, Ankit Singh Rawat, Sashank J. Reddi, and Sanjiv Kumar",
        "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
        "ICLR 2020",
        "Proves universal approximation of continuous permutation-equivariant sequence-to-sequence maps on compact domains without positional encodings and of arbitrary continuous sequence maps on compact domains with positional encodings.",
        "https://openreview.net/forum?id=ByxRM0Ntvr",
      ),
      paper(
        "Jorge Perez, Pablo Barcelo, and Javier Marinkovic",
        "Attention Is Turing Complete",
        "JMLR 2021",
        "Proves that hard-attention transformers are Turing complete through their ability to compute and access dense internal representations, under explicit architectural and precision assumptions.",
        "https://www.jmlr.org/papers/v22/20-302.html",
      ),
      paper(
        "Andy Yang, David Chiang, and Dana Angluin",
        "Masked Hard-Attention Transformers Recognize Exactly the Star-Free Languages",
        "NeurIPS 2024",
        "Proves that strictly masked hard-attention transformers without positional embeddings are equivalent to linear temporal logic and therefore recognize exactly the star-free languages, while analyzing how masking, position embeddings, and depth change expressivity.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/13d7f172259b11b230cc5da8768abc5f-Abstract-Conference.html",
      ),
      paper(
        "William Merrill, Ashish Sabharwal, and Noah A. Smith",
        "Saturated Transformers Are Constant-Depth Threshold Circuits",
        "TACL 2022",
        "Shows that saturated attention is more expressive than hard attention while proving that floating-point saturated transformers can be simulated by constant-depth threshold circuits, yielding TC0 as an upper bound.",
        "https://aclanthology.org/2022.tacl-1.49/",
      ),
    ],
  },
  {
    week: 3,
    date: "September 25, 2026",
    connection:
      "Week 2 characterized what transformers can represent under different architectural and numerical assumptions. Week 3 asks what computational resources—depth, precision, parallel communication, and running time—are required to realize those representations.",
    title: "Parallel and Fine-Grained Complexity of Transformers",
    guidingQuestion:
      "How do depth, precision, parallel communication, entry magnitudes, and approximation error determine what transformers and self-attention can compute efficiently?",
    topicFocus:
      "Threshold-circuit simulation, Massively Parallel Computation, logarithmic depth, SETH-based lower bounds, and complexity transitions for approximate attention.",
    subtopics: [
      {
        title: "Part I: Parallel depth and communication",
        description:
          "Building on Week 2's threshold-circuit upper bound, this part studies broader log-precision transformer simulations, their relationship to Massively Parallel Computation, and what logarithmic depth adds beyond constant-depth parallelism.",
        paperTitles: [
          "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
          "Transformers, Parallel Computation, and Logarithmic Depth",
        ],
      },
      {
        title: "Part II: Fine-grained complexity of attention",
        description:
          "After Part I studies the parallel computational power of the complete transformer architecture, Part II zooms in on its principal computational primitive and asks when exact or approximate attention can be evaluated faster than quadratic time.",
        paperTitles: [
          "On the Computational Complexity of Self-Attention",
          "Fast Attention Requires Bounded Entries",
        ],
      },
    ],
    papers: [
      paper(
        "William Merrill and Ashish Sabharwal",
        "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
        "TACL 2023",
        "Proves that log-precision transformers with suitably space-bounded feed-forward blocks can be simulated by constant-depth logspace-uniform threshold circuits and derives conditional computational limitations from standard complexity assumptions.",
        "https://aclanthology.org/2023.tacl-1.31/",
      ),
      paper(
        "Clayton Sanford, Daniel Hsu, and Matus Telgarsky",
        "Transformers, Parallel Computation, and Logarithmic Depth",
        "ICML 2024",
        "Proves a two-way simulation between a constant number of self-attention layers and a constant number of Massively Parallel Computation rounds, and shows that logarithmic depth suffices for tasks beyond several sequence models and subquadratic transformer approximations.",
        "https://proceedings.mlr.press/v235/sanford24a.html",
      ),
      paper(
        "Feyza Duman Keles, Pruthuvi Mahesakya Wijewardena, and Chinmay Hegde",
        "On the Computational Complexity of Self-Attention",
        "ALT 2023",
        "Establishes SETH-based quadratic lower bounds for exact and approximate attention across several mechanisms and gives a finite-Taylor-series linear-time approximation with exponential dependence on the polynomial order.",
        "https://proceedings.mlr.press/v201/duman-keles23a.html",
      ),
      paper(
        "Josh Alman and Zhao Song",
        "Fast Attention Requires Bounded Entries",
        "NeurIPS 2023",
        "Proves a sharp transition for low-dimensional approximate softmax attention: sufficiently bounded entries permit almost-linear time, while larger entries yield a conditional truly-subquadratic lower bound under SETH.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/c72861451d6fa9dfa64831102b9bb71a-Abstract-Conference.html",
      ),
    ],
  },
  {
    week: 4,
    date: "October 2, 2026",
    connection:
      "Efficiently representable transformer computations are useful only if training remains stable. Week 4 studies how normalization, width, head count, residual structure, and depth govern representations and gradients.",
    title: "Transformer Trainability: Initialization, Width, and Depth",
    guidingQuestion:
      "How do normalization, width, number of attention heads, residual structure, and depth determine the behavior of transformer representations and gradients at initialization and during early training?",
    topicFocus:
      "Pre-LN versus Post-LN, initialization-time gradient scaling, Gaussian-process and neural-tangent-kernel limits, infinite-head Gaussianity, depth-induced token uniformity, vanishing query and key gradients, and residual scaling.",
    subtopics: [
      {
        title: "Part I: Initialization, normalization, and infinite-width limits",
        description:
          "How normalization placement shapes initial gradients and when width and head-count limits yield tractable Gaussian-process and neural-tangent-kernel descriptions of attention.",
        paperTitles: [
          "On Layer Normalization in the Transformer Architecture",
          "Infinite Attention: NNGP and NTK for Deep Attention Networks",
        ],
      },
      {
        title: "Part II: Depth-induced rank collapse and gradient failure",
        description:
          "How repeated attention layers collapse token representations, how that collapse causes query and key gradients to vanish, and how residual structure and scaling mitigate the pathology.",
        paperTitles: [
          "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
          "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
        ],
      },
    ],
    papers: [
      paper(
        "Ruibin Xiong, Yunchang Yang, Di He, Kai Zheng, Shuxin Zheng, Chen Xing, Huishuai Zhang, Yanyan Lan, Liwei Wang, and Tie-Yan Liu",
        "On Layer Normalization in the Transformer Architecture",
        "ICML 2020",
        "Uses mean-field analysis at initialization to show that Post-LN produces large expected gradients near the output while Pre-LN yields better-behaved initial gradients, providing a theoretical explanation for warmup sensitivity under the paper's model.",
        "https://proceedings.mlr.press/v119/xiong20b.html",
      ),
      paper(
        "Jiri Hron, Yasaman Bahri, Jascha Sohl-Dickstein, and Roman Novak",
        "Infinite Attention: NNGP and NTK for Deep Attention Networks",
        "ICML 2020",
        "Establishes rigorous neural-network Gaussian-process and neural-tangent-kernel limits for deep attention networks, shows that standard single-head attention need not become Gaussian at infinite width while multi-head attention converges to a Gaussian process as the number of heads grows, and analyzes positional encodings and layer normalization.",
        "https://proceedings.mlr.press/v119/hron20a.html",
      ),
      paper(
        "Yihe Dong, Jean-Baptiste Cordonnier, and Andreas Loukas",
        "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
        "ICML 2021",
        "Uses a path decomposition to prove that pure self-attention without residual connections or multilayer perceptrons converges doubly exponentially toward rank-one token representations and explains how those architectural components prevent degeneration.",
        "https://proceedings.mlr.press/v139/dong21a.html",
      ),
      paper(
        "Lorenzo Noci, Sotiris Anagnostidis, Luca Biggio, Antonio Orvieto, Sidak Pal Singh, and Aurelien Lucchi",
        "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
        "NeurIPS 2022",
        "Proves that token-rank collapse causes query and key gradients to vanish at initialization, analyzes gradient imbalances across query, key, and value parameters, and derives depth-dependent residual scaling that preserves signal propagation.",
        "https://proceedings.neurips.cc/paper_files/paper/2022/hash/ae0cba715b60c4052359b3d52a2cff7f-Abstract-Conference.html",
      ),
    ],
  },
  {
    week: 5,
    date: "October 9, 2026",
    title: "Sparse Structure and Token Selection in Self-Attention",
    connection:
      "Stable signals and gradients do not guarantee that training discovers task-relevant structure. Week 5 studies the statistical and optimization biases that drive attention toward sparse, informative tokens.",
    guidingQuestion:
      "Why does self-attention favor sparse dependencies, and how does gradient-based training discover, combine, and select task-relevant tokens?",
    topicFocus:
      "Norm-based sample complexity, SGD-driven token composition, implicit max-margin bias, sparse token selection, architectural separation, and out-of-distribution length generalization.",
    subtopics: [
      {
        title: "Part I: Statistical bias and emergent token composition",
        description:
          "Why bounded-norm self-attention favors sparse dependencies and how SGD turns initially uniform attention into a stable combination of discriminative tokens.",
        paperTitles: [
          "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
          "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
        ],
      },
      {
        title: "Part II: Margin maximization and provable token-selection learning",
        description:
          "How gradient descent selects locally optimal tokens through a max-margin bias and when a one-layer transformer provably learns a sparse selector that extrapolates to longer contexts.",
        paperTitles: [
          "Max-Margin Token Selection in Attention Mechanism",
          "Transformers Provably Learn Sparse Token Selection While Fully-Connected Nets Cannot",
        ],
      },
    ],
    papers: [
      paper(
        "Benjamin L. Edelman, Surbhi Goel, Sham Kakade, and Cyril Zhang",
        "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
        "ICML 2022",
        "Proves norm-based sample-complexity guarantees showing that bounded-norm self-attention can learn sparse dependencies with only logarithmic dependence on context length.",
        "https://proceedings.mlr.press/v162/edelman22a.html",
      ),
      paper(
        "Yuandong Tian, Yiping Wang, Beidi Chen, and Simon S. Du",
        "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
        "NeurIPS 2023",
        "Under no-positional-encoding, long-sequence, and decoder-timescale assumptions, rigorously analyzes SGD for one-layer next-token prediction and shows a scan-and-snap dynamic in which attention increasingly favors distinct, high-co-occurrence tokens while downweighting common or lower-co-occurrence tokens, then decelerates after a learning-rate-controlled phase transition, leaving an almost fixed rather than one-hot token mixture.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/e359ebe56ba306b674e8952349c6049e-Abstract-Conference.html",
      ),
      paper(
        "Davoud Ataee Tarzanagh, Yingcong Li, Xuechen Zhang, and Samet Oymak",
        "Max-Margin Token Selection in Attention Mechanism",
        "NeurIPS 2023",
        "Proves that gradient descent on the attention parameter converges in direction to a max-margin solution separating locally optimal tokens from non-optimal tokens, and gives conditions for corresponding margin behavior under joint optimization with the prediction head.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/970f59b22f4c72aec75174aae63c7459-Abstract-Conference.html",
      ),
      paper(
        "Zixuan Wang, Stanley Wei, Daniel Hsu, and Jason D. Lee",
        "Transformers Provably Learn Sparse Token Selection While Fully-Connected Nets Cannot",
        "ICML 2024",
        "Proves that gradient descent trains a one-layer transformer to solve sparse token selection, establishes an average-case separation from fully connected networks, and obtains out-of-distribution length generalization.",
        "https://proceedings.mlr.press/v235/wang24ca.html",
      ),
    ],
  },
  {
    week: 6,
    date: "October 23, 2026",
    title: "Statistical Targets and Benchmarks for In-Context Prediction",
    connection:
      "Week 5 studied how training organizes attention around informative tokens. Week 6 asks what statistical inference procedure emerges when those learned attention mechanisms operate over an entire prompt.",
    guidingQuestion:
      "Which Bayesian, frequentist, and empirical-Bayes predictors provide useful targets for in-context learning, and how do pretraining data and context length control their idealized prediction error?",
    topicFocus:
      "Latent-concept Bayesian inference, information-theoretic error decomposition, frequentist consistency, universal priors, and empirical-Bayes adaptation.",
    subtopics: [
      {
        title: "Part I: Bayesian interpretation and information-theoretic rates",
        description:
          "When next-token prediction approximates latent-task Bayesian inference and how meta-learning and within-task prediction errors decay with the number and length of training sequences.",
        paperTitles: [
          "An Explanation of In-Context Learning as Implicit Bayesian Inference",
          "An Information-Theoretic Analysis of In-Context Learning",
        ],
      },
      {
        title: "Part II: Frequentist consistency and empirical-Bayes adaptation",
        description:
          "How pretrained predictors can be analyzed from a frequentist viewpoint and how universal priors adapt nearly optimally to unknown test distributions in an empirical-Bayes setting.",
        paperTitles: [
          "Statistical Foundations of Prior-Data Fitted Networks",
          "Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining",
        ],
      },
    ],
    papers: [
      paper(
        "Sang Michael Xie, Aditi Raghunathan, Percy Liang, and Tengyu Ma",
        "An Explanation of In-Context Learning as Implicit Bayesian Inference",
        "ICLR 2022",
        "Under a latent-concept mixture model, proves conditions under which next-token pretraining yields approximate Bayesian inference over concepts at test time despite a mismatch between pretraining sequences and in-context prompts.",
        "https://openreview.net/forum?id=RdJVFCHjUMI",
      ),
      paper(
        "Hong Jun Jeon, Jason D. Lee, Qi Lei, and Benjamin Van Roy",
        "An Information-Theoretic Analysis of In-Context Learning",
        "ICML 2024",
        "Decomposes Bayes prediction error into meta-learning and within-task terms and derives how the error decreases with both the number of training sequences and their lengths without the mixing-time assumptions used by earlier analyses.",
        "https://proceedings.mlr.press/v235/jeon24a.html",
      ),
      paper(
        "Thomas Nagler",
        "Statistical Foundations of Prior-Data Fitted Networks",
        "ICML 2023",
        "Develops a frequentist theory of prior-data fitted networks, separating variance reduction from localization bias and identifying conditions under which the pretrained predictor is statistically consistent.",
        "https://proceedings.mlr.press/v202/nagler23a.html",
      ),
      paper(
        "Nick Cannella, Anzo Teh, Yanjun Han, and Yury Polyanskiy",
        "Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining",
        "COLT 2026",
        "For Poisson empirical Bayes, proves that universal pretraining priors achieve near-optimal regret uniformly over test distributions and explains length generalization through fractional-posterior inference.",
        "https://proceedings.mlr.press/v336/cannella26a.html",
      ),
    ],
  },
  {
    week: 7,
    date: "October 30, 2026",
    connection:
      "Week 6 identified ideal statistical targets and benchmarks for prompt-conditioned prediction. Week 7 asks whether transformer pretraining reaches such predictors and which optimization dynamics produce them.",
    title: "Optimization and Training Dynamics of In-Context Learning",
    guidingQuestion:
      "Which in-context algorithms minimize the pretraining objective, and under what assumptions does gradient-based pretraining actually converge to those solutions?",
    topicFocus:
      "Population-risk optima, gradient-flow convergence, softmax-attention dynamics, stagewise learning, and multi-step learned optimization.",
    subtopics: [
      {
        title: "Part I: Population optima and single-step training",
        description:
          "How one-layer linear self-attention encodes gradient-like prediction rules and when gradient-based training reaches globally optimal in-context predictors.",
        paperTitles: [
          "One Step of Gradient Descent Is Provably the Optimal In-Context Learner with One Layer of Linear Self-Attention",
          "Trained Transformers Learn Linear Models In-Context",
        ],
      },
      {
        title: "Part II: Softmax dynamics and multi-step learned optimization",
        description:
          "How nonlinear attention learns in stages and how looped transformers can provably acquire multi-step preconditioned gradient descent.",
        paperTitles: [
          "In-Context Convergence of Transformers",
          "Can Looped Transformers Learn to Implement Multi-step Gradient Descent for In-context Learning?",
        ],
      },
    ],
    papers: [
      paper(
        "Arvind V. Mahankali, Tatsunori Hashimoto, and Tengyu Ma",
        "One Step of Gradient Descent Is Provably the Optimal In-Context Learner with One Layer of Linear Self-Attention",
        "ICLR 2024",
        "Characterizes global population-risk minimizers of one-layer linear self-attention, showing that isotropic linear tasks yield one gradient step and non-isotropic tasks yield an appropriately preconditioned step.",
        "https://openreview.net/forum?id=8p3fu56lKc",
      ),
      paper(
        "Ruiqi Zhang, Spencer Frei, and Peter L. Bartlett",
        "Trained Transformers Learn Linear Models In-Context",
        "JMLR 2024",
        "Proves gradient-flow convergence for a one-layer linear transformer, derives controlled in-context prediction risk, and analyzes how the learned predictor behaves under distribution shift.",
        "https://www.jmlr.org/papers/v25/23-1042.html",
      ),
      paper(
        "Yu Huang, Yuan Cheng, and Yingbin Liang",
        "In-Context Convergence of Transformers",
        "ICML 2024",
        "Proves finite-time convergence of gradient descent for a one-layer softmax-attention model on structured in-context regression and characterizes stagewise learning when features occur at imbalanced frequencies.",
        "https://proceedings.mlr.press/v235/huang24d.html",
      ),
      paper(
        "Khashayar Gatmiry, Nikunj Saunshi, Sashank J. Reddi, Stefanie Jegelka, and Sanjiv Kumar",
        "Can Looped Transformers Learn to Implement Multi-step Gradient Descent for In-context Learning?",
        "ICML 2024",
        "Shows that the population optimum of a linear looped transformer implements multi-step preconditioned gradient descent and proves fast gradient-flow convergence through a gradient-dominance argument despite nonconvexity.",
        "https://proceedings.mlr.press/v235/gatmiry24b.html",
      ),
    ],
  },
  {
    week: 8,
    date: "November 6, 2026",
    connection:
      "Week 7 analyzed how training reaches in-context algorithms. Week 8 turns from optimization to finite-sample generalization, task transfer, algorithm selection, and minimax rates.",
    title: "Finite-Sample Generalization and Minimax Optimality of In-Context Learning",
    guidingQuestion:
      "Once pretraining has produced an in-context algorithm, how many tasks and prompt examples are needed for it to generalize, adapt, select procedures, and attain optimal statistical rates?",
    topicFocus:
      "PAC learnability, algorithmic stability, task transfer, in-context algorithm selection, and minimax nonparametric rates.",
    subtopics: [
      {
        title: "Part I: Finite-sample learnability and stability",
        description:
          "How finite pretraining-task counts, prompt examples, and algorithmic stability control generalization and transfer for frozen-weight in-context learners.",
        paperTitles: [
          "The Learnability of In-Context Learning",
          "Transformers as Algorithms: Generalization and Stability in In-Context Learning",
        ],
      },
      {
        title: "Part II: Algorithm selection and minimax rates",
        description:
          "How transformers can select among statistical procedures in context and attain optimal rates over rich function classes.",
        paperTitles: [
          "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
          "Transformers Are Minimax Optimal Nonparametric In-Context Learners",
        ],
      },
    ],
    papers: [
      paper(
        "Noam Wies, Yoav Levine, and Amnon Shashua",
        "The Learnability of In-Context Learning",
        "NeurIPS 2023",
        "Introduces a PAC-style framework for pretraining followed by frozen-weight in-context adaptation and proves finite sample-complexity guarantees for latent-task mixtures.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/73950f0eb4ac0925dc71ba2406893320-Abstract-Conference.html",
      ),
      paper(
        "Yingcong Li, M. Emrullah Ildiz, Dimitris Papailiopoulos, and Samet Oymak",
        "Transformers as Algorithms: Generalization and Stability in In-Context Learning",
        "ICML 2023",
        "Treats the transformer as an algorithm operating on a prompt and derives excess-risk and task-transfer guarantees through algorithmic stability for independent examples and dynamical trajectories.",
        "https://proceedings.mlr.press/v202/li23l.html",
      ),
      paper(
        "Yu Bai, Fan Chen, Huan Wang, Caiming Xiong, and Song Mei",
        "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
        "NeurIPS 2023",
        "Constructs transformers that implement regression and classification procedures, select among algorithms through in-context validation, and achieve formal statistical guarantees with polynomial pretraining requirements.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/b2e63e36c57e153b9015fece2352a9f9-Abstract-Conference.html",
      ),
      paper(
        "Juno Kim, Tai Nakamaki, and Taiji Suzuki",
        "Transformers Are Minimax Optimal Nonparametric In-Context Learners",
        "NeurIPS 2024",
        "Derives approximation and generalization bounds for nonparametric in-context regression, separates pretraining and within-context generalization gaps, and establishes minimax-optimal rates over rich function classes.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/c11daad0a48ea5f3c5c6390c7b060720-Abstract-Conference.html",
      ),
    ],
  },
  {
    week: 9,
    date: "November 13, 2026",
    connection:
      "Week 8 studied direct prompt-to-prediction generalization. Week 9 asks how the learning problem changes when the model generates intermediate reasoning traces autoregressively.",
    title: "Learning Theory of Autoregressive Chain-of-Thought",
    guidingQuestion:
      "How do observed or latent reasoning traces change sample complexity, computational complexity, optimization, and generalization?",
    topicFocus:
      "Observed and latent chains of thought, VC dimension, sample complexity, sparse dependence, nonlinear-attention training, and robustness to task and data shift.",
    subtopics: [
      {
        title: "Part I: Formal frameworks and tight sample complexity",
        description:
          "General learning models for autoregressive reasoning traces and nearly matching capacity bounds for transformer chain-of-thought learning.",
        paperTitles: [
          "A Theory of Learning with Autoregressive Chain of Thought",
          "Tight Sample Complexity of Transformers",
        ],
      },
      {
        title: "Part II: Statistical benefits and training dynamics",
        description:
          "Revisiting Week 5's sparse-dependence theme, this part asks how intermediate reasoning steps reshape the dependencies attention must learn, improve sample efficiency, and support nonlinear training and generalization.",
        paperTitles: [
          "From Sparse Dependence to Sparse Attention: Unveiling How Chain-of-Thought Enhances Transformer Sample Efficiency",
          "Training Nonlinear Transformers for Chain-of-Thought Inference: A Theoretical Generalization Analysis",
        ],
      },
    ],
    papers: [
      paper(
        "Nirmit Joshi, Gal Vardi, Adam Block, Surbhi Goel, Zhiyuan Li, Theodor Misiakiewicz, and Nathan Srebro",
        "A Theory of Learning with Autoregressive Chain of Thought",
        "COLT 2025",
        "Formalizes learning with observed and latent chains of thought, derives sample and computational complexity from properties such as VC dimension, and shows how time invariance can remove dependence on chain length from sample complexity.",
        "https://proceedings.mlr.press/v291/joshi25a.html",
      ),
      paper(
        "Chenxiao Yang, Nathan Srebro, and Zhiyuan Li",
        "Tight Sample Complexity of Transformers",
        "COLT 2026",
        "Tightly characterizes the VC dimension and sample complexity of depth-L transformers, including teacher-forced chain-of-thought learning, with nearly matching upper and lower bounds.",
        "https://proceedings.mlr.press/v336/yang26a.html",
      ),
      paper(
        "Kaiyue Wen, Huaqing Zhang, Hongzhou Lin, and Jingzhao Zhang",
        "From Sparse Dependence to Sparse Attention: Unveiling How Chain-of-Thought Enhances Transformer Sample Efficiency",
        "ICLR 2025",
        "In a parity-learning model under the paper's training setup, proves that chain-of-thought enables polynomial-sample learning where direct prediction requires exponentially many samples and explains the gain through sparse sequential dependence and sparse attention.",
        "https://proceedings.iclr.cc/paper_files/paper/2025/hash/fa6d4d2020aac4bd8f7cdb2771fc1ae2-Abstract-Conference.html",
      ),
      paper(
        "Hongkang Li, Songtao Lu, Pin-Yu Chen, Xiaodong Cui, and Meng Wang",
        "Training Nonlinear Transformers for Chain-of-Thought Inference: A Theoretical Generalization Analysis",
        "ICLR 2025",
        "Quantifies the samples and iterations needed to train nonlinear attention for chain-of-thought inference and proves generalization to unseen tasks under data shift and imperfect or noisy reasoning demonstrations.",
        "https://proceedings.iclr.cc/paper_files/paper/2025/hash/b295b3a940706f431076c86b78907757-Abstract-Conference.html",
      ),
    ],
  },
  {
    week: 10,
    date: "November 20, 2026",
    connection:
      "Week 9 established how reasoning traces change learnability. Week 10 asks which scratchpads, curricula, and self-training procedures overcome barriers on harder or longer problems, returning to Week 1's contrast between structured positive results and learning hardness.",
    title: "Curricula, Scratchpads, and Length Generalization for Reasoning",
    guidingQuestion:
      "Which forms of intermediate supervision, adaptive data selection, and self-training make compositional reasoning learnable and transferable to harder or longer instances?",
    topicFocus:
      "Globality barriers, scratchpad design, statistical-query lower bounds, easy-to-hard curricula, autocurriculum, recursive self-training, and length extrapolation.",
    subtopics: [
      {
        title: "Part I: Learning barriers and curriculum design",
        description:
          "Why direct or hard-only training can fail and how structured scratchpads or easy-to-hard data can overcome formal learning barriers.",
        paperTitles: [
          "How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad",
          "Learning Compositional Functions with Transformers from Easy-to-Hard Data",
        ],
      },
      {
        title: "Part II: Adaptive curriculum and length extrapolation",
        description:
          "How adaptive problem selection and recursive self-training reduce supervision costs and extend reasoning to harder or longer instances.",
        paperTitles: [
          "Learning to Reason with Curriculum I: Provable Benefits of Autocurriculum",
          "Transformers Provably Learn Chain-of-Thought Reasoning with Length Generalization",
        ],
      },
    ],
    papers: [
      paper(
        "Emmanuel Abbe, Samy Bengio, Aryo Lotfi, Colin Sandon, and Omid Saremi",
        "How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad",
        "NeurIPS 2024",
        "Formalizes a globality measure for reasoning tasks, develops learning barriers under the paper's stated assumptions, and analyzes how increasingly structured scratchpads can change the learnability of global functions.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/3107e4bdb658c79053d7ef59cbc804dd-Abstract-Conference.html",
      ),
      paper(
        "Zixuan Wang, Eshaan Nichani, Alberto Bietti, Alex Damian, Daniel Hsu, Jason D. Lee, and Denny Wu",
        "Learning Compositional Functions with Transformers from Easy-to-Hard Data",
        "COLT 2025",
        "Proves an exponential statistical-query lower bound for hard-only data and polynomial sample and runtime guarantees for gradient descent on an O(log k)-depth transformer under suitable easy-to-hard or mixed curricula.",
        "https://proceedings.mlr.press/v291/wang25a.html",
      ),
      paper(
        "Nived Rajaraman, Audrey Huang, Miro Dudik, Rob Schapire, Dylan Foster, and Akshay Krishnamurthy",
        "Learning to Reason with Curriculum I: Provable Benefits of Autocurriculum",
        "COLT 2026",
        "Proves that adaptive problem selection can require exponentially fewer supervised reasoning demonstrations than non-adaptive fine-tuning and can decouple reinforcement-learning compute from reference-model quality after a burn-in phase.",
        "https://proceedings.mlr.press/v336/rajaraman26a.html",
      ),
      paper(
        "Yu Huang, Zixin Wen, Aarti Singh, Yuejie Chi, and Yuxin Chen",
        "Transformers Provably Learn Chain-of-Thought Reasoning with Length Generalization",
        "NeurIPS 2025",
        "Proves optimization and length-generalization guarantees for transformers trained on structured state-tracking tasks and analyzes attention concentration and recursive self-training beyond the original training lengths.",
        "https://proceedings.neurips.cc/paper_files/paper/2025/hash/b86a195e70f27017c514fa0e5f80595f-Abstract-Conference.html",
      ),
    ],
  },
  {
    week: 11,
    date: "November 27, 2026",
    title: "Project Presentations I: Foundations, Architecture, and Learning",
    guidingQuestion:
      "What do the projects establish about exact learning, expressivity, computational complexity, trainability, and self-attention learning?",
    topicFocus:
      "Thirteen project presentations grouped around exact learning and certification, expressivity and formal limitations, parallel and fine-grained computational complexity, trainability and signal propagation, self-attention learnability, and early in-context-learning theory.",
    papers: [],
  },
  {
    week: 12,
    date: "December 4, 2026",
    title: "Project Presentations II: In-Context Learning, Reasoning, and Open Problems",
    guidingQuestion:
      "What do the projects establish about in-context learning and reasoning, and which theoretical questions remain open?",
    topicFocus:
      "Twelve project presentations grouped around in-context-learning optimization and generalization, chain-of-thought, curricula and scratchpads, length generalization, and empirical tests of theoretical predictions, followed by a final course synthesis.",
    papers: [],
  },
];

export const additionalReadings: readonly CoursePaper[] = [
  paper(
    "Xiao Shi Huang, Felipe Perez, Jimmy Ba, and Maksims Volkovs",
    "Improving Transformer Optimization Through Better Initialization",
    "ICML 2020",
    "Proposes T-Fixup using a simplified analysis of depth-dependent update scaling and validates that the initialization can train very deep encoder-decoder transformers without warmup or layer normalization. It is useful practical background for Week 4 but is not one of the core signal-propagation theorem papers.",
    "https://proceedings.mlr.press/v119/huang20f.html",
  ),
  paper(
    "Akhil Kedia, Mohd Abbas Zaidi, Sushil Khyalia, Jungho Jung, Harshith Goka, and Haejun Lee",
    "Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models",
    "ICML 2024",
    "Combines end-to-end forward and backward signal-moment calculations with the DeepScaleLM scaling prescription and extensive empirical validation for very deep language-model transformers. It complements Week 4's theorem-centered core with a broader theory-and-method treatment of stable scaling.",
    "https://proceedings.mlr.press/v235/kedia24a.html",
  ),
  paper(
    "Michael Hahn",
    "Theoretical Limitations of Self-Attention in Neural Sequence Models",
    "TACL 2020",
    "A foundational formal-language lower-bound paper showing limitations of fixed-depth self-attention for periodic and hierarchical languages under its model assumptions. It supports Week 2, while the required schedule uses newer exact characterizations and circuit-class results.",
    "https://aclanthology.org/2020.tacl-1.11/",
  ),
  paper(
    "Bingbin Liu, Jordan T. Ash, Surbhi Goel, Akshay Krishnamurthy, and Cyril Zhang",
    "Transformers Learn Shortcuts to Automata",
    "ICLR 2023 oral",
    "Proves that transformers can exactly simulate any finite-state automaton using O(log T) depth and that broad algebraic classes admit constant-depth shortcut constructions; the claim that gradient-based training discovers these shortcuts is supported empirically rather than by a general optimization theorem.",
    "https://openreview.net/forum?id=De4FYqjFueZ",
  ),
  paper(
    "Angeliki Giannou, Shashank Rajput, Jy-Yong Sohn, Kangwook Lee, Jason D. Lee, and Dimitris Papailiopoulos",
    "Looped Transformers as Programmable Computers",
    "ICML 2023",
    "Constructs explicit weights for a looped transformer that implements an explicit instruction-set architecture, memory access, branching, nonlinear operations, linear algebra, and backpropagation. It is a strong programmable-computation result but not a theorem that the program or weights are learned from data.",
    "https://proceedings.mlr.press/v202/giannou23a.html",
  ),
  paper(
    "Muhammed Emrullah Ildiz, Yixiao Huang, Yingcong Li, Ankit Singh Rawat, and Samet Oymak",
    "From Self-Attention to Markov Models: Unveiling the Dynamics of Generative Transformers",
    "ICML 2024",
    "Maps one-layer generative self-attention to a context-conditioned Markov chain, gives coverage conditions for consistent latent-model estimation and finite-sample guarantees under IID prompt-output data, and separately analyzes a single autoregressive trajectory, characterizing a winner-token distribution-collapse phenomenon. It is strong complementary theory, but its generative model-identification story is separate from Week 5's focused narrative on sparse token selection.",
    "https://proceedings.mlr.press/v235/ildiz24a.html",
  ),
  paper(
    "Hubert Ramsauer et al.",
    "Hopfield Networks Is All You Need",
    "ICLR 2021",
    "Foundational associative-memory theory: proves modern Hopfield retrieval and storage results and identifies the transformer attention update with a Hopfield retrieval step. It is useful background for Week 6 but is not a core statistical-learning paper about pretraining or generalization.",
    "https://openreview.net/forum?id=tL89RnzIiCd",
  ),
  paper(
    "Alberto Bietti, Vivien Cabannes, Diane Bouchacourt, Herve Jegou, and Leon Bottou",
    "Birth of a Transformer: A Memory Viewpoint",
    "NeurIPS 2023",
    "A mechanistic theory and empirical study of how a simplified transformer develops global bigram memories and an induction-head mechanism. Its supplement contains an idealized population-gradient result, but it does not establish general finite-sample or end-to-end training guarantees.",
    "https://proceedings.neurips.cc/paper_files/paper/2023/hash/0561738a239a995c8cd2ef0e50cfa4fd-Abstract-Conference.html",
  ),
  paper(
    "Ekin Akyurek, Dale Schuurmans, Jacob Andreas, Tengyu Ma, and Denny Zhou",
    "What Learning Algorithm Is In-Context Learning? Investigations with Linear Models",
    "ICLR 2023",
    "A foundational construction and empirical algorithm-identification paper: proves that transformers can represent several linear-learning procedures and shows that trained models resemble them, without proving that pretraining converges to those constructions.",
    "https://openreview.net/forum?id=0g0X4H8yN4I",
  ),
  paper(
    "Johannes Von Oswald, Eyvind Niklasson, Ettore Randazzo, Joao Sacramento, Alexander Mordvintsev, Andrey Zhmoginov, and Max Vladymyrov",
    "Transformers Learn In-Context by Gradient Descent",
    "ICML 2023",
    "A foundational representational and mechanistic precursor: constructs linear self-attention weights that implement a gradient update and empirically compares trained transformers with that construction, but does not prove convergence of ordinary pretraining to it.",
    "https://proceedings.mlr.press/v202/von-oswald23a.html",
  ),
  paper(
    "Zhiyuan Li, Hong Liu, Denny Zhou, and Tengyu Ma",
    "Chain of Thought Empowers Transformers to Solve Inherently Serial Problems",
    "ICLR 2024",
    "Computational-expressivity theory showing how autoregressive reasoning tokens allow bounded-depth transformers to serialize circuit computation. It is valuable background for Weeks 9–10 but does not prove that gradient-based training learns the construction.",
    "https://proceedings.iclr.cc/paper_files/paper/2024/hash/3309b4112c9f04a993f2bbdd0274bba1-Abstract-Conference.html",
  ),
  paper(
    "Dhruv Rohatgi, Adam Block, Audrey Huang, Akshay Krishnamurthy, and Dylan J. Foster",
    "Computational-Statistical Tradeoffs at the Next-Token Prediction Barrier: Autoregressive and Imitation Learning under Misspecification",
    "COLT 2025",
    "Studies error amplification and computational-statistical tradeoffs for autoregressive and imitation learning under model misspecification. It is strong adjacent learning theory, but it is separate from the curriculum, scratchpad, and length-generalization narrative of Week 10.",
    "https://arxiv.org/abs/2502.12465",
  ),
  paper(
    "Sadhika Malladi et al.",
    "A Kernel-Based View of Language Model Fine-Tuning",
    "ICML 2023",
    "Develops a kernel approximation for language-model fine-tuning and uses it to predict data and hyperparameter effects.",
    "https://proceedings.mlr.press/v202/malladi23a.html",
  ),
  paper(
    "Yihan Wang, Jatin Chauhan, Wei Wang, and Cho-Jui Hsieh",
    "Universality and Limitations of Prompt Tuning",
    "NeurIPS 2023",
    "Proves universal approximation results for prompt tuning while deriving prompt-length and computational limitations.",
    "https://arxiv.org/abs/2305.18787",
  ),
  paper(
    "Wei Xiong, Hanze Dong, Chenlu Ye, Ziqi Wang, Han Zhong, Heng Ji, Nan Jiang, and Tong Zhang",
    "Iterative Preference Learning from Human Feedback: Bridging Theory and Practice for RLHF under KL-Constraint",
    "ICML 2024",
    "Analyzes reverse-KL-regularized contextual-bandit formulations of offline, online, and hybrid RLHF and gives efficient iterative algorithms with finite-sample guarantees.",
    "https://proceedings.mlr.press/v235/xiong24a.html",
  ),
  paper(
    "Tengyang Xie, Dylan J. Foster, Akshay Krishnamurthy, Corby Rosset, Ahmed H. Awadallah, and Alexander Rakhlin",
    "Exploratory Preference Optimization: Harnessing Implicit Q*-Approximation for Sample-Efficient RLHF",
    "ICLR 2025",
    "Gives a theoretically grounded exploration algorithm for online RLHF under general function approximation and proves sample-efficiency guarantees.",
    "https://openreview.net/forum?id=QYigQ6gXNw",
  ),
  paper(
    "Dylan J. Foster, Zakaria Mhammedi, and Dhruv Rohatgi",
    "Is a Good Foundation Necessary for Efficient Reinforcement Learning? The Computational Role of the Base Model in Exploration",
    "COLT 2025",
    "Introduces a sampling-oracle framework for reinforcement learning with language models, proves that base-model coverage lower-bounds runtime, and gives an efficient inference-time exploration algorithm when sufficient coverage is present.",
    "https://proceedings.mlr.press/v291/foster25a.html",
  ),
  paper(
    "Yuda Song, Gokul Swamy, Aarti Singh, J. Andrew Bagnell, and Wen Sun",
    "The Importance of Online Data: Understanding Preference Fine-Tuning via Coverage",
    "NeurIPS 2024",
    "Derives coverage conditions separating online and offline preference optimization and explains when offline data is fundamentally insufficient.",
    "https://proceedings.neurips.cc/paper_files/paper/2024/hash/16c628ab12dc4caca8e7712affa6c767-Abstract-Conference.html",
  ),
  paper(
    "Adam Tauman Kalai and Santosh S. Vempala",
    "Calibrated Language Models Must Hallucinate",
    "STOC 2024",
    "Relates unavoidable hallucination on arbitrary rare facts to calibration and the Good-Turing missing mass.",
    "https://arxiv.org/abs/2311.14648",
  ),
  paper(
    "Miranda Christ, Sam Gunn, and Or Zamir",
    "Undetectable Watermarks for Language Models",
    "COLT 2024",
    "Constructs secret-key watermarks whose presence is efficiently detectable with the key but computationally indistinguishable from the original language-model distribution without it, even under adaptive prompting.",
    "https://proceedings.mlr.press/v247/christ24a.html",
  ),
  paper(
    "Tianyu Guo et al.",
    "How Do Transformers Learn In-Context Beyond Simple Functions? A Case Study on Learning with Representations",
    "ICLR 2024",
    "Analyzes in-context learning when tasks share a latent representation and explains how pretraining learns a reusable feature space.",
    "https://arxiv.org/abs/2310.10616",
  ),
  paper(
    "Yuchen Li, Yuanzhi Li, and Andrej Risteski",
    "How Do Transformers Learn Topic Structure: Towards a Mechanistic Understanding",
    "ICML 2023",
    "Analyzes how embeddings and attention learn co-occurrence and latent topic structure under a tractable generative model.",
    "https://proceedings.mlr.press/v202/li23p.html",
  ),
];
