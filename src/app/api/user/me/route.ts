// creating helper method to help extract token => from helper
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request);

        // finding user based on userID
        // this gives the whole user obj even with the password that's why we use the .select
        const user = await User.findOne({_id: userId}).select("-password")

        return NextResponse.json({
            message: "User found", 
            data: user
        })

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}
