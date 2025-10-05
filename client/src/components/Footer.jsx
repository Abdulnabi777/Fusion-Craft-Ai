import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-slate-400 mt-20 bg-slate-900 overflow-y-auto border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-slate-800 pb-6">
                <div className="md:max-w-96">
                    <img className="h-9 drop-shadow-[0_0_8px_rgba(147,51,234,0.7)]" src={assets.logo} alt="FusionCraftAI Logo"/>
                    <p className="mt-6 text-sm">
                        Expeirence the power of AI-driven content creation with FusionCraftAI. Our suite of tools is designed to help you create, enhance, and optimize your content effortlessly.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-slate-200">Company</h2>
                        <ul className="text-sm space-y-2 ">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">About us</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Contact us</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-200 mb-5">Subscribe to our newsletter</h2>
                        <div className="text-sm space-y-2">
                            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center gap-2 pt-4">
                                <input className="bg-slate-800 border border-slate-700 placeholder-slate-500 focus:ring-2 ring-purple-500 outline-none w-full max-w-64 h-9 rounded px-2 text-slate-200" type="email" placeholder="Enter your email" />
                                <button className="bg-purple-600 w-24 h-9 text-white rounded cursor-pointer hover:bg-purple-700 transition-colors">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Govt Registered 2025 © <a href="https://prebuiltui.com" className="text-purple-400 hover:underline">FusionCraftAI</a>. All Right Reserved.
            </p>
        </footer>
    );
};

export default Footer;