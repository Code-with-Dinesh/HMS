const mongooose = require("mongoose")

const reportSchema = mongooose.Schema({
    userId:{
        type:mongooose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    fileUrl:{
        type:String,
        required:true,
    },
    description: { type: String },
    date: { type: String }

},{ timestamps: true })

const report = mongooose.model("report",reportSchema)