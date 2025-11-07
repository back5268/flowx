import React, { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { ArrowRight, CheckCircle, Link } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AuthModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = z
    .object({
        first: z.string().min(1, "First name is required"),
        last: z.string().min(1, "Last name is required"),
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Password don't match",
        path: ["confirm"],
    });

const AuthModal = ({ isOpen, onOpenChange }: AuthModalProps) => {
    const [activeTab, setActiveTab] = useState("signin");
    const { signup, login, error, loading } = useAuth()
    const [form, setForm] = useState({
        first: "",
        last: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string>
    >({});

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationErrors({});
        try {
            const validateData = signupSchema.parse(form);
            const name = `${validateData.first} ${validateData.last}`;
            const ok = await signup(name, validateData.email, validateData.password)
            if (ok) {
                toast.success("Check your email for activating your account!")
                setForm({
                    first: "",
                    last: "",
                    email: "",
                    password: "",
                    confirm: "",
                })
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<string, string> = {}
                error.issues.forEach((issue) => {
                    if (issue.path[0]) errors[issue.path[0] as string] = issue.message
                })
                setValidationErrors(errors)
            }
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationErrors({});
        try {
            const validateData = loginSchema.parse(form);
            const ok = await login(validateData.email, validateData.password)
            if (ok) {
                onOpenChange(false)
                window.location.reload()
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Record<string, string> = {}
                error.issues.forEach((issue) => {
                    if (issue.path[0]) errors[issue.path[0] as string] = issue.message
                })
                setValidationErrors(errors)
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl bg-background/95 backdrop-blur-xl border-primary/20 p-0 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                    <div className="hidden lg:flex flex-col justify-center p-8 bg-gradient-hero relative overflow-hidden">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Link href={"/"}>
                                    <div className="flex items-center gap-2 animate-fade-in">
                                        {/* <Image src={require("@/assets/logo.png")} alt="" width={200} height={190} /> */}
                                    </div>
                                </Link>
                            </div>
                            <div className="space-y-4 -mt-[70px]">
                                <h2 className="text-3xl font-bold leading-tight">
                                    Automate Everything.
                                    <br />
                                    <span className="text-accent">Smarter.</span>
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    Join thousands of developers building the future of workflow
                                    automation with AI superpowers.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    "Free forever plan available",
                                    "No credit card required",
                                    "Setup in 2 minutes",
                                ].map((txt, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 text-sm text-muted-foreground"
                                    >
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                        <span>{txt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-neon-blue animate-float rounded-full" style={{ animationDelay: "1s" }}></div>
                        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-neon-purple animate-node-glow rounded-full" style={{ animationDelay: "2s" }}></div>
                        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-neon-cyan animate-glow-pulse rounded-full" style={{ animationDelay: "3s" }}></div> */}
                    </div>

                    <div className="flex flex-col justify-center p-8">
                        <div className="w-full max-w-md mx-auto space-y-6">
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold">Welcome to FlowX</h3>
                                <p className="text-muted-foreground">
                                    {activeTab === "sigin"
                                        ? "Sign in to your account to continue"
                                        : "Create your account to get started"}
                                </p>
                            </div>

                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="w-full"
                            >
                                <TabsList className="grid w-full grid-cols-2 bg-muted/20">
                                    <TabsTrigger
                                        value="signin"
                                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md cursor-pointer"
                                    >
                                        Sign In
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="register"
                                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md cursor-pointer"
                                    >
                                        Register
                                    </TabsTrigger>
                                </TabsList>
                                <DialogTitle></DialogTitle>
                                <TabsContent value="signin" className="space-y-4 mt-6">
                                    <form onSubmit={handleLogin}>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="sigin-email"
                                                    className="text-sm font-medium"
                                                >
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="sigin-email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={(e) =>
                                                        setForm({ ...form, email: e.target.value })
                                                    }
                                                    placeholder="Enter your email address"
                                                    className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                                                />
                                                {validationErrors.email && (
                                                    <p className="text-red-500 text-sm">
                                                        {validationErrors.email}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="sigin-password"
                                                    className="text-sm font-medium"
                                                >
                                                    Password
                                                </Label>
                                                <Input
                                                    id="sigin-password"
                                                    type="password"
                                                    value={form.password}
                                                    onChange={(e) =>
                                                        setForm({ ...form, password: e.target.value })
                                                    }
                                                    placeholder="Enter your password"
                                                    className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                                                />
                                                {validationErrors.password && (
                                                    <p className="text-red-500 text-sm">
                                                        {validationErrors.password}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-primary/20"
                                                    />
                                                    <span className="text-muted-foreground">
                                                        Remember me
                                                    </span>
                                                </label>
                                                <button className="text-primary hover:underline">
                                                    Forgot password
                                                </button>
                                            </div>
                                            <Button
                                                disabled={loading}
                                                type="submit"
                                                className="w-full h-11 bg-gradient-primary hover:shadow-glow-primary"
                                                variant="hero"
                                            >
                                                Sign In
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                            {error && <p className="text-red-500 text-sm">{error}</p>}
                                        </div>
                                    </form>

                                    <div className="text-center text-sm text-muted-foreground">
                                        Don't have an account?{" "}
                                        <button
                                            onClick={() => setActiveTab("register")}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            Sign up for free
                                        </button>
                                    </div>
                                </TabsContent>
                                <TabsContent value="register" className="space-y-4 mt-6">
                                    <form onSubmit={handleRegister}>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="register-first"
                                                        className="text-sm font-medium"
                                                    >
                                                        First name
                                                    </Label>
                                                    <Input
                                                        id="register-first"
                                                        value={form.first}
                                                        onChange={(e) =>
                                                            setForm({ ...form, first: e.target.value })
                                                        }
                                                        placeholder="John"
                                                        className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                                                    />
                                                    {validationErrors.first && (
                                                        <p className="text-red-500 text-sm">
                                                            {validationErrors.first}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label
                                                        htmlFor="register-last"
                                                        className="text-sm font-medium"
                                                    >
                                                        Last name
                                                    </Label>
                                                    <Input
                                                        id="register-last"
                                                        value={form.last}
                                                        onChange={(e) =>
                                                            setForm({ ...form, last: e.target.value })
                                                        }
                                                        placeholder="John"
                                                        className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                                                    />
                                                    {validationErrors.last && (
                                                        <p className="text-red-500 text-sm">
                                                            {validationErrors.last}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="register-email"
                                                    className="text-sm font-medium"
                                                >
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="register-email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={(e) =>
                                                        setForm({ ...form, email: e.target.value })
                                                    }
                                                    placeholder="Enter your email address"
                                                    className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                                                />
                                                {validationErrors.email && (
                                                    <p className="text-red-500 text-sm">
                                                        {validationErrors.email}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="register-password"
                                                    className="text-sm font-medium"
                                                >
                                                    Password
                                                </Label>
                                                <Input
                                                    id="register-password"
                                                    type="password"
                                                    value={form.password}
                                                    onChange={(e) =>
                                                        setForm({ ...form, password: e.target.value })
                                                    }
                                                    placeholder="Enter your password"
                                                    className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                                                />
                                                {validationErrors.password && (
                                                    <p className="text-red-500 text-sm">
                                                        {validationErrors.password}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="register-confirm"
                                                    className="text-sm font-medium"
                                                >
                                                    Confirm Password
                                                </Label>
                                                <Input
                                                    id="register-confirm"
                                                    type="password"
                                                    value={form.confirm}
                                                    onChange={(e) =>
                                                        setForm({ ...form, confirm: e.target.value })
                                                    }
                                                    placeholder="Enter your confirm"
                                                    className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
                                                />
                                                {validationErrors.confirm && (
                                                    <p className="text-red-500 text-sm">
                                                        {validationErrors.confirm}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-start gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    className="mt-1 rounded border-primary/20"
                                                />
                                                <span className="text-muted-foreground">
                                                    I agree to the{" "}
                                                    <button className="text-primary hover:underline">
                                                        Terms of Service
                                                    </button>{" "}
                                                    and{" "}
                                                    <button className="text-primary hover:underline">
                                                        Privacy Policy
                                                    </button>
                                                </span>
                                            </div>
                                            <Button
                                                disabled={loading}
                                                type="submit"
                                                className="w-full h-11 bg-gradient-primary hover:shadow-glow-primary"
                                                variant="hero"
                                            >
                                                Create Account
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Button>
                                            {error && <p className="text-red-500 text-sm">{error}</p>}
                                        </div>
                                    </form>

                                    <div className="text-center text-sm text-muted-foreground">
                                        Already have an account?{" "}
                                        <button
                                            onClick={() => setActiveTab("signin")}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
