const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    schedule: {                     
        type: [
            {
                day: { type: String, required: true },
                time: { type: String, required: true }
            }
        ],
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
