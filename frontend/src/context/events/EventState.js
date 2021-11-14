import React, { useState } from "react";
import eventContext from "./eventContext";

const EventState = (props) => {
  const host = "http://localhost:5000"
  const eventsInitial = [];
    
      
  const [events, setEvents] = useState(eventsInitial);

  //get all  note
  const getEvent = async () => {
    //todo Api call here
    console.log("local storage mdhl token:",localStorage.getItem('token'))
    const response = await fetch(`${host}/api/events/fetchallevents`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

     
    });
   const json=await response.json()
   console.log("get note krtana ch json",json);
  
    setEvents(json);
  };

  //Add a note
  const addEvent = async (title, description, tag,date,time,venue) => {
    //todo Api call here

    const response=await fetch(`${host}/api/events/addevent`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag ,date,time,venue}),

    });
    const event=await response.json()
    console.log("add note wal token",localStorage.getItem('token'))
    console.log(event)
    console.log("before concat notes",event)


    setEvents(events.concat(event));
    console.log("after concat notes",events)
  };

  //Delete a event
  const deleteEvent = async(id) => {
    // Api call
     await fetch(`${host}/api/events/deleteevent/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }

     
    });

    console.log("deleting this note :" + id);
    const newEvent = events.filter((event) => {
      return event._id !== id;
    });
    setEvents(newEvent);
  };
  //Edit a note
  let editEvent = async (id, title, description, tag,date,time,venue) => {
    //api call
   const response=await fetch(`${host}/api/events/updateevent/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag ,date,time,venue})
     
    });
    const json=response;
    console.log(json);

    let newEvents=JSON.parse(JSON.stringify(events))

    //logic to edit note at client
    for (let index = 0; index < newEvents.length; index++)
     {
      const element = newEvents[index];
      if (element.id === id) {
        newEvents[index].title= title;
        newEvents[index].description = description;
        newEvents[index].tag = tag;
        newEvents[index].date = date;
        newEvents[index].time = time;
        newEvents[index].venue = venue;

        break;
      }
      
    }
    console.log("newevent",newEvents)
    setEvents(newEvents)
  };

  return (
    <eventContext.Provider value={{ events, addEvent, deleteEvent, editEvent, getEvent }}>
      {props.children}
    </eventContext.Provider>
  );
};

export default EventState;
