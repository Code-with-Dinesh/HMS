const mongooose = require('mongoose')

const userSchema = mongooose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        enum:["user","Admin"],
        default:"user"
    },
    profile:{
        age:{
            type:Number,
        },
        gender:{
            type:String,
            enum:["Male","Female","others"],
        },
        phoneNumber:{
            type:String,

        },
        address:{
            type:String,
        }
    }
},{ timestamps: true })

const user = mongooose.model("user",userSchema)
module.exports = user;