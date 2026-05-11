import React from 'react';
import { X, MessageCircle as Discord, Code as GitHub, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="px-6 py-20 border-t border-white/5 bg-arc-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-arc-blue/50 to-transparent" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-arc-blue to-arc-purple rounded-xl flex items-center justify-center">
              <span className="font-black text-xl">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight gradient-text">ArcPay</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            The next generation of blockchain payments. Fast, secure, and scalable infrastructure for the global economy.
          </p>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-arc-blue/20 hover:border-arc-blue/50 transition-all">
                <X size={18} className="text-gray-400 hover:text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-arc-purple/20 hover:border-arc-purple/50 transition-all">
                <Discord size={18} className="text-gray-400 hover:text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gray-500/20 hover:border-gray-500 transition-all">
                <GitHub size={18} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Ecosystem</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><a href="#" className="hover:text-arc-blue transition-colors">Arc Network</a></li>
            <li><a href="#" className="hover:text-arc-blue transition-colors">Arc Bridge</a></li>
            <li><a href="#" className="hover:text-arc-blue transition-colors">Governance</a></li>
            <li><a href="#" className="hover:text-arc-blue transition-colors">Staking</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Developers</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><a href="#" className="hover:text-arc-blue transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-arc-blue transition-colors">Developer SDK</a></li>
            <li><a href="#" className="hover:text-arc-blue transition-colors">Grant Program</a></li>
            <li><a href="#" className="hover:text-arc-blue transition-colors">Bug Bounty</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Subscribe</h4>
          <p className="text-sm text-gray-500 mb-4">Get the latest updates on Arc Network.</p>
          <div className="relative">
            <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-arc-blue outline-none transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-arc-blue text-black p-1.5 rounded-lg hover:scale-105 transition-transform">
                <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">
        <div>© 2026 Arc Network Foundation. All rights reserved.</div>
        <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
