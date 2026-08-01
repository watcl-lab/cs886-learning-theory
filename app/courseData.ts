export type CoursePaper = {
  authors: string;
  title: string;
  publication: string;
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
  format: "24-Week Topic-Based Graduate Research Seminar",
  frequency: "One meeting per week",
  weeklyOrganization: "One major topic per meeting",
  presentationsPerMeeting: 4,
  presentationSlots: 96,
  papers: 96,
  selectionEmphasis: "Recent, influential work from leading groups",
} as const;

export const courseSummary =
  "A research-oriented course on transformer foundations, in-context learning, reasoning, scaling, data, adaptation, alignment, reliability, retrieval, and language-model agents.";

export const courseDescription = {
  paragraphs: [
    "Learning Theory for Modern AI: Transformers and Large Language Models is a topic-based graduate research seminar on how modern foundation models represent, learn, generalize, reason, and act. Each week focuses on one major research topic and four influential papers. Topics include transformer expressivity, efficient attention, positional encoding, mixture-of-experts models, pretraining objectives, scaling laws, data curation, evaluation, in-context learning, prompt optimization, chain-of-thought reasoning, verification, formal mathematics, mechanistic interpretability, retrieval, parameter-efficient finetuning, instruction tuning, preference optimization, hallucination, and language-model agents.",
    "Students will lead paper presentations, compare competing explanations, audit assumptions and evidence, and identify concrete open problems. The objective is not merely to learn how current systems are built, but to understand what they learn, why they learn it, when they generalize, and where current theory remains inadequate.",
  ],
} as const;

export const courseStructure = {
  referenceCourse: "CS 886: Recent Advances on Foundation Models",
  referenceCourseUrl: "https://cs.uwaterloo.ca/~wenhuche/teaching/cs886/",
  description:
    "The course is organized in the same broad style as the topic-based lecture schedule used in Wenhu Chen's CS 886: Recent Advances on Foundation Models: each weekly meeting has a standard research topic and a short list of papers grouped under that topic. In this course, every topic contains exactly four papers, one for each presentation slot.",
  anchorPolicy:
    "The first paper in each week is the recommended common anchor. All students read that paper in depth.",
} as const;

export const courseDesignPrinciples = [
  {
    title: "Popularity and impact",
    description:
      "Papers were selected for substantial citation uptake, broad adoption, influence on later systems or theory, or repeated use in research courses and surveys. Exact citation counts are not printed because they vary across databases and change continuously.",
  },
  {
    title: "Recency",
    description:
      "The schedule concentrates on work from 2020–2025. A small number of 2017–2019 papers are retained only when they remain indispensable foundations for the topic.",
  },
  {
    title: "Research provenance",
    description:
      "The authors include prominent researchers from leading universities. Field-defining papers from major research laboratories are retained when there is no academically authored substitute of comparable influence. Purely incremental or weakly established frontier papers were removed.",
  },
  {
    title: "Topical coherence",
    description:
      "The four readings in each week address a common technical theme and are intended to be compared directly during the discussion period.",
  },
  {
    title: "Learning-theory spine",
    description:
      "Even applied weeks emphasize a precise learning question: representation, optimization, generalization, data efficiency, inference-time computation, preference learning, uncertainty, or decision-making.",
  },
] as const;

export const meetingFormat = {
  duration: "Two hours",
  introduction:
    "The following two-hour structure keeps four presentations manageable while preserving time for synthesis.",
  agenda: [
    {
      time: "0–8 minutes",
      activity:
        "Instructor framing: definitions, historical context, and the week's central technical question",
    },
    { time: "8–28 minutes", activity: "Presentation 1: common anchor paper" },
    { time: "28–48 minutes", activity: "Presentation 2" },
    { time: "48–68 minutes", activity: "Presentation 3" },
    { time: "68–88 minutes", activity: "Presentation 4" },
    {
      time: "88–108 minutes",
      activity: "Cross-paper comparison led by the four presenters",
    },
    {
      time: "108–118 minutes",
      activity: "Assumption, evidence, and reproducibility audit",
    },
    {
      time: "118–120 minutes",
      activity: "Class vote on the most important open problem",
    },
  ],
} as const;

export const readingExpectations = {
  introduction:
    "Before class, each student submits a short reading note containing the following three items.",
  steps: [
    "All students read the first paper in each week, the recommended common anchor, in depth.",
    "Each presenter takes primary responsibility for one of the four papers.",
    "The class reads the abstracts, introductions, principal results, and limitations of all four papers.",
  ],
  preClassSubmission: [
    "The strongest claim in the common anchor paper",
    "The most consequential assumption or experimental limitation",
    "One question whose answer could change the student's assessment of the paper",
  ],
  anchorPolicy:
    "The first paper in each week is the recommended common anchor. All students read that paper in depth.",
  integratorRole:
    "The fourth presenter also serves as the week's integrator and ends with a two-minute answer to the question: After reading all four papers, what should the field now believe?",
} as const;

export const presentationGuidance =
  "Each presentation should be analytical rather than a sequential summary. A useful maximum is 10 substantive slides.";

export const presentationRequirements = [
  "One slide stating the learning problem and why it matters",
  "One or two slides defining the model, data, objective, and assumptions",
  "Two slides stating the central theorem or empirical result precisely",
  "Two slides explaining the proof idea, algorithm, or experimental design",
  "One slide separating representation, optimization, and generalization claims",
  "One slide identifying the strongest limitation or unresolved alternative explanation",
  "One slide proposing a concrete follow-up theorem, experiment, or counterexample",
] as const;

export const presentationSlideLimit = {
  maximumSubstantiveSlides: 10,
} as const;

export const claimDistinctions = [
  "A transformer can represent an algorithm",
  "Gradient-based training finds such an algorithm",
  "The learned algorithm generalizes to new examples, tasks, or lengths",
  "A result established in a controlled model explains behavior in a deployed large language model",
] as const;

export const learningOutcomes = [
  "Distinguish expressivity, optimization, statistical generalization, and systems-efficiency claims about transformers.",
  "Explain the main empirical and theoretical accounts of in-context learning.",
  "Reason about positional encoding, sparse computation, retrieval, and parameter-efficient adaptation.",
  "Critically assess claims about scaling, emergence, prompting, chain-of-thought, and test-time computation.",
  "Compare supervised instruction tuning, RLHF, AI feedback, and direct preference optimization.",
  "Evaluate benchmark validity, model-based judging, calibration, and hallucination-detection methods.",
  "Identify the gap between controlled theoretical models and frontier language-model behavior.",
  "Formulate a research question that could lead to a publishable theoretical or empirical project.",
] as const;

export const courseSchedule: readonly CourseWeek[] = [
  {
    "week": 1,
    "title": "Transformer Foundations",
    "guidingQuestion": "Which architectural and pretraining ideas made transformer language models broadly transferable?",
    "topicFocus": "The architectural and pretraining ideas that established transformers as the dominant foundation for modern language models.",
    "papers": [
      {
        "authors": "Ashish Vaswani et al.",
        "title": "Attention Is All You Need",
        "publication": "NeurIPS 2017.",
        "presentationFocus": "The original transformer architecture and the role of self-attention, residual connections, and positional information.",
        "link": "https://arxiv.org/abs/1706.03762"
      },
      {
        "authors": "Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova.",
        "title": "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        "publication": "NAACL 2019.",
        "presentationFocus": "Bidirectional masked-language-model pretraining and the modern pretrain-then-finetune paradigm.",
        "link": "https://aclanthology.org/N19-1423/"
      },
      {
        "authors": "Colin Raffel et al.",
        "title": "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer",
        "publication": "JMLR 2020.",
        "presentationFocus": "A unified text-to-text formulation, systematic transfer-learning study, and the T5 model family.",
        "link": "https://www.jmlr.org/papers/v21/20-074.html"
      },
      {
        "authors": "Alec Radford et al.",
        "title": "Language Models are Unsupervised Multitask Learners",
        "publication": "OpenAI technical report, 2019.",
        "presentationFocus": "The GPT-2 scaling study and the emergence of zero-shot task behavior from next-token prediction.",
        "link": "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
      }
    ]
  },
  {
    "week": 2,
    "title": "Expressivity and Computational Limits of Transformers",
    "guidingQuestion": "What can transformers represent or compute, and which limitations follow from depth, precision, or parallelism?",
    "topicFocus": "Formal results separating what transformers can represent in principle from what bounded-depth, bounded-precision models can compute efficiently.",
    "papers": [
      {
        "authors": "Chulhee Yun et al.",
        "title": "Are Transformers Universal Approximators of Sequence-to-Sequence Functions?",
        "publication": "ICLR 2020.",
        "presentationFocus": "A universal-approximation theorem clarifying the distinct roles of attention and feed-forward layers.",
        "link": "https://openreview.net/forum?id=ByxRM0Ntvr"
      },
      {
        "authors": "Michael Hahn.",
        "title": "Theoretical Limitations of Self-Attention in Neural Sequence Models",
        "publication": "TACL 2020.",
        "presentationFocus": "Lower bounds for recognizing formal languages with fixed-depth self-attention.",
        "link": "https://aclanthology.org/2020.tacl-1.11/"
      },
      {
        "authors": "Jorge Pérez, Pablo Barceló, and Javier Marinkovic.",
        "title": "Attention is Turing-Complete",
        "publication": "JMLR 2021.",
        "presentationFocus": "A constructive analysis of the assumptions under which attention-based architectures achieve Turing completeness.",
        "link": "https://www.jmlr.org/papers/v22/20-302.html"
      },
      {
        "authors": "William Merrill, Ashish Sabharwal, and Noah A. Smith.",
        "title": "Saturated Transformers are Constant-Depth Threshold Circuits",
        "publication": "TACL 2022.",
        "presentationFocus": "A circuit-complexity upper bound for saturated transformers under floating-point computation.",
        "link": "https://aclanthology.org/2022.tacl-1.49/"
      }
    ]
  },
  {
    "week": 3,
    "title": "Efficient Attention and Long-Sequence Architectures",
    "guidingQuestion": "How can attention be made cheaper without losing the interactions that make it useful?",
    "topicFocus": "Architectural and systems techniques for reducing the quadratic cost of standard self-attention.",
    "papers": [
      {
        "authors": "Nikita Kitaev, Lukasz Kaiser, and Anselm Levskaya.",
        "title": "Reformer: The Efficient Transformer",
        "publication": "ICLR 2020.",
        "presentationFocus": "Locality-sensitive hashing attention and reversible layers for memory-efficient sequence modeling.",
        "link": "https://openreview.net/forum?id=rkgNKkHtvB"
      },
      {
        "authors": "Iz Beltagy, Matthew E. Peters, and Arman Cohan.",
        "title": "Longformer: The Long-Document Transformer",
        "publication": "Technical report, 2020.",
        "presentationFocus": "Sliding-window and task-motivated global attention for long documents.",
        "link": "https://arxiv.org/abs/2004.05150"
      },
      {
        "authors": "Krzysztof Choromanski et al.",
        "title": "Rethinking Attention with Performers",
        "publication": "ICLR 2021.",
        "presentationFocus": "Random-feature approximations that yield linear-attention algorithms with theoretical guarantees.",
        "link": "https://openreview.net/forum?id=Ua6zuk0WRH"
      },
      {
        "authors": "Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, and Christopher Ré.",
        "title": "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
        "publication": "NeurIPS 2022.",
        "presentationFocus": "An exact attention algorithm designed around GPU memory hierarchy and IO complexity.",
        "link": "https://arxiv.org/abs/2205.14135"
      }
    ]
  },
  {
    "week": 4,
    "title": "Positional Encoding and Long-Context Generalization",
    "guidingQuestion": "How do positional representations support order, memory, and length extrapolation?",
    "topicFocus": "How models represent order, reuse memory, and extrapolate beyond the context lengths seen during training.",
    "papers": [
      {
        "authors": "Zihang Dai et al.",
        "title": "Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context",
        "publication": "ACL 2019.",
        "presentationFocus": "Segment recurrence and relative position representations for context beyond a fixed training window.",
        "link": "https://aclanthology.org/P19-1285/"
      },
      {
        "authors": "Jianlin Su et al.",
        "title": "RoFormer: Enhanced Transformer with Rotary Position Embedding",
        "publication": "Neurocomputing 2024; original preprint 2021.",
        "presentationFocus": "Rotary position embeddings and their relative-position interpretation.",
        "link": "https://arxiv.org/abs/2104.09864"
      },
      {
        "authors": "Ofir Press, Noah A. Smith, and Mike Lewis.",
        "title": "Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation",
        "publication": "ICLR 2022.",
        "presentationFocus": "ALiBi and the possibility of length extrapolation without learned positional embeddings.",
        "link": "https://openreview.net/forum?id=R8sQPpGCv0"
      },
      {
        "authors": "Shouyuan Chen, Sherman Wong, Liangjian Chen, and Yuandong Tian.",
        "title": "Extending Context Window of Large Language Models via Positional Interpolation",
        "publication": "Technical report, 2023.",
        "presentationFocus": "A widely adopted method for extending RoPE-based language models with short continued finetuning.",
        "link": "https://arxiv.org/abs/2306.15595"
      }
    ]
  },
  {
    "week": 5,
    "title": "Mixture-of-Experts and Sparse Scaling",
    "guidingQuestion": "When does sparse conditional computation outperform dense scaling?",
    "topicFocus": "Conditional computation as a route to increasing parameter count without paying dense-model cost on every token.",
    "papers": [
      {
        "authors": "Dmitry Lepikhin et al.",
        "title": "GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding",
        "publication": "ICLR 2021.",
        "presentationFocus": "Sparse experts, routing, and automatic sharding at very large scale.",
        "link": "https://openreview.net/forum?id=qrwe7XHTmYb"
      },
      {
        "authors": "William Fedus, Barret Zoph, and Noam Shazeer.",
        "title": "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity",
        "publication": "JMLR 2022.",
        "presentationFocus": "Simplified top-one expert routing and the optimization challenges of sparse models.",
        "link": "https://www.jmlr.org/papers/v23/21-0998.html"
      },
      {
        "authors": "Nan Du et al.",
        "title": "GLaM: Efficient Scaling of Language Models with Mixture-of-Experts",
        "publication": "ICML 2022.",
        "presentationFocus": "A large sparse language model and an empirical study of quality-compute tradeoffs.",
        "link": "https://proceedings.mlr.press/v162/du22c.html"
      },
      {
        "authors": "Albert Q. Jiang et al.",
        "title": "Mixtral of Experts",
        "publication": "Technical report, 2024.",
        "presentationFocus": "A highly influential open-weight sparse mixture-of-experts model.",
        "link": "https://arxiv.org/abs/2401.04088"
      }
    ]
  },
  {
    "week": 6,
    "title": "Language-Model Pretraining Objectives",
    "guidingQuestion": "How does the pretraining objective determine what is learned and how efficiently it transfers?",
    "topicFocus": "How masking, denoising, discrimination, and mixtures of objectives change learned representations and downstream transfer.",
    "papers": [
      {
        "authors": "Yinhan Liu et al.",
        "title": "RoBERTa: A Robustly Optimized BERT Pretraining Approach",
        "publication": "Technical report, 2019.",
        "presentationFocus": "A controlled demonstration that data, training duration, and objective details matter as much as architectural novelty.",
        "link": "https://arxiv.org/abs/1907.11692"
      },
      {
        "authors": "Kevin Clark et al.",
        "title": "ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators",
        "publication": "ICLR 2020.",
        "presentationFocus": "Sample-efficient representation learning through replaced-token detection.",
        "link": "https://openreview.net/forum?id=r1xMH1BtvB"
      },
      {
        "authors": "Mike Lewis et al.",
        "title": "BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension",
        "publication": "ACL 2020.",
        "presentationFocus": "A general denoising objective for sequence-to-sequence transfer.",
        "link": "https://aclanthology.org/2020.acl-main.703/"
      },
      {
        "authors": "Yi Tay et al.",
        "title": "UL2: Unifying Language Learning Paradigms",
        "publication": "ICLR 2023.",
        "presentationFocus": "A mixture-of-denoisers objective that unifies causal and noncausal pretraining regimes.",
        "link": "https://openreview.net/forum?id=6ruVLB727MC"
      }
    ]
  },
  {
    "week": 7,
    "title": "Scaling Laws, Compute-Optimal Training, and Emergence",
    "guidingQuestion": "How should parameters, data, and compute scale, and are abrupt capabilities genuine?",
    "topicFocus": "Empirical regularities connecting loss and capabilities to model size, data, and compute, together with debates over apparent phase transitions.",
    "papers": [
      {
        "authors": "Jared Kaplan et al.",
        "title": "Scaling Laws for Neural Language Models",
        "publication": "Technical report, 2020.",
        "presentationFocus": "The empirical power laws that shaped early large-model scaling strategy.",
        "link": "https://arxiv.org/abs/2001.08361"
      },
      {
        "authors": "Jordan Hoffmann et al.",
        "title": "Training Compute-Optimal Large Language Models",
        "publication": "NeurIPS 2022.",
        "presentationFocus": "The Chinchilla analysis of how parameters and training tokens should scale under a fixed compute budget.",
        "link": "https://arxiv.org/abs/2203.15556"
      },
      {
        "authors": "Jason Wei et al.",
        "title": "Emergent Abilities of Large Language Models",
        "publication": "TMLR 2022.",
        "presentationFocus": "The empirical case for capabilities that appear abruptly with scale.",
        "link": "https://openreview.net/forum?id=yzkSU5zdwD"
      },
      {
        "authors": "Rylan Schaeffer, Brando Miranda, and Sanmi Koyejo.",
        "title": "Are Emergent Abilities of Large Language Models a Mirage?",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "How discontinuous metrics can create the appearance of abrupt emergence.",
        "link": "https://arxiv.org/abs/2304.15004"
      }
    ]
  },
  {
    "week": 8,
    "title": "Data Curation, Deduplication, and Mixture Design",
    "guidingQuestion": "Which data should a model see, in what proportions, and with what preprocessing?",
    "topicFocus": "How the composition and preprocessing of pretraining corpora affect efficiency, memorization, and downstream quality.",
    "papers": [
      {
        "authors": "Leo Gao et al.",
        "title": "The Pile: An 800GB Dataset of Diverse Text for Language Modeling",
        "publication": "Technical report, 2021.",
        "presentationFocus": "A widely used open corpus and an influential model for documenting heterogeneous pretraining data.",
        "link": "https://arxiv.org/abs/2101.00027"
      },
      {
        "authors": "Katherine Lee et al.",
        "title": "Deduplicating Training Data Makes Language Models Better",
        "publication": "ACL 2022.",
        "presentationFocus": "The effects of exact and near deduplication on memorization, validation leakage, and training efficiency.",
        "link": "https://aclanthology.org/2022.acl-long.577/"
      },
      {
        "authors": "Sang Michael Xie et al.",
        "title": "DoReMi: Optimizing Data Mixtures Speeds Up Language Model Pretraining",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "Domain reweighting through minimax optimization and proxy-model training.",
        "link": "https://arxiv.org/abs/2305.10429"
      },
      {
        "authors": "Jeffrey Li et al.",
        "title": "DataComp-LM: In Search of the Next Generation of Training Sets for Language Models",
        "publication": "NeurIPS 2024, Datasets and Benchmarks Track.",
        "presentationFocus": "A controlled testbed for evaluating data filtering, mixing, and curation strategies.",
        "link": "https://arxiv.org/abs/2406.11794"
      }
    ]
  },
  {
    "week": 9,
    "title": "Evaluation and Benchmarking of Large Language Models",
    "guidingQuestion": "What do benchmarks actually measure, and when are model-based judges reliable?",
    "topicFocus": "What current benchmarks measure, how broad evaluation should be organized, and when model-based evaluation can be trusted.",
    "papers": [
      {
        "authors": "Dan Hendrycks et al.",
        "title": "Measuring Massive Multitask Language Understanding",
        "publication": "ICLR 2021.",
        "presentationFocus": "MMLU and the use of broad knowledge-and-reasoning evaluations for language models.",
        "link": "https://arxiv.org/abs/2009.03300"
      },
      {
        "authors": "Aarohi Srivastava et al.",
        "title": "Beyond the Imitation Game: Quantifying and Extrapolating the Capabilities of Language Models",
        "publication": "TMLR 2023.",
        "presentationFocus": "BIG-bench and collaborative evaluation of diverse and difficult capabilities.",
        "link": "https://openreview.net/forum?id=uyTL5Bvosj"
      },
      {
        "authors": "Percy Liang et al.",
        "title": "Holistic Evaluation of Language Models",
        "publication": "TMLR 2023.",
        "presentationFocus": "HELM and multidimensional evaluation across accuracy, robustness, fairness, efficiency, and other desiderata.",
        "link": "https://openreview.net/forum?id=iO4LZibEqW"
      },
      {
        "authors": "Lianmin Zheng et al.",
        "title": "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena",
        "publication": "NeurIPS 2023, Datasets and Benchmarks Track.",
        "presentationFocus": "Pairwise model evaluation, judge bias, and the foundations of large-scale human preference leaderboards.",
        "link": "https://arxiv.org/abs/2306.05685"
      }
    ]
  },
  {
    "week": 10,
    "title": "Empirical Foundations of In-Context Learning",
    "guidingQuestion": "Under which data conditions do models begin to learn new tasks from their prompts?",
    "topicFocus": "The experiments that established few-shot prompting as a learning phenomenon and identified the data conditions that support it.",
    "papers": [
      {
        "authors": "Tom B. Brown et al.",
        "title": "Language Models are Few-Shot Learners",
        "publication": "NeurIPS 2020.",
        "presentationFocus": "GPT-3 and the modern empirical starting point for in-context learning.",
        "link": "https://proceedings.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html"
      },
      {
        "authors": "Sewon Min et al.",
        "title": "Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?",
        "publication": "EMNLP 2022.",
        "presentationFocus": "A careful study of labels, input distributions, formats, and the surprising robustness of in-context demonstrations.",
        "link": "https://aclanthology.org/2022.emnlp-main.759/"
      },
      {
        "authors": "Shivam Garg, Dimitris Tsipras, Percy Liang, and Gregory Valiant.",
        "title": "What Can Transformers Learn In-Context? A Case Study of Simple Function Classes",
        "publication": "NeurIPS 2022.",
        "presentationFocus": "A controlled framework for studying the function classes learned from examples in the context.",
        "link": "https://arxiv.org/abs/2208.01066"
      },
      {
        "authors": "Stephanie C. Y. Chan et al.",
        "title": "Data Distributional Properties Drive Emergent In-Context Learning in Transformers",
        "publication": "NeurIPS 2022.",
        "presentationFocus": "Which properties of the pretraining distribution cause in-context learning to emerge.",
        "link": "https://arxiv.org/abs/2205.05055"
      }
    ]
  },
  {
    "week": 11,
    "title": "Bayesian and Meta-Learning Views of In-Context Learning",
    "guidingQuestion": "Is in-context learning Bayesian inference, amortized inference, or meta-learning?",
    "topicFocus": "Competing accounts of in-context learning as latent-concept inference, amortized Bayesian inference, and task-level meta-learning.",
    "papers": [
      {
        "authors": "Sang Michael Xie, Aditi Raghunathan, Percy Liang, and Tengyu Ma.",
        "title": "An Explanation of In-Context Learning as Implicit Bayesian Inference",
        "publication": "ICLR 2022.",
        "presentationFocus": "A latent-concept model in which next-token prediction approximates Bayesian inference over tasks.",
        "link": "https://openreview.net/forum?id=RdJVFCHjUMI"
      },
      {
        "authors": "Samuel Müller et al.",
        "title": "Transformers Can Do Bayesian Inference",
        "publication": "ICLR 2022.",
        "presentationFocus": "Training transformers to amortize Bayesian inference across tabular prediction tasks.",
        "link": "https://openreview.net/forum?id=KSugKcbNf9"
      },
      {
        "authors": "Sewon Min et al.",
        "title": "MetaICL: Learning to Learn In Context",
        "publication": "NAACL 2022.",
        "presentationFocus": "Meta-training language models explicitly for generalization to new tasks through demonstrations.",
        "link": "https://aclanthology.org/2022.naacl-main.201/"
      },
      {
        "authors": "Allan Raventós, Mansheej Paul, Feng Chen, and Surya Ganguli.",
        "title": "Pretraining Task Diversity and the Emergence of Non-Bayesian In-Context Learning for Regression",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "How increasing task diversity changes the learned predictor from task-distribution inference toward a general learning algorithm.",
        "link": "https://arxiv.org/abs/2306.15063"
      }
    ]
  },
  {
    "week": 12,
    "title": "In-Context Learning as Implicit Optimization",
    "guidingQuestion": "Does a transformer forward pass implement an optimization algorithm?",
    "topicFocus": "The hypothesis that transformer forward passes encode models in their activations and implement recognizable optimization algorithms.",
    "papers": [
      {
        "authors": "Ekin Akyürek et al.",
        "title": "What Learning Algorithm Is In-Context Learning? Investigations with Linear Models",
        "publication": "ICLR 2023.",
        "presentationFocus": "Evidence that trained transformers implement identifiable regression algorithms in their activations.",
        "link": "https://arxiv.org/abs/2211.15661"
      },
      {
        "authors": "Johannes von Oswald et al.",
        "title": "Transformers Learn In-Context by Gradient Descent",
        "publication": "ICML 2023.",
        "presentationFocus": "Constructions and experiments connecting attention updates to gradient descent.",
        "link": "https://arxiv.org/abs/2212.07677"
      },
      {
        "authors": "Damai Dai et al.",
        "title": "Why Can GPT Learn In-Context? Language Models Secretly Perform Gradient Descent as Meta-Optimizers",
        "publication": "Findings of ACL 2023.",
        "presentationFocus": "A duality between attention and gradient descent, together with comparisons to explicit finetuning.",
        "link": "https://aclanthology.org/2023.findings-acl.247/"
      },
      {
        "authors": "Kwangjun Ahn, Xiang Cheng, Hadi Daneshmand, and Suvrit Sra.",
        "title": "Transformers Learn to Implement Preconditioned Gradient Descent for In-Context Learning",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "A loss-landscape analysis showing that training can select data-adaptive preconditioned gradient updates.",
        "link": "https://arxiv.org/abs/2306.00297"
      }
    ]
  },
  {
    "week": 13,
    "title": "Training and Generalization Theory for In-Context Learning",
    "guidingQuestion": "How many tasks and examples are needed, and why does the learned in-context algorithm generalize?",
    "topicFocus": "Provable guarantees for the algorithms transformers can execute in context, how those algorithms generalize, and how training finds them.",
    "papers": [
      {
        "authors": "Yingcong Li, M. Emrullah Ildiz, Dimitris Papailiopoulos, and Samet Oymak.",
        "title": "Transformers as Algorithms: Generalization and Stability in In-Context Learning",
        "publication": "ICML 2023.",
        "presentationFocus": "Algorithmic stability as a route to generalization bounds for prompt-conditioned predictors.",
        "link": "https://proceedings.mlr.press/v202/li23l.html"
      },
      {
        "authors": "Yu Bai et al.",
        "title": "Transformers as Statisticians: Provable In-Context Learning with In-Context Algorithm Selection",
        "publication": "NeurIPS 2023, Oral.",
        "presentationFocus": "Transformer constructions for broad statistical procedures and model selection from context.",
        "link": "https://arxiv.org/abs/2306.04637"
      },
      {
        "authors": "Ruiqi Zhang, Spencer Frei, and Peter L. Bartlett.",
        "title": "Trained Transformers Learn Linear Models In-Context",
        "publication": "JMLR 2024.",
        "presentationFocus": "A rigorous analysis of gradient-based training that produces a linear-regression in-context learner.",
        "link": "https://www.jmlr.org/papers/v25/23-1042.html"
      },
      {
        "authors": "Jingfeng Wu et al.",
        "title": "How Many Pretraining Tasks Are Needed for In-Context Learning of Linear Regression?",
        "publication": "ICLR 2024.",
        "presentationFocus": "Task-level sample complexity and the role of pretraining diversity.",
        "link": "https://arxiv.org/abs/2310.08391"
      }
    ]
  },
  {
    "week": 14,
    "title": "Prompt Design, Demonstration Selection, and Calibration",
    "guidingQuestion": "Why are prompts fragile, and how can prompt selection or optimization be systematized?",
    "topicFocus": "Why semantically equivalent prompts can produce very different predictions, and how prompts can be selected or optimized systematically.",
    "papers": [
      {
        "authors": "Tony Z. Zhao, Eric Wallace, Shi Feng, Dan Klein, and Sameer Singh.",
        "title": "Calibrate Before Use: Improving Few-Shot Performance of Language Models",
        "publication": "ICML 2021.",
        "presentationFocus": "Contextual calibration as a correction for prompt-induced label and answer biases.",
        "link": "https://proceedings.mlr.press/v139/zhao21c.html"
      },
      {
        "authors": "Tianyu Gao, Adam Fisch, and Danqi Chen.",
        "title": "Making Pre-trained Language Models Better Few-Shot Learners",
        "publication": "ACL 2021.",
        "presentationFocus": "LM-BFF, prompt generation, demonstration selection, and few-shot finetuning.",
        "link": "https://aclanthology.org/2021.acl-long.295/"
      },
      {
        "authors": "Yao Lu et al.",
        "title": "Fantastically Ordered Prompts and Where to Find Them: Overcoming Few-Shot Prompt Order Sensitivity",
        "publication": "ACL 2022.",
        "presentationFocus": "The large effect of demonstration ordering and methods for selecting robust orders.",
        "link": "https://aclanthology.org/2022.acl-long.556/"
      },
      {
        "authors": "Yongchao Zhou et al.",
        "title": "Large Language Models Are Human-Level Prompt Engineers",
        "publication": "ICLR 2023.",
        "presentationFocus": "Automatic Prompt Engineer and the use of language models to search over instruction space.",
        "link": "https://arxiv.org/abs/2211.01910"
      }
    ]
  },
  {
    "week": 15,
    "title": "Chain-of-Thought and Problem Decomposition",
    "guidingQuestion": "Why do explicit intermediate steps improve reasoning?",
    "topicFocus": "How explicit intermediate steps, sampling, curricula, and decomposition improve multistep reasoning.",
    "papers": [
      {
        "authors": "Jason Wei et al.",
        "title": "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
        "publication": "NeurIPS 2022.",
        "presentationFocus": "The foundational empirical result that reasoning traces unlock large gains on multistep tasks.",
        "link": "https://arxiv.org/abs/2201.11903"
      },
      {
        "authors": "Xuezhi Wang et al.",
        "title": "Self-Consistency Improves Chain of Thought Reasoning in Language Models",
        "publication": "ICLR 2023.",
        "presentationFocus": "Sampling multiple reasoning paths and marginalizing by answer agreement.",
        "link": "https://arxiv.org/abs/2203.11171"
      },
      {
        "authors": "Denny Zhou et al.",
        "title": "Least-to-Most Prompting Enables Complex Reasoning in Large Language Models",
        "publication": "ICLR 2023.",
        "presentationFocus": "Decomposing difficult problems into a curriculum of simpler subproblems.",
        "link": "https://arxiv.org/abs/2205.10625"
      },
      {
        "authors": "Eric Zelikman, Yuhuai Wu, Jesse Mu, and Noah D. Goodman.",
        "title": "STaR: Bootstrapping Reasoning With Reasoning",
        "publication": "NeurIPS 2022.",
        "presentationFocus": "Self-training on rationales that lead to correct answers.",
        "link": "https://arxiv.org/abs/2203.14465"
      }
    ]
  },
  {
    "week": 16,
    "title": "Deliberate Reasoning, Search, and Verification",
    "guidingQuestion": "How should additional inference compute be allocated to search, critique, and verification?",
    "topicFocus": "Inference procedures that spend additional computation exploring, revising, and verifying candidate solutions.",
    "papers": [
      {
        "authors": "Karl Cobbe et al.",
        "title": "Training Verifiers to Solve Math Word Problems",
        "publication": "Technical report, 2021.",
        "presentationFocus": "Generate-and-rank reasoning using learned verifiers and the GSM8K benchmark.",
        "link": "https://arxiv.org/abs/2110.14168"
      },
      {
        "authors": "Shunyu Yao et al.",
        "title": "Tree of Thoughts: Deliberate Problem Solving with Large Language Models",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "Search over coherent intermediate thoughts with lookahead and backtracking.",
        "link": "https://arxiv.org/abs/2305.10601"
      },
      {
        "authors": "Niklas Muennighoff et al.",
        "title": "s1: Simple Test-Time Scaling",
        "publication": "EMNLP 2025.",
        "presentationFocus": "How a small, carefully curated reasoning dataset and budget forcing can produce strong test-time scaling.",
        "link": "https://aclanthology.org/2025.emnlp-main.1025/"
      },
      {
        "authors": "Hunter Lightman et al.",
        "title": "Let's Verify Step by Step",
        "publication": "ICLR 2024.",
        "presentationFocus": "Process supervision and the value of assigning credit to individual reasoning steps.",
        "link": "https://arxiv.org/abs/2305.20050"
      }
    ]
  },
  {
    "week": 17,
    "title": "Mathematical and Formal Reasoning",
    "guidingQuestion": "What training and search methods make language models effective at mathematics and formal proof?",
    "topicFocus": "Specialized training, retrieval, search, and neuro-symbolic methods for mathematics and machine-checked proof.",
    "papers": [
      {
        "authors": "Aitor Lewkowycz et al.",
        "title": "Solving Quantitative Reasoning Problems with Language Models",
        "publication": "NeurIPS 2022.",
        "presentationFocus": "The Minerva model and the effect of mathematical data and scale on quantitative reasoning.",
        "link": "https://arxiv.org/abs/2206.14858"
      },
      {
        "authors": "Kaiyu Yang et al.",
        "title": "LeanDojo: Theorem Proving with Retrieval-Augmented Language Models",
        "publication": "NeurIPS 2023, Datasets and Benchmarks Track.",
        "presentationFocus": "A reproducible Lean environment, retrieval, and proof-search framework.",
        "link": "https://arxiv.org/abs/2306.15626"
      },
      {
        "authors": "Zhangir Azerbayev et al.",
        "title": "Llemma: An Open Language Model for Mathematics",
        "publication": "ICLR 2024.",
        "presentationFocus": "Domain-adaptive pretraining for informal and formal mathematical reasoning.",
        "link": "https://arxiv.org/abs/2310.10631"
      },
      {
        "authors": "Trieu H. Trinh et al.",
        "title": "Solving Olympiad Geometry without Human Demonstrations",
        "publication": "Nature 2024.",
        "presentationFocus": "AlphaGeometry and the combination of neural language modeling with symbolic deduction.",
        "link": "https://www.nature.com/articles/s41586-023-06747-5"
      }
    ]
  },
  {
    "week": 18,
    "title": "Mechanistic Interpretability and Knowledge Localization",
    "guidingQuestion": "Can learned algorithms and factual associations be localized and causally validated?",
    "topicFocus": "Methods for identifying circuits, tracing information flow, and testing where learned behaviors or factual associations reside.",
    "papers": [
      {
        "authors": "Nelson Elhage et al.",
        "title": "A Mathematical Framework for Transformer Circuits",
        "publication": "Technical report, 2021.",
        "presentationFocus": "The algebraic vocabulary and decomposition tools that launched modern transformer-circuit analysis.",
        "link": "https://transformer-circuits.pub/2021/framework/index.html"
      },
      {
        "authors": "Catherine Olsson et al.",
        "title": "In-Context Learning and Induction Heads",
        "publication": "Technical report, 2022.",
        "presentationFocus": "Induction heads as a mechanistic candidate for copying patterns and in-context learning.",
        "link": "https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html"
      },
      {
        "authors": "Kevin Wang et al.",
        "title": "Interpretability in the Wild: A Circuit for Indirect Object Identification in GPT-2 Small",
        "publication": "ICLR 2023.",
        "presentationFocus": "A concrete circuit-level explanation and a model for causal validation of interpretability claims.",
        "link": "https://openreview.net/forum?id=NpsVSN6o4ul"
      },
      {
        "authors": "Kevin Meng et al.",
        "title": "Locating and Editing Factual Associations in GPT",
        "publication": "NeurIPS 2022.",
        "presentationFocus": "Causal tracing and rank-one model editing as tests of factual knowledge localization.",
        "link": "https://arxiv.org/abs/2202.05262"
      }
    ]
  },
  {
    "week": 19,
    "title": "Retrieval-Augmented Language Models",
    "guidingQuestion": "When should knowledge live in parameters and when should it be retrieved?",
    "topicFocus": "Treating retrieval as external nonparametric memory for factuality, adaptation, and scaling.",
    "papers": [
      {
        "authors": "Kelvin Guu et al.",
        "title": "REALM: Retrieval-Augmented Language Model Pre-Training",
        "publication": "ICML 2020.",
        "presentationFocus": "End-to-end latent retrieval during language-model pretraining.",
        "link": "https://proceedings.mlr.press/v119/guu20a.html"
      },
      {
        "authors": "Patrick Lewis et al.",
        "title": "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
        "publication": "NeurIPS 2020.",
        "presentationFocus": "The foundational RAG formulation combining a retriever with a sequence generator.",
        "link": "https://arxiv.org/abs/2005.11401"
      },
      {
        "authors": "Sebastian Borgeaud et al.",
        "title": "Improving Language Models by Retrieving from Trillions of Tokens",
        "publication": "ICML 2022.",
        "presentationFocus": "RETRO and the tradeoff between parametric scale and a massive external datastore.",
        "link": "https://arxiv.org/abs/2112.04426"
      },
      {
        "authors": "Akari Asai et al.",
        "title": "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection",
        "publication": "ICLR 2024.",
        "presentationFocus": "A model that learns when to retrieve and how to critique evidence-grounded generations.",
        "link": "https://arxiv.org/abs/2310.11511"
      }
    ]
  },
  {
    "week": 20,
    "title": "Parameter-Efficient Fine-Tuning",
    "guidingQuestion": "How much adaptation can be achieved by training only a tiny fraction of model parameters?",
    "topicFocus": "Adapting large frozen models by learning prompts, low-rank updates, or quantized low-rank adapters.",
    "papers": [
      {
        "authors": "Xiang Lisa Li and Percy Liang.",
        "title": "Prefix-Tuning: Optimizing Continuous Prompts for Generation",
        "publication": "ACL 2021.",
        "presentationFocus": "Learning continuous prefix activations while freezing the underlying language model.",
        "link": "https://aclanthology.org/2021.acl-long.353/"
      },
      {
        "authors": "Brian Lester, Rami Al-Rfou, and Noah Constant.",
        "title": "The Power of Scale for Parameter-Efficient Prompt Tuning",
        "publication": "EMNLP 2021.",
        "presentationFocus": "How soft prompt tuning becomes increasingly competitive as model scale grows.",
        "link": "https://aclanthology.org/2021.emnlp-main.243/"
      },
      {
        "authors": "Edward J. Hu et al.",
        "title": "LoRA: Low-Rank Adaptation of Large Language Models",
        "publication": "ICLR 2022.",
        "presentationFocus": "Low-rank parameter updates and evidence that adaptation directions have low intrinsic rank.",
        "link": "https://arxiv.org/abs/2106.09685"
      },
      {
        "authors": "Tim Dettmers et al.",
        "title": "QLoRA: Efficient Finetuning of Quantized LLMs",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "High-quality finetuning through frozen 4-bit quantized weights and low-rank adapters.",
        "link": "https://arxiv.org/abs/2305.14314"
      }
    ]
  },
  {
    "week": 21,
    "title": "Instruction Tuning and Supervised Alignment",
    "guidingQuestion": "What makes instruction-following generalize to tasks not seen during finetuning?",
    "topicFocus": "How instruction diversity, synthetic data, and response quality shape zero-shot generalization and assistant behavior.",
    "papers": [
      {
        "authors": "Jason Wei et al.",
        "title": "Finetuned Language Models Are Zero-Shot Learners",
        "publication": "ICLR 2022.",
        "presentationFocus": "FLAN and the discovery that instruction tuning strongly improves held-out-task generalization.",
        "link": "https://arxiv.org/abs/2109.01652"
      },
      {
        "authors": "Victor Sanh et al.",
        "title": "Multitask Prompted Training Enables Zero-Shot Task Generalization",
        "publication": "ICLR 2022.",
        "presentationFocus": "T0, prompted multitask training, and generalization to unseen tasks.",
        "link": "https://arxiv.org/abs/2110.08207"
      },
      {
        "authors": "Yizhong Wang et al.",
        "title": "Self-Instruct: Aligning Language Models with Self-Generated Instructions",
        "publication": "ACL 2023.",
        "presentationFocus": "Bootstrapping diverse instruction data from a language model itself.",
        "link": "https://aclanthology.org/2023.acl-long.754/"
      },
      {
        "authors": "Chunting Zhou et al.",
        "title": "LIMA: Less Is More for Alignment",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "The claim that a small amount of carefully curated supervised data can produce strong assistant behavior.",
        "link": "https://openreview.net/forum?id=KBMOKmX2he"
      }
    ]
  },
  {
    "week": 22,
    "title": "RLHF and Preference Optimization",
    "guidingQuestion": "How should pairwise preferences be converted into a training objective?",
    "topicFocus": "Learning helpful behavior from comparisons, reward models, reinforcement learning, AI feedback, and direct preference objectives.",
    "papers": [
      {
        "authors": "Nisan Stiennon et al.",
        "title": "Learning to Summarize from Human Feedback",
        "publication": "NeurIPS 2020.",
        "presentationFocus": "An early large-scale demonstration of reward modeling and RL from pairwise preferences for language generation.",
        "link": "https://arxiv.org/abs/2009.01325"
      },
      {
        "authors": "Long Ouyang et al.",
        "title": "Training Language Models to Follow Instructions with Human Feedback",
        "publication": "NeurIPS 2022.",
        "presentationFocus": "The InstructGPT pipeline: supervised finetuning, reward modeling, and PPO.",
        "link": "https://arxiv.org/abs/2203.02155"
      },
      {
        "authors": "Yuntao Bai et al.",
        "title": "Constitutional AI: Harmlessness from AI Feedback",
        "publication": "Technical report, 2022.",
        "presentationFocus": "Rule-guided self-critique and preference learning from AI-generated feedback.",
        "link": "https://arxiv.org/abs/2212.08073"
      },
      {
        "authors": "Rafael Rafailov et al.",
        "title": "Direct Preference Optimization: Your Language Model Is Secretly a Reward Model",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "A direct supervised objective derived from KL-regularized preference optimization.",
        "link": "https://arxiv.org/abs/2305.18290"
      }
    ]
  },
  {
    "week": 23,
    "title": "Truthfulness, Hallucination, and Calibration",
    "guidingQuestion": "When can models know that they are wrong, and which hallucinations are unavoidable?",
    "topicFocus": "Why language models produce confident falsehoods, whether they know when they are wrong, and which errors are statistically unavoidable.",
    "papers": [
      {
        "authors": "Stephanie Lin, Jacob Hilton, and Owain Evans.",
        "title": "TruthfulQA: Measuring How Models Mimic Human Falsehoods",
        "publication": "ACL 2022.",
        "presentationFocus": "A benchmark targeting imitative falsehoods and common human misconceptions.",
        "link": "https://arxiv.org/abs/2109.07958"
      },
      {
        "authors": "Saurav Kadavath et al.",
        "title": "Language Models (Mostly) Know What They Know",
        "publication": "Technical report, 2022.",
        "presentationFocus": "Self-evaluation, confidence elicitation, and calibration across model scales.",
        "link": "https://arxiv.org/abs/2207.05221"
      },
      {
        "authors": "Adam Tauman Kalai and Santosh S. Vempala.",
        "title": "Calibrated Language Models Must Hallucinate",
        "publication": "STOC 2024.",
        "presentationFocus": "A statistical lower bound connecting calibration, singleton facts, and unavoidable hallucination.",
        "link": "https://arxiv.org/abs/2311.14648"
      },
      {
        "authors": "Sebastian Farquhar, Jannik Kossen, Lorenz Kuhn, and Yarin Gal.",
        "title": "Detecting Hallucinations in Large Language Models Using Semantic Entropy",
        "publication": "Nature 2024.",
        "presentationFocus": "Uncertainty estimation over semantic equivalence classes rather than token strings.",
        "link": "https://www.nature.com/articles/s41586-024-07421-0"
      }
    ]
  },
  {
    "week": 24,
    "title": "Tool Use and Language-Model Agents",
    "guidingQuestion": "When does next-token prediction become a policy for using tools and acting in an environment?",
    "topicFocus": "The transition from passive text prediction to systems that browse, call tools, act in environments, and learn from textual feedback.",
    "papers": [
      {
        "authors": "John Yang et al.",
        "title": "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering",
        "publication": "NeurIPS 2024.",
        "presentationFocus": "How agent-computer interface design changes an LLM agent's ability to navigate repositories, edit code, and execute tests.",
        "link": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/5a7c947568c1b1328ccc5230172e1e7c-Abstract-Conference.html"
      },
      {
        "authors": "Shunyu Yao et al.",
        "title": "ReAct: Synergizing Reasoning and Acting in Language Models",
        "publication": "ICLR 2023.",
        "presentationFocus": "Interleaving reasoning traces with actions and observations.",
        "link": "https://arxiv.org/abs/2210.03629"
      },
      {
        "authors": "Timo Schick et al.",
        "title": "Toolformer: Language Models Can Teach Themselves to Use Tools",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "Self-supervised learning of when and how to invoke external APIs.",
        "link": "https://arxiv.org/abs/2302.04761"
      },
      {
        "authors": "Noah Shinn et al.",
        "title": "Reflexion: Language Agents with Verbal Reinforcement Learning",
        "publication": "NeurIPS 2023.",
        "presentationFocus": "Improving repeated attempts through linguistic feedback and episodic memory.",
        "link": "https://arxiv.org/abs/2303.11366"
      }
    ]
  }
];
