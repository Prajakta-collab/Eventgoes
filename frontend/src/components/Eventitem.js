import React, { useContext } from "react";
import eventContext from "../context/events/eventContext";

const Eventitem = (props) => {
  const context = useContext(eventContext);
  const { deleteEvent } = context;
  const { event, updateEvent } = props;
  let daty = new Date(event.date);

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <span
          className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
          style={{ left: "90%", zIndex: "1" }}
        >
          {daty.toLocaleDateString()}
        </span>
        <img
          src="https://www.medstartr.com/main/images/no-image.png"
          className="card-img-top"
          alt="Event img"
        />

        <div className="card-body">
          <h5 className="card-title " style={{ textDecoration: "bold" }}>
            Title : {event.title}
          </h5>
          <p className="card-text">Descripton : {event.description}</p>
          <p className="card-text">Tag : {event.tag}</p>
          <p className="card-text">Time : {event.time} </p>
          <p className="card-text">Venue : {event.venue} </p>

          <i
            className="btn btn-primary fas fa-trash-alt mx-2"
            onClick={() => {
              deleteEvent(event._id);
            }}
          >
            {" "}
            Delete
          </i>
          <i
            className="btn btn-primary fas fa-edit mx-2"
            onClick={() => {
              updateEvent(event);
            }}
          >
            {" "}
            Update
          </i>
        </div>
      </div>
    </div>
  );
};

export default Eventitem;
