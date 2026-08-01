import {
  courseDescription,
  courseFacts,
  courseSchedule,
  optionalProject,
  presentationGuidance,
  presentationRequirements,
  presentationWorkload,
  suggestedAssessment,
} from "./courseData";

export default function Home() {
  const [publicationBeforeConference, publicationAfterConference = ""] =
    optionalProject.publicationSupport.split("NeurIPS 2024");

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

        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading">Course Overview</h2>
          {courseDescription.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className="course-logistics">
            <li>
              <strong>Term:</strong> {courseFacts.term}
            </li>
            <li>
              <strong>Meetings:</strong> {courseFacts.meetingDay}, {courseFacts.meetingDuration}
            </li>
            <li>
              <strong>Course dates:</strong> {courseFacts.firstMeeting} to {courseFacts.lastMeeting}
            </li>
            <li>
              <strong>Weekly discussion:</strong> {courseFacts.papersPerMeeting} papers
            </li>
          </ul>
        </section>

        <section aria-labelledby="topics-heading">
          <h2 id="topics-heading">Topics at a Glance</h2>
          <p className="schedule-note">
            <strong>Reading Week:</strong> No class on {courseFacts.skippedMeeting}. University Reading Week runs{" "}
            <a href={courseFacts.readingWeekUrl}>{courseFacts.readingWeek}</a>.
          </p>
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
              <tbody>
                {courseSchedule.map((week) => (
                  <tr key={week.week}>
                    <td>{week.week}</td>
                    <td>{week.date}</td>
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
          <h2 id="schedule-heading">Detailed 12-Week Schedule</h2>
          {courseSchedule.map((week) => (
            <article className="week" id={`week-${week.week}`} key={week.week}>
              <h3>
                <span className="week-number">
                  Week {String(week.week).padStart(2, "0")} · {week.date}
                </span>
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
          <p>{presentationWorkload}</p>
          <h3>Optional Project (Additional Marks)</h3>
          <p>{optionalProject.description}</p>
          <p>
            {publicationBeforeConference}
            <a href={optionalProject.exampleUrl}>NeurIPS 2024</a>
            {publicationAfterConference}
          </p>
        </section>

        <section className="academic-policy" aria-labelledby="academic-integrity-policy-heading">
          <h2 id="academic-integrity-policy-heading">University of Waterloo Academic Integrity Policy</h2>
          <p>
            The University of Waterloo Senate Undergraduate Council has also approved the following message outlining
            University of Waterloo policy on academic integrity and associated policies.
          </p>

          <h3>Academic Integrity</h3>
          <p>
            In order to maintain a culture of academic integrity, members of the University of Waterloo community are
            expected to promote honesty, trust, fairness, respect and responsibility. Check the Office of Academic
            Integrity&apos;s <a href="https://uwaterloo.ca/academic-integrity">website</a> for more information. All
            members of the UW community are expected to hold to the highest standard of academic integrity in their
            studies, teaching, and research. This site explains why academic integrity is important and how students
            can avoid academic misconduct. It also identifies resources available on campus for students and faculty
            to help achieve academic integrity in, and our, of the classroom.
          </p>

          <h3>Grievance</h3>
          <p>
            A student who believes that a decision affecting some aspect of his/her university life has been unfair or
            unreasonable may have grounds for initiating a grievance. Read{" "}
            <a href="https://uwaterloo.ca/secretariat/policies-procedures-guidelines/policy-70">
              Policy 70 - Student Petitions and Grievances, Section 4
            </a>
            . When in doubt please be certain to contact the department&apos;s administrative assistant who will provide
            further assistance.
          </p>

          <h3>Discipline</h3>
          <p>
            A student is expected to know what constitutes academic integrity, to avoid committing academic offenses,
            and to take responsibility for his/her actions. A student who is unsure whether an action constitutes an
            offense, or who needs help in learning how to avoid offenses (e.g., plagiarism, cheating) or about “rules”
            for group work/collaboration should seek guidance from the course professor, academic advisor, or the
            Undergraduate Associate Dean. For information on categories of offenses and types of penalties, students
            should refer to{" "}
            <a href="https://uwaterloo.ca/secretariat/policies-procedures-guidelines/policy-71">
              Policy 71-Student Discipline
            </a>
            . For typical penalties check{" "}
            <a href="https://uwaterloo.ca/secretariat/guidelines/guidelines-assessment-penalties">
              Guidelines for the Assessment of Penalties
            </a>
            .
          </p>

          <h3>Avoiding Academic Offenses</h3>
          <p>
            Most students are unaware of the line between acceptable and unacceptable academic behaviour, especially
            when discussing assignments with classmates and using the work of other students. For information on
            commonly misunderstood academic offenses and how to avoid them, students should refer to the Faculty of
            Mathematics Cheating and Student Academic Discipline Policy.
          </p>

          <h3>Appeals</h3>
          <p>
            A decision made or a penalty imposed under Policy 70, Student Petitions and Grievances (other than a
            petition) or Policy 71, Student Discipline may be appealed if there is a ground. A student who believes
            he/she has a ground for an appeal should refer to{" "}
            <a href="https://uwaterloo.ca/secretariat/policies-procedures-guidelines/policy-72">
              Policy 72 - Student Appeals
            </a>
            .
          </p>

          <h3>Note for students with disabilities</h3>
          <p>
            The AccessAbility Services Office (AAS), located in Needles Hall, Room 1401, collaborates with all academic
            departments to arrange appropriate accommodations for students with disabilities without compromising the
            academic integrity of the curriculum. If you require academic accommodations to lessen the impact of your
            disability, please register with the AAS at the beginning of each academic term.
          </p>
        </section>
      </main>
    </>
  );
}
