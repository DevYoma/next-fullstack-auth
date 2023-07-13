import { NextResponse } from "next/server";

export async function GET(){
    try {
        // create a response capable of removing the cookies
        const response = NextResponse.json(
            {
                message: "Logout successful", 
                success: true
            }
        )

        // NB: response of type NextResponse above can interact with cookies
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})

        // returning response
        return response;
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}