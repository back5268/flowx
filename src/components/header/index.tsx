"use client"

import { BookOpen, CreditCard, Github, Menu, Users, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { useState } from 'react'

const navItems = [
    { name: "Features", href: "#features", icon: Zap },
    { name: "Templates", href: "#templates", icon: BookOpen },
    { name: "Pricing", href: "#pricing", icon: CreditCard },
    { name: "Community", href: "#community", icon: Users },
    { name: "Github", href: "#github", icon: Github },
]

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10'>
            <div className='container max-w-7xl mx-auto px-6'>
                <div className='flex items-center justify-between h-16'>
                    <Link href={'/'}>
                        <div className='flex items-center gap-2 animate-fade-in'>
                            {/* <Image src="/assets/logo.png" alt="" width={200} height={190} /> */}
                        </div>
                    </Link>

                    <nav className='hidden md:flex items-center gap-8'>
                        {navItems.map((item, index) => {
                            return <Link
                                href={item.href}
                                key={item.name}
                                className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors p-3 rounded-xl hover:bg-secondary/50 animate-fade-in'
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <item.icon className='w-4 h-4' />
                                {item.name}
                            </Link>
                        })}
                    </nav>

                    <div className='hidden md:flex items-center gap-3 animate-fade-in'>
                        <Button variant="ghost" size="sm">Sign in</Button>
                        <Button variant="hero" size="sm">Get started Free</Button>
                    </div>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className='md:hidden'>
                            <Button variant="ghost" size="sm" className='p-2'>
                                <Menu className='w-5 h-5' />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side='right' className='w-80 bg-background/95 backdrop-blur-xl border-primary/20'>
                            <div className='flex items-center justify-between mb-8 px-2'>
                                <Link href={'/'}>
                                    <div className='flex items-center gap-2 animate-fade-in'>
                                        {/* <Image src="/assets/logo.png" alt="" width={200} height={190} /> */}
                                    </div>
                                </Link>
                            </div>
                            <nav className='space-y-4 mb-8 px-2 mt-10'>
                                {navItems.map((item, index) => {
                                    return <Link
                                        href={item.href}
                                        key={item.name}
                                        className='flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors p-3 rounded-xl hover:bg-secondary/50 animate-fade-in'
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <item.icon className='w-4 h-4' />
                                        {item.name}
                                    </Link>
                                })}
                            </nav>

                            <div className='space-y-3 px-2'>
                                <div className='w-[80%] mx-auto flex flex-col gap-y-2'>
                                    <Button variant="ghost" size="sm" className='w-full justify-start mx-auto'>Sign in</Button>
                                <Button variant="hero" size="sm" className='w-full justify-start mx-auto'>Get started Free</Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </header>
    )
}

export default Header
