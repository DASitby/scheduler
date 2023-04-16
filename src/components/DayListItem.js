import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots = (value) => {
  let output = value
    if (value === 0) {
    output = "no spots"
  } else if (value === 1){
    output = value + ' spot'
  } else {
    output = value + ' spots'
  }
  return output
}

  return (
    <li className={dayClass} onClick={()=>props.setDay(props.name)} selected={props.selected} data-testid={"day"}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}
