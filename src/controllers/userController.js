import bcrypt from 'bcrypt';
import User from '../models/userModels.js';
import jwt from 'jsonwebtoken';

export const userSignup = async (req, res) => {
    const { username, email, password , phone } = req.body;

    try {
        if (!username || !email || !password || !phone) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        if (username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters long" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

       // Validate phone number (should be exactly 10 digits and contain only numbers)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number. Must be exactly 10 digits." });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name:username,
            email,
            password: hashedPassword,
            phone
        });

        await user.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found !!!" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid password !!!" });
        }

        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        if (!process.env.SECRET_KEY) {
            console.error("SECRET_KEY is not defined");
            throw new Error("Internal server error");
        }

        const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookies in production
            sameSite: "strict",
            path: "/",
        });

        return res.status(200).json({
            message: "Login successful",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", { path: "/" });
        return res.status(200).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
