import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, AlertCircle, RefreshCw, Clock, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

const Faucet = () => {
  const { account, isDemoMode, addToast, isWrongNetwork } = useWeb3();
  const [isRequesting, setIsRequesting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Mock cooldown timer
  useEffect(() => {
    let interval;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleRequest = async () => {
    if (!account) return addToast("Please connect wallet first", "error");
    if (isWrongNetwork) return addToast("Switch to Arc Testnet to request funds", "error");
    
    setIsRequesting(true);
    addToast("Requesting testnet USDC...", "info");

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        addToast("Successfully received 100 Testnet USDC! (+50 XP)", "success");
        setCooldown(86400); // 24 hours
    } catch (error) {
        addToast("Faucet request failed", "error");
    } finally {
        setIsRequesting(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      <div className="text-center mb-12 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-arc-purple/10 blur-[100px] -z-10" />
         <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-20 h-20 bg-gradient-to-br from-arc-purple to-arc-blue rounded-[30%] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-arc-purple/30 border border-white/20"
        >
            <Droplets className="text-white" size={40} />
        </motion.div>
        <h2 className="text-4xl font-black mb-4 tracking-tight">Testnet Faucet</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Claim free testnet USDC every 24 hours to use across the Arc Network ecosystem. 
          Use these funds to deploy contracts and test dApps.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 md:p-12 rounded-[40px] border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-arc-purple to-arc-blue" />
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6 w-full">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Wallet Address</div>
                    <div className="font-mono text-sm sm:text-base break-all">
                        {account || "Not connected"}
                    </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-arc-purple/10 border border-arc-purple/20 text-arc-purple">
                    <AlertCircle size={24} className="shrink-0" />
                    <p className="text-xs font-bold">Funds are for testing purposes only and have no real-world value.</p>
                </div>

                <button 
                    onClick={handleRequest}
                    disabled={isRequesting || cooldown > 0 || !account || isWrongNetwork}
                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex justify-center items-center gap-3 shadow-lg ${
                        cooldown > 0 ? 'bg-white/5 text-gray-500 cursor-not-allowed shadow-none' :
                        isWrongNetwork ? 'bg-red-500/20 text-red-500 cursor-not-allowed shadow-none' :
                        'bg-arc-purple text-white hover:bg-arc-blue shadow-arc-purple/20'
                    }`}
                >
                    {isRequesting ? <RefreshCw className="animate-spin" size={24} /> : cooldown > 0 ? <Clock size={24} /> : <Droplets size={24} />}
                    {isRequesting ? 'Dispensing Funds...' : cooldown > 0 ? `Next claim in ${formatTime(cooldown)}` : 'Request 100 USDC'}
                </button>
            </div>

            <div className="w-full md:w-64 space-y-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Network Status</div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <span className="text-sm text-gray-400">Network</span>
                    <span className="text-sm font-bold text-green-400 flex items-center gap-1"><CheckCircle2 size={12}/> Online</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <span className="text-sm text-gray-400">Queue</span>
                    <span className="text-sm font-bold text-white">Empty</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <span className="text-sm text-gray-400">Available</span>
                    <span className="text-sm font-bold text-white">942.5K USDC</span>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-xs text-gray-500 mb-3 font-bold uppercase">Alternative Faucets</p>
                    <a 
                        href="https://faucet.circle.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-bold text-arc-blue"
                    >
                        Circle Faucet <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Faucet;
