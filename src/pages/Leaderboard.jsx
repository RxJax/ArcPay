import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Shield, Cpu, Zap, Award, Sparkles, TrendingUp } from 'lucide-react';

const Badge = ({ icon: Icon, label, color }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${color} bg-white/5`}>
    <Icon size={12} />
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </div>
);

const Leaderboard = () => {
  const players = [
    { rank: 1, name: 'ArcVoyager.eth', xp: '12,450', activity: 'High', badges: ['Early Builder', 'Arc Explorer'] },
    { rank: 2, name: 'CryptoKnight', xp: '11,200', activity: 'Medium', badges: ['Testnet User'] },
    { rank: 3, name: 'Web3Dev_88', xp: '9,800', activity: 'High', badges: ['Smart Contract Deployer', 'Early Builder'] },
    { rank: 4, name: 'SatoshiSecret', xp: '8,450', activity: 'Low', badges: ['Arc Explorer'] },
    { rank: 5, name: 'NeonRider', xp: '7,200', activity: 'Medium', badges: ['Testnet User'] },
  ];

  const getBadgeConfig = (badge) => {
    switch(badge) {
      case 'Early Builder': return { icon: Cpu, color: 'border-arc-blue text-arc-blue' };
      case 'Testnet User': return { icon: Zap, color: 'border-yellow-500 text-yellow-500' };
      case 'Arc Explorer': return { icon: Star, color: 'border-arc-purple text-arc-purple' };
      case 'Smart Contract Deployer': return { icon: Shield, color: 'border-green-500 text-green-400' };
      default: return { icon: Award, color: 'border-gray-500 text-gray-500' };
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-arc-blue/10 blur-[100px] -z-10" />
        <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-24 h-24 bg-gradient-to-br from-arc-blue to-arc-purple rounded-[30%] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-arc-blue/30 border border-white/20"
        >
            <Trophy className="text-white" size={48} />
        </motion.div>
        <h2 className="text-5xl font-black mb-4 tracking-tight">Testnet XP System</h2>
        <p className="text-gray-400 max-w-lg mx-auto">Build, Test, and Earn. Arc Network rewards its early contributors with ecosystem XP and exclusive NFT badges.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-8 rounded-3xl text-center border-arc-blue/20 group hover:border-arc-blue/50 transition-all cursor-default">
            <div className="text-3xl font-black text-arc-blue mb-2 flex items-center justify-center gap-2">
                <Sparkles size={24} /> 2.5x
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">XP Multiplier Active</div>
        </div>
        <div className="glass p-8 rounded-3xl text-center border-arc-purple/20 group hover:border-arc-purple/50 transition-all cursor-default">
            <div className="text-3xl font-black text-arc-purple mb-2">150,000 $ARC</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Testnet Reward Pool</div>
        </div>
        <div className="glass p-8 rounded-3xl text-center border-green-500/20 group hover:border-green-500/50 transition-all cursor-default">
            <div className="text-3xl font-black text-green-400 mb-2 flex items-center justify-center gap-2">
                <TrendingUp size={24} /> +12%
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Weekly Growth</div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[32px] overflow-hidden border-white/5"
      >
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-white/5 bg-white/5">
                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Rank</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Participant</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Ecosystem XP</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Builder Badges</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {players.map((player) => (
                        <tr key={player.rank} className="hover:bg-white/5 transition-colors group">
                            <td className="px-8 py-6">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border ${
                                    player.rank === 1 ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' :
                                    player.rank === 2 ? 'border-gray-300 bg-gray-300/10 text-gray-300' :
                                    player.rank === 3 ? 'border-orange-500 bg-orange-500/10 text-orange-500' :
                                    'border-white/5 bg-white/5 text-gray-500'
                                }`}>
                                    {player.rank}
                                </div>
                            </td>
                            <td className="px-8 py-6 font-bold group-hover:text-arc-blue transition-colors">{player.name}</td>
                            <td className="px-8 py-6 text-right">
                                <div className="font-black text-xl gradient-text">{player.xp}</div>
                                <div className="text-[10px] text-gray-600 font-bold uppercase">Points</div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                        player.activity === 'High' ? 'bg-green-400' :
                                        player.activity === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                                    }`} />
                                    <span className="text-xs text-gray-400 font-medium uppercase tracking-tight">{player.activity} Activity</span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex flex-wrap gap-2">
                                    {player.badges.map(badge => {
                                        const config = getBadgeConfig(badge);
                                        return <Badge key={badge} icon={config.icon} label={badge} color={config.color} />;
                                    })}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </motion.div>

      <div className="mt-12 glass p-12 rounded-[40px] border-arc-blue/10 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-arc-blue/5 to-arc-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-2xl font-black mb-4 relative z-10">Climb the Leaderboard</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
                XP is earned through consistent activity on the Arc Testnet. The more you build, test, and deploy, the higher your ranking and future reward allocation.
            </p>
            <div className="flex justify-center gap-4 relative z-10">
                <button className="btn-primary flex items-center gap-2">
                    <Zap size={18} /> Earn XP Now
                </button>
                <button className="btn-secondary">View Rewards Policy</button>
            </div>
      </div>
    </div>
  );
};

export default Leaderboard;
