export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const [selectedDay] = state.days.filter((item) => item.name === day);
  if (!selectedDay) return [];
  const { appointments: selectedDayAppointments } = selectedDay;
  //console.log(selectedDayAppointments);
  //const appointmentsForDay = state.appointments.filter(item => appointments)
  const appointmentsArray = Object.values(state.appointments);
  //console.log(appointmentsArray)
  const appointmentsForDay = appointmentsArray.filter((item) =>
    selectedDayAppointments.includes(item.id)
  );
  //console.log(appointmentsForDay);
  return appointmentsForDay;
}
