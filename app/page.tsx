import {
  additionalReadingGroups,
  additionalReadings,
  assessmentSummary,
  courseDescription,
  courseFacts,
  courseModules,
  courseProject,
  courseSchedule,
  generativeAiPolicy,
  isPendingCourseFact,
  learningOutcomes,
  meetingFormat,
  navigationItems,
  pendingLogistics,
  presentationGuidance,
  presentationRequirements,
  presentationWorkload,
  projectDeadlines,
  projectPresentation,
  readingExpectations,
  universityPolicies,
  type CoursePaper,
  type CourseWeek,
} from "./courseData";

function PaperList({ papers }: { papers: readonly CoursePaper[] }) {
  return (
    <ol className="paper-list">
      {papers.map((paper) => (
        <li key={paper.title}>
          <p>
            <strong>{paper.authors}</strong>{" "}
            <a href={paper.link}>
              <em>{paper.title}</em>
            </a>
            . {paper.publication}.
            <br />
            <strong>Theoretical focus:</strong> {paper.presentationFocus}
          </p>
        </li>
      ))}
    </ol>
  );
}

function WeekPaperList({ week }: { week: CourseWeek }) {
  if (!week.subtopics?.length) {
    return <PaperList papers={week.papers} />;
  }

  return (
    <div className="subtopics">
      {week.subtopics.map((subtopic) => {
        const papers = subtopic.paperTitles.map(
          (paperTitle) => week.papers.find((paper) => paper.title === paperTitle)!,
        );

        return (
          <div className="subtopic" key={subtopic.title}>
            <h5 className="subtopic-label">{subtopic.title}</h5>
            <p className="subtopic-description">{subtopic.description}</p>
            <PaperList papers={papers} />
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const weekByNumber = new Map(
    courseSchedule.map((week) => [week.week, week] as const),
  );

  const scheduleModules = courseModules.map((module) => ({
    ...module,
    weeks: module.weekNumbers.map((weekNumber) => {
      const week = weekByNumber.get(weekNumber);

      if (!week) {
        throw new Error(
          `Course module ${module.id} references missing Week ${weekNumber}.`,
        );
      }

      return week;
    }),
  }));

  const readingModules = scheduleModules
    .map((module) => ({
      ...module,
      weeks: module.weeks.filter((week) => week.papers.length > 0),
    }))
    .filter((module) => module.weeks.length > 0);

  const additionalReadingByTitle = new Map(
    additionalReadings.map((paper) => [paper.title, paper] as const),
  );

  const groupedAdditionalReadings = additionalReadingGroups.map((group) => ({
    ...group,
    papers: group.paperTitles.map((paperTitle) => {
      const paper = additionalReadingByTitle.get(paperTitle);

      if (!paper) {
        throw new Error(
          `Additional-reading group ${group.id} references missing paper: ${paperTitle}`,
        );
      }

      return paper;
    }),
  }));

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to course content
      </a>

      <main className="container" id="main-content">
        <header className="course-header">
          <p className="course-kicker">
            {courseFacts.institution} · {courseFacts.format}
          </p>
          <h1>
            {courseFacts.code}: {courseFacts.title}
          </h1>
          <p className="course-subtitle">{courseFacts.subtitle}</p>
        </header>

        <nav className="course-nav" aria-label="Course sections">
          <ul>
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="overview" aria-labelledby="overview-heading">
          <h2 id="overview-heading">Course Overview and Logistics</h2>
          {courseDescription.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <strong>Recommended preparation.</strong> {courseDescription.recommendedBackground}
          </p>
          <p>
            <strong>Required materials.</strong> {courseDescription.requiredMaterials}
          </p>
          <p>
            <strong>Note for non-theory students.</strong> {courseDescription.nonTheoryStudents}
          </p>

          <h3>Preparatory Background</h3>
          <p>{courseDescription.preparatoryBackgroundIntroduction}</p>
          <ul className="preparatory-background">
            {courseDescription.preparatoryBackground.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}
              </li>
            ))}
          </ul>

          <dl className="course-logistics">
            <div className="logistics-item">
              <dt>Term</dt>
              <dd>{courseFacts.term}</dd>
            </div>
            <div className="logistics-item">
              <dt>Instructor</dt>
              <dd>
                {courseFacts.instructor}, {courseFacts.instructorTitle} ·{" "}
                <a href={`mailto:${courseFacts.instructorEmail}`}>{courseFacts.instructorEmail}</a>
              </dd>
            </div>
            <div className="logistics-item">
              <dt>Office</dt>
              <dd>{courseFacts.instructorOffice}</dd>
            </div>
            <div className="logistics-item">
              <dt>Office hours</dt>
              <dd>
                {isPendingCourseFact(courseFacts.officeHours)
                  ? pendingLogistics.officeHours
                  : courseFacts.officeHours}
              </dd>
            </div>
            <div className="logistics-item">
              <dt>Meeting time</dt>
              <dd>
                {courseFacts.meetingDay}, {courseFacts.meetingTime}
              </dd>
            </div>
            <div className="logistics-item">
              <dt>Location</dt>
              <dd>
                {isPendingCourseFact(courseFacts.meetingLocation)
                  ? pendingLogistics.meetingLocation
                  : courseFacts.meetingLocation}
              </dd>
            </div>
            <div className="logistics-item">
              <dt>Delivery mode</dt>
              <dd>{courseFacts.deliveryMode}</dd>
            </div>
            <div className="logistics-item">
              <dt>Course platform</dt>
              <dd>
                {isPendingCourseFact(courseFacts.coursePlatform)
                  ? pendingLogistics.coursePlatform
                  : courseFacts.coursePlatform}
              </dd>
            </div>
            <div className="logistics-item">
              <dt>Scheduled seminar meetings</dt>
              <dd>{courseFacts.scheduledMeetingRange}</dd>
            </div>
            <div className="logistics-item">
              <dt>University class period</dt>
              <dd>{courseFacts.universityClassPeriod}</dd>
            </div>
            <div className="logistics-item">
              <dt>Reading Week</dt>
              <dd>
                No class on {courseFacts.skippedMeeting}. University Reading Week runs{" "}
                <a href={courseFacts.readingWeekUrl}>{courseFacts.readingWeek}</a>.
              </dd>
            </div>
            <div className="logistics-item">
              <dt>Last updated</dt>
              <dd>{courseFacts.lastUpdated}</dd>
            </div>
          </dl>
        </section>

        <section id="learning-outcomes" aria-labelledby="learning-outcomes-heading">
          <h2 id="learning-outcomes-heading">Learning Outcomes</h2>
          <ol>
            {learningOutcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ol>
        </section>

        <section id="schedule" aria-labelledby="schedule-heading">
          <h2 id="schedule-heading">Topics at a Glance</h2>
          <p className="schedule-note">
            <strong>Tentative schedule:</strong> The current schedule is a work in progress. Topics, papers, and their
            order may change.
          </p>

          <div className="schedule-desktop">
            <div className="table-wrap" role="region" aria-label="Topics at a glance" tabIndex={0}>
              <table className="topics-table">
                <thead>
                  <tr>
                    <th scope="col">Week</th>
                    <th scope="col">Date</th>
                    <th scope="col">Topic</th>
                    <th scope="col">Central question</th>
                  </tr>
                </thead>
                {scheduleModules.map((module) => (
                  <tbody className="schedule-module-group" key={module.id}>
                    <tr className="schedule-module-row">
                      <th colSpan={4} scope="rowgroup">
                        <span className="schedule-module-label">{module.label}</span>
                        <span className="schedule-module-title">{module.title}</span>
                        {module.description ? (
                          <span className="schedule-module-description">
                            {module.description}
                          </span>
                        ) : null}
                      </th>
                    </tr>
                    {module.weeks.map((week) => (
                      <tr key={week.week}>
                        <td>{week.week}</td>
                        <td>{week.date}</td>
                        <td>
                          {week.papers.length > 0 ? (
                            <a href={`#week-${week.week}`}>{week.title}</a>
                          ) : (
                            week.title
                          )}
                        </td>
                        <td>{week.guidingQuestion}</td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </div>

          <div className="schedule-mobile" aria-label="Topics at a glance">
            {scheduleModules.map((module) => (
              <section
                className="mobile-schedule-module"
                aria-labelledby={`mobile-module-${module.id}`}
                key={module.id}
              >
                <header className="mobile-module-header">
                  <p className="mobile-module-label">{module.label}</p>
                  <h3
                    className="mobile-module-title"
                    id={`mobile-module-${module.id}`}
                  >
                    {module.title}
                  </h3>
                  {module.description ? (
                    <p className="mobile-module-description">
                      {module.description}
                    </p>
                  ) : null}
                </header>
                <ol className="mobile-schedule">
                  {module.weeks.map((week) => (
                    <li key={week.week}>
                      <div className="mobile-schedule-header">
                        <span className="mobile-schedule-week">
                          Week {week.week}
                        </span>
                        <span className="mobile-schedule-date">{week.date}</span>
                      </div>
                      <p className="mobile-schedule-topic">
                        {week.papers.length > 0 ? (
                          <a href={`#week-${week.week}`}>{week.title}</a>
                        ) : (
                          week.title
                        )}
                      </p>
                      {week.guidingQuestion ? (
                        <p className="mobile-schedule-question">
                          <strong>Central question:</strong>{" "}
                          {week.guidingQuestion}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </section>

        <section id="reading-expectations" aria-labelledby="reading-expectations-heading">
          <h2 id="reading-expectations-heading">Reading Expectations</h2>
          <p>{readingExpectations}</p>
        </section>

        <section id="detailed-schedule" aria-labelledby="detailed-schedule-heading">
          <h2 id="detailed-schedule-heading">Detailed Paper Schedule</h2>
          {readingModules.map((module) => (
            <section
              className="detailed-module"
              aria-labelledby={`detailed-module-${module.id}`}
              key={module.id}
            >
              <header className="detailed-module-header">
                <p className="detailed-module-label">{module.label}</p>
                <h3 id={`detailed-module-${module.id}`}>{module.title}</h3>
                {module.description ? (
                  <p className="detailed-module-description">
                    {module.description}
                  </p>
                ) : null}
              </header>

              {module.weeks.map((week) => (
                <article
                  className="week"
                  id={`week-${week.week}`}
                  key={week.week}
                >
                  <h4 className="week-title">
                    <span className="week-number">
                      Week {String(week.week).padStart(2, "0")} · {week.date}
                    </span>
                    {week.title}
                  </h4>
                  {week.connection ? (
                    <p className="week-connection">
                      <strong>Connection to the previous week.</strong>{" "}
                      {week.connection}
                    </p>
                  ) : null}
                  <p className="guiding-question">
                    <strong>Central question.</strong>{" "}
                    {week.guidingQuestion}
                  </p>
                  <WeekPaperList week={week} />
                  <a className="back-to-schedule" href="#schedule">
                    Back to schedule
                  </a>
                </article>
              ))}
            </section>
          ))}
        </section>

        <section id="paper-presentations" aria-labelledby="paper-presentations-heading">
          <h2 id="paper-presentations-heading">
            Paper Presentations
          </h2>
          <p>{presentationGuidance}</p>
          <p>{presentationWorkload}</p>

          <h3>Meeting Format</h3>
          <ul className="meeting-format">
            {meetingFormat.map((item) => (
              <li key={item.activity}>
                <strong>{item.duration}:</strong> {item.activity}
              </li>
            ))}
          </ul>

          <h3>Presentation</h3>
          <ol>
            {presentationRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ol>
        </section>

        <section id="project" aria-labelledby="project-heading">
          <h2 id="project-heading">Required Course Project</h2>
          <p>{courseProject.introduction}</p>

          <h3>Acceptable Project Forms</h3>
          <ol>
            {courseProject.acceptableForms.map((form) => (
              <li key={form.title}>
                <strong>{form.title}.</strong> {form.description}
                {"examples" in form ? (
                  <ul>
                    {form.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
          <p>{courseProject.empiricalStandard}</p>

          <h3>Project Deliverables</h3>
          <ul>
            {courseProject.deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>

          <h3>Project Evaluation</h3>
          <p>Projects will be evaluated according to:</p>
          <ul>
            {courseProject.evaluationCriteria.map((criterion) => (
              <li key={criterion}>{criterion}</li>
            ))}
          </ul>
          <p>{courseProject.evaluationNote}</p>
          <p>
            {courseProject.publicationSupport} {courseProject.publicationExample.leadIn}{" "}
            <a href={courseProject.publicationExample.url}>{courseProject.publicationExample.linkText}</a>.
          </p>
        </section>

        <section id="project-deadlines" aria-labelledby="project-deadlines-heading">
          <h2 id="project-deadlines-heading">Project Milestones and Deadlines</h2>
          <div className="table-wrap" role="region" aria-label="Project deadlines" tabIndex={0}>
            <table className="deadline-table">
              <thead>
                <tr>
                  <th scope="col">Deliverable</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {projectDeadlines.map((item) => (
                  <tr key={item.milestone}>
                    <td>{item.milestone}</td>
                    <td>{item.deadline}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="project-presentation-requirements"
          aria-labelledby="project-presentation-requirements-heading"
        >
          <h2 id="project-presentation-requirements-heading">Project Presentation Requirements</h2>
          <p>{projectPresentation.introduction}</p>

          <p>Every presentation should include:</p>
          <ol>
            {projectPresentation.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ol>
          <p>{projectPresentation.guidance}</p>
        </section>

        <section id="assessment" aria-labelledby="assessment-heading">
          <h2 id="assessment-heading">Assessment</h2>
          <p>{assessmentSummary}</p>
        </section>

        <section id="generative-ai" aria-labelledby="generative-ai-heading">
          <h2 id="generative-ai-heading">Use of Generative AI</h2>
          {generativeAiPolicy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section id="additional-readings" aria-labelledby="additional-readings-heading">
          <h2 id="additional-readings-heading">Suggested Additional Readings and Project Starting Points</h2>
          <p>
            These readings include foundational representational, mechanistic, and adjacent theory papers that support
            the seminar&apos;s learning-theory core, as well as possible project starting points. They are not scheduled
            paper presentations.
          </p>
          <div className="additional-reading-groups">
            {groupedAdditionalReadings.map((group) => (
              <section className="additional-reading-group" key={group.id}>
                <h3>{group.title}</h3>
                <p className="additional-reading-group-description">
                  {group.description}
                </p>
                <PaperList papers={group.papers} />
              </section>
            ))}
          </div>
        </section>

        <section className="academic-policy" id="policies" aria-labelledby="policies-heading">
          <h2 id="policies-heading">University Policies and Supports</h2>
          <p>{universityPolicies.introduction}</p>
          <p>{courseDescription.officialOutlineNotice}</p>
          <p>
            <strong>Official course outline:</strong>{" "}
            {isPendingCourseFact(courseFacts.officialOutlineUrl) ? (
              universityPolicies.pendingOfficialOutlineText
            ) : (
              <a href={courseFacts.officialOutlineUrl}>
                {universityPolicies.officialOutlineLinkText}
              </a>
            )}
          </p>
          <p>
            Waterloo provides additional information about{" "}
            <a href={universityPolicies.outlineGuidanceUrl}>course outlines and institutional requirements</a>.
          </p>
          <ul className="policy-links">
            {universityPolicies.resources.map((resource) => (
              <li key={resource.url}>
                <a href={resource.url}>{resource.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
