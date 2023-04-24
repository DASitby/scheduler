import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props){
  const [error, setError] = useState("");
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [interviewers] = useState(props.interviewers)
  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }
  const cancel = () => {
    validate()
    reset()
    props.onCancel()
  }
  function validate() {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }
    if (interviewer === null || "") {
      setError("please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }  
  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
      className="appointment__create-input text--semi-bold"
      name="name"
      value={student}
      type="text"
      placeholder="Enter student name here"
      onChange={event => setStudent(event.target.value)}
      data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers = {interviewers} 
      student={student} 
      value={interviewer}
      onChange={setInterviewer}/>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  )
}