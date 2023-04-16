import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
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
    setState(prev=> ({...prev, 
      days: resArray[0].data, 
      appointments: resArray[1].data, 
      interviewers:resArray[2].data,}))
  })
}, [])

const findDay = (appointments) => {
  const dayOfWeek = state.days.find((day) => day.name === state.day);
  let counter = 0;
  dayOfWeek.appointments.forEach((id) => {
    if (appointments[id].interview === null) {
      counter++;
    }
  });
  const newDay = { ...dayOfWeek, spots: counter };
  const newDayArray = [...state.days];
  newDayArray[dayOfWeek.id - 1] = newDay;

  return newDayArray;
}

const bookInterview = (id, interview) => {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const days = findDay(appointments)
  return axios.put(`/api/appointments/${id}`, {interview: appointment.interview})
  .then(() =>{    
    setState({...state, appointments, days})
  })
}
const cancelInterview= (id) => {
  const appointment = {
    ...state.appointments[id],
    interview: null
  }
  const appointments = {
    ...state.appointments,
    [id]: appointment
  }
  const days = findDay(appointments)
  return axios.delete(`/api/appointments/${id}`)
  .then(() =>{
    setState({...state, appointments,days})
  })
}
return({
  state,
  setDay,
  setInterviewer,
  bookInterview,
  cancelInterview
})
}