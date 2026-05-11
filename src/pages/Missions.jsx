import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Circle, Zap, Code, Droplets, Users, Shield, ArrowRight } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';

const MissionCard = ({ icon: Icon, title, desc, xp, isCompleted, color }) => (
  <div className={`glass p-6 rounded-2xl border transition-all ${isCompleted ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 hover:border-white/20'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 ${color}`}>
        <Icon size={24} />
      </div>
      {isCompleted ? (
        <div className="flex items-center gap-1 text-green-400 text-xs font-bold uppercase tracking-wider bg-green-400/10 px-2 py-1 rounded-lg">
          <CheckCircle2 size={14} /> Completed
        </div>
      ) : (
        <div className="flex items-center gap-1 text-gray-500 text-xs font-bold uppercase tracking-wider bg-white/5 px-2 py-1 rounded-lg">
          <Circle size={14} /> Pending
        </div>
      )}
    </div>
    <h4 className="font-bold text-lg mb-2">{title}</h4>
    <p className="text-gray-400 text-sm mb-6 h-10">{desc}</p>
    <div className="flex items-center justify-between mt-auto">
      <div className="text-sm font-black gradient-text">+{xp} XP</div>
      {!isCompleted && <button className="text-xs font-bold text-arc-blue flex items-center gap-1 hover:underline">Start Mission <ArrowRight size={12} /></button>}
    </div>
  </div>
);

const Missions = () => {
  const { streak, xp, badges } = useWeb3();

  const activeMissions = [
    { id: 1, title: 'First Steps', desc: 'Connect your wallet and switch to Arc Testnet.', xp: 100, isCompleted: true, icon: Shield, color: 'text-white' },
    { id: 2, title: 'Testnet Transactor', desc: 'Send 5 successful testnet USDC transactions.', xp: 300, isCompleted: false, icon: Zap, color: 'text-yellow-500' },
    { id: 3, title: 'Smart Contract Pioneer', desc: 'Deploy your first ERC20 or NFT contract.', xp: 500, isCompleted: badges.includes('Smart Contract Deployer'), icon: Code, color: 'text-arc-purple' },
    { id: 4, title: 'Thirsty Builder', desc: 'Request funds from the Arc Testnet Faucet.', xp: 50, isCompleted: badges.includes('Faucet Hunter'), icon: Droplets, color: 'text-arc-blue' },
    { id: 5, title: 'Network effect', desc: 'Invite a friend to the Arc Testnet Hub.', xp: 200, isCompleted: false, icon: Users, color: 'text-orange-500' },
    { id: 6, title: 'Consistency is Key', desc: 'Maintain a 7-day daily check-in streak.', xp: 1000, isCompleted: streak >= 7, icon: Target, color: 'text-red-500' },
  ];

  const progress = Math.round((activeMissions.filter(m => m.isCompleted).length / activeMissions.length) * 100);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h2 className="text-4xl font-black mb-4">Builder Missions</h2>
          <p className="text-gray-400 max-w-2xl">
            Complete weekly tasks to earn Ecosystem XP, unlock exclusive builder badges, and climb the global leaderboard.
          </p>
        </div>
        
        <div className="glass p-6 rounded-2xl border-arc-blue/20 flex-shrink-0 w-full md:w-64">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Weekly Progress</span>
            <span className="text-xl font-black text-arc-blue">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-arc-blue to-arc-purple"
            />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeMissions.map((mission, idx) => (
          <motion.div 
            key={mission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <MissionCard {...mission} />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 glass p-10 rounded-[32px] border-white/5 bg-[url('/grid.svg')] bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 text-center">
            <h3 className="text-2xl font-black mb-4">Missions Reset In</h3>
            <div className="flex justify-center gap-4 text-4xl font-mono font-black gradient-text">
                <div>03<span className="text-sm block text-gray-500 font-sans uppercase">Days</span></div>:
                <div>14<span className="text-sm block text-gray-500 font-sans uppercase">Hours</span></div>:
                <div>45<span className="text-sm block text-gray-500 font-sans uppercase">Mins</span></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
