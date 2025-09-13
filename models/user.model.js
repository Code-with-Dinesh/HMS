const mongooose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
        type:String,
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

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password =  await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswrodCorrect = (async function(password){
    return await bcrypt.compare(password,this.password)
})

userSchema.methods.generateAccessToken = (async function(){
        return jwt.sign({
            _id:this._id,
            username:this.username,
            email:this.email,
        },process.env.ACCESS_TOKEN_KEY,{expiresIn:"2h"})
})

userSchema.methods.generateRefreshToken = (async function(){
    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_KEY,{expiresIn:"3d"})
})

const user = mongooose.model("user",userSchema)
module.exports = user;