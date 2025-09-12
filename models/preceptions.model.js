const mongooose = require("mongoose")

const preceptionSchema = mongooose.Schema({
    userId:{
        type:mongooose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    doctorId:{
        type:mongooose.Schema.Types.ObjectId,
        ref:"doctor",
        required:true,
    },
    appointmentId:{
        type:mongooose.Schema.Types.ObjectId,
        ref:"appointment",
        required:true,
    },
    medicine:[{
        type:String
    }],
    notes:{
        type:String,
    },
    data:{
        type:String
    }
},{ timestamps: true })

const perception = mongooose.model("perception",preceptionSchema)
module.exports = perception;