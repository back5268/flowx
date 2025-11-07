"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const VerifyEmailPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("")
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const token = searchParams.get("token")
        if (!token) {
            setStatus("error")
            setMessage("Invalid verification link. Please try again.")
            return
        }

        const verifyEmail = async () => {
            try {
                const res = await fetch(`/api/auth/verify-email?token=${token}`)
                const data = await res.json()
                if (res.ok) {
                    setStatus("success")
                    setMessage("Your email has been verified successfully!")
                    setUser(data.user)
                    // try {
                    //     await fetch("/api/auth/send-welcome", {
                    //         method: "POST",
                    //         headers: { "Content-Type": "application/json" },
                    //         body: JSON.stringify({
                    //             email: data.user.email,
                    //             name: data.user.name || "User",
                    //         })
                    //     })
                    // } catch (error) {
                    //     console.error("Failed to send welcome email: ", error)
                    // }
                } else {
                    setStatus("error")
                    setMessage(data.error || "Verification failed. Please try again!")
                }
            } catch (error) {
                setStatus("error")
                setMessage("Something went wrong. Please try again!")
            }
        }
        verifyEmail()
    }, [searchParams])

    return (
        <div className="min-h-screen bg-gradient-card from-gray-900 via-black to-gray-900">
            <div className="max-w-md w-full">
                <div className="bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-slate-500">
                    <div className="mb-8">
                        <Link href={"/"}>
                            <Image src={require("@/assets/logo.png")} alt="" width={200} height={190} />
                        </Link>
                    </div>

                    <div className="mb-6">
                        {status === "loading" && (
                            <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                            </div>
                        )}
                        {status === "success" && (
                            <div className="w-16 h-16 mx-auto bg-green-900 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                        )}
                        {status === "error" && (
                            <div className="w-16 h-16 mx-auto bg-red-900 rounded-full flex items-center justify-center">
                                <XCircle className="w-8 h-8 text-red-400" />
                            </div>
                        )}
                    </div>

                    <h1 className="text-2xl font-bold text-gray-100 mb-4">
                        {status === "loading" && "Verifying your email ..."}
                        {status === "success" && "Email Verified!"}
                        {status === "error" && "Verification Failed!"}
                    </h1>

                    <p className="text-gray-400 mb-8">{message}</p>
                    {status === "success" && (
                        <div className="space-y-4">
                            <div className="bg-green-950 border border-green-700 rounded-lg p-4">
                                <p className="text-green-300 text-sm">
                                    <strong>Welcome to FlowX!</strong> Your account is now active and ready to use
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Button onClick={() => router.push("/dashboard")} className="w-full bg-gradient-card from-blue-600 to-purple-600">
                                    Go to Dashboard
                                </Button>
                                <Button variant="outline" onClick={() => router.push("/")} className="w-full border-slate-600 text-gray-200">
                                    Back to Home
                                </Button>
                            </div>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="space-y-4">
                            <div className="bg-red-950 border border-red-700 rounded-lg p-4">
                                <p className="text-red-300 text-sm">
                                    The verification link may have expired or is invalid. Please request a new verification email.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Button onClick={() => router.push("/login")} className="w-full bg-gradient-card from-blue-600 to-purple-600">
                                    Try Again
                                </Button>
                                <Button variant="outline" onClick={() => router.push("/")} className="w-full border-slate-600 text-gray-200">
                                    Back to Home
                                </Button>
                            </div>
                        </div>
                    )}

                    {status === "loading" && (
                        <div className="space-y-4">
                            <div className="bg-slate-750 border border-gray-600 rounded-lg p-4">
                                <p className="text-blue-300 text-sm">
                                    Please wait while we verify your email address ...
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        Need help?{" "}
                        <Link href="mailto:bachtv150902@gmail.com" className="text-blue-400 hover:underline">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage
