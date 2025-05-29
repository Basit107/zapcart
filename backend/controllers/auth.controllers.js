import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Users from '../models/user.models.js';
import { SECRET_SAULT, JWT_EXPIRATION } from '../config/env.js';

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

        response.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        });


    }
    catch (error) {
        next(error);
    }
}

export const signOut = async (request, response, next) => {
}