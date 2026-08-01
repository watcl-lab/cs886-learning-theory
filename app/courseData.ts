export type CoursePaper = {
  authors: string;
  title: string;
  venue: string;
  year: number;
  link: string;
  presentationAngle: string;
};

export type CourseWeek = {
  week: number;
  module: 1 | 2 | 3 | 4 | 5;
  title: string;
  guidingQuestion: string;
  papers: readonly CoursePaper[];
  closingDebate?: string;
};

export type CourseModule = {
  id: CourseWeek["module"];
  title: string;
  weekRange: readonly [number, number];
  description: string;
};

export const courseFacts = {
  code: "CS 886",
  institution: "University of Waterloo",
  title: "Learning Theory for Modern AI",
  subtitle: "Transformers and Large Language Models",
  format: "24-Week Graduate Research Seminar",
  frequency: "One meeting per week",
  presentationsPerMeeting: 4,
  presentationSlots: 96,
  papers: 96,
  organizingPrinciple: "One focused scientific topic per week",
  emphasis: "Theory, mechanisms, generalization, scaling, and alignment",
  termSplitAfterWeek: 12,
} as const;

export const courseSummary =
  "A mathematically oriented course on what transformers and large language models can represent, how they learn, why they generalize, how they reason, and where current theory remains incomplete.";

export const courseDescription = {
  leadQuestions: [
    "Can a transformer learn gradient descent inside its own forward pass?",
    "Why do intermediate reasoning tokens increase computational power?",
    "Are emergent abilities genuine phase transitions or artifacts of evaluation?",
    "When must a calibrated language model hallucinate?",
  ],
  paragraphs: [
    "This research seminar develops a learning-theoretic understanding of transformers and large language models. We will study the inductive biases, optimization dynamics, computational power, generalization properties, and scaling behavior of modern sequence models. Particular attention will be given to in-context learning, chain-of-thought reasoning, test-time computation, data quality, retrieval, preference learning, reliability, and language-model agents.",
    "Each week is organized around one scientific question and four recent research papers. Students will lead paper presentations, audit theoretical assumptions and experimental evidence, compare competing explanations, and identify open problems. The objective is not merely to learn how current systems are built, but to understand what modern AI systems learn, why they learn it, when they generalize, and where existing theory remains inadequate.",
  ],
} as const;

export const courseDesignPrinciples = [
  "96 papers organized into 24 distinct weekly themes",
  "Four presentations per week",
  "A strong concentration of papers from 2022–2025",
  "A small number of deliberate 2020–2021 exceptions that remain foundational",
  "Mostly peer-reviewed papers from major conferences and journals",
  "Work by well-known researchers at leading universities and major research laboratories",
  "At least one established anchor paper in each week, followed by papers that extend, challenge, or reinterpret it",
] as const;

export const courseModules: readonly CourseModule[] = [
  {
    id: 1,
    title: "What Can Transformers Learn?",
    weekRange: [1, 5],
    description:
      "Weeks 1–5 cover inductive bias, approximation, computational power, length generalization, and optimization.",
  },
  {
    id: 2,
    title: "In-Context Learning as a Learning Algorithm",
    weekRange: [6, 11],
    description:
      "Weeks 6–11 cover Bayesian inference, optimization, training dynamics, generalization, richer function classes, and reinforcement learning.",
  },
  {
    id: 3,
    title: "Mechanisms and Reasoning",
    weekRange: [12, 15],
    description:
      "Weeks 12–15 cover circuits, chain-of-thought, test-time computation, mathematics, and formal proof.",
  },
  {
    id: 4,
    title: "Scaling, Data, and External Memory",
    weekRange: [16, 20],
    description:
      "Weeks 16–20 cover scaling laws, emergence, memorization, synthetic data, retrieval, and long context.",
  },
  {
    id: 5,
    title: "Adaptation, Alignment, Reliability, and Agents",
    weekRange: [21, 24],
    description:
      "Weeks 21–24 cover parameter-efficient adaptation, preference learning, hallucination, reward hacking, tool use, and agents.",
  },
] as const;

export const meetingFormat = {
  duration: "Two hours",
  presentationTiming: "Approximately 15 minutes plus 5 minutes of questions",
  agenda: [
    { time: "0–5 minutes", activity: "Provocative opening question or prediction poll" },
    { time: "5–25 minutes", activity: "Presentation 1: common anchor paper" },
    { time: "25–45 minutes", activity: "Presentation 2" },
    { time: "45–65 minutes", activity: "Presentation 3" },
    { time: "65–85 minutes", activity: "Presentation 4" },
    { time: "85–105 minutes", activity: "Cross-paper debate led by the four presenters" },
    { time: "105–115 minutes", activity: "Proof, assumptions, and experimental-evidence audit" },
    {
      time: "115–120 minutes",
      activity: "Class vote: strongest result, weakest assumption, and best open question",
    },
  ],
} as const;

export const readingExpectations = {
  steps: [
    "Everyone reads Paper 1 in depth.",
    "Each student chooses one of Papers 2–4 for a deep read.",
    "Everyone reads the abstract, introduction, main results, and conclusion of all four papers.",
  ],
  preClassSubmission: [
    "The paper’s strongest claim",
    "Its weakest nontrivial assumption",
    "One question that could change the student’s assessment of the result",
  ],
  anchorPolicy:
    "The first paper listed each week is the common anchor. The remaining papers extend, challenge, or reinterpret it.",
  integratorRole:
    "The Paper 4 presenter is also the week’s integrator and closes by answering: “After reading all four papers, what should the field now believe?”",
} as const;

export const presentationRubric = [
  {
    question: "What is the learning problem?",
    guidance: "Define the data-generating process, model class, objective, and evaluation criterion.",
  },
  {
    question: "What exactly is proved or demonstrated?",
    guidance: "State the principal theorem or empirical claim precisely.",
  },
  {
    question: "Which part is representation, optimization, or generalization?",
    guidance:
      "Students must not conflate “there exist transformer weights” with “gradient descent learns those weights.”",
  },
  {
    question: "What is the strongest assumption or experimental limitation?",
    guidance:
      "Examples include linear attention, Gaussian data, population loss, unlimited precision, synthetic tasks, or access to a verifier.",
  },
  {
    question: "What result would change our interpretation?",
    guidance: "End with a concrete experiment, theorem, lower bound, or counterexample.",
  },
] as const;

export const presentationSlideLimit = {
  question: 1,
  modelAndAssumptions: 2,
  mainResult: 2,
  proofOrMechanism: 2,
  evidence: 2,
  weaknessesAndOpenProblems: 1,
  maximumSubstantiveSlides: 10,
} as const;

export const learningOutcomes = [
  "Distinguish expressivity, learnability, optimization, and generalization claims about transformers.",
  "Explain major theoretical accounts of in-context learning.",
  "Analyze how attention, positional information, and intermediate tokens affect computation.",
  "Critically evaluate claims about scaling, emergence, memorization, and synthetic data.",
  "Compare parameter adaptation, retrieval, prompting, and test-time computation.",
  "Formalize preference-learning and reliability questions.",
  "Identify the gap between controlled theoretical models and deployed large language models.",
  "Formulate a research question that could plausibly lead to a publishable theoretical or empirical project.",
] as const;

export const claimLedger = [
  {
    item: "Strongest supported claim",
    example: "Transformers can implement particular optimization algorithms in context.",
  },
  {
    item: "Most important caveat",
    example: "Many results use linear attention and synthetic regression tasks.",
  },
  {
    item: "Active disagreement",
    example: "Whether observed emergence reflects real phase transitions.",
  },
  {
    item: "Best open problem",
    example: "Derive comparable results for trained nonlinear transformers on realistic data.",
  },
] as const;

export const annualRefresh = {
  policy:
    "The fixed core stops at 2025 deliberately: papers published later may initially be too recent to satisfy both the recent and already popular or established criteria reliably.",
  weeks: [5, 10, 14, 19, 23, 24],
  presentationSlot: 4,
  note: "The fourth presentation in these selected weeks can serve as an annually refreshed frontier slot.",
} as const;

export const annualRefreshWeeks = annualRefresh.weeks;

export const courseSchedule: readonly CourseWeek[] = [
  {
    week: 1,
    module: 1,
    title: "Attention Chooses — Inductive Bias, Sparsity, and Semantic Selection",
    guidingQuestion: "What functions does self-attention prefer to learn, before model scale and massive datasets enter the picture?",
    papers: [
      {
        authors: "Benjamin Edelman, Surbhi Goel, Sham Kakade, and Cyril Zhang.",
        title: "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
        venue: "ICML",
        year: 2022,
        link: "https://proceedings.mlr.press/v162/edelman22a/edelman22a.pdf",
        presentationAngle: "Statistical advantages of attention for sparse functions and variable creation.",
      },
      {
        authors: "Hengyu Fu, Tianyu Guo, Yu Bai, and Song Mei.",
        title: "What Can a Single Attention Layer Learn? A Study Through the Random Features Lens",
        venue: "NeurIPS",
        year: 2023,
        link: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/274db6bf1b01d8b4f07feaeb8c46f474-Abstract-Conference.html",
        presentationAngle: "Learnability and approximation with a single attention layer.",
      },
      {
        authors: "Arda Sahiner et al.",
        title: "Unraveling Attention via Convex Duality: Analysis and Interpretations of Vision Transformers",
        venue: "ICML",
        year: 2022,
        link: "https://proceedings.mlr.press/v162/sahiner22a/sahiner22a.pdf",
        presentationAngle: "Convex reformulations and the implicit structure of attention solutions.",
      },
      {
        authors: "Hugo Cui, Freya Behrens, Florent Krzakala, and Lenka Zdeborová.",
        title: "A Phase Transition between Positional and Semantic Learning in a Solvable Model of Dot-Product Attention",
        venue: "NeurIPS",
        year: 2024,
        link: "https://proceedings.neurips.cc/paper_files/paper/2024/file/3fefebc2d4e3c1c6ee9b892bd293117d-Paper-Conference.pdf",
        presentationAngle: "When an attention model switches from positional shortcuts to semantic learning.",
      },
    ],
  },
  {
    week: 2,
    module: 1,
    title: "Can Is Not Will — Universality from Weights to Prompts",
    guidingQuestion: "Does universal approximation explain transformer success, or does it merely establish that success is possible?",
    papers: [
      {
        authors: "Chulhee Yun et al.",
        title: "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
        venue: "ICLR",
        year: 2020,
        link: "https://openreview.net/forum?id=ByxRM0Ntvr",
        presentationAngle: "The foundational transformer universal-approximation theorem and its limitations.",
      },
      {
        authors: "Tokio Kajitsuka and Issei Sato.",
        title: "Are Transformers with One Layer Self-Attention Using Low-Rank Weight Matrices Universal Approximators?",
        venue: "ICLR",
        year: 2024,
        link: "https://openreview.net/forum?id=nJnky5K944",
        presentationAngle: "How little attention depth and rank are needed for universality.",
      },
      {
        authors: "Aleksandar Petrov, Philip Torr, and Adel Bibi.",
        title: "Prompting a Pretrained Transformer Can Be a Universal Approximator",
        venue: "ICML",
        year: 2024,
        link: "https://raw.githubusercontent.com/mlresearch/v235/main/assets/petrov24a/petrov24a.pdf",
        presentationAngle: "Moving universality from trainable weights to prompts.",
      },
      {
        authors: "Takashi Furuya, Maarten de Hoop, and Gabriel Peyré.",
        title: "Transformers Are Universal In-Context Learners",
        venue: "ICLR",
        year: 2025,
        link: "https://openreview.net/forum?id=6S4WQD1LZR",
        presentationAngle: "Universal approximation for mappings from datasets and contexts to predictions.",
      },
    ],
    closingDebate: "Which gap is larger: representation versus optimization, or representation versus statistical efficiency?",
  },
  {
    week: 3,
    module: 1,
    title: "The Computational Frontier — Parallelism, Depth, and Hard Limits",
    guidingQuestion: "What can a bounded-depth transformer compute, and which tasks require more depth, more tokens, or recurrence?",
    papers: [
      {
        authors: "William Merrill, Ashish Sabharwal, and Noah Smith.",
        title: "Saturated Transformers Are Constant-Depth Threshold Circuits",
        venue: "TACL",
        year: 2022,
        link: "https://aclanthology.org/2022.tacl-1.49/",
        presentationAngle: "Connecting transformer computation to circuit complexity.",
      },
      {
        authors: "Clayton Sanford, Daniel Hsu, and Matus Telgarsky.",
        title: "Representational Strengths and Limitations of Transformers",
        venue: "NeurIPS",
        year: 2023,
        link: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/73bf692447f174984f30499ec9b20e04-Abstract-Conference.html",
        presentationAngle: "Formal lower and upper bounds for transformer computation.",
      },
      {
        authors: "Clayton Sanford, Daniel Hsu, and Matus Telgarsky.",
        title: "Transformers, Parallel Computation, and Logarithmic Depth",
        venue: "ICML",
        year: 2024,
        link: "https://proceedings.mlr.press/v235/sanford24a.html",
        presentationAngle: "The relationship between transformer depth and parallel algorithms.",
      },
      {
        authors: "Samy Jelassi, David Brandfonbrener, Sham Kakade, and Eran Malach.",
        title: "Repeat After Me: Transformers Are Better than State Space Models at Copying",
        venue: "ICML",
        year: 2024,
        link: "https://proceedings.mlr.press/v235/jelassi24a.html",
        presentationAngle: "A theoretically clean task separating attention from alternative sequence architectures.",
      },
    ],
  },
  {
    week: 4,
    module: 1,
    title: "Train Short, Test Long — Position and Length Generalization",
    guidingQuestion: "Why can a model solve a task at training lengths but fail catastrophically on longer instances?",
    papers: [
      {
        authors: "Ofir Press, Noah Smith, and Mike Lewis.",
        title: "Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation",
        venue: "ICLR",
        year: 2022,
        link: "https://openreview.net/forum?id=R8sQPpGCv0",
        presentationAngle: "ALiBi and length extrapolation without conventional positional embeddings.",
      },
      {
        authors: "Amirhossein Kazemnejad et al.",
        title: "The Impact of Positional Encoding on Length Generalization in Transformers",
        venue: "NeurIPS",
        year: 2023,
        link: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/4e85362c02172c0c6567ce593122d31c-Abstract-Conference.html",
        presentationAngle: "Comparing positional encodings and identifying when position information hurts extrapolation.",
      },
      {
        authors: "Shanda Li et al.",
        title: "Functional Interpolation for Relative Positions Improves Long Context Transformers",
        venue: "ICLR",
        year: 2024,
        link: "https://openreview.net/forum?id=rR03qFesqk",
        presentationAngle: "Relative-position interpolation as a mechanism for context extension.",
      },
      {
        authors: "Hanseul Cho et al.",
        title: "Position Coupling: Improving Length Generalization of Arithmetic Transformers Using Task Structure",
        venue: "NeurIPS",
        year: 2024,
        link: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/27aa3a0e6d63db269977bb2df5607cb8-Abstract-Conference.html",
        presentationAngle: "Injecting task structure into positional representations.",
      },
    ],
  },
  {
    week: 5,
    module: 1,
    title: "What Gradient Descent Makes Attention Become",
    guidingQuestion: "Among the many functions a transformer can represent, which solution does gradient-based training actually select?",
    papers: [
      {
        authors: "Davoud Ataee Tarzanagh, Yingcong Li, Xuechen Zhang, and Samet Oymak.",
        title: "Max-Margin Token Selection in Attention Mechanism",
        venue: "NeurIPS",
        year: 2023,
        link: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/970f59b22f4c72aec75174aae63c7459-Abstract-Conference.html",
        presentationAngle: "The implicit max-margin bias of attention training.",
      },
      {
        authors: "Yuandong Tian, Yiping Wang, Beidi Chen, and Simon Du.",
        title: "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-Layer Transformer",
        venue: "NeurIPS",
        year: 2023,
        link: "https://proceedings.neurips.cc/paper_files/paper/2023/file/e359ebe56ba306b674e8952349c6049e-Paper-Conference.pdf",
        presentationAngle: "How attention gradually discovers and then commits to token structure.",
      },
      {
        authors: "Itay Lavie, Guy Gur-Ari, and Zohar Ringel.",
        title: "Towards Understanding Inductive Bias in Transformers: A View from Infinity",
        venue: "ICML",
        year: 2024,
        link: "https://proceedings.mlr.press/v235/lavie24a.html",
        presentationAngle: "Infinite-width limits and what they reveal about transformer bias.",
      },
      {
        authors: "Christos Thrampoulidis.",
        title: "Implicit Optimization Bias of Next-Token Prediction in Linear Models",
        venue: "NeurIPS",
        year: 2024,
        link: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/2858e880333b3cd64f8192f13ddcca2f-Abstract-Conference.html",
        presentationAngle: "The optimization geometry induced by next-token prediction.",
      },
    ],
  },
  {
    week: 6,
    module: 2,
    title: "Is In-Context Learning Bayesian?",
    guidingQuestion: "Is a language model implicitly computing a posterior over latent tasks when it learns from examples in its prompt?",
    papers: [
      {
        authors: "Sang Michael Xie, Aditi Raghunathan, Percy Liang, and Tengyu Ma.",
        title: "An Explanation of In-Context Learning as Implicit Bayesian Inference",
        venue: "ICLR",
        year: 2022,
        link: "https://openreview.net/forum?id=RdJVFCHjUMI",
        presentationAngle: "Latent concepts and implicit Bayesian inference over tasks.",
      },
      {
        authors: "Samuel Müller et al.",
        title: "Transformers Can Do Bayesian Inference",
        venue: "ICLR",
        year: 2022,
        link: "https://arxiv.org/abs/2112.10510",
        presentationAngle: "Amortizing Bayesian inference through supervised transformer training.",
      },
      {
        authors: "Madhur Panwar, Kabir Ahuja, and Navin Goyal.",
        title: "In-Context Learning through the Bayesian Prism",
        venue: "ICLR",
        year: 2024,
        link: "https://arxiv.org/abs/2306.04891",
        presentationAngle: "A systematic comparison between Bayesian predictors and trained transformers.",
      },
      {
        authors: "Allan Raventós, Mansheej Paul, Feng Chen, and Surya Ganguli.",
        title: "Pretraining Task Diversity and the Emergence of Non-Bayesian In-Context Learning for Regression",
        venue: "NeurIPS",
        year: 2023,
        link: "https://arxiv.org/abs/2306.15063",
        presentationAngle: "When task diversity pushes a transformer beyond the Bayesian predictor induced by its training distribution.",
      },
    ],
  },
  {
    week: 7,
    module: 2,
    title: "The Transformer as an Optimizer",
    guidingQuestion: "Which optimization algorithm is implemented inside the forward pass?",
    papers: [
      {
        authors: "Ekin Akyürek et al.",
        title: "What Learning Algorithm Is In-Context Learning? Investigations with Linear Models",
        venue: "ICLR",
        year: 2023,
        link: "https://arxiv.org/abs/2211.15661",
        presentationAngle: "Identifying the regression algorithms learned by transformers.",
      },
      {
        authors: "Johannes von Oswald et al.",
        title: "Transformers Learn In-Context by Gradient Descent",
        venue: "ICML",
        year: 2023,
        link: "https://proceedings.mlr.press/v202/von-oswald23a/von-oswald23a.pdf",
        presentationAngle: "Explicit transformer constructions and empirical evidence for gradient-descent-like computation.",
      },
      {
        authors: "Kwangjun Ahn, Xiang Cheng, Hadi Daneshmand, and Suvrit Sra.",
        title: "Transformers Learn to Implement Preconditioned Gradient Descent for In-Context Learning",
        venue: "NeurIPS",
        year: 2023,
        link: "https://openreview.net/forum?id=LziniAXEI9",
        presentationAngle: "Why the learned algorithm may be better than ordinary gradient descent.",
      },
      {
        authors: "Xiang Cheng, Yuxin Chen, and Suvrit Sra.",
        title: "Transformers Implement Functional Gradient Descent to Learn Non-Linear Functions In Context",
        venue: "ICML",
        year: 2024,
        link: "https://proceedings.mlr.press/v235/cheng24a.html",
        presentationAngle: "Extending implicit optimization from linear parameters to nonlinear function spaces.",
      },
    ],
  },
  {
    week: 8,
    module: 2,
    title: "How In-Context Learning Emerges During Training",
    guidingQuestion: "How does gradient descent produce an in-context learning circuit rather than merely fitting the pretraining tasks?",
    papers: [
      {
        authors: "Stephanie Chan et al.",
        title: "Data Distributional Properties Drive Emergent In-Context Learning in Transformers",
        venue: "NeurIPS (oral)",
        year: 2022,
        link: "https://proceedings.neurips.cc/paper_files/paper/2022/hash/77c6ccacfd9962e2307fc64680fc5ace-Abstract-Conference.html",
        presentationAngle: "Which properties of pretraining data cause in-context learning to emerge.",
      },
      {
        authors: "Ruiqi Zhang, Spencer Frei, and Peter Bartlett.",
        title: "Trained Transformers Learn Linear Models In-Context",
        venue: "JMLR",
        year: 2024,
        link: "https://www.jmlr.org/papers/volume25/23-1042/23-1042.pdf",
        presentationAngle: "A rigorous route from gradient-based training to an in-context predictor.",
      },
      {
        authors: "Yu Huang, Yuan Cheng, and Yingbin Liang.",
        title: "In-Context Convergence of Transformers",
        venue: "ICML",
        year: 2024,
        link: "https://openreview.net/forum?id=d0KrzNoApS",
        presentationAngle: "Convergence guarantees for the training of transformer in-context learners.",
      },
      {
        authors: "Aaditya Singh et al.",
        title: "What Needs to Go Right for an Induction Head? A Mechanistic Study of In-Context Learning Circuits and Their Formation",
        venue: "ICML",
        year: 2024,
        link: "https://arxiv.org/abs/2404.07129",
        presentationAngle: "Conditions needed for induction-head circuits to form during training.",
      },
    ],
  },
  {
    week: 9,
    module: 2,
    title: "Generalization and Sample Complexity of In-Context Learners",
    guidingQuestion: "How many tasks, prompts, and examples are needed before an in-context learner generalizes?",
    papers: [
      {
        authors: "Shivam Garg, Dimitris Tsipras, Percy Liang, and Gregory Valiant.",
        title: "What Can Transformers Learn In-Context? A Case Study of Simple Function Classes",
        venue: "NeurIPS",
        year: 2022,
        link: "https://papers.nips.cc/paper_files/paper/2022/hash/c529dba08a146ea8d6cf715ae8930cbe-Abstract-Conference.html",
        presentationAngle: "A controlled empirical framework for studying learnable function classes.",
      },
      {
        authors: "Yingcong Li, M. Emrullah Ildiz, Dimitris Papailiopoulos, and Samet Oymak.",
        title: "Transformers as Algorithms: Generalization and Stability in In-Context Learning",
        venue: "ICML",
        year: 2023,
        link: "https://proceedings.mlr.press/v202/li23l/li23l.pdf",
        presentationAngle: "Algorithmic stability as a route to prompt-level generalization.",
      },
      {
        authors: "Jingfeng Wu et al.",
        title: "How Many Pretraining Tasks Are Needed for In-Context Learning of Linear Regression?",
        venue: "ICLR",
        year: 2024,
        link: "https://arxiv.org/abs/2310.08391",
        presentationAngle: "Sample complexity in the number and diversity of pretraining tasks.",
      },
      {
        authors: "Tong Yang, Yu Huang, Yingbin Liang, and Yuejie Chi.",
        title: "In-Context Learning with Representations: Contextual Generalization of Trained Transformers",
        venue: "NeurIPS",
        year: 2024,
        link: "https://proceedings.neurips.cc/paper_files/paper/2024/file/9bfa0c155653e24120760a5ead819376-Paper-Conference.pdf",
        presentationAngle: "Generalization when examples share a learned representation.",
      },
    ],
  },
  {
    week: 10,
    module: 2,
    title: "Beyond Linear Regression — Algorithm Selection and Representation Learning",
    guidingQuestion: "Does the theory of in-context learning survive once tasks require nonlinear functions, model selection, or shared representations?",
    papers: [
      {
        authors: "Yu Bai et al.",
        title: "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
        venue: "NeurIPS (oral)",
        year: 2023,
        link: "https://proceedings.neurips.cc/paper_files/paper/2023/file/b2e63e36c57e153b9015fece2352a9f9-Paper-Conference.pdf",
        presentationAngle: "Transformers that select and execute statistical learning algorithms from context.",
      },
      {
        authors: "Tianyu Guo et al.",
        title: "How Do Transformers Learn In-Context Beyond Simple Functions? A Case Study on Learning with Representations",
        venue: "ICLR",
        year: 2024,
        link: "https://arxiv.org/abs/2310.10616",
        presentationAngle: "In-context learning when tasks share a latent representation.",
      },
      {
        authors: "Liam Collins et al.",
        title: "In-Context Learning with Transformers: Softmax Attention Adapts to Function Lipschitzness",
        venue: "NeurIPS",
        year: 2024,
        link: "https://proceedings.neurips.cc/paper_files/paper/2024/file/a8633d27d782f66fe660c2fb4bae446e-Paper-Conference.pdf",
        presentationAngle: "A nonparametric interpretation of attention and adaptation to unknown smoothness.",
      },
      {
        authors: "Yue M. Lu et al.",
        title: "Asymptotic Theory of In-Context Learning by Linear Attention",
        venue: "PNAS",
        year: 2025,
        link: "https://www.pnas.org/doi/10.1073/pnas.2502599122",
        presentationAngle: "High-dimensional asymptotics and random-matrix-style characterization of in-context prediction.",
      },
    ],
  },
  {
    week: 11,
    module: 2,
    title: "From Prediction to Decision — In-Context Reinforcement Learning",
    guidingQuestion: "Can a transformer learn not only to predict labels, but also to explore, adapt, and make sequential decisions?",
    papers: [
      {
        authors: "Lili Chen et al.",
        title: "Decision Transformer: Reinforcement Learning via Sequence Modeling",
        venue: "NeurIPS",
        year: 2021,
        link: "https://proceedings.neurips.cc/paper/2021/hash/7f489f642a0ddb10272b5c31057f0663-Abstract.html",
        presentationAngle: "Recasting offline reinforcement learning as conditional sequence prediction.",
      },
      {
        authors: "Michael Laskin et al.",
        title: "In-Context Reinforcement Learning with Algorithm Distillation",
        venue: "ICLR",
        year: 2023,
        link: "https://openreview.net/forum?id=hy0a5MMPUv",
        presentationAngle: "Distilling the learning history of an reinforcement-learning algorithm into a transformer.",
      },
      {
        authors: "Jonathan Lee et al.",
        title: "Supervised Pretraining Can Learn In-Context Reinforcement Learning",
        venue: "NeurIPS",
        year: 2023,
        link: "https://proceedings.neurips.cc/paper_files/paper/2023/file/8644b61a9bc87bf7844750a015feb600-Paper-Conference.pdf",
        presentationAngle: "Whether ordinary supervised objectives can produce adaptive decision-making.",
      },
      {
        authors: "Licong Lin, Yu Bai, and Song Mei.",
        title: "Transformers as Decision Makers: Provable In-Context Reinforcement Learning via Supervised Pretraining",
        venue: "ICLR",
        year: 2024,
        link: "https://openreview.net/forum?id=yN4Wv17ss3",
        presentationAngle: "Provable in-context decision-making from supervised pretraining.",
      },
    ],
  },
  {
    week: 12,
    module: 3,
    title: "Reverse-Engineering the Algorithm — Induction Heads and Transformer Circuits",
    guidingQuestion: "Where is the learned algorithm located, and what constitutes a convincing mechanistic explanation?",
    papers: [
      {
        authors: "Nelson Elhage et al.",
        title: "A Mathematical Framework for Transformer Circuits",
        venue: "Technical report",
        year: 2021,
        link: "https://transformer-circuits.pub/2021/framework/index.html",
        presentationAngle: "The algebraic vocabulary behind transformer-circuit analysis.",
      },
      {
        authors: "Catherine Olsson et al.",
        title: "In-Context Learning and Induction Heads",
        venue: "Technical report",
        year: 2022,
        link: "https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html",
        presentationAngle: "Induction heads as a candidate mechanism for in-context learning.",
      },
      {
        authors: "Kevin Wang et al.",
        title: "Interpretability in the Wild: A Circuit for Indirect Object Identification in GPT-2 Small",
        venue: "ICLR",
        year: 2023,
        link: "https://openreview.net/forum?id=NpsVSN6o4ul",
        presentationAngle: "Identifying and validating a concrete circuit in a trained language model.",
      },
      {
        authors: "David Lindner et al.",
        title: "Tracr: Compiled Transformers as a Laboratory for Interpretability",
        venue: "NeurIPS",
        year: 2023,
        link: "https://arxiv.org/abs/2301.05062",
        presentationAngle: "Using transformers with known ground-truth programs to audit interpretability methods.",
      },
    ],
  },
  {
    week: 13,
    module: 3,
    title: "Chain-of-Thought as Extra Computation",
    guidingQuestion: "Do intermediate reasoning tokens genuinely increase computational power, or merely expose calculations already available internally?",
    papers: [
      {
        authors: "Zhiyuan Li, Hong Liu, Denny Zhou, and Tengyu Ma.",
        title: "Chain of Thought Empowers Transformers to Solve Inherently Serial Problems",
        venue: "ICLR",
        year: 2024,
        link: "https://proceedings.iclr.cc/paper_files/paper/2024/hash/3309b4112c9f04a993f2bbdd0274bba1-Abstract-Conference.html",
        presentationAngle: "How intermediate tokens allow bounded-depth transformers to perform serial computation.",
      },
      {
        authors: "William Merrill and Ashish Sabharwal.",
        title: "The Expressive Power of Transformers with Chain of Thought",
        venue: "ICLR",
        year: 2024,
        link: "https://openreview.net/forum?id=NjNGlPh8Wh",
        presentationAngle: "A complexity-theoretic characterization of computation with reasoning tokens.",
      },
      {
        authors: "Guhao Feng et al.",
        title: "Towards Revealing the Mystery behind Chain of Thought: A Theoretical Perspective",
        venue: "NeurIPS",
        year: 2023,
        link: "https://papers.nips.cc/paper_files/paper/2023/hash/dfc310e81992d2e4cedc09ac47eff13e-Abstract-Conference.html",
        presentationAngle: "Formal explanations of when intermediate reasoning helps.",
      },
      {
        authors: "Emmanuel Abbe, Samy Bengio, Aryo Lotfi, Colin Sandon, and Omid Saremi.",
        title: "How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad",
        venue: "NeurIPS",
        year: 2024,
        link: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/3107e4bdb658c79053d7ef59cbc804dd-Abstract-Conference.html",
        presentationAngle: "Limits of global reasoning and the role of structured scratchpads.",
      },
    ],
  },
  {
    week: 14,
    module: 3,
    title: "Reasoning at Test Time — Sampling, Verification, and Reinforcement Learning",
    guidingQuestion: "When should additional compute be invested in training a larger model, and when should it be spent searching and verifying at inference time?",
    papers: [
      {
        authors: "Xuezhi Wang et al.",
        title: "Self-Consistency Improves Chain of Thought Reasoning in Language Models",
        venue: "ICLR",
        year: 2023,
        link: "https://openreview.net/forum?id=1PL1NIMMrw",
        presentationAngle: "Repeated sampling and agreement as inference-time computation.",
      },
      {
        authors: "Hunter Lightman et al.",
        title: "Let's Verify Step by Step",
        venue: "ICLR",
        year: 2024,
        link: "https://proceedings.iclr.cc/paper_files/paper/2024/file/aca97732e30bcf1303bc22ac3924fd16-Paper-Conference.pdf",
        presentationAngle: "Process supervision versus outcome supervision for mathematical reasoning.",
      },
      {
        authors: "Charlie Snell, Jaehoon Lee, Kelvin Xu, and Aviral Kumar.",
        title: "Scaling LLM Test-Time Compute Optimally Can Be More Effective than Scaling Parameters for Reasoning",
        venue: "ICLR",
        year: 2025,
        link: "https://proceedings.iclr.cc/paper_files/paper/2025/hash/1b623663fd9b874366f3ce019fdfdd44-Abstract-Conference.html",
        presentationAngle: "Compute-optimal allocation of sampling, search, and verification.",
      },
      {
        authors: "Daya Guo et al.",
        title: "DeepSeek-R1 Incentivizes Reasoning in LLMs through Reinforcement Learning",
        venue: "Nature",
        year: 2025,
        link: "https://www.nature.com/articles/s41586-025-09422-z",
        presentationAngle: "Emergence of reasoning behavior under reinforcement learning with verifiable rewards.",
      },
    ],
  },
  {
    week: 15,
    module: 3,
    title: "Learning Mathematics — Quantitative Reasoning and Formal Proof",
    guidingQuestion: "Can language models learn reusable proof and reasoning procedures rather than surface-level mathematical patterns?",
    papers: [
      {
        authors: "Aitor Lewkowycz et al.",
        title: "Solving Quantitative Reasoning Problems with Language Models",
        venue: "NeurIPS",
        year: 2022,
        link: "https://arxiv.org/abs/2206.14858",
        presentationAngle: "Scaling language models for mathematical problem solving.",
      },
      {
        authors: "Stanislas Polu et al.",
        title: "Formal Mathematics Statement Curriculum Learning",
        venue: "ICLR",
        year: 2023,
        link: "https://openreview.net/forum?id=-P7G-8dmSh4",
        presentationAngle: "Curriculum generation and reinforcement learning for formal proof.",
      },
      {
        authors: "Kaiyu Yang et al.",
        title: "LeanDojo: Theorem Proving with Retrieval-Augmented Language Models",
        venue: "NeurIPS",
        year: 2023,
        link: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/4441469427094f8873d0fecb0c4e1cee-Abstract-Datasets_and_Benchmarks.html",
        presentationAngle: "Retrieval, environment interaction, and proof search in Lean.",
      },
      {
        authors: "Zhangir Azerbayev et al.",
        title: "Llemma: An Open Language Model for Mathematics",
        venue: "ICLR",
        year: 2024,
        link: "https://openreview.net/forum?id=4WnqRR915j",
        presentationAngle: "Domain-specialized pretraining and transfer across informal and formal mathematics.",
      },
    ],
  },
  {
    week: 16,
    module: 4,
    title: "Why Bigger Works — Scaling Laws and Compute-Optimal Training",
    guidingQuestion: "What determines the return obtained from an additional unit of parameters, data, or computation?",
    papers: [
      {
        authors: "Jared Kaplan et al.",
        title: "Scaling Laws for Neural Language Models",
        venue: "Technical report",
        year: 2020,
        link: "https://arxiv.org/abs/2001.08361",
        presentationAngle: "The empirical power laws that shaped early large-model scaling.",
      },
      {
        authors: "Jordan Hoffmann et al.",
        title: "Training Compute-Optimal Large Language Models",
        venue: "NeurIPS",
        year: 2022,
        link: "https://proceedings.neurips.cc/paper/2022/file/c1e2faff6f588870935f114ebe04a3e5-Paper-Conference.pdf",
        presentationAngle: "The Chinchilla correction to parameter-heavy scaling.",
      },
      {
        authors: "Yasaman Bahri et al.",
        title: "Explaining Neural Scaling Laws",
        venue: "PNAS",
        year: 2024,
        link: "https://www.pnas.org/doi/10.1073/pnas.2311878121",
        presentationAngle: "Solvable theoretical models that produce power-law learning curves.",
      },
      {
        authors: "Blake Bordelon, Alexander Atanasov, and Cengiz Pehlevan.",
        title: "A Dynamical Model of Neural Scaling Laws",
        venue: "ICML",
        year: 2024,
        link: "https://arxiv.org/abs/2402.01092",
        presentationAngle: "Learning dynamics as an explanation for observed scaling exponents.",
      },
    ],
  },
  {
    week: 17,
    module: 4,
    title: "Emergence or Measurement Artifact? Phase Transitions and Grokking",
    guidingQuestion: "Are abrupt capabilities genuine phase transitions, or can they be created by metrics and evaluation thresholds?",
    papers: [
      {
        authors: "Jason Wei et al.",
        title: "Emergent Abilities of Large Language Models",
        venue: "TMLR",
        year: 2022,
        link: "https://openreview.net/forum?id=yzkSU5zdwD",
        presentationAngle: "The empirical case for abilities that appear discontinuously with scale.",
      },
      {
        authors: "Rylan Schaeffer, Brando Miranda, and Sanmi Koyejo.",
        title: "Are Emergent Abilities of Large Language Models a Mirage?",
        venue: "NeurIPS",
        year: 2023,
        link: "https://arxiv.org/abs/2304.15004",
        presentationAngle: "How nonlinear metrics can manufacture apparently discontinuous emergence.",
      },
      {
        authors: "Alethea Power et al.",
        title: "Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets",
        venue: "Technical report",
        year: 2022,
        link: "https://arxiv.org/abs/2201.02177",
        presentationAngle: "Delayed generalization after training accuracy has saturated.",
      },
      {
        authors: "Neel Nanda et al.",
        title: "Progress Measures for Grokking via Mechanistic Interpretability",
        venue: "ICLR",
        year: 2023,
        link: "https://openreview.net/forum?id=9XFSbDPmdW",
        presentationAngle: "Hidden continuous progress beneath apparently sudden generalization.",
      },
    ],
    closingDebate: "Emergence is real versus emergence is an evaluation artifact.",
  },
  {
    week: 18,
    module: 4,
    title: "What Is Actually Learned? Data Quality, Memorization, and the Long Tail",
    guidingQuestion: "When does scale produce abstraction, and when does it merely produce increasingly comprehensive memorization?",
    papers: [
      {
        authors: "Katherine Lee et al.",
        title: "Deduplicating Training Data Makes Language Models Better",
        venue: "ACL",
        year: 2022,
        link: "https://aclanthology.org/2022.acl-long.577/",
        presentationAngle: "How duplicated data changes memorization and evaluation.",
      },
      {
        authors: "Nicholas Carlini et al.",
        title: "Quantifying Memorization Across Neural Language Models",
        venue: "ICLR",
        year: 2023,
        link: "https://openreview.net/forum?id=TatRHT_1cK",
        presentationAngle: "How memorization varies with model scale, repetition, and context.",
      },
      {
        authors: "Nikhil Kandpal et al.",
        title: "Large Language Models Struggle to Learn Long-Tail Knowledge",
        venue: "ICML",
        year: 2023,
        link: "https://dl.acm.org/doi/10.5555/3618408.3619049",
        presentationAngle: "The relationship between fact frequency and factual recall.",
      },
      {
        authors: "Jeffrey Li et al.",
        title: "DataComp-LM: In Search of the Next Generation of Training Sets for Language Models",
        venue: "NeurIPS",
        year: 2024,
        link: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/19e4ea30dded58259665db375885e412-Abstract-Datasets_and_Benchmarks_Track.html",
        presentationAngle: "Controlled comparison of large-scale data-selection strategies.",
      },
    ],
  },
  {
    week: 19,
    module: 4,
    title: "Synthetic Data Feedback Loops — Self-Improvement or Model Collapse?",
    guidingQuestion: "Can models safely learn from their own outputs, or will rare and high-quality information progressively disappear?",
    papers: [
      {
        authors: "Ilia Shumailov et al.",
        title: "AI Models Collapse When Trained on Recursively Generated Data",
        venue: "Nature",
        year: 2024,
        link: "https://www.nature.com/articles/s41586-024-07566-y",
        presentationAngle: "The statistical mechanism of recursive model collapse.",
      },
      {
        authors: "Sina Alemohammad et al.",
        title: "Self-Consuming Generative Models Go MAD",
        venue: "ICLR",
        year: 2024,
        link: "https://proceedings.iclr.cc/paper_files/paper/2024/file/ebc042e767de551803ccfcc45e2454f5-Paper-Conference.pdf",
        presentationAngle: "Model-autophagy disorder under repeated synthetic-data generations.",
      },
      {
        authors: "Elvis Dohmatob et al.",
        title: "A Tale of Tails: Model Collapse as a Change of Scaling Laws",
        venue: "ICML",
        year: 2024,
        link: "https://proceedings.mlr.press/v235/dohmatob24b.html",
        presentationAngle: "How recursive training changes distribution tails and scaling behavior.",
      },
      {
        authors: "Yunzhen Feng et al.",
        title: "Beyond Model Collapse: Scaling Up with Synthesized Data Requires Verification",
        venue: "ICLR",
        year: 2025,
        link: "https://openreview.net/forum?id=MQXrTMonT1",
        presentationAngle: "Conditions under which verified synthetic data can help rather than degrade learning.",
      },
    ],
  },
  {
    week: 20,
    module: 4,
    title: "Memory Beyond Weights — Retrieval and Effective Long Context",
    guidingQuestion: "Should knowledge be stored in model parameters, supplied in the context window, or retrieved from an external memory?",
    papers: [
      {
        authors: "Patrick Lewis et al.",
        title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
        venue: "NeurIPS",
        year: 2020,
        link: "https://proceedings.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html",
        presentationAngle: "The foundational latent-retrieval formulation of retrieval-augmented generation.",
      },
      {
        authors: "Sebastian Borgeaud et al.",
        title: "Improving Language Models by Retrieving from Trillions of Tokens",
        venue: "ICML",
        year: 2022,
        link: "https://proceedings.mlr.press/v162/borgeaud22a.html",
        presentationAngle: "Trading model parameters for a massive nonparametric datastore.",
      },
      {
        authors: "Nelson Liu et al.",
        title: "Lost in the Middle: How Language Models Use Long Contexts",
        venue: "TACL",
        year: 2024,
        link: "https://aclanthology.org/2024.tacl-1.9/",
        presentationAngle: "Why having access to information does not imply effectively using it.",
      },
      {
        authors: "Weijia Shi et al.",
        title: "REPLUG: Retrieval-Augmented Black-Box Language Models",
        venue: "NAACL",
        year: 2024,
        link: "https://aclanthology.org/2024.naacl-long.463/",
        presentationAngle: "Retrieval augmentation without modifying the language model.",
      },
    ],
  },
  {
    week: 21,
    module: 5,
    title: "Changing a Giant Model Cheaply — Low-Rank Adaptation and Model Editing",
    guidingQuestion: "How much can a pretrained model be changed using a small number of parameters or a localized update?",
    papers: [
      {
        authors: "Edward Hu et al.",
        title: "LoRA: Low-Rank Adaptation of Large Language Models",
        venue: "ICLR",
        year: 2022,
        link: "https://arxiv.org/abs/2106.09685",
        presentationAngle: "Low-rank structure in task-specific parameter updates.",
      },
      {
        authors: "Tim Dettmers et al.",
        title: "QLoRA: Efficient Finetuning of Quantized LLMs",
        venue: "NeurIPS",
        year: 2023,
        link: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/1feb87871436031bdc0f2beaa62a049b-Abstract-Conference.html",
        presentationAngle: "Combining low-rank adaptation with quantized frozen weights.",
      },
      {
        authors: "Kevin Meng et al.",
        title: "Locating and Editing Factual Associations in GPT",
        venue: "NeurIPS",
        year: 2022,
        link: "https://papers.nips.cc/paper_files/paper/2022/hash/6f1d43d5a82a37e89b0665b33bf3a182-Abstract-Conference.html",
        presentationAngle: "Localizing factual associations and editing them through targeted weight updates.",
      },
      {
        authors: "Eric Mitchell et al.",
        title: "Fast Model Editing at Scale",
        venue: "ICLR",
        year: 2022,
        link: "https://openreview.net/pdf?id=0DcZxeWfOPt",
        presentationAngle: "Learning an editor that predicts weight updates for new facts.",
      },
    ],
    closingDebate: "Does successful model editing demonstrate localized knowledge, or merely localized intervention points?",
  },
  {
    week: 22,
    module: 5,
    title: "Learning Human Preferences — RLHF, DPO, and Alternative Objectives",
    guidingQuestion: "Which learning objective best converts pairwise human preferences into desirable model behavior?",
    papers: [
      {
        authors: "Long Ouyang et al.",
        title: "Training Language Models to Follow Instructions with Human Feedback",
        venue: "NeurIPS",
        year: 2022,
        link: "https://proceedings.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html",
        presentationAngle: "The supervised-fine-tuning, reward-modeling, and reinforcement-learning pipeline.",
      },
      {
        authors: "Rafael Rafailov et al.",
        title: "Direct Preference Optimization: Your Language Model Is Secretly a Reward Model",
        venue: "NeurIPS",
        year: 2023,
        link: "https://papers.nips.cc/paper/2023/hash/a85b405ed65c6477a4fe8302b5e06ce7-Abstract-Conference.html",
        presentationAngle: "Eliminating the explicit reward model and online reinforcement-learning stage.",
      },
      {
        authors: "Mohammad Gheshlaghi Azar et al.",
        title: "A General Theoretical Paradigm to Understand Learning from Human Preferences",
        venue: "AISTATS",
        year: 2024,
        link: "https://proceedings.mlr.press/v238/gheshlaghi-azar24a.html",
        presentationAngle: "A broader mathematical framework for preference-optimization objectives.",
      },
      {
        authors: "Kawin Ethayarajh et al.",
        title: "KTO: Model Alignment as Prospect Theoretic Optimization",
        venue: "ICML",
        year: 2024,
        link: "https://arxiv.org/abs/2402.01306",
        presentationAngle: "Learning from desirable and undesirable examples without requiring paired preferences.",
      },
    ],
  },
  {
    week: 23,
    module: 5,
    title: "When Models Sound Certain but Are Wrong — Truth, Calibration, and Reward Hacking",
    guidingQuestion: "Are hallucinations an engineering defect, a data problem, or an unavoidable consequence of learning from finite observations?",
    papers: [
      {
        authors: "Stephanie Lin, Jacob Hilton, and Owain Evans.",
        title: "TruthfulQA: Measuring How Models Mimic Human Falsehoods",
        venue: "ACL",
        year: 2022,
        link: "https://aclanthology.org/2022.acl-long.229/",
        presentationAngle: "Measuring whether language models reproduce common misconceptions.",
      },
      {
        authors: "Adam Tauman Kalai and Santosh Vempala.",
        title: "Calibrated Language Models Must Hallucinate",
        venue: "STOC",
        year: 2024,
        link: "https://dl.acm.org/doi/10.1145/3618260.3649777",
        presentationAngle: "A formal incompatibility between calibration and universal factual correctness.",
      },
      {
        authors: "Sebastian Farquhar, Jannik Kossen, Lorenz Kuhn, and Yarin Gal.",
        title: "Detecting Hallucinations in Large Language Models Using Semantic Entropy",
        venue: "Nature",
        year: 2024,
        link: "https://www.nature.com/articles/s41586-024-07421-0",
        presentationAngle: "Uncertainty over meanings rather than surface token sequences.",
      },
      {
        authors: "Leo Gao, John Schulman, and Jacob Hilton.",
        title: "Scaling Laws for Reward Model Overoptimization",
        venue: "ICML",
        year: 2023,
        link: "https://proceedings.mlr.press/v202/gao23h.html",
        presentationAngle: "Quantifying Goodhart-style failure as optimization pressure increases.",
      },
    ],
  },
  {
    week: 24,
    module: 5,
    title: "The Agentic Turn — Learning to Act, Use Tools, and Self-Correct",
    guidingQuestion: "When does next-token prediction become a policy for interacting with an environment?",
    papers: [
      {
        authors: "Shunyu Yao et al.",
        title: "ReAct: Synergizing Reasoning and Acting in Language Models",
        venue: "ICLR",
        year: 2023,
        link: "https://openreview.net/forum?id=WE_vluYUL-X",
        presentationAngle: "Interleaving reasoning traces with external actions and observations.",
      },
      {
        authors: "Timo Schick et al.",
        title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
        venue: "NeurIPS",
        year: 2023,
        link: "https://arxiv.org/abs/2302.04761",
        presentationAngle: "Self-supervised learning of when and how to call external tools.",
      },
      {
        authors: "Noah Shinn et al.",
        title: "Reflexion: Language Agents with Verbal Reinforcement Learning",
        venue: "NeurIPS",
        year: 2023,
        link: "https://papers.nips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html",
        presentationAngle: "Using linguistic feedback and episodic memory for repeated improvement.",
      },
      {
        authors: "Shishir Patil, Tianjun Zhang, Xin Wang, and Joseph Gonzalez.",
        title: "Gorilla: Large Language Model Connected with Massive APIs",
        venue: "NeurIPS",
        year: 2024,
        link: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/e4c61f578ff07830f5c37378dd3ecb0d-Abstract-Conference.html",
        presentationAngle: "Learning reliable API selection and invocation at scale.",
      },
    ],
    closingDebate: "Are language-model agents genuinely learning policies, or are they fragile compositions of prompting, retrieval, and search?",
  },
] as const;
