import React from "react";

export default function InterviewerListItem(props){
  const interviewerClass = classnames("interviewers__item",{"interviewers__item--selected": props.selected})

  return(<li className="" onClick={() => {props.setInterviewer(props.id)}}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.name}
  </li>)
}