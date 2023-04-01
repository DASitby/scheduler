import React, { Fragment } from "react"
import useVisualMode from "hooks/useVisualMode"
import Empty from "./Empty"
import Header from "./Header"
import Show from "./Show"
import Form from "./Form"
import "./styles.scss"


export default function Appointment(props) {
  const interview= props.interview
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return( <Fragment>
  <Header time={props.time}/>
  {mode === EMPTY && <Empty onAdd={event => transition(CREATE)} />}
  {mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />)}
  {mode === CREATE && (
    <Form 
      onCancel={event => back()}
    />
  )}
  </Fragment>
  )
}