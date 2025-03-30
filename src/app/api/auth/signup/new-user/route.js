import connectDB from "@/lib/connectDB";
import User from "@/models/User";

import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await connectDB();

        const body = await req.json();
        const { name, email, password, phone } = body;

        if (!name || !email || !password || !phone) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }


        // Create new user
        const newUser = new User({ name, email, password, phone });
        await newUser.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

export const GET = async (req) => {
    try {
        await connectDB();

        const users = await User.find({});
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
