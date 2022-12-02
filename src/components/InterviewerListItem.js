import React from "react";
import classNames from "classnames";
//mport "components/DayListItem.scss";

export default function DayListItem(props) {
  // const dayClass = classNames("day-list__item", {
  //   "day-list__item--selected": props.selected,
  //   "day-list__item--full": props.spots === 0,
  // });
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
