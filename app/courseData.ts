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
  description?: string;
  weekNumbers: readonly number[];
};

export type AdditionalReadingGroup = {
  id: string;
  title: string;
  description: string;
  paperTitles: readonly string[];
};

export type CourseWeek = {
  week: number;
  date: string;
  title: string;
  guidingQuestion?: string;
  topicFocus?: string;
  connection?: string;
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
  // Applies to the student-led paper meetings in Weeks 2–10.
  // Week 1 remains instructor-led with four papers.
  scheduledPapersPerMeeting: 3,
  paperMeetings: "Weeks 1–10",
  projectMeetings: "Weeks 11–12",
  plannedEnrollment: 27,
  expectedProjectPresentations: 27,
  lastUpdated: "September 2, 2026",
} as const;

export const courseSummary =
  "A graduate theory seminar on transformer representation, computation, trainability, self-attention learning, in-context learning, and reasoning, culminating in a required research project.";

export function isPendingCourseFact(value: string) {
  return value === "TBA";
}

export const courseDescription = {
  paragraphs: [
    "Learning Theory for Modern AI is a graduate research seminar on the theoretical foundations of transformers and large language models. We study what these models can represent and compute, what computational resources they require, when their training dynamics are stable, how they learn and generalize from finite data, and why they fail. The course begins with an instructor-led case study in exact algorithmic learning, certification, and hardness.",
    "After the opening case study, Module I moves from expressivity and computational complexity to trainability and finite-sample learning of attention. Module II studies statistical targets, optimization, and generalization in in-context learning. Module III studies autoregressive chain-of-thought, curricula, and length generalization. Module IV is devoted to student project presentations.",
  ],
  recommendedBackground:
    "Students should have mathematical maturity and working knowledge of probability, linear algebra, optimization, algorithms, asymptotic notation, and introductory machine learning. Familiarity with reading proofs is expected. Prior coursework in computational complexity, statistical learning theory, or transformers is helpful but not required.",
  requiredMaterials:
    isPendingCourseFact(courseFacts.coursePlatform)
      ? "No textbook is required, and all assigned papers are linked from this website."
      : `No textbook is required, and all assigned papers are linked from this website. Final project reports and reproducibility materials will be submitted through ${courseFacts.coursePlatform}, where marked work and feedback will also be returned.`,
  nonTheoryStudents:
    "The course is open to students without a theory background. You can still gain substantial insight into how transformers work and use the course project to scrutinize existing theoretical claims through empirical evidence.",
  preparatoryBackgroundIntroduction:
    "Students who need a refresher should review the following concepts before the corresponding modules. Short course notes or references will be posted before they are needed.",
  preparatoryBackground: [
    {
      title: "Transformer architecture",
      description:
        "Scaled dot-product attention, multi-head attention, residual pathways, layer normalization, feed-forward blocks, positional information, causal masking, and autoregressive generation.",
    },
    {
      title: "Algorithms and computational complexity",
      description:
        "Asymptotic notation, reductions, randomized and conditional lower bounds, circuit classes such as AC0 and TC0, communication or parallel models.",
    },
    {
      title: "Statistical learning theory",
      description:
        "PAC learning, VC dimension, algorithmic stability, statistical-query learning, concentration, minimax rates, population versus empirical risk, and distribution shift.",
    },
  ],
  officialOutlineNotice:
    "This website provides the detailed reading schedule, seminar format, and project guidance. The official University of Waterloo course outline is the authoritative source for assessment, deadlines, accommodations, academic integrity, and institutional policies.",
  pendingOfficialOutlineNotice:
    "The official course-outline link will be added before the first meeting.",
} as const;

export const pendingLogistics = {
  officeHours: "To be announced before the first meeting",
  meetingLocation: "To be announced before the first meeting",
  coursePlatform: "To be announced before the first graded deliverable",
} as const;

export const navigationItems = [
  { label: "Overview", href: "#overview" },
  { label: "Outcomes", href: "#learning-outcomes" },
  { label: "Schedule", href: "#schedule" },
  { label: "Presentations", href: "#paper-presentations" },
  { label: "Project", href: "#project" },
  { label: "Assessment", href: "#assessment" },
  { label: "Additional Readings", href: "#additional-readings" },
  { label: "Policies", href: "#policies" },
] as const;

export const learningOutcomes = [
  "Distinguish representation, computational-complexity, trainability, optimization, learnability, generalization, and certification claims for transformers and related neural models.",
  "State and interpret principal theorems with their assumptions, quantifiers, and dependence on sample size, dimension, sequence length, width, depth, precision, conditioning, and task complexity.",
  "Explain how differences in architecture, attention mechanism, precision, depth, recurrence, data-generating process, training rule, and evaluation criterion can produce apparently conflicting theoretical conclusions.",
  "Explain and compare principal techniques used in modern transformer theory, including circuit and communication reductions, statistical-query lower bounds, kernel and mean-field limits, stability, concentration, margin arguments, and minimax analysis.",
  "Assess how closely an idealized theoretical model corresponds to a modern transformer or large language model and identify which omitted features may materially affect the conclusion.",
  "Develop a theoretical extension or design a reproducible empirical investigation that tests, verifies, stress-tests, or challenges a formal theoretical prediction.",
  "Present technical research clearly in written and oral form and synthesize multiple papers into a coherent account of what is known, which assumptions matter, and which questions remain open.",
] as const;

export const readingExpectations =
  "For every scheduled paper, all students should read at least the abstract, introduction, formal setup, main theorem or principal result, and discussion or limitations. Before class, students should be able to identify the paper's result type and its decisive assumption. The presenter or presenting team is responsible for the proof details and supplementary material needed to explain the result accurately. Students are not expected to read every technical detail in the appendix.";

const paperPresentationMinutes = 35;
const paperDiscussionMinutes = 14;
const paperTransitionMinutes = 1;
const midMeetingBreakMinutes = 20;
const papersBeforeBreak = 2;
const papersAfterBreak = 1;
const paperSlotMinutes =
  paperPresentationMinutes + paperDiscussionMinutes + paperTransitionMinutes;
const firstPaperBlockMinutes = papersBeforeBreak * paperSlotMinutes;
const secondPaperBlockMinutes = papersAfterBreak * paperSlotMinutes;
const scheduledPaperMinutesPerMeeting =
  courseFacts.scheduledPapersPerMeeting * paperSlotMinutes;
const totalPlannedMeetingMinutes =
  firstPaperBlockMinutes
  + midMeetingBreakMinutes
  + secondPaperBlockMinutes;

export const meetingFormat = [
  {
    duration: `${firstPaperBlockMinutes} minutes`,
    activity:
      `Papers 1–2; each paper receives a ${paperPresentationMinutes}-minute presentation, ${paperDiscussionMinutes} minutes of discussion and questions, and a ${paperTransitionMinutes}-minute transition`,
  },
  {
    duration: `${midMeetingBreakMinutes} minutes`,
    activity: "Break",
  },
  {
    duration: `${secondPaperBlockMinutes} minutes`,
    activity:
      `Paper 3; the paper receives a ${paperPresentationMinutes}-minute presentation, ${paperDiscussionMinutes} minutes of discussion and questions, and a ${paperTransitionMinutes}-minute transition`,
  },
] as const;

const instructorLedWeek = 1;
const firstStudentPresentationWeek = 2;
const lastStudentPresentationWeek = 10;
const studentPaperMeetingCount = lastStudentPresentationWeek - firstStudentPresentationWeek + 1;
const studentPaperPresentationSlots = studentPaperMeetingCount * courseFacts.scheduledPapersPerMeeting;
const paperPresentationsPerStudent = 1;
const studentPaperPresentationAssignments =
  courseFacts.plannedEnrollment * paperPresentationsPerStudent;

export const paperPresentationPlan = {
  plannedEnrollment: courseFacts.plannedEnrollment,
  instructorLedWeek,
  firstStudentPresentationWeek,
  lastStudentPresentationWeek,
  studentPaperMeetingCount,
  papersPerMeeting: courseFacts.scheduledPapersPerMeeting,
  studentPaperPresentationSlots,
  paperPresentationsPerStudent,
  studentPaperPresentationAssignments,
  paperPresentationMinutes,
  paperDiscussionMinutes,
  paperTransitionMinutes,
  paperSlotMinutes,
  papersBeforeBreak,
  papersAfterBreak,
  firstPaperBlockMinutes,
  secondPaperBlockMinutes,
  midMeetingBreakMinutes,
  scheduledPaperMinutesPerMeeting,
  totalPlannedMeetingMinutes,
} as const;

export const presentationGuidance =
  `Week ${instructorLedWeek} is instructor-led: the instructor will present all four papers. Student paper presentations run from Week ${firstStudentPresentationWeek} through Week ${lastStudentPresentationWeek}, with ${courseFacts.scheduledPapersPerMeeting} individual paper presentations each week. The meeting format below applies to the student-led meetings in Weeks ${firstStudentPresentationWeek}–${lastStudentPresentationWeek}.`;

export const presentationWorkload =
  `Each of the ${courseFacts.plannedEnrollment} students will give 1 individual paper presentation. The ${studentPaperPresentationSlots} student presentation slots match the enrollment exactly. The required project presentation is separate and does not count toward this paper presentation.`;

export const presentationRequirements = [
  "State the formal problem, including the data-generating process, architecture or hypothesis class, loss, training rule, and evaluation criterion.",
  "Classify the result as representation, computational complexity, trainability, optimization, learnability, generalization, or certification.",
  "State the main theorem with its assumptions, quantifiers, and important dependence on sample size, dimension, sequence length, width, depth, precision, conditioning, or task complexity.",
  "Explain the principal proof mechanism rather than only restating the theorem.",
  "Identify the assumption that carries the result and explain how closely the formal model corresponds to a modern transformer or large language model.",
  "Distinguish theorem-level conclusions from experimental evidence, conjectures, and informal interpretations.",
  "Explain how the paper advances, limits, contrasts with, or changes the assumptions of the adjacent papers.",
  "End with one precise limitation and one concrete theorem, counterexample, or experiment that would materially strengthen or challenge the result.",
] as const;

export const assessmentSummary =
  "The final grade consists of one paper presentation (40%), the required course project (40%), and class participation (20%).";

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
        "The project may stress-test or challenge an existing theoretical claim.",
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
    "A generic model comparison, benchmark leaderboard, prompt-engineering exercise, or systems implementation is not sufficient by itself.",
  deliverables: [
    "A final written report that clearly separates known results from the student's contribution and provides sufficient technical detail to evaluate correctness.",
    "For empirical projects, reproducible code and configurations.",
    "An individual final presentation during Week 11 or Week 12. The project presentation is assessed as part of the project grade, not as a paper presentation.",
  ],
  evaluationCriteria: [
    "Relevance to the theoretical study of transformers or large language models, including representation, computational complexity, trainability, optimization, learnability, generalization, certification, or reasoning.",
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
    milestone: "Project topic approval",
    deadline: "October 23, 2026",
    description:
      "Submit an ungraded three-to-five-sentence description of the proposed contribution and, for empirical work, the principal experiment. This is an approval checkpoint rather than a separately graded proposal.",
  },
  {
    milestone: "Final project report and reproducibility materials",
    deadline: "November 26, 2026",
    description:
      "The final report and any required code, configurations, data instructions, or other reproducibility materials are due before project presentations begin. This component is worth 30% of the final grade.",
  },
  {
    milestone: "Final project presentation",
    deadline: "November 27 or December 4, 2026",
    description:
      "Each student gives an individual presentation during the assigned project-presentation meeting. The assigned date will be announced after project topics are confirmed. This component is worth 10% of the final grade.",
  },
] as const;

const projectPresentationsByMeeting = [14, 13] as const;
const projectPresentationMinutesByMeeting = [12, 13] as const;
const projectPresentationUsedMinutesByMeeting = [
  projectPresentationsByMeeting[0] * projectPresentationMinutesByMeeting[0],
  projectPresentationsByMeeting[1] * projectPresentationMinutesByMeeting[1],
] as const;
const projectPresentationBufferMinutesByMeeting = [
  courseFacts.meetingDurationMinutes - projectPresentationUsedMinutesByMeeting[0],
  courseFacts.meetingDurationMinutes - projectPresentationUsedMinutesByMeeting[1],
] as const;
const projectPresentationMeetingCount = projectPresentationsByMeeting.length;
const totalProjectPresentationMinutes =
  projectPresentationUsedMinutesByMeeting.reduce((total, minutes) => total + minutes, 0);
const totalProjectMeetingMinutes = projectPresentationMeetingCount * courseFacts.meetingDurationMinutes;

export const projectPresentationPlan = {
  presentationCount: courseFacts.expectedProjectPresentations,
  meetingCount: projectPresentationMeetingCount,
  presentationsByMeeting: projectPresentationsByMeeting,
  minutesPerPresentationByMeeting: projectPresentationMinutesByMeeting,
  usedMinutesByMeeting: projectPresentationUsedMinutesByMeeting,
  bufferMinutesByMeeting: projectPresentationBufferMinutesByMeeting,
  totalPresentationMinutes: totalProjectPresentationMinutes,
  totalAvailableMinutes: totalProjectMeetingMinutes,
  remainingMinutes: totalProjectMeetingMinutes - totalProjectPresentationMinutes,
} as const;

export const projectPresentation = {
  introduction:
    `Weeks 11–12 are reserved for ${courseFacts.expectedProjectPresentations} individual project presentations. Week 11 will have ${projectPresentationsByMeeting[0]} presentations, and Week 12 will have ${projectPresentationsByMeeting[1]}. Presentations will be approximately ${projectPresentationMinutesByMeeting[0]}–${projectPresentationMinutesByMeeting[1]} minutes, including questions. The project presentation does not count toward the required paper presentation.`,
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
} as const;

export const generativeAiPolicy = [
  "Generative-AI tools may be used for coursework in this class.",
  "Students remain fully responsible for the accuracy, originality, and integrity of all submitted work and must be able to explain every mathematical statement, proof step, citation, experimental result, and piece of code. Factual, mathematical, citation, experimental, or coding errors will be graded as errors regardless of whether AI was used.",
] as const;

// Official University policy and support links checked against Waterloo source pages on August 21, 2026.
export const universityPolicies = {
  introduction:
    "This website is a companion to the official University of Waterloo course outline. The official outline is the authoritative source for assessment, deadlines, accommodations, academic integrity, and institutional policies. The links below provide direct access to the principal University resources.",
  officialOutlineLinkText: "View the official Waterloo course outline",
  pendingOfficialOutlineText:
    "The official course-outline link will be added before the first meeting.",
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
  title: "Project Presentations",
} as const;

export const courseModules: readonly CourseModule[] = [
  {
    id: "opening-case-study",
    label: "Instructor-led opening case study",
    title: "Exact Algorithmic Learning, Certification, and Hardness",
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
    id: "projects",
    label: "Module IV",
    title: "Projects",
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
      "Week 1 showed that exact algorithmic behavior can be learned in carefully structured regimes. Week 2 steps back to ask what transformer architectures can compute at all, and why different assumptions yield Turing completeness or severe formal limitations.",
    title: "Computational Expressivity, Formal Languages, and Circuit Classes",
    guidingQuestion:
      "How can Turing completeness coexist with exact formal-language and circuit upper bounds, and which assumptions about depth, precision, masking, recurrence, and positional information explain the difference?",
    topicFocus:
      "Hard-attention Turing completeness, exact star-free language characterization, and finite-precision threshold-circuit upper bounds.",
    subtopics: [
      {
        title: "Part I: Computational universality and exact language characterization",
        description:
          "How hard-attention transformers can simulate general computation under one set of assumptions, while strictly masked hard attention without positional embeddings recognizes exactly the star-free languages under another.",
        paperTitles: [
          "Attention Is Turing Complete",
          "Masked Hard-Attention Transformers Recognize Exactly the Star-Free Languages",
        ],
      },
      {
        title: "Part II: Finite-precision circuit upper bounds",
        description:
          "How saturated floating-point attention expands expressivity beyond unique hard attention while remaining simulable by constant-depth threshold circuits.",
        paperTitles: [
          "Saturated Transformers Are Constant-Depth Threshold Circuits",
        ],
      },
    ],
    papers: [
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
      "Week 2 characterized transformer computational expressivity under different architectural and numerical assumptions. Week 3 asks what depth, parallel communication, and running time are required to realize those computations.",
    title: "Parallel and Fine-Grained Complexity of Transformers",
    guidingQuestion:
      "How do depth, parallel communication, entry magnitudes, and approximation error determine what transformers and self-attention can compute efficiently?",
    topicFocus:
      "Massively Parallel Computation, logarithmic depth, SETH-based lower bounds, and the bounded-entry transition for approximate attention.",
    subtopics: [
      {
        title: "Part I: Parallel depth and communication",
        description:
          "How transformer layers correspond to Massively Parallel Computation rounds and what logarithmic depth adds beyond constant-depth parallelism.",
        paperTitles: [
          "Transformers, Parallel Computation, and Logarithmic Depth",
        ],
      },
      {
        title: "Part II: Fine-grained complexity of attention",
        description:
          "Why exact or approximate attention can require quadratic time and how bounded entries produce a sharp transition to almost-linear approximation.",
        paperTitles: [
          "On the Computational Complexity of Self-Attention",
          "Fast Attention Requires Bounded Entries",
        ],
      },
    ],
    papers: [
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
    title: "Transformer Trainability: Normalization, Depth, and Rank Collapse",
    connection:
      "Efficiently representable transformer computations are useful only if training remains stable. Week 4 studies how normalization, residual structure, and depth govern representations and gradients.",
    guidingQuestion:
      "How do layer normalization, residual structure, and depth determine whether transformer representations and gradients remain stable at initialization and during early training?",
    topicFocus:
      "Pre-LN versus Post-LN, initialization-time gradient scaling, depth-induced token uniformity, vanishing query and key gradients, and residual scaling.",
    subtopics: [
      {
        title: "Part I: Normalization and depth-induced rank collapse",
        description:
          "How normalization placement changes initial gradients and why repeated pure self-attention drives token representations toward rank one.",
        paperTitles: [
          "On Layer Normalization in the Transformer Architecture",
          "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
        ],
      },
      {
        title: "Part II: Gradient consequences and residual scaling",
        description:
          "How token-rank collapse causes query and key gradients to vanish and how depth-dependent residual scaling preserves signal propagation.",
        paperTitles: [
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
      "Why does self-attention favor sparse dependencies, and how does gradient descent select and learn task-relevant tokens?",
    topicFocus:
      "Norm-based sample complexity, implicit max-margin bias, sparse token selection, architectural separation, and out-of-distribution length generalization.",
    subtopics: [
      {
        title: "Part I: Statistical learnability and implicit bias",
        description:
          "Why bounded-norm attention favors sparse dependencies and how gradient descent selects locally optimal tokens through a max-margin bias.",
        paperTitles: [
          "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
          "Max-Margin Token Selection in Attention Mechanism",
        ],
      },
      {
        title: "Part II: Provable token-selection learning and length generalization",
        description:
          "When gradient descent trains a one-layer transformer to learn a sparse selector, separate from fully connected networks, and extrapolate to longer contexts.",
        paperTitles: [
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
    title: "Bayesian and Frequentist Foundations of In-Context Prediction",
    connection:
      "Week 5 studied how training organizes attention around informative tokens. Week 6 asks what statistical inference procedure emerges when those learned attention mechanisms operate over an entire prompt.",
    guidingQuestion:
      "When does next-token pretraining approximate Bayesian inference, how does its error scale with pretraining data and context length, and when is the resulting predictor statistically consistent from a frequentist viewpoint?",
    topicFocus:
      "Latent-concept Bayesian inference, information-theoretic error decomposition, and frequentist consistency of pretrained predictors.",
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
        title: "Part II: Frequentist consistency",
        description:
          "How prior-data fitted predictors can be interpreted without assuming a Bayesian data-generating prior, and which variance and localization conditions are needed for consistency.",
        paperTitles: [
          "Statistical Foundations of Prior-Data Fitted Networks",
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
    ],
  },
  {
    week: 7,
    date: "October 30, 2026",
    connection:
      "Week 6 identified Bayesian and frequentist target descriptions for prompt-conditioned prediction. Week 7 asks whether transformer pretraining reaches such predictors and which optimization dynamics produce them.",
    title: "Optimization and Training Dynamics of In-Context Learning",
    guidingQuestion:
      "Which in-context algorithms minimize the pretraining objective, and under what assumptions does gradient-based pretraining converge to one-step or multi-step learned optimization rules?",
    topicFocus:
      "Population-risk optima, gradient-flow convergence, one-step in-context learning, and multi-step looped optimization.",
    subtopics: [
      {
        title: "Part I: One-step population optima and training",
        description:
          "Which one-step gradient-like predictor minimizes the population objective and when gradient flow trains linear self-attention to implement a useful in-context predictor.",
        paperTitles: [
          "One Step of Gradient Descent Is Provably the Optimal In-Context Learner with One Layer of Linear Self-Attention",
          "Trained Transformers Learn Linear Models In-Context",
        ],
      },
      {
        title: "Part II: Multi-step learned optimization",
        description:
          "How a looped transformer can learn a multi-step preconditioned gradient-descent procedure rather than merely represent one.",
        paperTitles: [
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
      "Week 7 analyzed how training reaches in-context algorithms. Week 8 turns from optimization to finite-sample learnability, task transfer, stability, and minimax rates.",
    title: "Finite-Sample Generalization and Minimax Optimality of In-Context Learning",
    guidingQuestion:
      "Once pretraining has produced an in-context algorithm, how many tasks and prompt examples are needed for it to generalize and attain optimal statistical rates?",
    topicFocus:
      "PAC learnability, algorithmic stability, task transfer, and minimax nonparametric rates.",
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
        title: "Part II: Minimax nonparametric rates",
        description:
          "Whether transformer-based in-context learners can attain statistically optimal rates over rich nonparametric function classes.",
        paperTitles: [
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
      "Week 8 studied direct prompt-to-prediction generalization. Week 9 asks how the sample and computational complexity of learning change when the model generates intermediate reasoning traces autoregressively.",
    title: "Sample Complexity of Autoregressive Chain-of-Thought",
    guidingQuestion:
      "How do observed or latent reasoning traces change the sample and computational complexity of learning, and when can they yield provable sample-efficiency gains?",
    topicFocus:
      "Observed and latent chains of thought, transformer capacity, teacher-forced sample complexity, sparse sequential dependence, and polynomial-versus-exponential learning separations.",
    subtopics: [
      {
        title: "Part I: General framework and tight capacity bounds",
        description:
          "A general learning model for observed and latent reasoning traces, followed by nearly matching transformer capacity and teacher-forced sample-complexity bounds.",
        paperTitles: [
          "A Theory of Learning with Autoregressive Chain of Thought",
          "Tight Sample Complexity of Transformers",
        ],
      },
      {
        title: "Part II: Sample-efficiency gains from sparse reasoning traces",
        description:
          "Revisiting Week 5's sparse-dependence theme, this paper shows in a concrete learning model how intermediate traces can convert an exponential sample requirement into a polynomial one.",
        paperTitles: [
          "From Sparse Dependence to Sparse Attention: Unveiling How Chain-of-Thought Enhances Transformer Sample Efficiency",
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
    ],
  },
  {
    week: 10,
    date: "November 20, 2026",
    connection:
      "Week 9 established how reasoning traces change sample complexity. Week 10 asks which scratchpads, curricula, and self-training procedures overcome barriers on harder or longer problems, returning to Week 1's contrast between structured positive results and learning hardness.",
    title: "Curricula, Scratchpads, and Length Generalization for Reasoning",
    guidingQuestion:
      "Which forms of intermediate supervision, curriculum design, and self-training make compositional reasoning learnable and transferable to harder or longer instances?",
    topicFocus:
      "Globality barriers, scratchpad design, statistical-query lower bounds, easy-to-hard curricula, recursive self-training, and length extrapolation.",
    subtopics: [
      {
        title: "Part I: Learning barriers and easy-to-hard curriculum",
        description:
          "Why direct or hard-only training can fail and how structured scratchpads or easy-to-hard examples overcome formal learning barriers.",
        paperTitles: [
          "How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad",
          "Learning Compositional Functions with Transformers from Easy-to-Hard Data",
        ],
      },
      {
        title: "Part II: Self-training and length generalization",
        description:
          "How structured chain-of-thought training and recursive self-training support extrapolation beyond the original training lengths.",
        paperTitles: [
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
    title: "Project Presentations I",
    papers: [],
  },
  {
    week: 12,
    date: "December 4, 2026",
    title: "Project Presentations II",
    papers: [],
  },
];

export const additionalReadings: readonly CoursePaper[] = [
  paper(
    "Chulhee Yun, Srinadh Bhojanapalli, Ankit Singh Rawat, Sashank J. Reddi, and Sanjiv Kumar",
    "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
    "ICLR 2020",
    "Proves universal approximation of continuous permutation-equivariant sequence-to-sequence maps on compact domains without positional encodings and of arbitrary continuous sequence maps on compact domains with positional encodings.",
    "https://openreview.net/forum?id=ByxRM0Ntvr",
  ),
  paper(
    "William Merrill and Ashish Sabharwal",
    "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
    "TACL 2023",
    "Proves that log-precision transformers with suitably space-bounded feed-forward blocks can be simulated by constant-depth logspace-uniform threshold circuits and derives conditional computational limitations from standard complexity assumptions.",
    "https://aclanthology.org/2023.tacl-1.31/",
  ),
  paper(
    "Jiri Hron, Yasaman Bahri, Jascha Sohl-Dickstein, and Roman Novak",
    "Infinite Attention: NNGP and NTK for Deep Attention Networks",
    "ICML 2020",
    "Establishes rigorous neural-network Gaussian-process and neural-tangent-kernel limits for deep attention networks, shows that standard single-head attention need not become Gaussian at infinite width while multi-head attention converges to a Gaussian process as the number of heads grows, and analyzes positional encodings and layer normalization.",
    "https://proceedings.mlr.press/v119/hron20a.html",
  ),
  paper(
    "Yuandong Tian, Yiping Wang, Beidi Chen, and Simon S. Du",
    "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
    "NeurIPS 2023",
    "Under no-positional-encoding, long-sequence, and decoder-timescale assumptions, rigorously analyzes SGD for one-layer next-token prediction and shows a scan-and-snap dynamic in which attention increasingly favors distinct, high-co-occurrence tokens while downweighting common or lower-co-occurrence tokens, then decelerates after a learning-rate-controlled phase transition, leaving an almost fixed rather than one-hot token mixture.",
    "https://proceedings.neurips.cc/paper_files/paper/2023/hash/e359ebe56ba306b674e8952349c6049e-Abstract-Conference.html",
  ),
  paper(
    "Nick Cannella, Anzo Teh, Yanjun Han, and Yury Polyanskiy",
    "Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining",
    "COLT 2026",
    "For Poisson empirical Bayes, proves that universal pretraining priors achieve near-optimal regret uniformly over test distributions and explains length generalization through fractional-posterior inference.",
    "https://proceedings.mlr.press/v336/cannella26a.html",
  ),
  paper(
    "Yu Huang, Yuan Cheng, and Yingbin Liang",
    "In-Context Convergence of Transformers",
    "ICML 2024",
    "Proves finite-time convergence of gradient descent for a one-layer softmax-attention model on structured in-context regression and characterizes stagewise learning when features occur at imbalanced frequencies.",
    "https://proceedings.mlr.press/v235/huang24d.html",
  ),
  paper(
    "Yu Bai, Fan Chen, Huan Wang, Caiming Xiong, and Song Mei",
    "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
    "NeurIPS 2023",
    "Constructs transformers that implement regression and classification procedures, select among algorithms through in-context validation, and achieve formal statistical guarantees with polynomial pretraining requirements.",
    "https://proceedings.neurips.cc/paper_files/paper/2023/hash/b2e63e36c57e153b9015fece2352a9f9-Abstract-Conference.html",
  ),
  paper(
    "Hongkang Li, Songtao Lu, Pin-Yu Chen, Xiaodong Cui, and Meng Wang",
    "Training Nonlinear Transformers for Chain-of-Thought Inference: A Theoretical Generalization Analysis",
    "ICLR 2025",
    "Quantifies the samples and iterations needed to train nonlinear attention for chain-of-thought inference and proves generalization to unseen tasks under data shift and imperfect or noisy reasoning demonstrations.",
    "https://proceedings.iclr.cc/paper_files/paper/2025/hash/b295b3a940706f431076c86b78907757-Abstract-Conference.html",
  ),
  paper(
    "Nived Rajaraman, Audrey Huang, Miro Dudik, Rob Schapire, Dylan Foster, and Akshay Krishnamurthy",
    "Learning to Reason with Curriculum I: Provable Benefits of Autocurriculum",
    "COLT 2026",
    "Proves that adaptive problem selection can require exponentially fewer supervised reasoning demonstrations than non-adaptive fine-tuning and can decouple reinforcement-learning compute from reference-model quality after a burn-in phase.",
    "https://proceedings.mlr.press/v336/rajaraman26a.html",
  ),
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

export const additionalReadingGroups: readonly AdditionalReadingGroup[] = [
  {
    id: "architecture-expressivity-computation",
    title: "Transformer Architecture, Expressivity, and Computation",
    description:
      "Foundational or complementary papers on universal approximation, initialization, infinite-width limits, signal propagation, formal-language limitations, circuit and parallel complexity, automata shortcuts, and explicitly programmed transformer computation.",
    paperTitles: [
      "Improving Transformer Optimization Through Better Initialization",
      "Transformers Get Stable: An End-to-End Signal Propagation Theory for Language Models",
      "Infinite Attention: NNGP and NTK for Deep Attention Networks",
      "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
      "Theoretical Limitations of Self-Attention in Neural Sequence Models",
      "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
      "Transformers Learn Shortcuts to Automata",
      "Looped Transformers as Programmable Computers",
    ],
  },
  {
    id: "attention-memory-icl-mechanisms",
    title: "Attention, Memory, and In-Context-Learning Mechanisms",
    description:
      "Complementary work on token-composition dynamics, generative self-attention, associative memory, induction mechanisms, Bayesian adaptation, optimization dynamics, algorithm selection, and reusable representations.",
    paperTitles: [
      "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-layer Transformer",
      "From Self-Attention to Markov Models: Unveiling the Dynamics of Generative Transformers",
      "Hopfield Networks Is All You Need",
      "Birth of a Transformer: A Memory Viewpoint",
      "What Learning Algorithm Is In-Context Learning? Investigations with Linear Models",
      "Transformers Learn In-Context by Gradient Descent",
      "In-Context Convergence of Transformers",
      "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
      "Universal Priors: Solving Empirical Bayes via Bayesian Inference and Pretraining",
      "How Do Transformers Learn In-Context Beyond Simple Functions? A Case Study on Learning with Representations",
      "How Do Transformers Learn Topic Structure: Towards a Mechanistic Understanding",
    ],
  },
  {
    id: "reasoning-autoregressive-limitations",
    title: "Reasoning and Autoregressive Limitations",
    description:
      "Complementary theory on chain-of-thought expressivity, nonlinear transformer training for reasoning, adaptive curricula, and statistical-computational barriers in autoregressive learning.",
    paperTitles: [
      "Chain of Thought Empowers Transformers to Solve Inherently Serial Problems",
      "Training Nonlinear Transformers for Chain-of-Thought Inference: A Theoretical Generalization Analysis",
      "Learning to Reason with Curriculum I: Provable Benefits of Autocurriculum",
      "Computational-Statistical Tradeoffs at the Next-Token Prediction Barrier: Autoregressive and Imitation Learning under Misspecification",
    ],
  },
  {
    id: "fine-tuning-preferences-exploration",
    title: "Fine-Tuning, Preference Learning, and Exploration",
    description:
      "Theory of parameter-efficient adaptation, preference optimization, online data, coverage, and exploration with language-model policies.",
    paperTitles: [
      "A Kernel-Based View of Language Model Fine-Tuning",
      "Universality and Limitations of Prompt Tuning",
      "Iterative Preference Learning from Human Feedback: Bridging Theory and Practice for RLHF under KL-Constraint",
      "Exploratory Preference Optimization: Harnessing Implicit Q*-Approximation for Sample-Efficient RLHF",
      "Is a Good Foundation Necessary for Efficient Reinforcement Learning? The Computational Role of the Base Model in Exploration",
      "The Importance of Online Data: Understanding Preference Fine-Tuning via Coverage",
    ],
  },
  {
    id: "reliability-hallucination-provenance",
    title: "Reliability, Hallucination, and Provenance",
    description:
      "Formal limitations on factual prediction and cryptographic methods for identifying generated text.",
    paperTitles: [
      "Calibrated Language Models Must Hallucinate",
      "Undetectable Watermarks for Language Models",
    ],
  },
] as const;
