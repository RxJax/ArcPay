import React, { useState } from 'react';
import { useWeb3, USDC_CONTRACT_ADDRESS, ERC20_ABI } from '../context/Web3Context';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, 
  RefreshCw, Send, ShieldCheck, Clock, Settings, Droplets, AlertCircle, Zap, Award, Flame, Calendar, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Dashboard = () => {
  const { 
    account, balance, network, isDemoMode, addToast, isWrongNetwork, 
    switchToArcTestnet, xp, streak, lastCheckIn, badges, handleCheckIn
  } = useWeb3();
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [txHistory, setTxHistory] = useState([
    { id: 1, type: 'send', amount: '45.00', status: 'Completed', date: '2 mins ago', hash: '0x82a9f2e5b4d2c8a1e7f0d3b6c4a9b2d5e8f1a0d3' },
    { id: 2, type: 'receive', amount: '120.50', status: 'Completed', date: '1 hour ago', hash: '0x3f1e9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f' },
  ]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    addToast(`${type} copied to clipboard!`, "info");
  };

  const handleSend = async () => {
    if (isWrongNetwork) {
        addToast("Please switch to Arc Testnet to send transactions", "error");
        return;
    }
    if (!recipient || !amount) return;
    setIsSending(true);
    
    try {
        if (isDemoMode) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const hash = `0x${Math.random().toString(16).slice(2, 42)}`;
            const newTx = {
                id: Date.now(),
                type: 'send',
                amount: parseFloat(amount).toFixed(2),
                status: 'Completed',
                date: 'Just now',
                hash: hash
            };
            setTxHistory([newTx, ...txHistory]);
            addToast(`[Demo] Successfully sent ${amount} USDC on Arc Testnet!`);
        } else {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, ERC20_ABI, signer);
            
            // Fetch decimals dynamically
            let decimals = Number(import.meta.env.VITE_PAYMENT_TOKEN_DECIMALS) || 6;
            try {
                decimals = await usdcContract.decimals();
            } catch (e) {
                console.warn(`Could not fetch decimals, defaulting to ${decimals}`);
            }
            
            const tx = await usdcContract.transfer(recipient, ethers.parseUnits(amount, decimals));

            addToast("Transaction submitted! Waiting for confirmation...", "info");
            const receipt = await tx.wait();
            
            const newTx = {
                id: Date.now(),
                type: 'send',
                amount: parseFloat(amount).toFixed(2),
                status: 'Completed',
                date: 'Just now',
                hash: receipt.hash
            };
            setTxHistory([newTx, ...txHistory]);
            addToast(`Successfully sent ${amount} USDC on Arc Testnet!`);
        }

        setAmount('');
        setRecipient('');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00d2ff', '#9d50bb', '#ffffff']
        });
    } catch (error) {
        console.error("Transaction failed", error);
        addToast(error.reason || "Transaction failed. Check your balance.", "error");
    } finally {
        setIsSending(false);
    }
  };

  const onCheckIn = async () => {
      setIsCheckingIn(true);
      await handleCheckIn();
      setIsCheckingIn(false);
  };

  if (!account) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="glass p-12 rounded-[40px] text-center max-w-md w-full border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Wallet size={200} />
          </div>
          <div className="w-20 h-20 bg-arc-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="text-arc-blue" size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Dashboard Access</h2>
          <p className="text-gray-400 mb-8">Please connect your wallet from the sidebar or enable Demo Mode to view the dashboard.</p>
        </div>
      </div>
    );
  }

  const today = new Date().toDateString();
  const alreadyCheckedIn = lastCheckIn === today;

  return (
    <div className="space-y-8 pb-20">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-[24px] border-white/5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-arc-blue/10 flex items-center justify-center shrink-0">
                <Wallet className="text-arc-blue" size={24} />
            </div>
            <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Testnet Balance</div>
                <div className="text-2xl font-black">{balance} <span className="text-sm text-arc-blue">USDC</span></div>
            </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-[24px] border-white/5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-arc-purple/10 flex items-center justify-center shrink-0">
                <Zap className="text-arc-purple" size={24} />
            </div>
            <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ecosystem XP</div>
                <div className="text-2xl font-black">{xp.toLocaleString()} <span className="text-sm text-arc-purple">XP</span></div>
            </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-[24px] border-white/5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">
                <Flame className="text-orange-500" size={24} />
            </div>
            <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Activity Streak</div>
                <div className="text-2xl font-black">{streak} <span className="text-sm text-orange-500">Days</span></div>
            </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Daily Check-in */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-[32px] border-white/5 relative overflow-hidden"
          >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Calendar size={100} />
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  Daily Check-in
              </h3>
              <p className="text-sm text-gray-400 mb-6">Sign a transaction daily to build your streak and earn ecosystem XP.</p>
              
              <button 
                  onClick={onCheckIn}
                  disabled={alreadyCheckedIn || isCheckingIn || isWrongNetwork}
                  className={`w-full py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 ${
                      alreadyCheckedIn ? 'bg-white/5 text-gray-500 cursor-not-allowed' :
                      isWrongNetwork ? 'bg-red-500/20 text-red-500 cursor-not-allowed' :
                      'bg-gradient-to-r from-arc-blue to-arc-purple text-white hover:opacity-90'
                  }`}
              >
                  {isCheckingIn ? <RefreshCw className="animate-spin" size={18} /> : alreadyCheckedIn ? <Check size={18} /> : <Zap size={18} />}
                  {isCheckingIn ? 'Signing...' : alreadyCheckedIn ? 'Checked In Today' : 'Check In (+100 XP)'}
              </button>
              
              <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Your Badges</div>
                  <div className="flex flex-wrap gap-2">
                      {badges.map((badge, idx) => (
                          <div key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 flex items-center gap-2">
                              <Award size={12} className="text-arc-blue" /> {badge}
                          </div>
                      ))}
                  </div>
              </div>
          </motion.div>

          {/* Send USDC Card */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="glass p-8 rounded-[32px] border-white/5"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Send size={20} className="text-arc-blue" /> Send Testnet USDC
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Recipient Address</label>
                    <input 
                        type="text" 
                        placeholder="0x..." 
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 mt-2 focus:border-arc-blue outline-none transition-colors font-mono text-sm"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Amount</label>
                    <div className="relative">
                        <input 
                            type="number" 
                            placeholder="0.00" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 mt-2 focus:border-arc-blue outline-none transition-colors font-bold"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 text-arc-blue font-bold">USDC</div>
                    </div>
                </div>
                <button 
                    onClick={handleSend}
                    disabled={isSending || !recipient || !amount || isWrongNetwork}
                    className={`btn-primary w-full py-4 mt-4 flex items-center justify-center gap-2 ${isSending || isWrongNetwork ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSending ? <RefreshCw className="animate-spin" /> : <Send size={18} />}
                    {isSending ? 'Sending Transaction...' : isWrongNetwork ? 'Wrong Network' : 'Confirm Transfer'}
                </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Transactions */}
        <div className="lg:col-span-2 space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-[32px] overflow-hidden border-white/5 h-full flex flex-col"
            >
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Clock size={20} className="text-arc-blue" /> Recent Transactions
                    </h3>
                    <a 
                        href={`https://testnet.arcscan.app/address/${account}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-arc-blue flex items-center gap-1 hover:underline"
                    >
                        View all on ArcScan <ExternalLink size={12} />
                    </a>
                </div>
                <div className="divide-y divide-white/5 flex-1 overflow-y-auto max-h-[500px] no-scrollbar">
                    {txHistory.map((tx) => (
                        <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'receive' ? 'bg-green-500/10 text-green-400' : 'bg-arc-blue/10 text-arc-blue'}`}>
                                    {tx.type === 'receive' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                </div>
                                <div className="overflow-hidden">
                                    <div className="font-bold flex items-center gap-2">
                                        {tx.type === 'receive' ? 'Received USDC' : 'Sent USDC'}
                                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-gray-500 uppercase tracking-tighter">Success</span>
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-2 overflow-hidden">
                                        <span className="truncate max-w-[100px] md:max-w-none font-mono">{tx.hash}</span>
                                        <button onClick={() => copyToClipboard(tx.hash, "Hash")} className="hover:text-white shrink-0"><Copy size={12} /></button>
                                        <a 
                                            href={`https://testnet.arcscan.app/tx/${tx.hash}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="hover:text-arc-blue shrink-0"
                                        >
                                            <ExternalLink size={12} />
                                        </a>
                                        <span className="hidden sm:inline text-gray-700">•</span>
                                        <span className="hidden sm:inline shrink-0">{tx.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`font-black text-lg ${tx.type === 'receive' ? 'text-green-400' : 'text-white'}`}>
                                    {tx.type === 'receive' ? '+' : '-'}{tx.amount}
                                </div>
                                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">USDC</div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
