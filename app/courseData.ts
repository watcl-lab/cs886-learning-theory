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
  date: string;
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
  term: "Fall 2026",
  meetingDay: "Fridays",
  meetingDuration: "one three-hour meeting per week",
  meetingCount: 12,
  papersPerMeeting: 4,
  firstMeeting: "September 11, 2026",
  lastMeeting: "December 4, 2026",
  readingWeek: "October 10–18, 2026",
  skippedMeeting: "October 16, 2026",
  readingWeekUrl: "https://uwaterloo.ca/important-dates/graduate/2026-2027/reading-week",
} as const;

export const courseSummary =
  "A course on the inductive biases, trainability, expressivity, computation, in-context learning, reasoning, adaptation, preference learning, and formal limitations of transformers and large language models.";

export const courseDescription = {
  paragraphs: [
    "Learning Theory for Modern AI: Transformers and Large Language Models is a graduate research seminar on the computational and statistical principles underlying modern sequence models. The course studies the inductive biases and trainability of self-attention; transformer expressivity, formal languages, and computational lower bounds; positional generalization and infinite-limit theory; associative memory and in-context learning; chain-of-thought and next-token computation; parameter-efficient adaptation and preference optimization; and formal limits on hallucination.",
    "Each weekly meeting is organized around four influential papers. Student presentations emphasize formal problem statements, theorem strength, proof mechanisms, assumptions, and the gap between tractable models and real large language models.",
  ],
} as const;

export const presentationGuidance =
  "Each week there will be four presentations. Each presentation will last about 45 minutes (including questions).";

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
    component: "Paper presentations",
    weight: "80%",
    standard:
      "Students are expected to have a good understanding of each assigned paper and to answer questions during the presentation.",
  },
  {
    component: "Class participation",
    weight: "20%",
    standard: "Consistent and substantive participation in weekly paper discussions.",
  },
] as const;

export const presentationWorkload =
  "Presentation workload will depend on enrollment. Students should expect at least two presentations during the term (an estimated number based on previous years), or an equivalent amount of workload.";

export const optionalProject = {
  description:
    "Optional projects may earn additional marks. The project topic should be discussed with the instructor.",
  publicationSupport:
    "Although not required for the course, keep in mind that I am more than happy to help you publish your final project. For example, in CS886 2024, Robert Wang published his final project at NeurIPS 2024.",
  exampleUrl: "https://nips.cc/virtual/2024/poster/95519",
} as const;

function paper(
  authors: string,
  title: string,
  publication: string,
  impact: string,
  presentationFocus: string,
  link: string,
): CoursePaper {
  return { authors, title, publication, impact, presentationFocus, link };
}

// The revised source contains 24 theory topics. Consecutive source topics are
// paired into the 12 actual meetings, using the first two papers from each
// source topic to preserve its editorial order and the four-paper workload.
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
        "Highly cited",
        "Proves rank collapse for deep pure self-attention and isolates a structural reason that residual and feed-forward components matter.",
        "https://proceedings.mlr.press/v139/dong21a.html",
      ),
      paper(
        "Hyunjik Kim, George Papamakarios, and Andriy Mnih",
        "The Lipschitz Constant of Self-Attention",
        "ICML 2021",
        "Established",
        "Characterizes why ordinary dot-product self-attention is not globally Lipschitz and develops Lipschitz alternatives suitable for stability analysis.",
        "https://proceedings.mlr.press/v139/kim21i.html",
      ),
      paper(
        "Daniel Soudry, Elad Hoffer, Mor Shpigel Nacson, Suriya Gunasekar, and Nathan Srebro",
        "The Implicit Bias of Gradient Descent on Separable Data",
        "JMLR 2018",
        "Landmark",
        "The landmark bridge: proves convergence in direction to the hard-margin separator, providing the template used by later attention analyses.",
        "https://www.jmlr.org/papers/v19/18-188.html",
      ),
      paper(
        "Davoud Ataee Tarzanagh, Yingcong Li, Xuechen Zhang, and Samet Oymak",
        "Max-Margin Token Selection in Attention Mechanism",
        "NeurIPS 2023",
        "Established",
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
    papers: [
      paper(
        "Ruibin Xiong et al.",
        "On Layer Normalization in the Transformer Architecture",
        "ICML 2020",
        "Landmark",
        "Explains the gradient behavior of pre-layer-normalized and post-layer-normalized transformers and gives a theoretical account of warmup sensitivity.",
        "https://arxiv.org/abs/2002.04745",
      ),
      paper(
        "Xiao Shi Huang, Felipe Perez, Jimmy Ba, and Maksims Volkovs",
        "Improving Transformer Optimization Through Better Initialization",
        "ICML 2020",
        "Established",
        "Derives signal- and gradient-preserving initialization principles for deep transformers and connects them to stable optimization.",
        "https://proceedings.mlr.press/v119/huang20f.html",
      ),
      paper(
        "Chulhee Yun, Srinadh Bhojanapalli, Ankit Singh Rawat, Sashank J. Reddi, and Sanjiv Kumar",
        "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
        "ICLR 2020",
        "Highly cited",
        "Proves universality for permutation-equivariant sequence maps without positional encodings and for general continuous sequence maps with positional encodings.",
        "https://openreview.net/forum?id=ByxRM0Ntvr",
      ),
      paper(
        "Jorge Perez, Pablo Barcelo, and Javier Marinkovic",
        "Attention Is Turing Complete",
        "JMLR 2021",
        "Established",
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
        "Highly cited",
        "Proves limitations of bounded-depth self-attention for parity and hierarchical dependencies under finite precision.",
        "https://aclanthology.org/2020.tacl-1.11/",
      ),
      paper(
        "Satwik Bhattamishra, Kabir Ahuja, and Navin Goyal",
        "On the Ability and Limitations of Transformers to Recognize Formal Languages",
        "EMNLP 2020",
        "Established",
        "Combines constructions, limitations, and controlled learning experiments for regular and context-free languages.",
        "https://aclanthology.org/2020.emnlp-main.576/",
      ),
      paper(
        "William Merrill, Ashish Sabharwal, and Noah A. Smith",
        "Saturated Transformers Are Constant-Depth Threshold Circuits",
        "TACL 2022",
        "Established",
        "Places saturated transformers in constant-depth threshold circuits and derives consequences for formal-language recognition.",
        "https://aclanthology.org/2022.tacl-1.49/",
      ),
      paper(
        "William Merrill and Ashish Sabharwal",
        "The Parallelism Tradeoff: Limitations of Log-Precision Transformers",
        "TACL 2023",
        "Established",
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
      "Attention time complexity, communication limits, RASP program constructions, and computational expressivity.",
    papers: [
      paper(
        "Feyza Duman Keles, Pruthuvi Mahesakya Wijewardena, and Chinmay Hegde",
        "On the Computational Complexity of Self-Attention",
        "ALT 2023",
        "Established",
        "Derives conditional lower bounds for exact and approximate self-attention, clarifying when subquadratic computation is impossible.",
        "https://arxiv.org/abs/2209.04881",
      ),
      paper(
        "Binghui Peng, Srini Narayanan, and Christos Papadimitriou",
        "On Limitations of the Transformer Architecture",
        "Technical report 2024",
        "Established",
        "Uses communication and information arguments to expose tasks that bounded transformers cannot solve without additional resources.",
        "https://arxiv.org/abs/2402.08164",
      ),
      paper(
        "Gail Weiss, Yoav Goldberg, and Eran Yahav",
        "Thinking Like Transformers",
        "ICML 2021",
        "Established",
        "Introduces the RASP programming language and compiles algorithmic sequence operations into transformer-like computations.",
        "https://proceedings.mlr.press/v139/weiss21a.html",
      ),
      paper(
        "Satwik Bhattamishra, Arkil Patel, and Navin Goyal",
        "On the Computational Power of Transformers and Its Implications in Sequence Modeling",
        "CoNLL 2020",
        "Established",
        "Studies which automata and algorithmic computations transformers can simulate and how positional encodings affect power.",
        "https://aclanthology.org/2020.conll-1.25/",
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
    papers: [
      paper(
        "Shengjie Luo, Shanda Li, Shuxin Zheng, Tie-Yan Liu, Liwei Wang, and Di He",
        "Your Transformer May Not Be as Powerful as You Expect",
        "NeurIPS 2022",
        "Established",
        "Shows that common relative-position mechanisms impose expressivity limitations and gives constructions that recover lost power.",
        "https://arxiv.org/abs/2205.13401",
      ),
      paper(
        "Hanseul Cho, Jaeyoung Cha, Pranjal Awasthi, Srinadh Bhojanapalli, Anupam Gupta, and Chulhee Yun",
        "Position Coupling: Improving Length Generalization of Arithmetic Transformers Using Task Structure",
        "NeurIPS 2024",
        "Strong recent uptake",
        "Proves an exponential-length advantage for a one-layer transformer when task-relevant tokens share coupled positional identifiers.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/27aa3a0e6d63db269977bb2df5607cb8-Abstract-Conference.html",
      ),
      paper(
        "Jiri Hron, Yasaman Bahri, Jascha Sohl-Dickstein, and Roman Novak",
        "Infinite Attention: NNGP and NTK for Deep Attention Networks",
        "ICML 2020",
        "Established",
        "Derives Gaussian-process and neural-tangent-kernel limits for multi-head attention and identifies scaling requirements.",
        "https://proceedings.mlr.press/v119/hron20a.html",
      ),
      paper(
        "Lorenzo Noci et al.",
        "Signal Propagation in Transformers: Theoretical Perspectives and the Role of Rank Collapse",
        "NeurIPS 2022",
        "Established",
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
        "Landmark",
        "The landmark bridge: identifies modern Hopfield retrieval with the attention update and supplies an energy-based memory interpretation.",
        "https://openreview.net/forum?id=tL89RnzIiCd",
      ),
      paper(
        "Alberto Bietti, Vivien Cabannes, Diane Bouchacourt, Herve Jegou, and Leon Bottou",
        "Birth of a Transformer: A Memory Viewpoint",
        "NeurIPS 2023",
        "Established",
        "Analyzes the stages by which gradient training forms key-query memories and token associations in a shallow transformer.",
        "https://arxiv.org/abs/2306.00802",
      ),
      paper(
        "Sang Michael Xie, Aditi Raghunathan, Percy Liang, and Tengyu Ma",
        "An Explanation of In-Context Learning as Implicit Bayesian Inference",
        "ICLR 2022",
        "Landmark",
        "Shows that sequence modeling on a mixture of latent concepts can produce approximate Bayesian task inference at test time.",
        "https://openreview.net/forum?id=RdJVFCHjUMI",
      ),
      paper(
        "Thomas Nagler",
        "Statistical Foundations of Prior-Data Fitted Networks",
        "ICML 2023",
        "Established",
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
        "Landmark",
        "Compares trained transformers with least-squares, gradient-based, and Bayesian estimators to identify the algorithm implemented in context.",
        "https://openreview.net/forum?id=0g0X4H8yN4I",
      ),
      paper(
        "Johannes von Oswald et al.",
        "Transformers Learn In-Context by Gradient Descent",
        "ICML 2023",
        "Landmark",
        "Constructs self-attention layers that implement gradient updates and shows trained transformers discover closely related solutions.",
        "https://proceedings.mlr.press/v202/von-oswald23a.html",
      ),
      paper(
        "Ruiqi Zhang, Spencer Frei, and Peter L. Bartlett",
        "Trained Transformers Learn Linear Models In-Context",
        "JMLR 2024",
        "Highly cited",
        "Proves that gradient descent on a trained linear transformer converges to an in-context linear predictor with controlled risk.",
        "https://www.jmlr.org/papers/v25/23-1042.html",
      ),
      paper(
        "Arvind V. Mahankali, Tatsunori Hashimoto, and Tengyu Ma",
        "One Step of Gradient Descent Is Provably the Optimal In-Context Learner with One Layer of Linear Self-Attention",
        "ICLR 2024",
        "Established",
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
      "Stability, PAC learnability, in-context algorithm selection, and representation learning.",
    papers: [
      paper(
        "Yingcong Li, M. Emrullah Ildiz, Dimitris Papailiopoulos, and Samet Oymak",
        "Transformers as Algorithms: Generalization and Stability in In-Context Learning",
        "ICML 2023",
        "Established",
        "Treats a transformer as an algorithm operating on the prompt and derives generalization guarantees through stability.",
        "https://proceedings.mlr.press/v202/li23l.html",
      ),
      paper(
        "Noam Wies, Yoav Levine, and Amnon Shashua",
        "The Learnability of In-Context Learning",
        "NeurIPS 2023",
        "Established",
        "Introduces a PAC framework for pretraining followed by frozen-weight in-context adaptation and proves finite sample-complexity results.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/73950f0eb4ac0925dc71ba2406893320-Abstract-Conference.html",
      ),
      paper(
        "Yu Bai, Fan Chen, Huan Wang, Caiming Xiong, and Song Mei",
        "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
        "NeurIPS 2023",
        "Highly cited",
        "Constructs transformers that implement regression and classification procedures and select algorithms through in-context validation.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/b2e63e36c57e153b9015fece2352a9f9-Abstract-Conference.html",
      ),
      paper(
        "Tianyu Guo et al.",
        "How Do Transformers Learn In-Context Beyond Simple Functions? A Case Study on Learning with Representations",
        "ICLR 2024",
        "Established",
        "Analyzes ICL when tasks share a latent representation and explains how pretraining learns a reusable feature space.",
        "https://arxiv.org/abs/2310.10616",
      ),
    ],
  },
  {
    week: 9,
    date: "November 13, 2026",
    title: "Optimal In-Context Learning and Chain-of-Thought Computation",
    guidingQuestion:
      "What statistical rates can in-context learning achieve, and how do intermediate tokens change representational and sample complexity?",
    topicFocus:
      "Training convergence, minimax rates, chain-of-thought decompositions, and serial computation.",
    papers: [
      paper(
        "Yu Huang, Yuan Cheng, and Yingbin Liang",
        "In-Context Convergence of Transformers",
        "ICML 2024",
        "Established",
        "Proves convergence of gradient training for linear-attention in-context regression under explicit distributional assumptions.",
        "https://proceedings.mlr.press/v235/huang24l.html",
      ),
      paper(
        "Juno Kim, Tai Nakamaki, and Taiji Suzuki",
        "Transformers Are Minimax Optimal Nonparametric In-Context Learners",
        "NeurIPS 2024",
        "Strong recent uptake",
        "Constructs transformer in-context estimators attaining minimax rates over nonparametric function classes.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/c11daad0a48ea5f3c5c6390c7b060720-Abstract-Conference.html",
      ),
      paper(
        "Guhao Feng, Bohang Zhang, Yuntian Gu, Haotian Ye, Di He, and Liwei Wang",
        "Towards Revealing the Mystery Behind Chain of Thought: A Theoretical Perspective",
        "NeurIPS 2023",
        "Established",
        "Provides formal settings in which chain-of-thought decompositions reduce learning and representation complexity.",
        "https://proceedings.neurips.cc/paper_files/paper/2023/hash/dfc310e81992d2e4cedc09ac47eff13e-Abstract-Conference.html",
      ),
      paper(
        "Zhiyuan Li, Hong Liu, Denny Zhou, and Tengyu Ma",
        "Chain of Thought Empowers Transformers to Solve Inherently Serial Problems",
        "ICLR 2024",
        "Highly cited",
        "Proves that generated intermediate tokens allow bounded-depth transformers to solve inherently serial tasks that direct prediction cannot efficiently solve.",
        "https://proceedings.iclr.cc/paper_files/paper/2024/hash/3309b4112c9f04a993f2bbdd0274bba1-Abstract-Conference.html",
      ),
    ],
  },
  {
    week: 10,
    date: "November 20, 2026",
    title: "Reasoning Generalization and Next-Token Learning",
    guidingQuestion:
      "Which algorithms generalize beyond training distributions, and what structures does next-token training recover?",
    topicFocus:
      "Length generalization, globality barriers, next-token dynamics, and latent-topic learning.",
    papers: [
      paper(
        "Hattie Zhou et al.",
        "What Algorithms Can Transformers Learn? A Study in Length Generalization",
        "ICLR 2024",
        "Highly cited",
        "Develops a controlled framework for which algorithms transformer training discovers and when those solutions extrapolate to longer inputs.",
        "https://openreview.net/forum?id=AssIuHnmHX",
      ),
      paper(
        "Emmanuel Abbe, Samy Bengio, Aryo Lotfi, Colin Sandon, and Omid Saremi",
        "How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad",
        "NeurIPS 2024",
        "Established",
        "Introduces a globality barrier for learning certain reasoning tasks and proves how structured scratchpads can overcome it.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/3107e4bdb658c79053d7ef59cbc804dd-Abstract-Conference.html",
      ),
      paper(
        "Yingcong Li, Yixiao Huang, M. Emrullah Ildiz, Ankit Singh Rawat, and Samet Oymak",
        "Mechanics of Next Token Prediction with Self-Attention",
        "AISTATS 2024",
        "Established",
        "Proves that gradient descent learns hard token retrieval plus soft composition determined by a directed priority graph.",
        "https://proceedings.mlr.press/v238/li24f.html",
      ),
      paper(
        "Yuchen Li, Yuanzhi Li, and Andrej Risteski",
        "How Do Transformers Learn Topic Structure: Towards a Mechanistic Understanding",
        "ICML 2023",
        "Established",
        "Analyzes how embeddings and attention learn co-occurrence and latent topic structure under a tractable generative model.",
        "https://proceedings.mlr.press/v202/li23p.html",
      ),
    ],
  },
  {
    week: 11,
    date: "November 27, 2026",
    title: "Parameter-Efficient Adaptation and Preference Learning",
    guidingQuestion:
      "What can frozen language models learn through low-dimensional adaptation, and how should pairwise preferences shape a policy?",
    topicFocus:
      "Fine-tuning kernels, prompt expressivity, statistical preference learning, and online exploration.",
    papers: [
      paper(
        "Sadhika Malladi et al.",
        "A Kernel-Based View of Language Model Fine-Tuning",
        "ICML 2023",
        "Established",
        "Develops a kernel approximation for language-model fine-tuning and uses it to predict data and hyperparameter effects.",
        "https://proceedings.mlr.press/v202/malladi23a.html",
      ),
      paper(
        "Yihan Wang, Jatin Chauhan, Wei Wang, and Cho-Jui Hsieh",
        "Universality and Limitations of Prompt Tuning",
        "NeurIPS 2023",
        "Established",
        "Proves universal approximation results for prompt tuning while deriving prompt-length and computational limitations.",
        "https://arxiv.org/abs/2305.18787",
      ),
      paper(
        "Mohammad Gheshlaghi Azar et al.",
        "A General Theoretical Paradigm to Understand Learning from Human Preferences",
        "AISTATS 2024",
        "Highly cited",
        "Derives a general preference-optimization framework and clarifies the consistency and regularization properties of direct objectives.",
        "https://proceedings.mlr.press/v238/gheshlaghi-azar24a.html",
      ),
      paper(
        "Tengyang Xie, Dylan J. Foster, Akshay Krishnamurthy, Corby Rosset, Ahmed H. Awadallah, and Alexander Rakhlin",
        "Exploratory Preference Optimization: Harnessing Implicit Q*-Approximation for Sample-Efficient RLHF",
        "ICLR 2025",
        "Established",
        "Gives a theoretically grounded exploration algorithm for online RLHF under general function approximation and proves sample-efficiency guarantees.",
        "https://openreview.net/forum?id=QYigQ6gXNw",
      ),
    ],
  },
  {
    week: 12,
    date: "December 4, 2026",
    title: "RLHF Distribution Shift and Hallucination Impossibility",
    guidingQuestion:
      "How does coverage govern preference optimization, and which forms of language-model hallucination are unavoidable?",
    topicFocus:
      "Online and offline RLHF, coverage conditions, computability limits, and calibration lower bounds.",
    papers: [
      paper(
        "Shicong Cen et al.",
        "Value-Incentivized Preference Optimization: A Unified Approach to Online and Offline RLHF",
        "ICLR 2025",
        "Established",
        "Introduces a value-regularized direct objective with matching-style guarantees for online optimism and offline pessimism.",
        "https://openreview.net/forum?id=SQnitDuow6",
      ),
      paper(
        "Yuda Song, Gokul Swamy, Aarti Singh, J. Andrew Bagnell, and Wen Sun",
        "The Importance of Online Data: Understanding Preference Fine-Tuning via Coverage",
        "NeurIPS 2024",
        "Established",
        "Derives coverage conditions separating online and offline preference optimization and explains when offline data is fundamentally insufficient.",
        "https://proceedings.neurips.cc/paper_files/paper/2024/hash/16c628ab12dc4caca8e7712affa6c767-Abstract-Conference.html",
      ),
      paper(
        "Ziwei Xu, Sanjay Jain, and Mohan Kankanhalli",
        "Hallucination Is Inevitable: An Innate Limitation of Large Language Models",
        "Technical report 2024",
        "Highly cited",
        "Uses learning-theoretic and computability arguments to prove that a computable general-purpose LLM cannot avoid all hallucinations.",
        "https://arxiv.org/abs/2401.11817",
      ),
      paper(
        "Adam Tauman Kalai and Santosh S. Vempala",
        "Calibrated Language Models Must Hallucinate",
        "STOC 2024",
        "Highly cited",
        "Relates unavoidable hallucination on arbitrary rare facts to calibration and the Good-Turing missing mass.",
        "https://arxiv.org/abs/2311.14648",
      ),
    ],
  },
];
