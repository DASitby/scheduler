import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
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
const bookInterview = (id, interview) => {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.put(`/api/appointments/${id}`, {interview: appointment.interview})
  .then(setState({...state, appointments}))
}
const cancelInterview= (id) => {
  const appointment = {
    ...state.appointments[id],
    interview: null
  }
  const appointments = {
    ...state.appointments,
    id: appointment
  }
  return axios.delete(`/api/appointments/${id}`)
  .then(setState({...state, appointments}))
}
return({
  state,
  setDay,
  setInterviewer,
  bookInterview,
  cancelInterview
})
}