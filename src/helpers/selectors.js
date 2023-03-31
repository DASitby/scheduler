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

module.exports = {getAppointmentsForDay}