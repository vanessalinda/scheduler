import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  // State Object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  //const dailyAppointments = [];
  //const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });
  //const setDays = (days) => setState((prev) => ({ ...prev, days }));

  // Grabbing state data from the server
  useEffect(() => {
    // axios.get(`/api/days`).then((response) => {
    //   console.log(response.data);
    //   //setDays(response.data);
    // });
    const base = `http://localhost:8001/api`;
    Promise.all([
      axios.get(`${base}/days`),
      axios.get(`${base}/appointments`),
      axios.get(`${base}/interviewers`),
    ]).then((all) => {
      //console.log(all[0]); // first
      // console.log(all[1]); // second
      //console.log(all[2].data); // third
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Creating an appointment
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log(appointment);
    //console.log()
    // setState({
    //   ...state,
    //   appointments,
    // });
    // return axios.put(`/api/appointments/${id}`, { ...appointment }).then(() => {
    //   setState({ ...state, appointments });
    // });
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { ...appointment })
      .then(() => {
        setState({ ...state, appointments });
      });
  }

  // Cancelling an appointment
  function cancelInterview(id) {
    //console.log(id);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //console.log(appointment);
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, {
        ...appointment,
      })
      .then(() => {
        setState({ ...state, appointments });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
