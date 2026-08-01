import {
  claimDistinctions,
  courseDescription,
  courseDesignPrinciples,
  courseFacts,
  courseSchedule,
  courseStructure,
  learningOutcomes,
  meetingFormat,
  presentationGuidance,
  presentationRequirements,
  readingExpectations,
} from "./courseData";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to course content
      </a>

      <main className="container" id="main-content">
        <header className="course-header">
          <h1>
            {courseFacts.code}: {courseFacts.title}
          </h1>
          <p className="course-subtitle">{courseFacts.subtitle}</p>
          <p>{courseFacts.format}</p>
        </header>

        <hr />

        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading">Course Overview</h2>
          {courseDescription.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul>
            <li>
              <strong>Institution:</strong> {courseFacts.institution}
            </li>
            <li>
              <strong>Frequency:</strong> {courseFacts.frequency}
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
          </ul>
        </section>

        <section aria-labelledby="structure-heading">
          <h2 id="structure-heading">Course Structure and Selection Policy</h2>
          <p>
            The course follows the broad topic-based style of Wenhu Chen&apos;s{" "}
            <a href={courseStructure.referenceCourseUrl}>{courseStructure.referenceCourse}</a>: each weekly meeting has
            one standard research topic and four papers, one for each presentation slot.
          </p>
          <p>The paper-selection rules are:</p>
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
                  <th scope="col">Central learning question</th>
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
                Week {week.week}: {week.title}
              </h3>
              <p className="topic-focus">
                <strong>Topic focus.</strong> {week.topicFocus}
              </p>
              <ol className="paper-list">
                {week.papers.map((paper) => (
                  <li key={paper.title}>
                    <p>
                      <strong>{paper.authors}</strong> <em>{paper.title}</em>. {paper.publication}{" "}
                      <a href={paper.link}>[paper]</a>
                      <br />
                      <strong>Presentation focus:</strong> {paper.presentationFocus}
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
          <p>Presenters should explicitly distinguish among the following claims:</p>
          <ul>
            {claimDistinctions.map((claim) => (
              <li key={claim}>{claim}</li>
            ))}
          </ul>
          <p>{readingExpectations.integratorRole}</p>
        </section>

        <section aria-labelledby="outcomes-heading">
          <h2 id="outcomes-heading">Learning Outcomes</h2>
          <p>By the end of the course, students should be able to:</p>
          <ol>
            {learningOutcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
