import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Users from '../models/user.models.js';
import { SECRET_SAULT, JWT_EXPIRATION } from '../config/env.js';
import Admins from '../models/admin.models.js';

export const getUserProfile = async (req, res) => {
    const token = req.cookies.token;

    try {

        if(!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, SECRET_SAULT);
        req.userId = decoded.id
        const user = await Users.findById(decoded.userId).select('-password -__v');
        if(!user) return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;

        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                cartData: user.cartData
            }
        });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
};

export const getAdminProfile = async (req, res) => {
    const token = req.cookies.token;
    try {
        if(!token) return res.status(401).json({ message: 'Unauthorized' });
        const decoded = jwt.verify(token, SECRET_SAULT);
        req.userId = decoded.userId;
        const admin = await Admins.findById(decoded.userId).select('-password -__v');
        if(!admin) return res.status(401).json({ message: 'Unauthorized' });
        req.admin = admin;

        res.status(200).json({
            success: true,
            message: 'Admin profile fetched successfully',
            data: {
                admin
            }
        });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
};

export const signUp = async (request, response, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({ message: 'All fields are required' });
        }

        let check = await Users.findOne({email});
        
        if (check) {
            return response.status(409) // Conflict
            .json({success:false, 
                errors:"Existing User with the same Email Address Found."
            })
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;    
        }

        // Hash the password
        const hash_salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash_salt);

        // Create a new user
        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            cartData: cart
        });

        // Save the user to the database
        await newUser.save({ session });

        // Create a JWT token
        const token = jwt.sign({ userId:newUser._id }, SECRET_SAULT, {
            expiresIn: JWT_EXPIRATION
        });

        await session.commitTransaction();
        session.endSession();

        response.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}


export const signIn = async (request, response, next) => {
    try {
        const { email, password} = request.body;
        if (!email || !password) {
            return response.status(400).json({ message: 'All fields are required' });
        }

        // Find the user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Invalid password' });
        }

        // If the user is found and password matches, sign out logic can be implemented here
        const token = jwt.sign({ userId: user._id }, SECRET_SAULT, {
            expiresIn: JWT_EXPIRATION })

        
        response.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        // Set the cookie with the token
        response.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                user
            }
        });


    }
    catch (error) {
        next(error);
    }
}

export const signOut = async (request, response, next) => {
    response.clearCookie("token", {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: "lax",
  });
  response.status(200).json({
    success: true,
    message: "Logged out"
  });
}

export const adminSignIn = async (request,response, next) => {
    try {
        const { email, password} = request.body;
        if (!email || !password) {
            return response.status(400).json({ message: 'All fields are required' });
        }

        // Find the admin by email
        const admin = await Admins.findOne({ email });
        if (!admin) {
            return response.status(404).json({ message: 'Admin not found' });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return response.status(401).json({ message: 'Invalid password' });
        }

        // If the admin is found and password matches, sign out logic can be implemented here
        const token = jwt.sign({ userId: admin._id }, SECRET_SAULT, {
            expiresIn: JWT_EXPIRATION })
        
        response.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        response.status(200).json({
            success: true,
            message: 'Admin signed in successfully',
            data: {
                token,
                admin
            }
        });
    }
    catch (error) {
        next(error);
    }
}

export const adminSignUp = async (request, response, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({ message: 'All fields are required' });
        }

        let check = await Admins.findOne({email});
        
        if (check) {
            return response.status(409) // Conflict
            .json({success:false, 
                errors:"Existing Admin with the same Email Address Found."
            })
        }

        // Hash the password
        const hash_salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash_salt);

        // Create a new user
        const newAdmin = new Admins({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newAdmin.save({ session });

        // Create a JWT token
        const token = jwt.sign({ userId:newAdmin._id }, SECRET_SAULT, {
            expiresIn: JWT_EXPIRATION
        });

        await session.commitTransaction();
        session.endSession();

        response.status(201).json({
            success: true,
            message: 'Admin created successfully',
            token,
            data: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email
            }
        });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const adminSignOut = async (request, response, next) => {

    response.clearCookie("token", {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: "Lax",
    });
    response.status(200).json({
        success: true,
        message: "Admin logged out"
    });
}