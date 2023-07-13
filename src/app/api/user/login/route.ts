import { connect } from "@/dbConfig/dbConfig";
// userModel
import User from "@/models/userModel";
// Grab request and response
import { NextRequest, NextResponse } from "next/server";
// encrypting passwords
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        // check if user exists
        const userExists = await User.findOne({email});

        if(!userExists){
            return NextResponse.json(
                {error: "User does not exist"},
                {status: 400}
            )
        }

        // check if password is correct
        const validatePassword = await bcryptjs.compare(password, userExists.password);

        if(!validatePassword){
            return NextResponse.json(
                {error: "Invalid password"},
                {status: 400}
            )
        }

        // create token data
        const tokenData = {
            id: userExists._id,
            username: userExists.username,
            email: userExists.email
        }

        // creating TOKEN
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })

        // setting token to user cookie
        const response = NextResponse.json({
            message: "Login successful", 
            success: true
        })

        // response is a type of next response that has access to the COOKIE
        response.cookies.set("token", token, {
            httpOnly: true
        })

        // return response
        return response;

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}