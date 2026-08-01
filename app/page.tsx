import {
  annualRefresh,
  claimLedger,
  courseDescription,
  courseFacts,
  courseModules,
  courseSchedule,
  courseSummary,
  learningOutcomes,
  meetingFormat,
  presentationRubric,
  presentationSlideLimit,
  readingExpectations,
} from "./courseData";

const moduleSlugs = {
  1: "foundations",
  2: "in-context-learning",
  3: "reasoning",
  4: "scaling-and-memory",
  5: "alignment-and-agents",
} as const;

const moduleNumerals = ["I", "II", "III", "IV", "V"] as const;

const slidePlan = [
  { label: "Question", count: presentationSlideLimit.question },
  { label: "Model & assumptions", count: presentationSlideLimit.modelAndAssumptions },
  { label: "Main result", count: presentationSlideLimit.mainResult },
  { label: "Proof or mechanism", count: presentationSlideLimit.proofOrMechanism },
  { label: "Evidence", count: presentationSlideLimit.evidence },
  { label: "Weaknesses & open problems", count: presentationSlideLimit.weaknessesAndOpenProblems },
] as const;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to course content
      </a>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="course-mark" href="#top" aria-label="CS 886 home">
            <span className="course-mark-code">CS 886</span>
            <span className="course-mark-name">Learning Theory for Modern AI</span>
          </a>
          <nav className="primary-nav" aria-label="Course navigation">
            <a href="#overview">Overview</a>
            <a href="#schedule">Schedule</a>
            <a href="#seminar-format">Format</a>
            <a href="#outcomes">Outcomes</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid shell">
            <div className="hero-copy">
              <p className="eyebrow">
                {courseFacts.institution} <span aria-hidden="true">/</span> {courseFacts.code}
              </p>
              <h1>
                Learning Theory
                <span>for Modern AI</span>
              </h1>
              <p className="hero-subtitle">{courseFacts.subtitle}</p>
              <p className="hero-summary">{courseSummary}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#schedule">
                  Explore the 24-week schedule
                </a>
                <a className="button button-secondary" href="#seminar-format">
                  How the seminar works
                </a>
              </div>
            </div>

            <aside className="hero-question" aria-labelledby="central-question">
              <div className="question-orbit" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className="label" id="central-question">
                The central problem
              </p>
              <blockquote>
                What do modern AI systems learn, why do they learn it, and when will it generalize?
              </blockquote>
              <p>
                A research seminar connecting precise theory to the behavior of today&apos;s transformers and language models.
              </p>
            </aside>
          </div>

          <div className="shell fact-strip" aria-label="Course at a glance">
            <div>
              <strong>24</strong>
              <span>weekly themes</span>
            </div>
            <div>
              <strong>96</strong>
              <span>research papers</span>
            </div>
            <div>
              <strong>4</strong>
              <span>presentations each week</span>
            </div>
            <div>
              <strong>120</strong>
              <span>minutes per seminar</span>
            </div>
          </div>
        </section>

        <section className="section shell" id="overview">
          <div className="section-heading overview-heading">
            <div>
              <p className="eyebrow">What we will investigate</p>
              <h2>Questions that drive the course</h2>
            </div>
            <p>{courseDescription.paragraphs[0]}</p>
          </div>

          <ol className="question-grid">
            {courseDescription.leadQuestions.map((question, index) => (
              <li key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{question}</p>
              </li>
            ))}
          </ol>

          <div className="course-approach">
            <p className="label">The seminar approach</p>
            <p>{courseDescription.paragraphs[1]}</p>
          </div>
        </section>

        <section className="section modules-section" aria-labelledby="course-arc-title">
          <div className="shell">
            <div className="section-heading compact-heading">
              <div>
                <p className="eyebrow">The intellectual arc</p>
                <h2 id="course-arc-title">Five modules, one connected argument</h2>
              </div>
              <p>
                The course moves from what transformers can represent to how they learn, reason, scale, adapt, and act.
              </p>
            </div>

            <ol className="module-map">
              {courseModules.map((module, index) => (
                <li className={`tone-${module.id}`} key={module.id}>
                  <a href={`#module-${moduleSlugs[module.id]}`}>
                    <span className="module-number">Module {moduleNumerals[index]}</span>
                    <strong>{module.title}</strong>
                    <span>
                      Weeks {module.weekRange[0]}–{module.weekRange[1]}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section schedule-section shell" id="schedule">
          <div className="section-heading schedule-heading">
            <div>
              <p className="eyebrow">24 weeks / 96 papers</p>
              <h2>The reading schedule</h2>
            </div>
            <p>
              Every week begins with a common anchor paper, then extends, challenges, or reframes its central claim.
            </p>
          </div>

          <nav className="module-jump" aria-label="Jump to a schedule module">
            <span>Jump to</span>
            {courseModules.map((module, index) => (
              <a className={`tone-${module.id}`} href={`#module-${moduleSlugs[module.id]}`} key={module.id}>
                {moduleNumerals[index]} <span>{module.title}</span>
              </a>
            ))}
          </nav>

          <div className="schedule">
            {courseModules.map((module, moduleIndex) => {
              const weeks = courseSchedule.filter((week) => week.module === module.id);

              return (
                <section
                  className={`schedule-module tone-${module.id}`}
                  id={`module-${moduleSlugs[module.id]}`}
                  key={module.id}
                  aria-labelledby={`module-${module.id}-title`}
                >
                  <header className="module-header">
                    <div className="module-index" aria-hidden="true">
                      {moduleNumerals[moduleIndex]}
                    </div>
                    <div>
                      <p className="label">
                        Module {moduleNumerals[moduleIndex]} · Weeks {module.weekRange[0]}–{module.weekRange[1]}
                      </p>
                      <h3 id={`module-${module.id}-title`}>{module.title}</h3>
                      <p>{module.description}</p>
                    </div>
                  </header>

                  <div className="week-list">
                    {weeks.map((week) => (
                      <div key={week.week}>
                        <article className="week-card" id={`week-${week.week}`}>
                          <details open={week.week === 1}>
                            <summary>
                              <span className="week-number">Week {String(week.week).padStart(2, "0")}</span>
                              <span className="week-title">{week.title}</span>
                              <span className="disclosure-hint" aria-hidden="true">
                                <span className="show-label">Show papers</span>
                                <span className="hide-label">Hide papers</span>
                              </span>
                            </summary>

                            <div className="week-content">
                              <div className="guiding-question">
                                <p className="label">Guiding question</p>
                                <p>{week.guidingQuestion}</p>
                              </div>

                              <ol className="paper-list">
                                {week.papers.map((paper, paperIndex) => (
                                  <li className={paperIndex === 0 ? "anchor-paper" : undefined} key={paper.title}>
                                    <div className="paper-index">
                                      <span>{paperIndex + 1}</span>
                                      {paperIndex === 0 && <small>Common anchor</small>}
                                    </div>
                                    <div className="paper-copy">
                                      <p className="paper-authors">{paper.authors}</p>
                                      <h4>{paper.title}</h4>
                                      <p className="paper-meta">
                                        {paper.venue} · {paper.year}
                                      </p>
                                      <p className="paper-angle">{paper.presentationAngle}</p>
                                    </div>
                                    <a
                                      className="paper-link"
                                      href={paper.link}
                                      target="_blank"
                                      rel="noreferrer"
                                      aria-label={`Read ${paper.title} (opens in a new tab)`}
                                    >
                                      Read paper <span aria-hidden="true">↗</span>
                                    </a>
                                  </li>
                                ))}
                              </ol>

                              {week.closingDebate && (
                                <aside className="closing-debate">
                                  <span>Closing debate</span>
                                  <p>{week.closingDebate}</p>
                                </aside>
                              )}
                            </div>
                          </details>
                        </article>

                        {week.week === courseFacts.termSplitAfterWeek && (
                          <div className="term-break" role="note">
                            <span>Natural two-term split</span>
                            <p>Week 12 closes the first half. Week 13 begins the second-term sequence on reasoning and scale.</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="section format-section" id="seminar-format">
          <div className="shell">
            <div className="section-heading light-heading">
              <div>
                <p className="eyebrow">A two-hour research seminar</p>
                <h2>Every meeting turns reading into argument</h2>
              </div>
              <p>
                Four focused talks lead into a shared evidence audit and a class vote on what the literature actually supports.
              </p>
            </div>

            <div className="meeting-timeline" aria-label="Two-hour meeting timeline">
              {meetingFormat.agenda.map((item, index) => (
                <div key={item.time}>
                  <span className="timeline-dot" aria-hidden="true">{index + 1}</span>
                  <p className="timeline-time">{item.time}</p>
                  <p>{item.activity}</p>
                </div>
              ))}
            </div>

            <p className="timing-note">Each paper talk is approximately 15 minutes, followed by 5 minutes of questions.</p>
          </div>
        </section>

        <section className="section shell expectations-section">
          <div className="expectation-card reading-card">
            <p className="eyebrow">Before class</p>
            <h2>A deliberate reading protocol</h2>
            <ol className="numbered-list">
              {readingExpectations.steps.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <div className="submission-note">
              <p className="label">Submit three things before class</p>
              <ul>
                {readingExpectations.preClassSubmission.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="integrator-note">
              <p className="label">The fourth presenter integrates</p>
              <p>{readingExpectations.integratorRole}</p>
            </div>
          </div>

          <div className="expectation-card rubric-card">
            <p className="eyebrow">When presenting</p>
            <h2>Five questions for every paper</h2>
            <ol className="rubric-list">
              {presentationRubric.map((item, index) => (
                <li key={item.question}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.question}</h3>
                    <p>{item.guidance}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="slide-plan">
              <p className="label">A suggested 10-slide arc</p>
              <div>
                {slidePlan.map((item) => (
                  <span key={item.label} style={{ flexGrow: item.count }}>
                    <strong>{item.count}</strong>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section ledger-section">
          <div className="shell ledger-grid">
            <div className="ledger-intro">
              <p className="eyebrow">Shared claim ledger</p>
              <h2>What should the field now believe?</h2>
              <p>
                After every seminar, the class records the strongest result, its most important limitation, the live disagreement, and the best open problem.
              </p>
            </div>
            <div className="ledger-items">
              {claimLedger.map((entry, index) => (
                <article key={entry.item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{entry.item}</h3>
                  <p>{entry.example}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell outcomes-section" id="outcomes">
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">By the end of the course</p>
              <h2>Learning outcomes</h2>
            </div>
            <p>
              Students leave able to separate impressive claims from the assumptions and evidence that make them true.
            </p>
          </div>
          <ol className="outcome-grid">
            {learningOutcomes.map((outcome, index) => (
              <li key={outcome}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{outcome}</p>
              </li>
            ))}
          </ol>

          <aside className="refresh-note">
            <div>
              <p className="label">A living frontier</p>
              <h3>Selected fourth-paper slots refresh annually.</h3>
            </div>
            <p>
              {annualRefresh.note} Current refresh weeks: {annualRefresh.weeks.join(", ")}.
            </p>
          </aside>
        </section>

        <section className="logistics-section">
          <div className="shell logistics-inner">
            <div>
              <p className="eyebrow">Course logistics</p>
              <h2>Details will be added when confirmed.</h2>
            </div>
            <p>
              This site reflects the supplied draft course plan. Instructor, term dates, room, office hours, assessment, and course policies are not yet specified.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <div>
            <strong>{courseFacts.code}</strong>
            <span>{courseFacts.title}</span>
          </div>
          <p>{courseFacts.institution} · Graduate research seminar</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
