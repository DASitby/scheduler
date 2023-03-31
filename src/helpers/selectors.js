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

module.exports = {getAppointmentsForDay, getInterview}