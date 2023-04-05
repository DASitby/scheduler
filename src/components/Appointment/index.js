import React, { Fragment } from "react"
import useVisualMode from "hooks/useVisualMode"
import Empty from "./Empty"
import Header from "./Header"
import Show from "./Show"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import "./styles.scss"


export default function Appointment(props) {
  const interview= props.interview
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING"
  const EDIT = "EDIT";

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
      .then(()=>transition(SHOW))
    }
  }
  const confirm = () => {
    transition(CONFIRM)
  }
  const cancel = () => {
    transition(SHOW)
  }
  const deleter = () => {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
  }
  const edit = () => {
    transition(EDIT)
  }

  return( <Fragment>
  <Header time={props.time}/>
  {mode === EMPTY && <Empty onAdd={event => transition(CREATE)} />}
  {mode === SAVING && <Status message = {"Saving"}/>}
  {mode === DELETING && <Status message = {"Deleting"}/>}  
  {mode === CONFIRM && <Confirm onCancel = {event => cancel()} onConfirm={event => deleter()}/>}
  {mode === EDIT && <Form
    student={props.interview.student}
    interviewer={props.interview.interviewer.id}
    onCancel={event => back()}
    interviewers={props.interviewers}
    onSave={save}
   />}
  {mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={event => confirm()}
    onEdit={event => edit()}
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