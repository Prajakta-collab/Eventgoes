import React,{useContext, useState} from 'react'
import eventContext from '../context/events/eventContext';


const Addevent = () => {

    const context=useContext(eventContext);
    const {addEvent}=context;
const [event, setevent] = useState({title:"", description:"",tag:"",date:" ",time:"",venue:""})

const handleClick=(e)=>{
e.preventDefault();
addEvent(event.title,event.description,event.tag,event.date,event.time,event.venue)
setevent({title:"", description:"",tag:"",date:"",time:"",venue:""})


}

const onChange=(e)=>{
setevent({...event,[e.target.name]:e.target.value})
}

    return (
        <div>
            <div className="container my-3">
        <h2>Add Events :</h2>
        <form>
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter title"
              onChange={onChange} 
             minLength={5} required
             value={event.title}
            />
            
          </div>
          <div className="form-group my2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control "
              id="description"
              name="description"
              placeholder="Descripion"
              onChange={onChange}
              style={{height:'15vh'}} minLength={5} required
              value={event.description}
            />

          </div>
          <div className="form-group my-2">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Tag"
              onChange={onChange}
              minLength={5} required
              value={event.tag}
            /></div>
<div className="form-group my-2">
            <label htmlFor="tag">Date</label>
            <input
              type="text"
              className="form-control"
              id="date"
              name="date"
              placeholder="Date"
              onChange={onChange}
              minLength={5} required
              value={event.date}
            /></div>
<div className="form-group my-2">
            <label htmlFor="tag">Time</label>
            <input
              type="text"
              className="form-control"
              id="time"
              name="time"
              placeholder="Time"
              onChange={onChange}
              minLength={5} required
              value={event.time}
            /></div>
<div className="form-group my-2">
            <label htmlFor="tag">Venue</label>
            <input
              type="text"
              className="form-control"
              id="venue"
              name="venue"
              placeholder="Venue"
              onChange={onChange}
              minLength={5} required
              value={event.venue}
            />

          </div>
          
         
          <button disabled={event.title.length<5 || event.description.length<5}  className="btn btn-primary my-3" onClick={handleClick}>
            Add Event
          </button>
        </form>
     </div></div>
    )
}

export default Addevent