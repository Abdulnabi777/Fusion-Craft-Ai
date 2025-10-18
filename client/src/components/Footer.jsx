import React, { useState } from 'react'
import { Sparkles, Mail, ArrowRight } from 'lucide-react'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [isHovered, setIsHovered] = useState(false)

    // Replace with your actual logo
    const logoUrl = '/src/assets/logo.png' // Update this path to your logo

    return (
        <footer className="relative px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8 w-full text-slate-400 mt-20 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 overflow-hidden border-t border-purple-500/20">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{ top: '50%', left: '20%' }}></div>
                <div className="absolute w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-10 animate-pulse" style={{ top: '30%', right: '20%', animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-slate-800/50 pb-10">
                    <div className="md:max-w-96">
                        <div className="relative inline-block group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                            <img className="relative h-10 drop-shadow-[0_0_12px_rgba(147,51,234,0.8)]" src={logoUrl} alt="FusionCraftAI Logo"/>
                        </div>
                        <p className="mt-6 text-sm leading-relaxed text-slate-400">
                            Experience the power of AI-driven content creation with FusionCraftAI. Our suite of tools is designed to help you create, enhance, and optimize your content effortlessly.
                        </p>
                        
                        {/* Social links or additional info */}
                        <div className="flex items-center gap-2 mt-6">
                            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1.5 backdrop-blur-sm">
                                <Sparkles className="w-3 h-3 text-purple-400" />
                                <span className="text-xs text-purple-300">Powered by AI</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-12 md:gap-20">
                        <div>
                            <h2 className="font-semibold mb-5 text-slate-100 text-lg">Company</h2>
                            <ul className="text-sm space-y-3">
                                <li>
                                    <a href="#" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">
                                        About us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">
                                        Contact us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">
                                        Privacy policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="md:max-w-sm">
                            <h2 className="font-semibold text-slate-100 mb-5 text-lg flex items-center gap-2">
                                <Mail className="w-5 h-5 text-purple-400" />
                                Subscribe to our newsletter
                            </h2>
                            <div className="text-sm space-y-4">
                                <p className="text-slate-400">
                                    The latest news, articles, and resources, sent to your inbox weekly.
                                </p>
                                <div className="flex flex-col sm:flex-row items-stretch gap-2 pt-2">
                                    <div className="relative flex-1">
                                        <input 
                                            className="bg-slate-900/80 border border-slate-700 placeholder-slate-500 focus:ring-2 ring-purple-500 outline-none w-full h-11 rounded-lg px-4 text-slate-200 backdrop-blur-sm transition-all duration-300 focus:border-purple-500" 
                                            type="email" 
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                                        <button 
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 w-full sm:w-32 h-11 text-white rounded-lg cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 font-medium"
                                        >
                                            Subscribe
                                            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-center sm:text-left text-xs md:text-sm text-slate-500">
                        Govt Registered 2025 © <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors hover:underline font-medium">FusionCraftAI</a>. All Rights Reserved.
                    </p>
                    
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <span>Made with</span>
                        <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                        <span>and AI</span>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </footer>
    )
}

export default Footer