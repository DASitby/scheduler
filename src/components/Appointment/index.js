import React, { Fragment } from "react"
import Empty from "./Empty"
import Header from "./Header"
import Show from "./Show"
import "./styles.scss"

export default function Appointment(props) {
  const interview= props.interview
  return( <Fragment>
  <Header time={props.time}/>
  {props.interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty/>}
  </Fragment>
  )
}