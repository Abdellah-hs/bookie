
"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { Show, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
]

export default function Navbar() {
    const pathname = usePathname();
    return (
        <header className="w-full border-b border-border bg-background navbar-height flex items-center shadow-soft-sm">
            <div className="wrapper flex items-center justify-between">

                {/* 1. Left Side: Logo */}
                <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
                    {/* A simple placeholder icon based on your brand colors */}
                    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand shadow-[var(--shadow-soft)]">
                        <span className="text-white font-serif font-bold">B</span>
                    </div>
                    {/* This class uses the custom font you setup in layout.tsx! */}
                    <span className="logo-text">bookie</span>
                </Link>

                {/* 2. Middle: Navigation Links (Hidden on small screens) */}
                <nav className="hidden md:flex flex-1 justify-center gap-8">
                    {navItems.map(({ label, href }) => {
                        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`nav-link-base ${isActive ? "nav-link-active" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </nav>

                {/* 3. Right Side: Action Buttons */}
                <div className="flex items-center gap-4">
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <button className="nav-btn">Log in</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="btn-primary py-2 px-5 text-sm">Start Reading</button>
                        </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                </div>

            </div>
        </header>
    )
}