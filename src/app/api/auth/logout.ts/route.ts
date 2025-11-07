import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await auth.api.signOut({
            headers: req.headers
        })
        return NextResponse.json({ mess: 'Logout successful!' })
    } catch (error: any) {
        return NextResponse.json({ mess: error.message }, { status: 400 })
    }
}