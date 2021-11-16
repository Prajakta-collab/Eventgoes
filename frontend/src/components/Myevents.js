import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import eventContext from "../context/events/eventContext";
import Eventitem from "./Eventitem";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

const Myevents = () => {
  const currentDate = new Date();
  const startDate = currentDate.getDate();
  const context = useContext(eventContext);
  const { events, getEvent, editEvent } = context;

  const [event, setevent] = useState({
    id: " ",
    etitle: "",
    edescription: "",
    etag: "default",
    edate: "",
    etime: "",
    evenue: "",
  });
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getEvent();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const updateEvent = (CurrentEvent) => {
    ref.current.click();
    setevent({
      id: CurrentEvent._id,
      etitle: CurrentEvent.title,
      edescription: CurrentEvent.description,
      etag: CurrentEvent.tag,
      edate: CurrentEvent.date,
      etime: CurrentEvent.time,
      evenue: CurrentEvent.venue,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    editEvent(
      event.id,
      event.etitle,
      event.edescription,
      event.etag,
      event.edate,
      event.etime,
      event.evenue
    );
    refClose.current.click();
  };

  const onChange = (e) => {
    setevent({ ...event, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Event
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form>
                  <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                      placeholder="Enter title"
                      onChange={onChange}
                      value={event.etitle}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="form-group my2">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control "
                      id="edescription"
                      name="edescription"
                      placeholder="Descripion"
                      onChange={onChange}
                      value={event.edescription}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="tag">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      placeholder="Tag"
                      onChange={onChange}
                      value={event.etag}
                      minLength={5}
                    />
                    <div className="form-group my-2">
                      <label htmlFor="date">Date</label>
                      <DatePickerComponent
                        placeholder="Date"
                        id="edate"
                        name="edate"
                        value={event.edate}
                        min={startDate}
                        onChange={onChange}
                        format="dd-MMM-yy"
                      ></DatePickerComponent>
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="tag">Time</label>
                      {/* <TimePickerComponent placeholder="Select a time"
      value={event.etime}
      id="etime"
      name="etime"
      onChange={onChange}
    
     >

      </TimePickerComponent> */}
                      <input
                        type="text"
                        className="form-control"
                        id="etime"
                        name="etime"
                        placeholder="Time"
                        onChange={onChange}
                        required
                        value={event.etime}
                      />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="venue">Venue</label>
                      <input
                        type="text"
                        className="form-control"
                        id="evenue"
                        name="evenue"
                        placeholder="Venue"
                        onChange={onChange}
                        value={event.evenue}
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  event.etitle.length < 5 || event.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Event
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row my-3 b " style={{ marginLeft: "5vw" }}>
        <h2 style={{ textAlign: "center" }}>Your Events </h2>
        {events.length === 0 && "no events to display"}
        {events.map((event) => {
          return (
            <Eventitem
              key={event._id}
              updateEvent={updateEvent}
              event={event}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Myevents;
