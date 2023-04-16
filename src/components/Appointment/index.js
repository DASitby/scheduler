import React, { Fragment } from "react"
import useVisualMode from "hooks/useVisualMode"
import Empty from "./Empty"
import Header from "./Header"
import Show from "./Show"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import "./styles.scss"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING"
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

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
      .catch(()=> transition(ERROR_SAVE, true))
    }
  }
  const confirm = () => {
    transition(CONFIRM)
  }
  const deleter = () => {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(()=>transition(ERROR_DELETE, true))
  }
  const edit = () => {
    transition(EDIT)
  }

  return( <article data-testid="appointment">
  <Header time={props.time}/>
  {mode === EMPTY && <Empty onAdd={event => transition(CREATE)} />}
  {mode === SAVING && <Status message = {"Saving"}/>}
  {mode === DELETING && <Status message = {"Deleting"}/>}  
  {mode === CONFIRM && <Confirm onCancel = {event => back()} onConfirm={event => deleter()}/>}
  {mode === ERROR_SAVE && <Error message={"Could not save try again"} onClose={back}/>}
  {mode === ERROR_DELETE && <Error message={"Could not delete, try again"} onClose={back}/>}  
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
  </article>
  )
}