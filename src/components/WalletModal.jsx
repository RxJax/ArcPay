import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Shield, Zap } from 'lucide-react';

const WalletModal = ({ isOpen, onClose, onConnect }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md glass p-8 rounded-[40px] border-white/10"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-arc-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wallet className="text-arc-blue" size={32} />
            </div>
            <h2 className="text-2xl font-bold">Connect Wallet</h2>
            <p className="text-sm text-gray-500 mt-2">Select your preferred wallet provider to access ArcPay.</p>
          </div>

          <div className="space-y-3">
            {[
                { name: 'MetaMask', icon: '🦊', desc: 'The most popular crypto wallet.' },
                { name: 'Coinbase Wallet', icon: '🔵', desc: 'Secure storage for your assets.' },
                { name: 'WalletConnect', icon: '🔗', desc: 'Connect with any mobile wallet.' },
            ].map((wallet) => (
                <button 
                    key={wallet.name}
                    onClick={() => { onConnect(); onClose(); }}
                    className="w-full p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-arc-blue/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left group"
                >
                    <div className="text-2xl w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl group-hover:bg-arc-blue/20 transition-colors">
                        {wallet.icon}
                    </div>
                    <div>
                        <div className="font-bold">{wallet.name}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{wallet.desc}</div>
                    </div>
                </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest justify-center">
                <Shield size={12} className="text-arc-blue" /> Secure & Encrypted Connection
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WalletModal;
