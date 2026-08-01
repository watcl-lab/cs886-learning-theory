export type CoursePaper = {
  authors: string;
  title: string;
  publication: string;
  impact: string;
  presentationFocus: string;
  link: string;
};

export type CourseWeek = {
  week: number;
  title: string;
  guidingQuestion: string;
  topicFocus: string;
  papers: readonly CoursePaper[];
};

export const courseFacts = {
  code: "CS 886",
  institution: "University of Waterloo",
  title: "Learning Theory for Modern AI",
  subtitle: "Transformers and Large Language Models",
  format: "Computational Learning Theory Research Seminar",
  duration: "24 weekly meetings",
  frequency: "One meeting per week",
  weeklyOrganization: "One theoretical topic per meeting",
  presentationsPerMeeting: 4,
  presentationSlots: 96,
  papers: 96,
  selectionEmphasis: "Theorems, assumptions, proof ideas, and lower bounds",
} as const;

export const courseSummary =
  "A theorem-first course on generalization, optimization, expressivity, in-context learning, scaling, reasoning, memorization, calibration, preference learning, and adaptation in transformers and large language models.";

export const courseDescription = {
  paragraphs: [
    "Learning Theory for Modern AI: Transformers and Large Language Models is a theorem-first graduate research seminar on the computational and statistical principles underlying modern sequence models. The course studies why heavily overparameterized networks generalize, what gradient descent implicitly selects, what transformers can and cannot compute, how in-context learning emerges, and whether transformer forward passes implement recognizable learning algorithms. Later topics include scaling laws, phase transitions, chain-of-thought computation, memorization, calibration, synthetic-data collapse, preference learning, and low-dimensional adaptation.",
    "Each weekly meeting is organized around one theoretical topic and four influential papers. Student presentations emphasize formal problem statements, theorem strength, proof mechanisms, assumptions, and the gap between tractable models and real large language models. The goal is not to survey every LLM application, but to understand what modern AI systems can learn, why they learn it, when they generalize, and which questions remain open.",
  ],
} as const;

export const courseScope = {
  introduction:
    "This is a computational learning theory course, not a general survey of large-language-model systems. The schedule excludes application-driven weeks on agents, retrieval pipelines, benchmarks, prompt engineering, efficient serving, and model releases.",
  inclusionCriteria: [
    "A theorem on learnability, sample complexity, stability, generalization, or optimization",
    "An upper or lower bound on transformer expressivity or computational complexity",
    "An analytically tractable model of in-context learning, scaling, emergence, memorization, calibration, preference learning, or adaptation",
    "A field-defining empirical result that is indispensable for motivating a major theoretical literature",
  ],
  progression:
    "The first five weeks provide the modern theory needed to study extremely overparameterized models. Weeks 6\u201324 then concentrate directly on transformers and large language models.",
} as const;

export const courseStructure = {
  description:
    "Each weekly meeting is organized around one theoretical topic and four influential papers, one for each presentation slot.",
  anchorPolicy:
    "The first paper each week is the recommended common anchor. Every student reads it in depth; each presenter additionally takes primary responsibility for one of the four papers.",
} as const;

export const courseDesignPrinciples = [
  {
    title: "Theory first",
    description:
      "Constructive existence results are distinguished from optimization and learnability results. Empirical papers appear only as high-impact anchors for a theoretical question.",
  },
  {
    title: "Citation prominence",
    description:
      "Priority is given to papers with substantial citation uptake relative to publication year. The list uses an age-adjusted citation screen based on citation evidence available on 1 August 2026. The intended floor for papers from 2023\u20132025 is roughly 100 citations in at least one major bibliographic index; older readings are expected to have substantially more. The labels are qualitative rather than exact cross-index totals: Landmark, Highly cited, Established, and Strong recent uptake. Counts differ across Google Scholar, Semantic Scholar, ACM, OpenReview, ACL Anthology, and publisher indexes.",
  },
  {
    title: "Research provenance",
    description:
      "The schedule emphasizes leading theoretical groups at Berkeley, Stanford, MIT, Princeton, Harvard, Columbia, NYU, University of Washington, Carnegie Mellon, Oxford, EPFL, ETH, Hebrew University, and comparable institutions. A limited number of field-defining technical reports from major research laboratories are retained when no university paper has comparable influence.",
  },
  {
    title: "Recency with principled exceptions",
    description:
      "Most transformer- and LLM-specific papers are from 2020\u20132024. Earlier papers are retained only when they are foundational computational-learning-theory results still used throughout the modern literature.",
  },
] as const;

export const meetingFormat = {
  duration: "Two hours",
  introduction: "The recommended two-hour weekly meeting is organized as follows.",
  agenda: [
    {
      time: "0\u201310 minutes",
      activity:
        "Instructor framing: formal learning problem, notation, and the week's central question",
    },
    { time: "10\u201330 minutes", activity: "Presentation 1: common anchor paper" },
    { time: "30\u201350 minutes", activity: "Presentation 2" },
    { time: "50\u201370 minutes", activity: "Presentation 3" },
    { time: "70\u201390 minutes", activity: "Presentation 4" },
    {
      time: "90\u2013108 minutes",
      activity: "Cross-paper theorem and assumption comparison",
    },
    {
      time: "108\u2013118 minutes",
      activity:
        "Proof audit: what is proved, what is constructed, and what is only observed empirically?",
    },
    {
      time: "118\u2013120 minutes",
      activity: "Class vote on the most important open problem",
    },
  ],
} as const;

export const readingExpectations = {
  introduction:
    "Before class, each student submits a short note stating the following four items.",
  steps: [
    "Every student reads the first paper each week, the recommended common anchor, in depth.",
    "Each presenter additionally takes primary responsibility for one of the four papers.",
  ],
  preClassSubmission: [
    "The formal learning problem",
    "The strongest theorem or empirical claim",
    "The assumption most responsible for tractability",
    "One conjecture or counterexample suggested by the paper",
  ],
  anchorPolicy:
    "The first paper each week is the recommended common anchor. Every student reads it in depth.",
} as const;

export const presentationGuidance =
  "Each presentation should be organized around the learning-theory content rather than a chronological summary of the paper. A useful maximum is ten substantive slides: one for the question, two for the formal model, two for the main theorem, two for the proof idea, one for evidence, one for limitations, and one for an open problem.";

export const presentationRequirements = [
  "What is the formal problem? State the data-generating process, hypothesis or architecture class, loss, training rule, and test criterion.",
  "What kind of result is obtained? Distinguish representation, optimization, learnability, generalization, and computational-complexity claims.",
  "What is the main theorem? State it precisely enough that the dependence on dimension, sample size, sequence length, width, depth, and conditioning is visible.",
  "What is the proof mechanism? Is the main tool stability, concentration, kernelization, mean-field dynamics, margin maximization, circuit complexity, communication complexity, or an explicit transformer construction?",
  "Which assumption carries the result? Examples include Gaussian tasks, linear attention, population loss, infinite width, bounded precision, realizability, or synthetic data.",
  "How close is the theorem to a modern LLM? Identify exactly which architectural or statistical features are omitted.",
  "What would falsify or materially strengthen the claim? End with a concrete lower bound, counterexample, experiment, or theorem.",
] as const;

export const presentationSlideLimit = {
  maximumSubstantiveSlides: 10,
} as const;

export const claimDistinctions = [
  "Representation",
  "Optimization",
  "Learnability",
  "Generalization",
  "Computational complexity",
] as const;

export const suggestedAssessment = [
  {
    component: "Paper presentation",
    weight: "25%",
    standard:
      "Technical accuracy, theorem statement, proof insight, and comparison with the other weekly readings",
  },
  {
    component: "Weekly reading notes",
    weight: "20%",
    standard: "Clear identification of assumptions, claims, and unresolved questions",
  },
  {
    component: "Discussion and theorem audits",
    weight: "15%",
    standard:
      "Constructive criticism and ability to distinguish theorem strength from rhetoric",
  },
  {
    component: "Mid-course synthesis",
    weight: "15%",
    standard:
      "A structured comparison of at least two theoretical explanations of the same phenomenon",
  },
  {
    component: "Final research proposal",
    weight: "25%",
    standard:
      "A precise open problem with a plausible theorem, lower bound, or controlled experiment",
  },
] as const;

export const learningOutcomes = [
  "Distinguish expressivity, optimization, learnability, and generalization results",
  "Analyze overparameterized learning through interpolation, implicit bias, kernels, and feature learning",
  "State major upper and lower bounds for transformer computation",
  "Compare Bayesian, optimization-based, and algorithm-learning theories of in-context learning",
  "Evaluate theoretical claims about scaling, emergence, chain-of-thought, memorization, calibration, synthetic data, preferences, and fine-tuning",
  "Identify the precise gap between a tractable theoretical model and a deployed large language model",
  "Formulate a credible research problem in computational learning theory for modern AI",
] as const;

export const annualUpdateNote =
  "Citation counts and frontier topics change. The stable core of this syllabus should remain the theorem-heavy papers above. When refreshing the course, replace a paper only when a newer work satisfies all three conditions: it addresses the same formal learning question, has clearly stronger theory or substantially broader assumptions, and has accumulated enough independent uptake to be more than a short-lived frontier result.";

export const courseSchedule: readonly CourseWeek[] = [
  {
    "week": 1,
    "title": "Modern Generalization in Overparameterized Models",
    "guidingQuestion": "How can interpolation coexist with good test performance, and what replaces the classical bias\u2013variance picture in the overparameterized regime?",
    "topicFocus": "Foundational computational and statistical learning theory for the parameter regimes in which modern transformers are trained.",
    "papers": [
      {
        "authors": "Mikhail Belkin, Daniel Hsu, Siyuan Ma, and Soumik Mandal",
        "title": "Reconciling Modern Machine-Learning Practice and the Classical Bias\u2013Variance Trade-Off",
        "publication": "PNAS 2019",
        "impact": "Landmark",
        "presentationFocus": "The double-descent risk curve and why interpolation need not imply poor generalization.",
        "link": "https://arxiv.org/abs/1812.11118"
      },
      {
        "authors": "Peter L. Bartlett, Philip M. Long, Gabor Lugosi, and Alexander Tsigler",
        "title": "Benign Overfitting in Linear Regression",
        "publication": "PNAS 2020",
        "impact": "Landmark",
        "presentationFocus": "Necessary and sufficient spectral conditions under which the minimum-norm interpolator generalizes.",
        "link": "https://arxiv.org/abs/1906.11300"
      },
      {
        "authors": "Preetum Nakkiran et al.",
        "title": "Deep Double Descent: Where Bigger Models and More Data Hurt",
        "publication": "ICLR 2020",
        "impact": "Landmark",
        "presentationFocus": "Model-wise, sample-wise, and epoch-wise double descent in modern learning systems.",
        "link": "https://openreview.net/forum?id=B1g5sA4twr"
      },
      {
        "authors": "Trevor Hastie, Andrea Montanari, Saharon Rosset, and Ryan Tibshirani",
        "title": "Surprises in High-Dimensional Ridgeless Least Squares Interpolation",
        "publication": "Annals of Statistics 2022",
        "impact": "Highly cited",
        "presentationFocus": "Exact high-dimensional risk formulas for ridgeless interpolation and their implications for modern overparameterization.",
        "link": "https://arxiv.org/abs/1903.08560"
      }
    ]
  },
  {
    "week": 2,
    "title": "Implicit Bias of Gradient Methods",
    "guidingQuestion": "When many interpolating solutions exist, which one is selected by gradient descent and why can that choice generalize?",
    "topicFocus": "Optimization algorithms act as implicit regularizers; this week develops the margin and geometry viewpoints used throughout modern learning theory.",
    "papers": [
      {
        "authors": "Daniel Soudry, Elad Hoffer, Mor Shpigel Nacson, Suriya Gunasekar, and Nathan Srebro",
        "title": "The Implicit Bias of Gradient Descent on Separable Data",
        "publication": "JMLR 2018",
        "impact": "Landmark",
        "presentationFocus": "Gradient descent on logistic loss converges in direction to the hard-margin support-vector-machine solution.",
        "link": "https://www.jmlr.org/papers/v19/18-188.html"
      },
      {
        "authors": "Suriya Gunasekar, Jason D. Lee, Daniel Soudry, and Nathan Srebro",
        "title": "Characterizing Implicit Bias in Terms of Optimization Geometry",
        "publication": "ICML 2018",
        "impact": "Highly cited",
        "presentationFocus": "How mirror descent and parameterization determine the norm or geometry implicitly minimized.",
        "link": "https://proceedings.mlr.press/v80/gunasekar18a.html"
      },
      {
        "authors": "Kaifeng Lyu and Jian Li",
        "title": "Gradient Descent Maximizes the Margin of Homogeneous Neural Networks",
        "publication": "ICLR 2020",
        "impact": "Highly cited",
        "presentationFocus": "Margin maximization for homogeneous deep networks under gradient flow and gradient descent.",
        "link": "https://openreview.net/forum?id=SJeLIgBKPS"
      },
      {
        "authors": "Lenaic Chizat and Francis Bach",
        "title": "Implicit Bias of Gradient Descent for Wide Two-Layer Neural Networks Trained with the Logistic Loss",
        "publication": "COLT 2020",
        "impact": "Established",
        "presentationFocus": "A function-space max-margin characterization in the infinite-width, feature-learning regime.",
        "link": "https://proceedings.mlr.press/v125/chizat20a.html"
      }
    ]
  },
  {
    "week": 3,
    "title": "Neural Tangent Kernels and Overparameterized Optimization",
    "guidingQuestion": "When and why does gradient descent find a global solution in a highly nonconvex neural-network objective?",
    "topicFocus": "The kernel and overparameterization frameworks that launched much of the modern theory of optimization and generalization in deep learning.",
    "papers": [
      {
        "authors": "Arthur Jacot, Franck Gabriel, and Clement Hongler",
        "title": "Neural Tangent Kernel: Convergence and Generalization in Neural Networks",
        "publication": "NeurIPS 2018",
        "impact": "Landmark",
        "presentationFocus": "The infinite-width kernel governing gradient-flow dynamics and its consequences for training and generalization.",
        "link": "https://arxiv.org/abs/1806.07572"
      },
      {
        "authors": "Jaehoon Lee et al.",
        "title": "Wide Neural Networks of Any Depth Evolve as Linear Models under Gradient Descent",
        "publication": "NeurIPS 2019",
        "impact": "Landmark",
        "presentationFocus": "A precise linearization of wide-network training around initialization.",
        "link": "https://arxiv.org/abs/1902.06720"
      },
      {
        "authors": "Simon S. Du, Jason D. Lee, Haochuan Li, Liwei Wang, and Xiyu Zhai",
        "title": "Gradient Descent Finds Global Minima of Deep Neural Networks",
        "publication": "ICML 2019",
        "impact": "Landmark",
        "presentationFocus": "Polynomial-time convergence of gradient descent for overparameterized deep networks.",
        "link": "https://arxiv.org/abs/1811.03804"
      },
      {
        "authors": "Zeyuan Allen-Zhu, Yuanzhi Li, and Zhao Song",
        "title": "A Convergence Theory for Deep Learning via Over-Parameterization",
        "publication": "ICML 2019",
        "impact": "Landmark",
        "presentationFocus": "A general convergence framework for stochastic gradient methods on sufficiently wide deep networks.",
        "link": "https://arxiv.org/abs/1811.03962"
      }
    ]
  },
  {
    "week": 4,
    "title": "Feature Learning Beyond the Kernel Regime",
    "guidingQuestion": "When does a network genuinely learn representations rather than behave like a fixed kernel?",
    "topicFocus": "Mean-field and feature-learning limits that expose what tangent-kernel analyses miss about modern networks.",
    "papers": [
      {
        "authors": "Lenaic Chizat, Edouard Oyallon, and Francis Bach",
        "title": "On Lazy Training in Differentiable Programming",
        "publication": "NeurIPS 2019",
        "impact": "Highly cited",
        "presentationFocus": "A scaling-based separation between lazy kernel behavior and nontrivial feature learning.",
        "link": "https://arxiv.org/abs/1812.07956"
      },
      {
        "authors": "Song Mei, Andrea Montanari, and Phan-Minh Nguyen",
        "title": "A Mean Field View of the Landscape of Two-Layer Neural Networks",
        "publication": "PNAS 2018",
        "impact": "Highly cited",
        "presentationFocus": "Distributional dynamics for infinitely wide two-layer networks and global optimization in mean field.",
        "link": "https://arxiv.org/abs/1804.06561"
      },
      {
        "authors": "Grant M. Rotskoff and Eric Vanden-Eijnden",
        "title": "Parameters as Interacting Particles: Long Time Convergence and Asymptotic Error Scaling of Neural Networks",
        "publication": "NeurIPS 2018",
        "impact": "Established",
        "presentationFocus": "A particle-system interpretation of neural-network training and its mean-field limit.",
        "link": "https://arxiv.org/abs/1805.00915"
      },
      {
        "authors": "Greg Yang and Edward J. Hu",
        "title": "Feature Learning in Infinite-Width Neural Networks",
        "publication": "ICML 2021",
        "impact": "Established",
        "presentationFocus": "The maximal-update parameterization and an infinite-width limit that retains representation learning.",
        "link": "https://arxiv.org/abs/2011.14522"
      }
    ]
  },
  {
    "week": 5,
    "title": "Generalization Bounds for Deep Networks",
    "guidingQuestion": "Which complexity measures can explain generalization in networks with many more parameters than examples?",
    "topicFocus": "Margin, norm, PAC-Bayes, compression, and impossibility results for uniform-convergence explanations.",
    "papers": [
      {
        "authors": "Peter L. Bartlett, Dylan J. Foster, and Matus Telgarsky",
        "title": "Spectrally-Normalized Margin Bounds for Neural Networks",
        "publication": "NeurIPS 2017",
        "impact": "Landmark",
        "presentationFocus": "A margin bound controlled by products and sums of spectral and Frobenius norms.",
        "link": "https://arxiv.org/abs/1706.08498"
      },
      {
        "authors": "Behnam Neyshabur, Srinadh Bhojanapalli, David McAllester, and Nathan Srebro",
        "title": "A PAC-Bayesian Approach to Spectrally-Normalized Margin Bounds for Neural Networks",
        "publication": "ICLR 2018",
        "impact": "Landmark",
        "presentationFocus": "PAC-Bayes derivation of norm- and margin-sensitive deep-network generalization bounds.",
        "link": "https://arxiv.org/abs/1707.09564"
      },
      {
        "authors": "Sanjeev Arora, Rong Ge, Behnam Neyshabur, and Yi Zhang",
        "title": "Stronger Generalization Bounds for Deep Nets via a Compression Approach",
        "publication": "ICML 2018",
        "impact": "Highly cited",
        "presentationFocus": "Compression as a route from noise stability to nonvacuous generalization guarantees.",
        "link": "https://arxiv.org/abs/1802.05296"
      },
      {
        "authors": "Vaishnavh Nagarajan and J. Zico Kolter",
        "title": "Uniform Convergence May Be Unable to Explain Generalization in Deep Learning",
        "publication": "NeurIPS 2019",
        "impact": "Highly cited",
        "presentationFocus": "Lower bounds showing why standard uniform-convergence analyses can fail on interpolating networks.",
        "link": "https://arxiv.org/abs/1902.04742"
      }
    ]
  },
  {
    "week": 6,
    "title": "Transformer Expressivity and Universality",
    "guidingQuestion": "Which sequence-to-sequence maps and programs can transformers represent in principle?",
    "topicFocus": "Constructive upper bounds, universality, program compilation, and recurrent-depth extensions of the transformer architecture.",
    "papers": [
      {
        "authors": "Chulhee Yun et al.",
        "title": "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
        "publication": "ICLR 2020",
        "impact": "Highly cited",
        "presentationFocus": "A universal-approximation theorem separating the roles of attention and feed-forward layers.",
        "link": "https://openreview.net/forum?id=ByxRM0Ntvr"
      },
      {
        "authors": "Jorge P\u00e9rez, Pablo Barcel\u00f3, and Javier Marinkovic",
        "title": "Attention Is Turing Complete",
        "publication": "JMLR 2021",
        "impact": "Established",
        "presentationFocus": "A constructive analysis of the assumptions under which attention architectures simulate arbitrary computation.",
        "link": "https://www.jmlr.org/papers/v22/20-302.html"
      },
      {
        "authors": "Gail Weiss, Yoav Goldberg, and Eran Yahav",
        "title": "Thinking Like Transformers",
        "publication": "ICML 2021",
        "impact": "Established",
        "presentationFocus": "The RASP programming model and compilation of symbolic sequence algorithms into transformer circuits.",
        "link": "https://proceedings.mlr.press/v139/weiss21a.html"
      },
      {
        "authors": "Mostafa Dehghani, Stephan Gouws, Oriol Vinyals, Jakob Uszkoreit, and Lukasz Kaiser",
        "title": "Universal Transformers",
        "publication": "ICLR 2019",
        "impact": "Landmark",
        "presentationFocus": "Recurrent computation in depth, adaptive halting, and the link between architectural recurrence and algorithmic generalization.",
        "link": "https://arxiv.org/abs/1807.03819"
      }
    ]
  },
  {
    "week": 7,
    "title": "Formal Languages, Automata, and Lower Bounds for Self-Attention",
    "guidingQuestion": "Which regular, hierarchical, and bounded-memory computations can transformers represent and learn, and where do fixed-depth attention mechanisms fail?",
    "topicFocus": "Formal-language theory, circuit upper bounds, automata simulation, shortcut solutions, and impossibility results for self-attention.",
    "papers": [
      {
        "authors": "Michael Hahn",
        "title": "Theoretical Limitations of Self-Attention in Neural Sequence Models",
        "publication": "TACL 2020",
        "impact": "Highly cited",
        "presentationFocus": "Lower bounds for fixed-depth self-attention on parity and hierarchical dependencies.",
        "link": "https://aclanthology.org/2020.tacl-1.11/"
      },
      {
        "authors": "Satwik Bhattamishra, Kabir Ahuja, and Navin Goyal",
        "title": "On the Ability and Limitations of Transformers to Recognize Formal Languages",
        "publication": "EMNLP 2020",
        "impact": "Established",
        "presentationFocus": "Constructive and empirical characterization across regular, counter, and context-free language families.",
        "link": "https://aclanthology.org/2020.emnlp-main.576/"
      },
      {
        "authors": "Bingbin Liu, Jordan T. Ash, Surbhi Goel, Akshay Krishnamurthy, and Cyril Zhang",
        "title": "Transformers Learn Shortcuts to Automata",
        "publication": "ICLR 2023",
        "impact": "Established",
        "presentationFocus": "Log-depth and constant-depth shortcut simulations of finite-state automata, together with evidence that gradient training finds them.",
        "link": "https://openreview.net/forum?id=De4FYqjFueZ"
      },
      {
        "authors": "William Merrill, Ashish Sabharwal, and Noah A. Smith",
        "title": "Saturated Transformers Are Constant-Depth Threshold Circuits",
        "publication": "TACL 2022",
        "impact": "Established",
        "presentationFocus": "A circuit-complexity upper bound placing saturated transformers in constant-depth threshold circuits.",
        "link": "https://aclanthology.org/2022.tacl-1.49/"
      }
    ]
  },
  {
    "week": 8,
    "title": "Transformer Complexity: Precision, Parallelism, and Computational Lower Bounds",
    "guidingQuestion": "How do numerical precision, depth, width, communication, and running time constrain transformer computation?",
    "topicFocus": "Complexity-theoretic characterizations, conditional lower bounds, communication separations, and architecture comparisons beyond universal approximation.",
    "papers": [
      {
        "authors": "William Merrill and Ashish Sabharwal",
        "title": "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
        "publication": "TACL 2023",
        "impact": "Established",
        "presentationFocus": "Simulation by uniform threshold circuits and the computational price of extreme parallelism.",
        "link": "https://arxiv.org/abs/2207.00729"
      },
      {
        "authors": "Feyza Duman Keles, Pruthuvi Mahesakya Wijewardena, and Chinmay Hegde",
        "title": "On the Computational Complexity of Self-Attention",
        "publication": "ALT 2023",
        "impact": "Established",
        "presentationFocus": "SETH-based quadratic-time lower bounds for exact and approximate self-attention, plus approximation upper bounds.",
        "link": "https://arxiv.org/abs/2209.04881"
      },
      {
        "authors": "Clayton Sanford, Daniel Hsu, and Matus Telgarsky",
        "title": "Representational Strengths and Limitations of Transformers",
        "publication": "NeurIPS 2023",
        "impact": "Strong recent uptake",
        "presentationFocus": "Communication-complexity separations identifying tasks where attention is exponentially efficient or inefficient.",
        "link": "https://arxiv.org/abs/2306.02896"
      },
      {
        "authors": "Samy Jelassi, David Brandfonbrener, Sham M. Kakade, and Eran Malach",
        "title": "Repeat After Me: Transformers Are Better than State Space Models at Copying",
        "publication": "ICML 2024",
        "impact": "Established",
        "presentationFocus": "A provable architecture separation on copying and associative-recall tasks.",
        "link": "https://arxiv.org/abs/2402.01032"
      }
    ]
  },
  {
    "week": 9,
    "title": "Statistical and Inductive Biases of Self-Attention",
    "guidingQuestion": "Which functions, tokens, and interactions does attention learn efficiently, and how does depth change its statistical behavior?",
    "topicFocus": "Kernel limits, rank collapse, Lipschitz properties, sparsity, and variable creation in self-attention.",
    "papers": [
      {
        "authors": "Jiri Hron, Yasaman Bahri, Jascha Sohl-Dickstein, and Roman Novak",
        "title": "Infinite Attention: NNGP and NTK for Deep Attention Networks",
        "publication": "ICML 2020",
        "impact": "Established",
        "presentationFocus": "Gaussian-process and tangent-kernel limits for multihead attention.",
        "link": "https://proceedings.mlr.press/v119/hron20a.html"
      },
      {
        "authors": "Yihe Dong, Jean-Baptiste Cordonnier, and Andreas Loukas",
        "title": "Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth",
        "publication": "ICML 2021",
        "impact": "Highly cited",
        "presentationFocus": "A rank-collapse theorem explaining why pure self-attention requires skip connections or MLP blocks.",
        "link": "https://proceedings.mlr.press/v139/dong21a.html"
      },
      {
        "authors": "Hyunjik Kim, George Papamakarios, and Andriy Mnih",
        "title": "The Lipschitz Constant of Self-Attention",
        "publication": "ICML 2021",
        "impact": "Established",
        "presentationFocus": "Why standard dot-product attention is not globally Lipschitz and how to construct stable alternatives.",
        "link": "https://proceedings.mlr.press/v139/kim21i.html"
      },
      {
        "authors": "Benjamin Edelman, Surbhi Goel, Sham Kakade, and Cyril Zhang",
        "title": "Inductive Biases and Variable Creation in Self-Attention Mechanisms",
        "publication": "ICML 2022",
        "impact": "Established",
        "presentationFocus": "Sample-efficient learning of sparse functions and the role of attention in creating task-relevant variables.",
        "link": "https://proceedings.mlr.press/v162/edelman22a.html"
      }
    ]
  },
  {
    "week": 10,
    "title": "Optimization and Trainability of Transformers",
    "guidingQuestion": "Why are some transformer parameterizations easy to train while others require warmup, normalization, or carefully scaled initialization?",
    "topicFocus": "Theorem-driven analyses of gradients, initialization, token selection, and learned causal structure.",
    "papers": [
      {
        "authors": "Ruibin Xiong et al.",
        "title": "On Layer Normalization in the Transformer Architecture",
        "publication": "ICML 2020",
        "impact": "Landmark",
        "presentationFocus": "Mean-field analysis of gradient amplification in Post-LN versus Pre-LN transformers.",
        "link": "https://arxiv.org/abs/2002.04745"
      },
      {
        "authors": "Xiao Shi Huang, Felipe Perez, Jimmy Ba, and Maksims Volkovs",
        "title": "Improving Transformer Optimization Through Better Initialization",
        "publication": "ICML 2020",
        "impact": "Established",
        "presentationFocus": "T-Fixup and the interaction among residual paths, normalization, initialization, and warmup.",
        "link": "https://proceedings.mlr.press/v119/huang20f.html"
      },
      {
        "authors": "Yuandong Tian, Yiping Wang, Beidi Chen, and Simon Du",
        "title": "Scan and Snap: Understanding Training Dynamics and Token Composition in 1-Layer Transformer",
        "publication": "NeurIPS 2023",
        "impact": "Strong recent uptake",
        "presentationFocus": "A rigorous account of how gradient training turns diffuse attention into selective token composition.",
        "link": "https://arxiv.org/abs/2305.16380"
      },
      {
        "authors": "Eshaan Nichani, Alex Damian, and Jason D. Lee",
        "title": "How Transformers Learn Causal Structure with Gradient Descent",
        "publication": "ICML 2024",
        "impact": "Strong recent uptake",
        "presentationFocus": "A proof that gradient descent recovers latent causal structure and induction-head behavior in a simplified transformer.",
        "link": "https://arxiv.org/abs/2402.14735"
      }
    ]
  },
  {
    "week": 11,
    "title": "Length Generalization and Positional Inductive Bias",
    "guidingQuestion": "Why do transformers trained on short instances fail on longer ones, and which positional structures enable out-of-distribution extrapolation?",
    "topicFocus": "Length generalization as a formal distribution-shift problem, with controlled algorithmic tasks and theory-guided analyses of positional encoding.",
    "papers": [
      {
        "authors": "Cem Anil, Yuhuai Wu, Anders Andreassen, Aitor Lewkowycz, Vedant Misra, Vinay Ramasesh, Ambrose Slone, Guy Gur-Ari, Ethan Dyer, and Behnam Neyshabur",
        "title": "Exploring Length Generalization in Large Language Models",
        "publication": "NeurIPS 2022",
        "impact": "Established",
        "presentationFocus": "A controlled study showing that scale alone does not produce algorithmic length extrapolation, and analyzing when scratchpads help.",
        "link": "https://arxiv.org/abs/2207.04901"
      },
      {
        "authors": "Amirhossein Kazemnejad, Inkit Padhi, Karthikeyan Natesan Ramamurthy, Payel Das, and Siva Reddy",
        "title": "The Impact of Positional Encoding on Length Generalization in Transformers",
        "publication": "NeurIPS 2023",
        "impact": "Established",
        "presentationFocus": "A systematic comparison of positional encodings and the inductive biases that govern algorithmic extrapolation.",
        "link": "https://arxiv.org/abs/2305.19466"
      },
      {
        "authors": "Anian Ruoss et al.",
        "title": "Randomized Positional Encodings Boost Length Generalization of Transformers",
        "publication": "ACL 2023",
        "impact": "Strong recent uptake",
        "presentationFocus": "Randomized positions as a data-augmentation mechanism for training-short, testing-long generalization.",
        "link": "https://arxiv.org/abs/2305.16843"
      },
      {
        "authors": "Federico Barbero, Alex Vitvitskyi, Christos Perivolaropoulos, Razvan Pascanu, and Petar Veli\u010dkovi\u0107",
        "title": "Round and Round We Go! What Makes Rotary Positional Encodings Useful?",
        "publication": "ICLR 2025",
        "impact": "Strong recent uptake",
        "presentationFocus": "Mathematical and mechanistic analysis of how RoPE frequencies encode relative position and semantic information.",
        "link": "https://arxiv.org/abs/2410.06205"
      }
    ]
  },
  {
    "week": 12,
    "title": "Scaling Laws, Compute\u2013Data Tradeoffs, and Data Quality",
    "guidingQuestion": "How should model size, data, and optimization compute be allocated, and when can data selection beat ordinary power-law scaling?",
    "topicFocus": "Field-defining language-model scaling laws paired with theoretical explanations of exponents, compute-optimality, and data-pruning gains.",
    "papers": [
      {
        "authors": "Jared Kaplan et al.",
        "title": "Scaling Laws for Neural Language Models",
        "publication": "Technical report 2020",
        "impact": "Landmark",
        "presentationFocus": "The original parameter, data, and compute scaling laws for autoregressive language modeling.",
        "link": "https://arxiv.org/abs/2001.08361"
      },
      {
        "authors": "Jordan Hoffmann et al.",
        "title": "Training Compute-Optimal Large Language Models",
        "publication": "NeurIPS 2022",
        "impact": "Landmark",
        "presentationFocus": "The Chinchilla compute-optimal scaling rule and the correction from parameter-heavy to data-balanced training.",
        "link": "https://arxiv.org/abs/2203.15556"
      },
      {
        "authors": "Yasaman Bahri, Ethan Dyer, Jared Kaplan, Jaehoon Lee, and Utkarsh Sharma",
        "title": "Explaining Neural Scaling Laws",
        "publication": "PNAS 2024",
        "impact": "Highly cited",
        "presentationFocus": "Solvable learning models deriving power-law behavior from spectra, target alignment, and finite resources.",
        "link": "https://arxiv.org/abs/2102.06701"
      },
      {
        "authors": "Ben Sorscher, Robert Geirhos, Shashank Shekhar, Surya Ganguli, and Ari S. Morcos",
        "title": "Beyond Neural Scaling Laws: Beating Power-Law Scaling via Data Pruning",
        "publication": "NeurIPS 2022",
        "impact": "Highly cited",
        "presentationFocus": "A theory of how sufficiently accurate data-quality rankings can improve power-law scaling, with large-scale validation.",
        "link": "https://arxiv.org/abs/2206.14486"
      }
    ]
  },
  {
    "week": 13,
    "title": "Emergence, Grokking, and Phase Transitions",
    "guidingQuestion": "Are abrupt capabilities genuine learning transitions, or artifacts created by metrics, thresholds, and hidden continuous progress?",
    "topicFocus": "Empirical claims of emergence confronted with measurement theory and mechanistic accounts of delayed generalization.",
    "papers": [
      {
        "authors": "Jason Wei et al.",
        "title": "Emergent Abilities of Large Language Models",
        "publication": "TMLR 2022",
        "impact": "Landmark",
        "presentationFocus": "The empirical case that some abilities appear abruptly as language models scale.",
        "link": "https://arxiv.org/abs/2206.07682"
      },
      {
        "authors": "Rylan Schaeffer, Brando Miranda, and Sanmi Koyejo",
        "title": "Are Emergent Abilities of Large Language Models a Mirage?",
        "publication": "NeurIPS 2023",
        "impact": "Landmark",
        "presentationFocus": "How nonlinear metrics and coarse resolution can manufacture apparent discontinuities.",
        "link": "https://arxiv.org/abs/2304.15004"
      },
      {
        "authors": "Alethea Power et al.",
        "title": "Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets",
        "publication": "Technical report 2022",
        "impact": "Landmark",
        "presentationFocus": "Delayed generalization long after interpolation on algorithmic tasks.",
        "link": "https://arxiv.org/abs/2201.02177"
      },
      {
        "authors": "Neel Nanda et al.",
        "title": "Progress Measures for Grokking via Mechanistic Interpretability",
        "publication": "ICLR 2023",
        "impact": "Highly cited",
        "presentationFocus": "Continuous internal progress measures underlying an apparently sudden generalization transition.",
        "link": "https://openreview.net/forum?id=9XFSbDPmdW"
      }
    ]
  },
  {
    "week": 14,
    "title": "Bayesian, Meta-Learning, and Structure-Induction Theories of In-Context Learning",
    "guidingQuestion": "Which latent-task and compositional structures make next-token prediction behave like Bayesian inference or meta-learning?",
    "topicFocus": "Implicit Bayesian inference, amortized posterior prediction, task-diversity transitions, and information-theoretic structure induction.",
    "papers": [
      {
        "authors": "Sang Michael Xie, Aditi Raghunathan, Percy Liang, and Tengyu Ma",
        "title": "An Explanation of In-Context Learning as Implicit Bayesian Inference",
        "publication": "ICLR 2022",
        "impact": "Landmark",
        "presentationFocus": "Latent concepts and conditions under which sequence prediction approximates Bayesian task inference.",
        "link": "https://arxiv.org/abs/2111.02080"
      },
      {
        "authors": "Samuel M\u00fcller et al.",
        "title": "Transformers Can Do Bayesian Inference",
        "publication": "ICLR 2022",
        "impact": "Highly cited",
        "presentationFocus": "Amortizing posterior predictive inference by training transformers on samples from prior-data distributions.",
        "link": "https://arxiv.org/abs/2112.10510"
      },
      {
        "authors": "Allan Ravent\u00f3s, Mansheej Paul, Feng Chen, and Surya Ganguli",
        "title": "Pretraining Task Diversity and the Emergence of Non-Bayesian In-Context Learning for Regression",
        "publication": "NeurIPS 2023",
        "impact": "Established",
        "presentationFocus": "A task-diversity phase transition from memorized Bayesian priors toward general-purpose regression algorithms.",
        "link": "https://arxiv.org/abs/2306.15063"
      },
      {
        "authors": "Michael Hahn and Navin Goyal",
        "title": "A Theory of Emergent In-Context Learning as Implicit Structure Induction",
        "publication": "Technical report 2023",
        "impact": "Strong recent uptake",
        "presentationFocus": "Information-theoretic conditions under which compositional next-token prediction yields in-context learning and benefits from intermediate steps.",
        "link": "https://arxiv.org/abs/2303.07971"
      }
    ]
  },
  {
    "week": 15,
    "title": "In-Context Learning as Implicit Optimization",
    "guidingQuestion": "Does a transformer forward pass implement gradient descent, preconditioned optimization, or another classical learning algorithm?",
    "topicFocus": "Algorithm identification and explicit constructions for optimization inside transformer activations.",
    "papers": [
      {
        "authors": "Ekin Akyurek, Dale Schuurmans, Jacob Andreas, Tengyu Ma, and Denny Zhou",
        "title": "What Learning Algorithm Is In-Context Learning? Investigations with Linear Models",
        "publication": "ICLR 2023",
        "impact": "Landmark",
        "presentationFocus": "Evidence that trained transformers emulate identifiable regression algorithms rather than merely retrieve examples.",
        "link": "https://arxiv.org/abs/2211.15661"
      },
      {
        "authors": "Johannes von Oswald et al.",
        "title": "Transformers Learn In-Context by Gradient Descent",
        "publication": "ICML 2023",
        "impact": "Landmark",
        "presentationFocus": "Constructive attention updates and experiments connecting transformer layers to gradient-descent iterations.",
        "link": "https://arxiv.org/abs/2212.07677"
      },
      {
        "authors": "Damai Dai et al.",
        "title": "Why Can GPT Learn In-Context? Language Models Implicitly Perform Gradient Descent as Meta-Optimizers",
        "publication": "Findings of ACL 2023",
        "impact": "Highly cited",
        "presentationFocus": "A meta-optimization interpretation linking attention updates to gradient descent on demonstrations.",
        "link": "https://arxiv.org/abs/2212.10559"
      },
      {
        "authors": "Kwangjun Ahn, Xiang Cheng, Hadi Daneshmand, and Suvrit Sra",
        "title": "Transformers Learn to Implement Preconditioned Gradient Descent for In-Context Learning",
        "publication": "NeurIPS 2023",
        "impact": "Established",
        "presentationFocus": "Why the learned in-context algorithm can adapt its preconditioner to the task distribution.",
        "link": "https://arxiv.org/abs/2306.00297"
      }
    ]
  },
  {
    "week": 16,
    "title": "Emergence and Training Dynamics of In-Context Learning",
    "guidingQuestion": "Which properties of data and gradient training cause an in-context algorithm or induction head to form?",
    "topicFocus": "A bridge between data distributions, mechanistic circuits, optimization dynamics, and formal training guarantees.",
    "papers": [
      {
        "authors": "Stephanie C. Y. Chan et al.",
        "title": "Data Distributional Properties Drive Emergent In-Context Learning in Transformers",
        "publication": "NeurIPS 2022",
        "impact": "Highly cited",
        "presentationFocus": "Burstiness, rare classes, and Zipfian structure as drivers of emergent in-context learning.",
        "link": "https://arxiv.org/abs/2205.05055"
      },
      {
        "authors": "Catherine Olsson et al.",
        "title": "In-Context Learning and Induction Heads",
        "publication": "Technical report 2022",
        "impact": "Landmark",
        "presentationFocus": "The influential mechanistic hypothesis connecting induction heads to the emergence of in-context learning.",
        "link": "https://arxiv.org/abs/2209.11895"
      },
      {
        "authors": "Ruiqi Zhang, Spencer Frei, and Peter L. Bartlett",
        "title": "Trained Transformers Learn Linear Models In-Context",
        "publication": "JMLR 2024",
        "impact": "Highly cited",
        "presentationFocus": "A rigorous training-dynamics result showing gradient flow reaches an in-context linear predictor.",
        "link": "https://arxiv.org/abs/2306.09927"
      },
      {
        "authors": "Alberto Bietti, Vivien Cabannes, Diane Bouchacourt, Herve Jegou, and Leon Bottou",
        "title": "Birth of a Transformer: A Memory Viewpoint",
        "publication": "NeurIPS 2023",
        "impact": "Established",
        "presentationFocus": "The staged emergence of global memories and induction-head mechanisms during training.",
        "link": "https://arxiv.org/abs/2306.00802"
      }
    ]
  },
  {
    "week": 17,
    "title": "Learnability, Stability, and Sample Complexity of In-Context Learning",
    "guidingQuestion": "How many pretraining tasks and prompt examples are required, and when does the learned in-context algorithm generalize?",
    "topicFocus": "PAC-style learnability, algorithmic stability, task complexity, and empirical function-class generalization.",
    "papers": [
      {
        "authors": "Shivam Garg, Dimitris Tsipras, Percy Liang, and Gregory Valiant",
        "title": "What Can Transformers Learn In-Context? A Case Study of Simple Function Classes",
        "publication": "NeurIPS 2022",
        "impact": "Landmark",
        "presentationFocus": "A controlled study of which regression and classification algorithms emerge across function classes.",
        "link": "https://arxiv.org/abs/2208.01066"
      },
      {
        "authors": "Yingcong Li, M. Emrullah Ildiz, Dimitris Papailiopoulos, and Samet Oymak",
        "title": "Transformers as Algorithms: Generalization and Stability in In-Context Learning",
        "publication": "ICML 2023",
        "impact": "Established",
        "presentationFocus": "Prompt-level generalization bounds through stability of the algorithm implemented by the transformer.",
        "link": "https://arxiv.org/abs/2301.07067"
      },
      {
        "authors": "Noam Wies, Yoav Levine, and Amnon Shashua",
        "title": "The Learnability of In-Context Learning",
        "publication": "NeurIPS 2023",
        "impact": "Established",
        "presentationFocus": "A PAC framework and finite sample-complexity bounds for identifying latent tasks in context.",
        "link": "https://arxiv.org/abs/2303.07895"
      },
      {
        "authors": "Jingfeng Wu et al.",
        "title": "How Many Pretraining Tasks Are Needed for In-Context Learning of Linear Regression?",
        "publication": "ICLR 2024",
        "impact": "Strong recent uptake",
        "presentationFocus": "A task-complexity bound and near-Bayes-optimal generalization from finitely many pretraining tasks.",
        "link": "https://arxiv.org/abs/2310.08391"
      }
    ]
  },
  {
    "week": 18,
    "title": "Algorithm Selection and Representation Learning in Context",
    "guidingQuestion": "Can one transformer select among learning algorithms and exploit shared nonlinear representations across tasks?",
    "topicFocus": "Beyond basic linear regression: model selection, learned representations, optimality, and convergence of trained in-context learners.",
    "papers": [
      {
        "authors": "Yu Bai, Fan Chen, Huan Wang, Caiming Xiong, and Song Mei",
        "title": "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
        "publication": "NeurIPS 2023",
        "impact": "Established",
        "presentationFocus": "Efficient constructions for standard estimators and adaptive selection among algorithms inside the prompt.",
        "link": "https://arxiv.org/abs/2306.04637"
      },
      {
        "authors": "Tianyu Guo et al.",
        "title": "How Do Transformers Learn In-Context Beyond Simple Functions? A Case Study on Learning with Representations",
        "publication": "ICLR 2024",
        "impact": "Strong recent uptake",
        "presentationFocus": "Layerwise decomposition into shared representation learning followed by an in-context linear learner.",
        "link": "https://arxiv.org/abs/2310.10616"
      },
      {
        "authors": "Arvind V. Mahankali, Tatsunori Hashimoto, and Tengyu Ma",
        "title": "One Step of Gradient Descent Is Provably the Optimal In-Context Learner with One Layer of Linear Self-Attention",
        "publication": "ICLR 2024",
        "impact": "Established",
        "presentationFocus": "Population-risk optimality of gradient or preconditioned-gradient updates under Gaussian task models.",
        "link": "https://arxiv.org/abs/2307.03576"
      },
      {
        "authors": "Yu Huang, Yuan Cheng, and Yingbin Liang",
        "title": "In-Context Convergence of Transformers",
        "publication": "ICML 2024",
        "impact": "Strong recent uptake",
        "presentationFocus": "Nonconvex convergence guarantees for training linear-attention in-context learners.",
        "link": "https://arxiv.org/abs/2310.05249"
      }
    ]
  },
  {
    "week": 19,
    "title": "Calibration, Selective Prediction, and Hallucination",
    "guidingQuestion": "Can a language model know when it is likely to be wrong, and are some hallucinations statistically unavoidable?",
    "topicFocus": "Calibration theory, model self-knowledge, selective prediction, and a formal lower bound for factual hallucination.",
    "papers": [
      {
        "authors": "Chuan Guo, Geoff Pleiss, Yu Sun, and Kilian Q. Weinberger",
        "title": "On Calibration of Modern Neural Networks",
        "publication": "ICML 2017",
        "impact": "Landmark",
        "presentationFocus": "The modern calibration benchmark and temperature scaling as a strong post-hoc baseline.",
        "link": "https://proceedings.mlr.press/v70/guo17a.html"
      },
      {
        "authors": "Zhengbao Jiang, Jun Araki, Haibo Ding, and Graham Neubig",
        "title": "How Can We Know When Language Models Know? On the Calibration of Language Models for Question Answering",
        "publication": "TACL 2021",
        "impact": "Highly cited",
        "presentationFocus": "Calibration of generative language-model probabilities for factual question answering.",
        "link": "https://arxiv.org/abs/2012.00955"
      },
      {
        "authors": "Saurav Kadavath et al.",
        "title": "Language Models (Mostly) Know What They Know",
        "publication": "Technical report 2022",
        "impact": "Landmark",
        "presentationFocus": "Eliciting a model's probability that its own answer is correct and studying scale-dependent self-knowledge.",
        "link": "https://arxiv.org/abs/2207.05221"
      },
      {
        "authors": "Adam Tauman Kalai and Santosh S. Vempala",
        "title": "Calibrated Language Models Must Hallucinate",
        "publication": "STOC 2024",
        "impact": "Established",
        "presentationFocus": "An information-theoretic lower bound showing that calibrated next-token learners must misstate sufficiently rare facts.",
        "link": "https://arxiv.org/abs/2311.14648"
      }
    ]
  },
  {
    "week": 20,
    "title": "Reasoning, Compositionality, and Chain-of-Thought Complexity",
    "guidingQuestion": "When can autoregressive transformers compose learned operations, and how do intermediate tokens change computational and generalization limits?",
    "topicFocus": "Computation-graph complexity, error accumulation, circuit lower bounds, and complexity-class accounts of scratchpad reasoning.",
    "papers": [
      {
        "authors": "Nouha Dziri et al.",
        "title": "Faith and Fate: Limits of Transformers on Compositionality",
        "publication": "NeurIPS 2023",
        "impact": "Highly cited",
        "presentationFocus": "Computation-graph analysis and theoretical arguments showing how local error compounds on multi-step compositional tasks.",
        "link": "https://arxiv.org/abs/2305.18654"
      },
      {
        "authors": "Guhao Feng, Bohang Zhang, Yuntian Gu, Haotian Ye, Di He, and Liwei Wang",
        "title": "Towards Revealing the Mystery behind Chain of Thought: A Theoretical Perspective",
        "publication": "NeurIPS 2023",
        "impact": "Established",
        "presentationFocus": "Circuit lower bounds for direct prediction and constructive gains from autoregressive derivations.",
        "link": "https://arxiv.org/abs/2305.15408"
      },
      {
        "authors": "Zhiyuan Li, Hong Liu, Denny Zhou, and Tengyu Ma",
        "title": "Chain of Thought Empowers Transformers to Solve Inherently Serial Problems",
        "publication": "ICLR 2024",
        "impact": "Established",
        "presentationFocus": "How scratchpad tokens let bounded-depth transformers execute serial algorithms.",
        "link": "https://arxiv.org/abs/2402.12875"
      },
      {
        "authors": "William Merrill and Ashish Sabharwal",
        "title": "The Expressive Power of Transformers with Chain of Thought",
        "publication": "ICLR 2024",
        "impact": "Established",
        "presentationFocus": "Complexity-class characterizations as a function of the number of generated reasoning steps.",
        "link": "https://arxiv.org/abs/2310.07923"
      }
    ]
  },
  {
    "week": 21,
    "title": "Memorization, Rare Events, and Long-Tail Learning",
    "guidingQuestion": "When is memorization necessary for generalization, and why do language models struggle with rare facts?",
    "topicFocus": "The theory of long-tail examples connected to empirical memorization and factual recall in neural language models.",
    "papers": [
      {
        "authors": "Vitaly Feldman",
        "title": "Does Learning Require Memorization? A Short Tale about a Long Tail",
        "publication": "STOC 2020",
        "impact": "Highly cited",
        "presentationFocus": "A formal sense in which memorizing atypical examples can be necessary for near-optimal learning.",
        "link": "https://arxiv.org/abs/1906.05271"
      },
      {
        "authors": "Vitaly Feldman and Chiyuan Zhang",
        "title": "What Neural Networks Memorize and Why: Discovering the Long Tail via Influence Estimation",
        "publication": "NeurIPS 2020",
        "impact": "Highly cited",
        "presentationFocus": "Influence-based evidence that networks memorize rare examples that support long-tail generalization.",
        "link": "https://arxiv.org/abs/2008.03703"
      },
      {
        "authors": "Nicholas Carlini et al.",
        "title": "Quantifying Memorization Across Neural Language Models",
        "publication": "ICLR 2023",
        "impact": "Landmark",
        "presentationFocus": "How model size, duplication, context, and data frequency govern extractable memorization.",
        "link": "https://arxiv.org/abs/2202.07646"
      },
      {
        "authors": "Nikhil Kandpal, Haikang Deng, Adam Roberts, Eric Wallace, and Colin Raffel",
        "title": "Large Language Models Struggle to Learn Long-Tail Knowledge",
        "publication": "ICML 2023",
        "impact": "Highly cited",
        "presentationFocus": "A quantitative link between pretraining frequency and factual question-answering performance.",
        "link": "https://arxiv.org/abs/2211.08411"
      }
    ]
  },
  {
    "week": 22,
    "title": "Synthetic Data and Model Collapse",
    "guidingQuestion": "What happens when future models are trained on data produced by earlier models?",
    "topicFocus": "Recursive training distributions, tail loss, scaling-law changes, and conditions under which real-data accumulation prevents collapse.",
    "papers": [
      {
        "authors": "Ilia Shumailov et al.",
        "title": "AI Models Collapse When Trained on Recursively Generated Data",
        "publication": "Nature 2024",
        "impact": "Landmark",
        "presentationFocus": "A statistical mechanism by which recursive synthetic training loses information from distribution tails.",
        "link": "https://www.nature.com/articles/s41586-024-07566-y"
      },
      {
        "authors": "Sina Alemohammad et al.",
        "title": "Self-Consuming Generative Models Go MAD",
        "publication": "ICLR 2024",
        "impact": "Established",
        "presentationFocus": "Model-autophagy disorder under repeated replacement or augmentation with generated data.",
        "link": "https://arxiv.org/abs/2307.01850"
      },
      {
        "authors": "Elvis Dohmatob et al.",
        "title": "A Tale of Tails: Model Collapse as a Change of Scaling Laws",
        "publication": "ICML 2024",
        "impact": "Strong recent uptake",
        "presentationFocus": "Recursive synthetic data as a distortion of scaling exponents and rare-event learning.",
        "link": "https://arxiv.org/abs/2402.07043"
      },
      {
        "authors": "Matthias Gerstgrasser et al.",
        "title": "Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data",
        "publication": "Technical report 2024",
        "impact": "Established",
        "presentationFocus": "A complementary theorem and experiments showing how retaining real data can prevent recursive collapse.",
        "link": "https://arxiv.org/abs/2404.01413"
      }
    ]
  },
  {
    "week": 23,
    "title": "Theory of Preference Optimization and Reward Overoptimization",
    "guidingQuestion": "Which statistical objectives recover human preferences, and when does optimizing a proxy reward cause distribution shift or overoptimization?",
    "topicFocus": "Closed-form preference objectives, consistency frameworks, scaling laws for overoptimization, and provably robust regularization.",
    "papers": [
      {
        "authors": "Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher Manning, and Chelsea Finn",
        "title": "Direct Preference Optimization: Your Language Model Is Secretly a Reward Model",
        "publication": "NeurIPS 2023",
        "impact": "Landmark",
        "presentationFocus": "A closed-form reduction from KL-regularized reward maximization to a direct classification-style objective.",
        "link": "https://arxiv.org/abs/2305.18290"
      },
      {
        "authors": "Mohammad Gheshlaghi Azar et al.",
        "title": "A General Theoretical Paradigm to Understand Learning from Human Preferences",
        "publication": "AISTATS 2024",
        "impact": "Established",
        "presentationFocus": "A unified consistency and regularization framework for preference-learning objectives and link functions.",
        "link": "https://arxiv.org/abs/2310.12036"
      },
      {
        "authors": "Rafael Rafailov, Yaswanth Chittepu, Ryan Park, Harshit Sikchi, Joey Hejna, W. Bradley Knox, Chelsea Finn, and Scott Niekum",
        "title": "Scaling Laws for Reward Model Overoptimization in Direct Alignment Algorithms",
        "publication": "NeurIPS 2024",
        "impact": "Strong recent uptake",
        "presentationFocus": "A quantitative characterization of overoptimization in direct alignment as a function of KL budget, objective, and scale.",
        "link": "https://proceedings.neurips.cc/paper_files/paper/2024/file/e45caa3d5273d105b8d045e748636957-Paper-Conference.pdf"
      },
      {
        "authors": "Zhihan Liu, Miao Lu, Shenao Zhang, Boyi Liu, Hongyi Guo, Yingxiang Yang, Jose Blanchet, and Zhaoran Wang",
        "title": "Provably Mitigating Overoptimization in RLHF: Your SFT Loss Is Implicitly an Adversarial Regularizer",
        "publication": "NeurIPS 2024",
        "impact": "Strong recent uptake",
        "presentationFocus": "A distribution-shift model, sample-efficient robust objective, and equivalence between adversarial reward regularization and adding SFT loss.",
        "link": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/fa69e968b7319fd42524febd41475fb3-Abstract-Conference.html"
      }
    ]
  },
  {
    "week": 24,
    "title": "Theory of Pretraining, Transfer, and Fine-Tuning",
    "guidingQuestion": "How does pretraining reshape the effective hypothesis class, optimization bias, and sample efficiency seen by a downstream task?",
    "topicFocus": "Intrinsic dimension, feature distortion, kernel approximations, and implicit bias linking pretraining solutions to downstream transfer.",
    "papers": [
      {
        "authors": "Armen Aghajanyan, Luke Zettlemoyer, and Sonal Gupta",
        "title": "Intrinsic Dimensionality Explains the Effectiveness of Language Model Fine-Tuning",
        "publication": "ACL 2021",
        "impact": "Highly cited",
        "presentationFocus": "Evidence that downstream adaptation occurs in a low-dimensional subspace that shrinks with pretraining scale.",
        "link": "https://arxiv.org/abs/2012.13255"
      },
      {
        "authors": "Ananya Kumar et al.",
        "title": "Fine-Tuning Can Distort Pretrained Features and Underperform Out-of-Distribution",
        "publication": "ICLR 2022",
        "impact": "Highly cited",
        "presentationFocus": "A theoretical and empirical account of feature distortion and the linear-probing versus fine-tuning tradeoff.",
        "link": "https://arxiv.org/abs/2202.10054"
      },
      {
        "authors": "Sadhika Malladi et al.",
        "title": "A Kernel-Based View of Language Model Fine-Tuning",
        "publication": "ICML 2023",
        "impact": "Established",
        "presentationFocus": "Conditions under which language-model fine-tuning is accurately described by a kernel regime.",
        "link": "https://arxiv.org/abs/2210.05643"
      },
      {
        "authors": "Hong Liu, Sang Michael Xie, Zhiyuan Li, and Tengyu Ma",
        "title": "Same Pre-Training Loss, Better Downstream: Implicit Bias Matters for Language Models",
        "publication": "ICML 2023",
        "impact": "Strong recent uptake",
        "presentationFocus": "Why equal pretraining loss need not imply equal transfer, and how SGD-induced flatness selects more transferable language models.",
        "link": "https://proceedings.mlr.press/v202/liu23ao.html"
      }
    ]
  },
];
