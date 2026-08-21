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

export type CourseWeek = {
  week: number;
  date: string;
  title: string;
  guidingQuestion: string;
  topicFocus: string;
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
  expectedProjectPresentations: "approximately 25",
  lastUpdated: "August 21, 2026",
} as const;

export const courseSummary =
  "A graduate research seminar on learning theory for transformers and large language models, culminating in a required course project.";

export const courseDescription = {
  paragraphs: [
    "Learning Theory for Modern AI is a graduate research seminar about how transformers and large language models learn, what they can compute, how they generalize, and why they sometimes fail. Through theoretical papers, we will study self-attention, optimization, expressivity, computational limitations, in-context learning, and reasoning.",
    "The main schedule places particular emphasis on the theory of in-context learning and reasoning. Additional readings connect the central themes to efficient fine-tuning, preference learning, hallucination, watermarking, and other current topics. The course culminates in an individual research project that may develop a new theoretical result or rigorously test an existing theoretical prediction.",
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
  "For every scheduled paper, all students should read at least the abstract, introduction, formal setup, main theorem or principal result, and discussion or limitations. The lead presenter is responsible for the proof details and appendices needed to explain the result accurately. Students are not expected to read every technical appendix of all four weekly papers.";

export const presentationGuidance =
  "Paper discussions take place during Weeks 1–10. Each week contains four scheduled papers.";

export const presentationWorkload =
  "Students should expect one to two paper presentations during the term. Exact paper assignments will be announced after enrollment is known.";

export const meetingFormat = [
  { duration: "30 minutes", activity: "Lead presentation" },
  { duration: "5 minutes", activity: "Open questions and discussion" },
  { duration: "2 minutes", activity: "Transition" },
] as const;

export const meetingFormatNote =
  "Each meeting will also include a short break and a concluding synthesis.";

export const presentationRequirements = [
  "What is the formal problem? State the data-generating process, hypothesis or architecture class, loss, training rule, and test criterion.",
  "What kind of result is obtained? Distinguish representation, optimization, learnability, generalization, and computational-complexity claims.",
  "What is the main theorem? State it precisely enough that the dependence on dimension, sample size, sequence length, width, depth, and conditioning is visible.",
  "What is the proof mechanism? Is the main tool stability, concentration, kernelization, mean-field dynamics, margin maximization, circuit complexity, communication complexity, or an explicit transformer construction?",
  "Which assumption carries the result? Examples include Gaussian tasks, linear attention, population loss, infinite width, bounded precision, realizability, or synthetic data.",
  "How close is the theorem to a modern LLM? Identify exactly which architectural or statistical features are omitted.",
  "What would falsify or materially strengthen the claim? End with a concrete lower bound, counterexample, experiment, or theorem.",
  "Distinguish carefully between what the paper proves, what its experiments suggest, and what the authors conjecture or claim informally.",
  "End with one precise limitation and one concrete theorem, counterexample, or experiment that would materially strengthen or challenge the paper.",
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

export const projectPresentation = {
  introduction:
    "The final two three-hour meetings are reserved for approximately 25 individual project presentations. The planned format is a 10-minute talk, 2 minutes of questions, and a 1-minute transition. The schedule may be adjusted slightly after enrollment and approved group projects are known.",
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
  missedPresentationStatement:
    "A missed presentation with an approved reason will be rescheduled when feasible or replaced by an equivalent technical oral or written assignment.",
  scopeStatement: `The final project report and required reproducibility materials have a ${lateGracePeriodHours}-hour grace period. After that grace period, and in the absence of an approved extension, the project grade is reduced by ${latePenaltyPercentagePoints} percentage points for each additional ${latePenaltyPeriodHours}-hour period or part thereof.`,
  extensionStatement:
    "Extensions should be arranged before the deadline whenever possible. Approved accommodations and University procedures supersede this default policy.",
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
  title: "Project Presentations",
  centralQuestion:
    "What did the projects establish, and which theoretical questions remain open?",
} as const;

// Weeks 1–10 are four-paper theory meetings; Weeks 11–12 are reserved for
// project presentations and contain no scheduled readings.
export const courseSchedule: readonly CourseWeek[] = [
  {
    week: 1,
    date: "September 11, 2026",
    title: "Biases and Optimization of Self-Attention",
    guidingQuestion:
      "What functions and token interactions does self-attention learn efficiently, and which max-margin solutions does gradient descent select?",
    topicFocus: "Rank collapse, Lipschitz stability, implicit bias, and max-margin token selection.",
    papers: [
      paper(
        "Yihe Dong, Jean-Baptiste Cordonnier, and Andreas Loukas",
        "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
        "ICML 2021",
        "Proves rank collapse for deep pure self-attention and isolates a structural reason that residual and feed-forward components matter.",
        "https://proceedings.mlr.press/v139/dong21a.html",
      ),
      paper(
        "Hyunjik Kim, George Papamakarios, and Andriy Mnih",
        "The Lipschitz Constant of Self-Attention",
        "ICML 2021",
        "Characterizes why ordinary dot-product self-attention is not globally Lipschitz and develops Lipschitz alternatives suitable for stability analysis.",
        "https://proceedings.mlr.press/v139/kim21i.html",
      ),
      paper(
        "Daniel Soudry, Elad Hoffer, Mor Shpigel Nacson, Suriya Gunasekar, and Nathan Srebro",
        "The Implicit Bias of Gradient Descent on Separable Data",
        "JMLR 2018",
        "The landmark bridge: proves convergence in direction to the hard-margin separator, providing the template used by later attention analyses.",
        "https://www.jmlr.org/papers/v19/18-188.html",
      ),
      paper(
        "Davoud Ataee Tarzanagh, Yingcong Li, Xuechen Zhang, and Samet Oymak",
        "Max-Margin Token Selection in Attention Mechanism",
        "NeurIPS 2023",
        "Shows that gradient descent on attention parameters converges toward a max-margin token-selection problem and formalizes attention sparsification.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/970f59b22f4c72aec75174aae63c7459-Abstract-Conference.html",
      ),
    ],
  },
  {
    week: 2,
    date: "September 18, 2026",
    title: "Trainability, Expressivity, and Approximation",
    guidingQuestion:
      "Which architectural choices make transformers trainable, and which functions and computations can they represent?",
    topicFocus: "Normalization, initialization, universal approximation, and Turing completeness.",
    subtopics: [
      {
        title: "Part I: Trainability, normalization, and initialization",
        description:
          "How normalization placement and initialization shape gradient flow and stable optimization.",
        paperTitles: [
          "On Layer Normalization in the Transformer Architecture",
          "Improving Transformer Optimization Through Better Initialization",
        ],
      },
      {
        title: "Part II: Approximation and computational expressivity",
        description:
          "What transformers can approximate or compute under explicit architectural and precision assumptions.",
        paperTitles: [
          "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
          "Attention Is Turing Complete",
        ],
      },
    ],
    papers: [
      paper(
        "Ruibin Xiong et al.",
        "On Layer Normalization in the Transformer Architecture",
        "ICML 2020",
        "Explains the gradient behavior of pre-layer-normalized and post-layer-normalized transformers and gives a theoretical account of warmup sensitivity.",
        "https://arxiv.org/abs/2002.04745",
      ),
      paper(
        "Xiao Shi Huang, Felipe Perez, Jimmy Ba, and Maksims Volkovs",
        "Improving Transformer Optimization Through Better Initialization",
        "ICML 2020",
        "Derives signal- and gradient-preserving initialization principles for deep transformers and connects them to stable optimization.",
        "https://proceedings.mlr.press/v119/huang20f.html",
      ),
      paper(
        "Chulhee Yun, Srinadh Bhojanapalli, Ankit Singh Rawat, Sashank J. Reddi, and Sanjiv Kumar",
        "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
        "ICLR 2020",
        "Proves universality for permutation-equivariant sequence maps without positional encodings and for general continuous sequence maps with positional encodings.",
        "https://openreview.net/forum?id=ByxRM0Ntvr",
      ),
      paper(
        "Jorge Perez, Pablo Barcelo, and Javier Marinkovic",
        "Attention Is Turing Complete",
        "JMLR 2021",
        "Shows Turing completeness under explicit precision and architectural assumptions, making clear why representability alone is not learnability.",
        "https://www.jmlr.org/papers/v22/20-302.html",
      ),
    ],
  },
  {
    week: 3,
    date: "September 25, 2026",
    title: "Formal Languages, Logic, and Circuit Complexity",
    guidingQuestion:
      "Which formal languages can transformers recognize, and how do depth, precision, and parallelism constrain them?",
    topicFocus:
      "Self-attention lower bounds, formal-language recognition, threshold circuits, and log-precision limits.",
    papers: [
      paper(
        "Michael Hahn",
        "Theoretical Limitations of Self-Attention in Neural Sequence Models",
        "TACL 2020",
        "Proves limitations of bounded-depth self-attention for parity and hierarchical dependencies under finite precision.",
        "https://aclanthology.org/2020.tacl-1.11/",
      ),
      paper(
        "Andy Yang, David Chiang, and Dana Angluin",
        "Masked Hard-Attention Transformers Recognize Exactly the Star-Free Languages",
        "NeurIPS 2024",
        "Proves that masked hard-attention transformers without positional encodings recognize exactly the star-free languages, via equivalence with linear temporal logic and Boolean RASP.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/13d7f172259b11b230cc5da8768abc5f-Abstract-Conference.html",
      ),
      paper(
        "William Merrill, Ashish Sabharwal, and Noah A. Smith",
        "Saturated Transformers Are Constant-Depth Threshold Circuits",
        "TACL 2022",
        "Places saturated transformers in constant-depth threshold circuits and derives consequences for formal-language recognition.",
        "https://aclanthology.org/2022.tacl-1.49/",
      ),
      paper(
        "William Merrill and Ashish Sabharwal",
        "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
        "TACL 2023",
        "Relates transformer depth and precision to parallel computation, showing limitations under logarithmic precision.",
        "https://arxiv.org/abs/2207.00729",
      ),
    ],
  },
  {
    week: 4,
    date: "October 2, 2026",
    title: "Computational Limits and Programmable Transformers",
    guidingQuestion:
      "Which tasks impose computational lower bounds, and how can transformers implement programs and automata?",
    topicFocus:
      "Attention time complexity, fine-grained lower bounds, RASP program constructions, and computational expressivity.",
    papers: [
      paper(
        "Feyza Duman Keles, Pruthuvi Mahesakya Wijewardena, and Chinmay Hegde",
        "On the Computational Complexity of Self-Attention",
        "ALT 2023",
        "Derives conditional lower bounds for exact and approximate self-attention, clarifying when subquadratic computation is impossible.",
        "https://arxiv.org/abs/2209.04881",
      ),
      paper(
        "Josh Alman and Zhao Song",
        "Fast Attention Requires Bounded Entries",
        "NeurIPS 2023",
        "Proves a sharp transition in approximate softmax-attention complexity: almost-linear time is possible for sufficiently small entries, while larger entries yield a conditional truly-subquadratic lower bound.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/c72861451d6fa9dfa64831102b9bb71a-Abstract-Conference.html",
      ),
      paper(
        "Gail Weiss, Yoav Goldberg, and Eran Yahav",
        "Thinking Like Transformers",
        "ICML 2021",
        "Introduces the RASP programming language and compiles algorithmic sequence operations into transformer-like computations.",
        "https://proceedings.mlr.press/v139/weiss21a.html",
      ),
      paper(
        "Satwik Bhattamishra, Arkil Patel, and Navin Goyal",
        "On the Computational Power of Transformers and Its Implications in Sequence Modeling",
        "CoNLL 2020",
        "Studies which automata and algorithmic computations transformers can simulate and how positional encodings affect power.",
        "https://aclanthology.org/2020.conll-1.37/",
      ),
    ],
  },
  {
    week: 5,
    date: "October 9, 2026",
    title: "Length Generalization and Infinite-Limit Theory",
    guidingQuestion:
      "Which positional structures enable length extrapolation, and what do infinite-width and depthwise signal analyses reveal?",
    topicFocus:
      "Positional expressivity, constructive length generalization, infinite attention kernels, and signal propagation.",
    subtopics: [
      {
        title: "Part I: Positional structure and length generalization",
        description:
          "How positional mechanisms and task structure affect expressivity and extrapolation to longer sequences.",
        paperTitles: [
          "Your Transformer May Not Be as Powerful as You Expect",
          "Position Coupling: Improving Length Generalization of Arithmetic Transformers Using Task Structure",
        ],
      },
      {
        title: "Part II: Infinite-width kernels and signal propagation",
        description:
          "What infinite-width limits and depthwise covariance dynamics reveal about training and rank collapse.",
        paperTitles: [
          "Infinite Attention: NNGP and NTK for Deep Attention Networks",
          "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
        ],
      },
    ],
    papers: [
      paper(
        "Shengjie Luo, Shanda Li, Shuxin Zheng, Tie-Yan Liu, Liwei Wang, and Di He",
        "Your Transformer May Not Be as Powerful as You Expect",
        "NeurIPS 2022",
        "Shows that common relative-position mechanisms impose expressivity limitations and gives constructions that recover lost power.",
        "https://arxiv.org/abs/2205.13401",
      ),
      paper(
        "Hanseul Cho, Jaeyoung Cha, Pranjal Awasthi, Srinadh Bhojanapalli, Anupam Gupta, and Chulhee Yun",
        "Position Coupling: Improving Length Generalization of Arithmetic Transformers Using Task Structure",
        "NeurIPS 2024",
        "Proves an exponential-length advantage for a one-layer transformer when task-relevant tokens share coupled positional identifiers.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/27aa3a0e6d63db269977bb2df5607cb8-Abstract-Conference.html",
      ),
      paper(
        "Jiri Hron, Yasaman Bahri, Jascha Sohl-Dickstein, and Roman Novak",
        "Infinite Attention: NNGP and NTK for Deep Attention Networks",
        "ICML 2020",
        "Derives Gaussian-process and neural-tangent-kernel limits for multi-head attention and identifies scaling requirements.",
        "https://proceedings.mlr.press/v119/hron20a.html",
      ),
      paper(
        "Lorenzo Noci et al.",
        "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
        "NeurIPS 2022",
        "Studies depthwise covariance dynamics and explains how attention rank collapse interacts with residual scaling and initialization.",
        "https://arxiv.org/abs/2206.03126",
      ),
    ],
  },
  {
    week: 6,
    date: "October 23, 2026",
    title: "Memory and Bayesian Theories of In-Context Learning",
    guidingQuestion:
      "How does training form attention-based memories, and when does in-context learning approximate latent-task inference?",
    topicFocus:
      "Hopfield retrieval, memory formation, implicit Bayesian inference, and statistical consistency.",
    papers: [
      paper(
        "Hubert Ramsauer et al.",
        "Hopfield Networks Is All You Need",
        "ICLR 2021",
        "The landmark bridge: identifies modern Hopfield retrieval with the attention update and supplies an energy-based memory interpretation.",
        "https://openreview.net/forum?id=tL89RnzIiCd",
      ),
      paper(
        "Alberto Bietti, Vivien Cabannes, Diane Bouchacourt, Herve Jegou, and Leon Bottou",
        "Birth of a Transformer: A Memory Viewpoint",
        "NeurIPS 2023",
        "Analyzes the stages by which gradient training forms key-query memories and token associations in a shallow transformer.",
        "https://arxiv.org/abs/2306.00802",
      ),
      paper(
        "Sang Michael Xie, Aditi Raghunathan, Percy Liang, and Tengyu Ma",
        "An Explanation of In-Context Learning as Implicit Bayesian Inference",
        "ICLR 2022",
        "Shows that sequence modeling on a mixture of latent concepts can produce approximate Bayesian task inference at test time.",
        "https://openreview.net/forum?id=RdJVFCHjUMI",
      ),
      paper(
        "Thomas Nagler",
        "Statistical Foundations of Prior-Data Fitted Networks",
        "ICML 2023",
        "Gives a frequentist theory for transformer-based prior-data fitted networks, separating variance reduction from localization bias.",
        "https://proceedings.mlr.press/v202/nagler23a.html",
      ),
    ],
  },
  {
    week: 7,
    date: "October 30, 2026",
    title: "In-Context Learning as Optimization",
    guidingQuestion:
      "Which learning algorithm is implemented in a transformer forward pass, and can gradient pretraining provably produce it?",
    topicFocus:
      "Algorithm identification, implicit gradient descent, end-to-end training, and optimal one-step learners.",
    papers: [
      paper(
        "Ekin Akyurek, Dale Schuurmans, Jacob Andreas, Tengyu Ma, and Denny Zhou",
        "What Learning Algorithm Is In-Context Learning? Investigations with Linear Models",
        "ICLR 2023",
        "Compares trained transformers with least-squares, gradient-based, and Bayesian estimators to identify the algorithm implemented in context.",
        "https://openreview.net/forum?id=0g0X4H8yN4I",
      ),
      paper(
        "Johannes von Oswald et al.",
        "Transformers Learn In-Context by Gradient Descent",
        "ICML 2023",
        "Constructs self-attention layers that implement gradient updates and shows trained transformers discover closely related solutions.",
        "https://proceedings.mlr.press/v202/von-oswald23a.html",
      ),
      paper(
        "Ruiqi Zhang, Spencer Frei, and Peter L. Bartlett",
        "Trained Transformers Learn Linear Models In-Context",
        "JMLR 2024",
        "Proves that gradient descent on a trained linear transformer converges to an in-context linear predictor with controlled risk.",
        "https://www.jmlr.org/papers/v25/23-1042.html",
      ),
      paper(
        "Arvind V. Mahankali, Tatsunori Hashimoto, and Tengyu Ma",
        "One Step of Gradient Descent Is Provably the Optimal In-Context Learner with One Layer of Linear Self-Attention",
        "ICLR 2024",
        "Characterizes the global optimum of one-layer linear self-attention and proves its equivalence to a single gradient step under the model.",
        "https://openreview.net/forum?id=8p3fu56lKc",
      ),
    ],
  },
  {
    week: 8,
    date: "November 6, 2026",
    title: "Generalization and Algorithm Selection in In-Context Learning",
    guidingQuestion:
      "How many tasks and examples are needed for in-context learning, and how can a transformer choose algorithms and representations?",
    topicFocus:
      "Stability, PAC learnability, in-context algorithm selection, and tight sample complexity.",
    papers: [
      paper(
        "Yingcong Li, M. Emrullah Ildiz, Dimitris Papailiopoulos, and Samet Oymak",
        "Transformers as Algorithms: Generalization and Stability in In-Context Learning",
        "ICML 2023",
        "Treats a transformer as an algorithm operating on the prompt and derives generalization guarantees through stability.",
        "https://proceedings.mlr.press/v202/li23l.html",
      ),
      paper(
        "Noam Wies, Yoav Levine, and Amnon Shashua",
        "The Learnability of In-Context Learning",
        "NeurIPS 2023",
        "Introduces a PAC framework for pretraining followed by frozen-weight in-context adaptation and proves finite sample-complexity results.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/73950f0eb4ac0925dc71ba2406893320-Abstract-Conference.html",
      ),
      paper(
        "Yu Bai, Fan Chen, Huan Wang, Caiming Xiong, and Song Mei",
        "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
        "NeurIPS 2023",
        "Constructs transformers that implement regression and classification procedures and select algorithms through in-context validation.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/b2e63e36c57e153b9015fece2352a9f9-Abstract-Conference.html",
      ),
      paper(
        "Chenxiao Yang, Nathan Srebro, and Zhiyuan Li",
        "Tight Sample Complexity of Transformers",
        "COLT 2026",
        "Tightly characterizes the VC dimension and sample complexity of depth-L transformers, including chain-of-thought learning, with nearly matching upper and lower bounds.",
        "https://proceedings.mlr.press/v336/yang26a.html",
      ),
    ],
  },
  {
    week: 9,
    date: "November 13, 2026",
    title: "Optimal In-Context Learning and Chain-of-Thought Theory",
    guidingQuestion:
      "What statistical rates can in-context learning achieve, and how do reasoning tokens change computational power and learnability?",
    topicFocus:
      "Training convergence, minimax rates, serial computation, and autoregressive chain-of-thought learnability.",
    papers: [
      paper(
        "Yu Huang, Yuan Cheng, and Yingbin Liang",
        "In-Context Convergence of Transformers",
        "ICML 2024",
        "Proves convergence of gradient training for linear-attention in-context regression under explicit distributional assumptions.",
        "https://proceedings.mlr.press/v235/huang24d.html",
      ),
      paper(
        "Juno Kim, Tai Nakamaki, and Taiji Suzuki",
        "Transformers Are Minimax Optimal Nonparametric In-Context Learners",
        "NeurIPS 2024",
        "Constructs transformer in-context estimators attaining minimax rates over nonparametric function classes.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/c11daad0a48ea5f3c5c6390c7b060720-Abstract-Conference.html",
      ),
      paper(
        "Zhiyuan Li, Hong Liu, Denny Zhou, and Tengyu Ma",
        "Chain of Thought Empowers Transformers to Solve Inherently Serial Problems",
        "ICLR 2024",
        "Proves that generated intermediate tokens allow bounded-depth transformers to solve inherently serial tasks that direct prediction cannot efficiently solve.",
        "https://proceedings.iclr.cc/paper_files/paper/2024/hash/3309b4112c9f04a993f2bbdd0274bba1-Abstract-Conference.html",
      ),
      paper(
        "Nirmit Joshi, Gal Vardi, Adam Block, Surbhi Goel, Zhiyuan Li, Theodor Misiakiewicz, and Nathan Srebro",
        "A Theory of Learning with Autoregressive Chain of Thought",
        "COLT 2025",
        "Formalizes learning with observed and latent chains of thought, derives sample and computational complexity from properties such as VC dimension, and shows how time invariance can remove dependence on chain length from sample complexity.",
        "https://proceedings.mlr.press/v291/joshi25a.html",
      ),
    ],
  },
  {
    week: 10,
    date: "November 20, 2026",
    title: "Reasoning Generalization and Misspecified Next-Token Prediction",
    guidingQuestion:
      "When are scratchpads or easy-to-hard curricula necessary for reasoning, and how do length generalization and misspecification shape next-token prediction?",
    topicFocus:
      "Globality barriers, curriculum lower bounds, misspecification tradeoffs, and length generalization.",
    papers: [
      paper(
        "Emmanuel Abbe, Samy Bengio, Aryo Lotfi, Colin Sandon, and Omid Saremi",
        "How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad",
        "NeurIPS 2024",
        "Introduces a globality barrier for learning certain reasoning tasks and proves how structured scratchpads can overcome it.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/3107e4bdb658c79053d7ef59cbc804dd-Abstract-Conference.html",
      ),
      paper(
        "Zixuan Wang, Eshaan Nichani, Alberto Bietti, Alex Damian, Daniel Hsu, Jason D. Lee, and Denny Wu",
        "Learning Compositional Functions with Transformers from Easy-to-Hard Data",
        "COLT 2025",
        "Proves an exponential statistical-query lower bound for learning a compositional task from hard instances alone, while gradient descent on an O(log k)-depth transformer learns it with polynomial resources from suitable easy-to-hard or mixed curricula.",
        "https://proceedings.mlr.press/v291/wang25a.html",
      ),
      paper(
        "Dhruv Rohatgi, Adam Block, Audrey Huang, Akshay Krishnamurthy, and Dylan J. Foster",
        "Computational-Statistical Tradeoffs at the Next-Token Prediction Barrier: Autoregressive and Imitation Learning under Misspecification",
        "COLT 2025 extended abstract",
        "Shows that next-token-prediction-style objectives incur an Ω(H) approximation barrier under misspecification, while stronger procedures expose explicit tradeoffs between information, computation, and sequence-length-dependent error amplification.",
        "https://proceedings.mlr.press/v291/rohatgi25a.html",
      ),
      paper(
        "Yu Huang, Zixin Wen, Aarti Singh, Yuejie Chi, and Yuxin Chen",
        "Transformers Provably Learn Chain-of-Thought Reasoning with Length Generalization",
        "NeurIPS 2025",
        "Proves optimization and length-generalization guarantees for transformers trained on structured state-tracking tasks, and analyzes attention concentration and recursive self-training.",
        "https://proceedings.neurips.cc/paper_files/paper/2025/hash/b86a195e70f27017c514fa0e5f80595f-Abstract-Conference.html",
      ),
    ],
  },
  {
    week: 11,
    date: "November 27, 2026",
    title: "Project Presentations",
    guidingQuestion: projectPresentationSchedule.centralQuestion,
    topicFocus:
      "Final-project presentations and course synthesis. There are no assigned paper presentations during these meetings.",
    papers: [],
  },
  {
    week: 12,
    date: "December 4, 2026",
    title: "Project Presentations",
    guidingQuestion: projectPresentationSchedule.centralQuestion,
    topicFocus:
      "Final-project presentations and course synthesis. There are no assigned paper presentations during these meetings.",
    papers: [],
  },
];

export const additionalReadings: readonly CoursePaper[] = [
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
