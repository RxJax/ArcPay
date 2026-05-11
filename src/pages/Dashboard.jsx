import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, 
  RefreshCw, Send, ShieldCheck, Clock, Settings, Droplets, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Dashboard = () => {
  const { account, balance, network, isDemoMode, addToast, isWrongNetwork, switchToArcTestnet } = useWeb3();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [txHistory, setTxHistory] = useState([
    { id: 1, type: 'send', amount: '45.00', status: 'Completed', date: '2 mins ago', hash: '0x82a9f2e5b4d2c8a1e7f0d3b6c4a9b2d5e8f1a0d3' },
    { id: 2, type: 'receive', amount: '120.50', status: 'Completed', date: '1 hour ago', hash: '0x3f1e9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f' },
    { id: 3, type: 'send', amount: '10.00', status: 'Completed', date: '5 hours ago', hash: '0x1c9f2e5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e' },
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
            // Simulate transaction
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
            // Real Transaction using ethers.js
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            
            const tx = await signer.sendTransaction({
                to: recipient,
                value: ethers.parseEther(amount) // Assuming USDC is the native gas token as per config
            });

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

  if (!account) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center px-6">
        <div className="glass p-12 rounded-[40px] text-center max-w-md w-full border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Wallet size={200} />
          </div>
          <div className="w-20 h-20 bg-arc-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="text-arc-blue" size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Dashboard Access</h2>
          <p className="text-gray-400 mb-8">Connect your MetaMask wallet or use Demo Mode to explore the ArcPay payment interface.</p>
          <div className="flex flex-col gap-4">
            <button className="btn-primary w-full">Connect Wallet</button>
            <div className="text-xs text-gray-600 font-bold uppercase tracking-widest">or</div>
            <button className="btn-secondary w-full">Try Demo Mode</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      
      {isWrongNetwork && (
        <div className="mb-8 glass p-6 rounded-3xl border-red-500/20 bg-red-500/5 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-red-400">
                <AlertCircle size={32} />
                <div>
                    <div className="font-bold">Unsupported Network Detected</div>
                    <div className="text-xs text-gray-500">ArcPay exclusively supports Arc Testnet. Your wallet is currently connected to another network.</div>
                </div>
            </div>
            <button 
                onClick={switchToArcTestnet}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shrink-0"
            >
                Switch to Arc Testnet
            </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Wallet Info & Send */}
        <div className="lg:col-span-1 space-y-8">
          {/* Wallet Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-[32px] relative overflow-hidden group border-white/5"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={120} />
            </div>
            <div className="flex justify-between items-start mb-12">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isWrongNetwork ? 'bg-red-500/20 text-red-400' : 'bg-arc-blue/20 text-arc-blue'}`}>
                    {network}
                </div>
                <div className="flex gap-2">
                    <a 
                        href="https://faucet.circle.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-arc-purple/20 text-arc-purple rounded-lg hover:bg-arc-purple/30 transition-all flex items-center gap-2 text-[10px] font-bold uppercase"
                    >
                        <Droplets size={14} /> Circle Faucet
                    </a>
                </div>
            </div>
            <div className="mb-8">
                <div className="text-gray-400 text-sm mb-1">Arc Testnet USDC</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">{balance}</span>
                    <span className="text-xl font-bold text-arc-blue">USDC</span>
                </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-black/40 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-arc-blue/20 to-arc-purple/20 flex items-center justify-center shrink-0">
                    <Wallet size={20} className="text-arc-blue" />
                </div>
                <div className="overflow-hidden">
                    <div className="text-[10px] text-gray-500 uppercase font-bold">Wallet Address</div>
                    <div className="text-sm font-mono truncate">{account}</div>
                </div>
                <button 
                    onClick={() => copyToClipboard(account, "Address")}
                    className="ml-auto p-2 hover:text-arc-blue transition-colors"
                >
                    <Copy size={16} />
                </button>
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
                <Send size={20} className="text-arc-blue" /> Send USDC
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
                <div className="text-[10px] text-center text-gray-600 font-bold uppercase tracking-widest mt-2">
                    Transactions are free on Arc Testnet
                </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Transactions */}
        <div className="lg:col-span-2 space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-[32px] overflow-hidden border-white/5"
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
                        ArcScan <ExternalLink size={12} />
                    </a>
                </div>
                <div className="divide-y divide-white/5">
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

            {/* Smart Contract Showcase Placeholder */}
            <div className="glass p-8 rounded-[32px] border-arc-blue/10 relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity translate-y-1/4 translate-x-1/4">
                    <RefreshCw size={240} className="animate-spin-slow" />
                </div>
                <div className="relative z-10">
                    <div className="text-arc-blue font-bold text-xs uppercase tracking-widest mb-2">Advanced Infrastructure</div>
                    <h4 className="text-2xl font-black mb-4">Smart Contract Integration</h4>
                    <p className="text-gray-400 mb-8 max-w-xl">
                        Connect your custom Solidity contracts to ArcPay. We support automated recurring payments, multi-sig escrow, and yield-bearing stablecoin logic.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
                            View API Docs
                        </button>
                        <button className="px-6 py-2 bg-arc-blue/10 text-arc-blue border border-arc-blue/20 rounded-xl font-bold text-sm hover:bg-arc-blue/20 transition-all">
                            Deploy Example
                        </button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
