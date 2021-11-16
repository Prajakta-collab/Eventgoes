const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date
        
    },
    time:{
        type: String
        
    },
    venue:{
        type:String,
        required:true
    }
    
  });

  module.exports = mongoose.model('events', EventsSchema);