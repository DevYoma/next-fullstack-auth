// extract values by searching through the TOKENS
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest){
    try {
        // grab the tokens from request.body
        const reqBody = await request.json();
        // there will be a frontend call here for this 
        const { token } = reqBody
        console.log(token);

        // find user based on the token
        const user: any = User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json(
                {error: "Invalid token/User not found"},
                {status: 400}
            )
        }

        console.log(user);

        // updating values from the user instance
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            {
                message: "Email verified successfully",
                success: true
            },
        )

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}


// forgotPasswordToken: String,
// forgotPasswordTokenExpiry: Date,
// verifyToken: String,
// verifyTokenExpiry: Date,