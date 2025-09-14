const userSchema = require("../models/user.model");
const asyncWraper = require("../utils/AsyncWrapper");
const ApiError = require("../utils/ApiError");
const sendEmail = require("../nodemailer/emailService")
const generateotp = require("../nodemailer/generateotp");

exports.register = asyncWraper(async (req, res) => {
    const { username, email, password, role, profile } = req.body;
     console.log(username,email,password)
    if (!username || !email || !password) {
        throw new ApiError(400, "Username, email and password are required");
    }

    const existuser = await userSchema.findOne({ email });
    if (existuser) {
        throw new ApiError(400, "Email is already in use");
    }

    
    if (profile && profile.phoneNumber) {
        if (profile.phoneNumber.length !== 10 || !/^\d+$/.test(profile.phoneNumber)) {
            throw new ApiError(400, "Phone number must be exactly 10 digits and numeric");
        }
    }

    const newuser = await userSchema.create({
        username,
        email,
        password,
        profile,
        role: role || "user"
    });
    
    try {
        await sendEmail({
            to: email,
            subject: "Welcome to My App!",
            text: `Hello ${username},\n\nYour account has been successfully created!`,
            html: `<h1>Hello ${username}</h1><p>Your account has been successfully created!</p>`
        });
        
    } catch (err) {
        console.error("Error sending welcome email:", err);
        
    }

    res.status(201).json({
        message: "User registered successfully!",
        user: {
            id: newuser._id,
            username: newuser.username,
            email: newuser.email,
            role: newuser.role
        }
    });
});

exports.login = asyncWraper(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new ApiError(400,"Email or Password is Required")
    }
    const user = await userSchema.findOne({email})
    if(!user){
        throw new ApiError(400,"Email not found")
    }
    const ispassowrdMatch = await user.isPasswrodCorrect(password)
    if(!ispassowrdMatch){
        throw new ApiError(400,"Invalid Credentials")
    }
    const accesstoken = await user.generateAccessToken()
    const refreshtoken = await user.generateRefreshToken()
   const options = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" };
    res.cookie("refreshToken", refreshtoken, options)
       .cookie("accessToken", accesstoken, options)
       .status(200)
       .json({
           success: true,
           message: "You are successfully logged in",
           data:{refreshtoken,accesstoken}
       });
})

exports.forgotpassword = asyncWraper(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    
    const resetToken = generateotp();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    console.log(user)

    try {
        await sendEmail({
            to: user.email,
            subject: "Reset Password OTP",
            html: `
                <h1>Password Reset Request</h1>
                <p>Hello ${user.username || 'User'},</p>
                <p>Use the following OTP to reset your password. It is valid for 10 minutes:</p>
                <h2>${resetToken}</h2>
                <p>If you did not request this, please ignore this email.</p>
            `
        });
        res.status(200).json({
            success: true,
            message: "OTP sent to your email address."
        });
    } catch (error) {
        console.error("Error while sending forgot password email:", error);
        throw new ApiError(500, "Failed to send OTP email.");
    }
});

exports.resetpassword = asyncWraper(async(req,res)=>{
    const {otp,newpassword,email} = req.body;
    if(!email || !otp || !newpassword) {
        throw new ApiError(400,"All filds are required")
    }
    console.log(email,otp,newpassword)
    const user = await userSchema.findOne({
        email,
        resetPasswordToken: otp,
        resetPasswordExpire :{ $gt: Date.now()}
    })
    console.log(user)
    if(!user){
        throw new ApiError(400,"user not found")
    }
    user.password = newpassword;
    user.resetPasswordExpire = null,
    user.resetPasswordExpire = null,
    await user.save()
    res.status(200).json({success:true,message:"Password Reset successfully"})
})