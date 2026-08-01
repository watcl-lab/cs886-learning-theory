import {
  annualUpdateNote,
  courseDescription,
  courseDesignPrinciples,
  courseFacts,
  courseSchedule,
  courseScope,
  courseStructure,
  learningOutcomes,
  meetingFormat,
  presentationGuidance,
  presentationRequirements,
  readingExpectations,
  suggestedAssessment,
} from "./courseData";

export default function Home() {
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
          <p className="course-format">
            {courseFacts.duration} · {courseFacts.weeklyOrganization} · {courseFacts.presentationsPerMeeting} presentations per meeting
          </p>
        </header>

        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading">Course Overview</h2>
          {courseDescription.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul>
            <li>
              <strong>Duration:</strong> {courseFacts.duration}
            </li>
            <li>
              <strong>Weekly organization:</strong> {courseFacts.weeklyOrganization}
            </li>
            <li>
              <strong>Presentations:</strong> {courseFacts.presentationsPerMeeting} paper presentations per meeting
            </li>
            <li>
              <strong>Reading program:</strong> {courseFacts.papers} papers and {courseFacts.presentationSlots} presentation slots
            </li>
            <li>
              <strong>Primary emphasis:</strong> {courseFacts.selectionEmphasis}
            </li>
          </ul>
        </section>

        <section aria-labelledby="scope-heading">
          <h2 id="scope-heading">Scope of the Course</h2>
          <p>{courseScope.introduction}</p>
          <p>A paper is included only when it contributes a substantive theoretical object or question, such as:</p>
          <ul>
            {courseScope.inclusionCriteria.map((criterion) => (
              <li key={criterion}>{criterion}</li>
            ))}
          </ul>
          <p>{courseScope.progression}</p>
        </section>

        <section aria-labelledby="selection-heading">
          <h2 id="selection-heading">Paper-Selection and Citation Policy</h2>
          <p>{courseStructure.description}</p>
          <ul>
            {courseDesignPrinciples.map((principle) => (
              <li key={principle.title}>
                <strong>{principle.title}.</strong> {principle.description}
              </li>
            ))}
          </ul>
          <p>{courseStructure.anchorPolicy}</p>
        </section>

        <section aria-labelledby="meeting-heading">
          <h2 id="meeting-heading">Recommended Weekly Meeting Format</h2>
          <p>{meetingFormat.introduction}</p>
          <div className="table-wrap" role="region" aria-label="Weekly meeting format" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Activity</th>
                </tr>
              </thead>
              <tbody>
                {meetingFormat.agenda.map((item) => (
                  <tr key={item.time}>
                    <td>{item.time}</td>
                    <td>{item.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="reading-heading">
          <h2 id="reading-heading">Reading Expectations</h2>
          <ul>
            {readingExpectations.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <p>{readingExpectations.introduction}</p>
          <ol>
            {readingExpectations.preClassSubmission.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="topics-heading">
          <h2 id="topics-heading">Topics at a Glance</h2>
          <div className="table-wrap" role="region" aria-label="Topics at a glance" tabIndex={0}>
            <table className="topics-table">
              <thead>
                <tr>
                  <th scope="col">Week</th>
                  <th scope="col">Topic</th>
                  <th scope="col">Central question</th>
                </tr>
              </thead>
              <tbody>
                {courseSchedule.map((week) => (
                  <tr key={week.week}>
                    <td>{week.week}</td>
                    <td>
                      <a href={`#week-${week.week}`}>{week.title}</a>
                    </td>
                    <td>{week.guidingQuestion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr />

        <section aria-labelledby="schedule-heading">
          <h2 id="schedule-heading">Detailed 24-Week Schedule</h2>
          {courseSchedule.map((week) => (
            <article className="week" id={`week-${week.week}`} key={week.week}>
              <h3>
                <span className="week-number">Week {String(week.week).padStart(2, "0")}</span>
                {week.title}
              </h3>
              <p className="guiding-question">
                <strong>Central question.</strong> {week.guidingQuestion}
              </p>
              <p className="topic-focus">
                <strong>Topic focus.</strong> {week.topicFocus}
              </p>
              <ol className="paper-list">
                {week.papers.map((paper) => (
                  <li key={paper.title}>
                    <p>
                      <strong>{paper.authors}</strong> <em>{paper.title}</em>. {paper.publication}.{" "}
                      <span className="paper-impact">{paper.impact}</span>.{" "}
                      <a href={paper.link}>[paper]</a>
                      <br />
                      <strong>Learning-theory focus:</strong> {paper.presentationFocus}
                    </p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </section>

        <hr />

        <section aria-labelledby="presentation-heading">
          <h2 id="presentation-heading">Presentation Requirements</h2>
          <p>{presentationGuidance}</p>
          <ol>
            {presentationRequirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="assessment-heading">
          <h2 id="assessment-heading">Suggested Assessment</h2>
          <div className="table-wrap" role="region" aria-label="Suggested assessment" tabIndex={0}>
            <table className="assessment-table">
              <thead>
                <tr>
                  <th scope="col">Component</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Standard</th>
                </tr>
              </thead>
              <tbody>
                {suggestedAssessment.map((item) => (
                  <tr key={item.component}>
                    <td>{item.component}</td>
                    <td>{item.weight}</td>
                    <td>{item.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="outcomes-heading">
          <h2 id="outcomes-heading">Learning Outcomes</h2>
          <p>By the end of the course, students should be able to:</p>
          <ul>
            {learningOutcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="updating-heading">
          <h2 id="updating-heading">Annual Updating</h2>
          <p className="annual-note">{annualUpdateNote}</p>
        </section>
      </main>
    </>
  );
}
