import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { Wallet, Menu, X, AlertTriangle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WalletModal from './WalletModal';

const Navbar = () => {
  const { 
    account, connectWallet, isConnecting, isDemoMode, 
    toggleDemoMode, isWrongNetwork, switchToArcTestnet 
  } = useWeb3();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      {/* Network Warning Banner */}
      <AnimatePresence>
        {isWrongNetwork && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-500/20 backdrop-blur-md border-b border-red-500/50 text-white py-2 px-6 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider mb-4 rounded-xl"
          >
            <AlertTriangle size={14} className="text-red-400" />
            Wrong Network Detected. Please switch to Arc Testnet.
            <button 
              onClick={switchToArcTestnet}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors ml-2"
            >
              Switch Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-arc-blue to-arc-purple rounded-xl flex items-center justify-center shadow-lg shadow-arc-blue/30">
            <span className="font-black text-xl text-white">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight gradient-text hidden sm:block">ArcPay</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-arc-blue ${
                location.pathname === link.path ? 'text-arc-blue' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider">
            <div className={`w-2 h-2 rounded-full ${isWrongNetwork ? 'bg-red-500' : isDemoMode ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
            <span className={isWrongNetwork ? 'text-red-400' : 'text-gray-400'}>
                {isWrongNetwork ? 'Wrong Network' : isDemoMode ? 'Demo Mode' : 'Arc Testnet'}
            </span>
          </div>

          <button
            onClick={() => account ? null : setIsModalOpen(true)}
            disabled={isConnecting}
            className="btn-primary py-2 px-5 text-sm flex items-center gap-2"
          >
            <Wallet size={16} />
            {isConnecting ? 'Connecting...' : account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <WalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConnect={connectWallet} 
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-6 right-6 glass p-6 rounded-2xl flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-300"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
                <button 
                    onClick={toggleDemoMode}
                    className="text-sm text-gray-500 font-bold uppercase"
                >
                    {isDemoMode ? 'Disable Demo Mode' : 'Enable Demo Mode'}
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
