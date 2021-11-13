const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Events = require('../models/Events');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallevents', fetchuser, async (req, res) => {
    try {
        const events = await Events.find({ user: req.user.id }).select("-user");
        res.json(events)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addevent', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {

            const { title, description, tag,date,time,venue } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const event = new Events({
                title, description, tag, date,time, venue ,user: req.user.id
            })
            const savedEvent = await event.save()

            res.json(savedEvent)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
})

// // ROUTE 3: Update a Existing Note using: PUT "/api/notes/updatenote". Login required

router.put('/updateevent/:id', fetchuser , async (req, res) => {
        try {
            const { title, description, tag, date, time,venue} = req.body;

        //new note object
        const newEvent = {}
           if(title){newEvent.title = title}
           if(description){newEvent.description = description}
           if(tag){newEvent.tag = tag}
           if(date){newEvent.date=date}
           if(time){newEvent.time=time}
           if(venue){newEvent.venue=venue}

           //Find a note to be updated and update
           let event = await Events.findById(req.params.id);
           if(!event){ return res.status(404).send("Not Found")}
           
           if(event.user.toString() != req.user.id){
               return res.status(401).send("Not Allowed")
           }
        
           event = await Events.findByIdAndUpdate(req.params.id , {$set : newEvent} , {new : true})

           res.json(event)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


// // ROUTE 4: Delete a Existing Note using: DELETE "/api/notes//deletenode/:id". Login required

router.delete('/deleteevent/:id', fetchuser , async (req, res) => {
   try {

    //Find a note to be updated and update
    let event = await Events.findById(req.params.id);
    if(!event){ return res.status(404).send("Not Found")}
    

    // allow deletion only if the user owns this note
    if(event.user.toString() != req.user.id){
        return res.status(401).send("Not Allowed")
    }
 
    event = await Events.findByIdAndDelete(req.params.id )

    res.json({"success" : "Event Has been Deleted"})
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})

module.exports = router