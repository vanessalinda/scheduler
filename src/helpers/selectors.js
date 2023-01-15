export function getAppointmentsForDay(state, day) {
  const [selectedDay] = state.days.filter((item) => item.name === day);
  if (!selectedDay) return [];
  const { appointments: selectedDayAppointments } = selectedDay;
  const appointmentsArray = Object.values(state.appointments);
  const appointmentsForDay = appointmentsArray.filter((item) =>
    selectedDayAppointments.includes(item.id)
  );
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const { interviewer: interviewerId } = interview;
  const interviewerDetails = state.interviewers[interviewerId];
  const interviewDetails = { ...interview, interviewer: interviewerDetails };
  return interviewDetails;
}

export function getInterviewersForDay(state, day) {
  const [selectedDay] = state.days.filter((item) => item.name === day);
  if (!selectedDay) return [];
  const { interviewers: selectedDayInterviewers } = selectedDay;
  const interviewersArray = Object.values(state.interviewers);
  const interviewersForDay = interviewersArray.filter((item) =>
    selectedDayInterviewers.includes(item.id)
  );
  return interviewersForDay;
}
