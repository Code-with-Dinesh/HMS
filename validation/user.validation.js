const { z } = require('zod');

export const Schema = z.object({
    username: z.string().min(6, "Username should be greater than six characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});


