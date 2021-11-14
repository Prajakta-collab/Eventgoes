import React, { useContext } from 'react'
import eventContext from '../context/events/eventContext';

const Eventitem = (props) => {
  const context=useContext(eventContext);
  const {deleteEvent}=context;
  const {event,updateEvent}=props
    
    return (
      
           <div className="col-md-3 ">
           <div className="card my-3" >

  <div className="card-body">
    <h5 className="card-title ">{event.title}</h5>
    <p className="card-text">{event.description} </p>
    <p className="card-text">{event.tag} </p>
    <p className="card-text">{event.date} </p>
    <p className="card-text">{event.time} </p>
    <p className="card-text">{event.venue} </p>
    <i className="fas fa-trash-alt mx-2" onClick={()=>{
        deleteEvent(event._id);
    }}></i> 
    <i className="fas fa-edit mx-2" onClick={()=>{updateEvent(event)}}></i>

  </div>
</div>
</div>
    )
}

export default Eventitem
