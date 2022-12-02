import React from "react";
import InterviewerListItem from "./InterviewerListItem";
//import classNames from "classnames";
import "../styles/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, setInterviewer } = props;
  const interviewerListItems = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={setInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListItems}</ul>
    </section>
  );
}
