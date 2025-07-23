"use client"

import { Button } from "@/app/components/ui/button"
import Link from "next/link"

export default function Success() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0F] px-4">
            <div className="bg-[#181824] border border-[#2A2A35] rounded-2xl shadow-2xl p-10 max-w-md w-full space-y-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-2">
                        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="font-extrabold text-3xl bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                        Payment Successful
                    </h1>
                    <div className="w-24 h-[3px] bg-gradient-to-r from-green-400 to-green-300 rounded-full mx-auto"></div>
                    <p className="text-lg text-gray-300">
                        Thank you for your purchase.<br />Your payment has been processed successfully.
                    </p>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    <Link href="/dashboard" className="w-full block">Go to Dashboard</Link>
                </Button>
            </div>
        </div>
    )
}