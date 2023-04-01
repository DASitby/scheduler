import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import "components/Application.scss";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];
export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      //"1": {id: 1,time: "12pm",},"2": {id: 2,time: "1pm", interview: {student: "Lydia Miller-Jones", interviewer:{id: 3, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png"}}}, "3": {id: 3, time: "2pm"},"4": {id: 4, time: "3pm", interview: {student: "Archie Andrews", interviewer:{id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg",}}}, "5": { id: 5, time: "4pm",}
    },
    interviewer: "Sylvia Palmer",
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const setInterviewer = interviewer => setState({ ...state, interviewer });
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
    .then(resArray => {
      setState({...state, 
        days: resArray[0].data, 
        appointments: resArray[1].data, 
        interviewers:resArray[2].data,})
    })
  }, [])
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        {
          <>
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />
            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
            <DayList days={state.days} value={state.day} onChange={setDay}/>
            <InterviewerList interviewers ={interviewers} value={state.interviewer} onChange={setInterviewer}/>
            </nav>
            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </>
        }
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
          />
          )
         })}
      </section>
    </main>
  );
}
