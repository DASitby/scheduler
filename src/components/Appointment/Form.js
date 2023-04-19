import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Form(props){
  const [error, setError] = useState("");
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
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