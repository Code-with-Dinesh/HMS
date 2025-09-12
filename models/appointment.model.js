const mongooose = require("mongoose")

const appointmentschema = mongooose.Schema({
    userId :{
        type:mongooose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    doctorId:{
        type:mongooose.Schema.Types.ObjectId,
        ref:"doctor",
        required:true,
    },
    data:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Approved","Complete"],
        default:"Pending"
    }
},{ timestamps: true })

const appointment = mongooose.model("appointment",appointmentschema)
module.exports = appointment;