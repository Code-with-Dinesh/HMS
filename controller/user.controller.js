const userSchema = require("../models/user.model");
const asyncWraper = require("../utils/AsyncWrapper");
const ApiError = require("../utils/ApiError");
const sendEmail = require("../nodemailer/emailService")

exports.register = asyncWraper(async (req, res) => {
    const { username, email, password, role, profile } = req.body;

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


// login controller we will add as soon as possible