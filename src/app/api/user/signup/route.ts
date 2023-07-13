import { connect } from "@/dbConfig/dbConfig";
// userModel
import User from "@/models/userModel";
// Grab request and response
import { NextRequest, NextResponse } from "next/server";
// encrypting passwords
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";


connect();

// POST REQUEST
export async function POST(request: NextRequest){
    try {
        // extracting variables coming in
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({email})
        
        if(user){
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }

        // hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Saving user in the DB 
        // creating User
        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        // SEND VERIFICATION EMAIL 
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        // sending overall result
        return NextResponse.json(
            {
                message: "User created successfully",
                success: true, 
                savedUser
            },
            {status: 201}
        )

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}