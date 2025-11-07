import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body

    try {
        const session = await auth.api.signInEmail({
            body: {
                email, password
            }
        })

        return NextResponse.json({ mess: 'Login successful!', session })
    } catch (error: any) {
        if (error.message && error.message.includes('email') && error.message.includes('verify')) {
            return NextResponse.json({ mess: "Please verify your email address before logging in!" }, { status: 403 })
        }
        return NextResponse.json({ mess: error.message }, { status: 400 })
    }
}