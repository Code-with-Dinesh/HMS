import { z } from 'zod';

export const DoctorSchema = z.object({
    name: z.string().min(3, "Name should be at least 3 characters long"),
    specialization: z.string().min(3, "Specialization should be at least 3 characters long"),
    experience: z.number({
        required_error: "Experience is required",
        invalid_type_error: "Experience must be a number"
    }).min(0, "Experience cannot be negative"),
    schedule: z.array(
        z.object({
            day: z.string().min(3, "Day should be valid"),
            time: z.string().min(3, "Time should be valid")
        })
    ).nonempty("Schedule must have at least one entry"),
    contact: z.string().min(10, "Contact number should be at least 10 digits"),
    address: z.string().optional()
});
