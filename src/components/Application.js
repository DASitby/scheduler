import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";

export default function Application(props) {
  const {
    state,
    setDay,
    setInterviewer,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  return (
    <main className="layout">
      <section className="sidebar">
        {<>
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList 
              days={state.days} 
              value={state.day} 
              onChange={setDay}
            />
          </nav>
          <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"/>
        </>}
      </section>
      <section className="schedule">
        {Object.values(dailyAppointments).map(appointment =>{
          const interview = getInterview(state, appointment.interview);
          return(
            <Appointment 
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          )
        })}
      </section>
    </main>
  );
}
