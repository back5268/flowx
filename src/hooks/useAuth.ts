'use client'

import { useState } from "react";

type User = {
    id: string;
    email: string;
    name?: string;
    emailVerify: boolean;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function signup(name: string, email: string, password: string) {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Signup failed!")
            return true
        } catch (error: any) {
            setError(error.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    async function verifyEmail(email: string, code: string) {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Verification failed!")
            setUser(data.user)
            return true
        } catch (error: any) {
            setError(error.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    async function login(email: string, password: string) {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (!res.ok) {
                if (res.status === 403) throw new Error("Please verify your email address before logging in!")
                throw new Error(data.error || "Login failed!")
            }
            await me()
            return true
        } catch (error: any) {
            setError(error.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        await fetch("/api/auth/logout", { method: "POST" })
        setUser(null)
    }

    async function me() {
        try {
            const res = await fetch("/api/auth/me")
            if (!res.ok) setUser(null)
            const data = await res.json()
            setUser(data.user)
        } catch (error: any) {
            setUser(null)
        }
    }

    return { user, loading, error, signup, verifyEmail, login, logout, me }
}