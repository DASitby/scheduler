import React, { Fragment } from "react"
import useVisualMode from "hooks/useVisualMode"
import Empty from "./Empty"
import Header from "./Header"
import Show from "./Show"
import Form from "./Form"
import Status from "./Status"
import "./styles.scss"


export default function Appointment(props) {
  const interview= props.interview
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    if(interview.student && interview.interviewer){
    transition(SAVING)
    props.bookInterview(props.id, interview)
    transition(SHOW)
    }
  }

  const deleter = () => {
    props.cancelInterview(props.id)
  }

  return( <Fragment>
  <Header time={props.time}/>
  {mode === EMPTY && <Empty onAdd={event => transition(CREATE)} />}
  {mode === SAVING && <Status />}
  {mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={event => deleter()}
  />)}
  {mode === CREATE && (
    <Form 
      onCancel={event => back()}
      interviewers={props.interviewers}
      onSave={save}
    />
  )}
  </Fragment>
  )
}