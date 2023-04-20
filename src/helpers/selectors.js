const getAppointmentsForDay = (state, checkDay) =>{
  const result = []
  let appointments = []
  state.days.forEach(day => {
    if (day.name === checkDay){
      appointments = day.appointments
    }
  });
  appointments.forEach(appointment => {     
    result.push(state.appointments[appointment])
  });
  return result
}

const getInterview = (state, interview) =>{
  if(interview){
    const result = {student: interview.student, interviewer: state.interviewers[interview.interviewer]}
    return result
  }else{
    return null
  }
}

const getInterviewersForDay = (state, checkDay) => {
  let result = []
  let activeDay = {}
  state.days.forEach(day => {
    if (day.name === checkDay){
      activeDay = {...day}
    }
  });
  console.log("activeDay", activeDay)
  const dayInterviewers = activeDay.interviewers
  console.log(dayInterviewers)
  console.log("interviewers", state.interviewers)
  for (const id in state.interviewers) {
    if (Object.hasOwnProperty.call(state.interviewers, id)) {
      const element = state.interviewers[id];
      if (dayInterviewers.includes(element.id)){
        result.push(element)
      }
    }
  }
  return result
}

module.exports = {getAppointmentsForDay, getInterview, getInterviewersForDay}