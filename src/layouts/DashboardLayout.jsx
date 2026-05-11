import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { LayoutDashboard, Rocket, Droplets, Target, Award, Wallet, Menu, X, ChevronRight, Activity, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WalletModal from '../components/WalletModal';

const SidebarLink = ({ icon: Icon, label, path, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link 
      to={path} 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive 
          ? 'bg-arc-blue/10 text-arc-blue font-bold border border-arc-blue/20' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={20} className={isActive ? 'text-arc-blue' : ''} />
      <span>{label}</span>
      {isActive && <ChevronRight size={16} className="ml-auto opacity-50" />}
    </Link>
  );
};

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account, connectWallet, isConnecting, network, isWrongNetwork, switchToArcTestnet } = useWeb3();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-arc-dark relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-arc-blue/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-arc-purple/10 blur-[150px] rounded-full" />
            <div className="absolute inset-0 grid-bg" />
        </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-arc-dark/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-arc-blue to-arc-purple rounded-lg flex items-center justify-center">
                <span className="font-black text-sm text-white">A</span>
            </div>
            <span className="font-bold tracking-tight gradient-text">ArcPay Hub</span>
        </div>
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Content */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 glass border-r border-white/5 flex flex-col pt-16 lg:pt-0 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          >
            <div className="p-6 hidden lg:flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-arc-blue to-arc-purple rounded-xl flex items-center justify-center shadow-lg shadow-arc-blue/20">
                    <span className="font-black text-xl text-white">A</span>
                </div>
                <span className="text-xl font-bold tracking-tight gradient-text">ArcPay Hub</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
              <div className="text-xs font-bold text-gray-600 uppercase tracking-widest px-4 py-2 mt-4">Menu</div>
              <SidebarLink icon={LayoutDashboard} label="Dashboard" path="/dashboard" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink icon={Rocket} label="Deploy Hub" path="/deploy" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink icon={Droplets} label="Testnet Faucet" path="/faucet" onClick={() => setIsSidebarOpen(false)} />
              
              <div className="text-xs font-bold text-gray-600 uppercase tracking-widest px-4 py-2 mt-8">Ecosystem</div>
              <SidebarLink icon={Target} label="Missions" path="/missions" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink icon={Award} label="Leaderboard" path="/leaderboard" onClick={() => setIsSidebarOpen(false)} />
            </div>

            <div className="p-4 border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Arc Testnet Live</span>
                </div>
                <button
                    onClick={() => account ? null : setIsModalOpen(true)}
                    disabled={isConnecting}
                    className="w-full btn-primary py-3 px-4 text-sm flex items-center justify-center gap-2"
                >
                    <Wallet size={16} />
                    {isConnecting ? 'Connecting...' : account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
                </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 w-full min-h-screen overflow-x-hidden pt-16 lg:pt-0">
        
        {/* Topbar Warning */}
        {isWrongNetwork && (
            <div className="bg-red-500/20 backdrop-blur-md border-b border-red-500/50 text-white py-2 px-6 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider relative z-50">
                Wrong Network Detected. Switch to Arc Testnet to use all features.
                <button onClick={switchToArcTestnet} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors ml-2">
                    Switch Now
                </button>
            </div>
        )}

        <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
            <Outlet />
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConnect={connectWallet} />
    </div>
  );
};

export default DashboardLayout;
