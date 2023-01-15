import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  // State Object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // Grabbing state data from the server
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Updating spots available
  const updateSpots = (state, appointments, id) => {
    const interviewStatePrev = state.appointments[id].interview;
    const interviewStatePost = appointments[id].interview;
    let spotsChange = 0;

    // Handle Update
    if (interviewStatePrev !== null && interviewStatePost !== null) {
      spotsChange = 0;
    }

    // Handle Delete
    else if (interviewStatePrev !== null && interviewStatePost === null) {
      spotsChange = 1;
    }

    // Handle Create
    else if (interviewStatePrev === null && interviewStatePost !== null) {
      spotsChange = -1;
    }

    const updatedDays = state.days.map((day) => {
      // Find the day where the appointments array includes the ID
      if (day.appointments.includes(id)) {
        // Update the spots value with the appropriate spotsChange
        return { ...day, spots: day.spots + spotsChange };
      }
      return day;
    });

    return updatedDays;
  };

  // Creating an appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { ...appointment })
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState({ ...state, days, appointments });
      });
  }

  // Cancelling an appointment
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, {
        ...appointment,
      })
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState({ ...state, days, appointments });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
