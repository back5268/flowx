import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password, name } = body

    try {
        await auth.api.signUpEmail({
            body: {
                email, password, name
            }
        })

        return NextResponse.json({ mess: 'Signup successful!' })
    } catch (error: any) {
        return NextResponse.json({ mess: error.message }, { status: 400 })
    }
}