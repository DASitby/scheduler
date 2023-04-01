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

const getInterviewersForDay = (state, checkDay) =>{
  const result = []
  let interviewers = []
  state.days.forEach(day => {
    if (day.name === checkDay){
      interviewers = day.interviewers
    }
  });
  interviewers.forEach(interviewer => {
    result.push(interviewer)
  });
  return result
}

module.exports = {getAppointmentsForDay, getInterview, getInterviewersForDay}