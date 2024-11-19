import { Request, Response } from "express";
import User from "../models/User"; // Adjust the import based on your User model location
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // Validate the email and password
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        try {
            // Find the user by email
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(404).json({ error: "User  not found" });
            }

            // Compare the provided password with the stored password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1h" });

            // Send the token and user data as a response
            res.json({ user: { id: user._id, email: user.email }, token });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    register: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // Validate the email and password
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        try {
            // Check if the user already exists
            const existingUser  = await User.findOne({ email });
            if (existingUser ) {
                return res.status(400).json({ error: "User  already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser  = new User({ email, password: hashedPassword });
            await newUser .save();

            // Generate a JWT token
            const token = jwt.sign({ id: newUser ._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1h" });

            // Send the token and user data as a response
            res.status(201).json({ user: { id: newUser ._id, email: newUser .email }, token });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    me: (req: Request, res: Response) => {
        // Logic to get the current user
        res.json({ user: req.user }); // Assuming req.user is set by your auth middleware
    },

    profile: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            // Find the user by ID
            const user = await User.findById(req.user.id); // Assuming req.user.id is set by your auth middleware

            if (!user) {
                return res.status(404).json({ error: "User  not found" });
            }

            // Update user fields
            if (email) user.email = email;
            if (password) user.password = await bcrypt.hash(password, 10); // Hash the new password

            await user.save();

            res.json({ user: { id: user._id, email: user.email } });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export default authController;