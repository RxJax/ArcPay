import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Shield, Globe, Cpu, ChevronRight, Activity, Users, Layers, ExternalLink } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-card p-8 rounded-3xl group"
  >
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-arc-blue/20 transition-colors">
      <Icon className="text-arc-blue" size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const StatItem = ({ label, value, sub }) => (
  <div className="text-center p-6 glass rounded-2xl">
    <div className="text-4xl font-black gradient-text mb-1">{value}</div>
    <div className="text-sm font-bold uppercase tracking-wider text-gray-500">{label}</div>
    <div className="text-[10px] text-arc-blue/60 mt-1">{sub}</div>
  </div>
);

const Home = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        {/* Animated Particles Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-arc-blue/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-arc-purple/10 rounded-full blur-[120px] animate-pulse-slow" />
          
          {/* Grid lines */}
          <div className="absolute inset-0 grid-bg opacity-30" />
          
          {/* Floating Icons/Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: Math.random() * 1000, y: Math.random() * 1000 }}
              animate={{ 
                x: [Math.random() * 1000, Math.random() * 1000],
                y: [Math.random() * 1000, Math.random() * 1000],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ 
                duration: 20 + Math.random() * 20, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-arc-blue mb-8 uppercase tracking-widest neon-border">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-arc-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-arc-blue"></span>
              </span>
              Arc Network Infrastructure
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              Build, Earn & <br />
              <span className="gradient-text">Explore on Arc Testnet</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The ultimate gamified blockchain playground. Test Web3 apps, send USDC, deploy smart contracts, and earn XP on the most scalable L2 testnet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard" className="btn-primary flex items-center gap-2 group">
                Enter Testnet Hub <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary flex items-center gap-2">
                <Zap size={18} /> Enter Demo Mode
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20 relative"
          >
             {/* Abstract holographic shape placeholder */}
             <div className="w-full max-w-4xl mx-auto h-[400px] glass rounded-[40px] relative overflow-hidden border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-arc-blue/20 to-arc-purple/20 group-hover:opacity-30 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-arc-blue/30 rounded-full blur-[80px] animate-float" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-12 text-left backdrop-blur-md bg-black/40 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-bold text-arc-blue uppercase mb-2">Live Testnet Stats</div>
                            <div className="text-3xl font-black">2.4M+ Test Transactions</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-4 py-2 rounded-xl bg-arc-blue/20 text-arc-blue font-bold text-xs">
                                Chain ID: 5042002
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-arc-gray/50 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-arc-blue/5 via-transparent to-arc-purple/5 opacity-50" />
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <StatItem label="Test Transactions" value="2.4M+" sub="Total Volume" />
          <StatItem label="Active Wallets" value="45K+" sub="Connected Users" />
          <StatItem label="Deployed Contracts" value="12,500+" sub="Smart Contracts" />
          <StatItem label="Active Builders" value="3,200+" sub="Ecosystem Devs" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Why Build on Arc?</h2>
          <p className="text-gray-400">The infrastructure designed for the next billion users.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={Zap} 
            title="Instant Transfers" 
            description="Finality reached in milliseconds. No more waiting for block confirmations."
          />
          <FeatureCard 
            icon={Shield} 
            title="Low Fees" 
            description="Sub-cent transaction costs enabled by our proprietary L2 scaling technology."
          />
          <FeatureCard 
            icon={Globe} 
            title="Cross-chain Ready" 
            description="Seamlessly bridge assets between Ethereum, Base, and Arc with one click."
          />
          <FeatureCard 
            icon={Cpu} 
            title="Developer Friendly" 
            description="Standard EVM compatibility. Deploy your Solidity contracts in seconds."
          />
        </div>
      </section>

      {/* Developer Showcase */}
      <section id="developers" className="px-6 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-arc-purple/5 blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="glass p-12 rounded-[40px] border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
                <Layers className="text-arc-blue opacity-20" size={120} />
            </div>
            <div className="relative z-10">
                <h2 className="text-4xl font-black mb-12">Developer Ecosystem</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-xl bg-arc-blue/10 flex items-center justify-center shrink-0">
                                <Activity className="text-arc-blue" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Deploy Smart Contracts</h4>
                                <p className="text-gray-400">Full EVM support. Use Hardhat, Foundry, or Remix to build your dApps on Arc.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-xl bg-arc-purple/10 flex items-center justify-center shrink-0">
                                <Users className="text-arc-purple" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Build Payment Apps</h4>
                                <p className="text-gray-400">Use our SDK to integrate USDC payments into your website or mobile app in minutes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                                <ExternalLink className="text-green-400" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">AI + Web3 Integrations</h4>
                                <p className="text-gray-400">Native support for AI agents performing on-chain transactions and data analysis.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                                <Shield className="text-yellow-400" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Stablecoin Infrastructure</h4>
                                <p className="text-gray-400">Deep liquidity pools and optimized gas for USDC and other major stablecoins.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <button className="btn-primary">View Documentation</button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="px-6 py-32 relative">
        <div className="absolute inset-0 bg-arc-blue/5 blur-[150px] -z-10" />
        <div className="max-w-4xl mx-auto glass p-12 rounded-[50px] border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Globe size={150} className="text-arc-blue" />
            </div>
            <h2 className="text-4xl font-black mb-6">Join the Arc Community</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                Connect with thousands of builders, researchers, and enthusiasts shaping the future of decentralized payments.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
                <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#5865F2] hover:scale-105 transition-all font-bold">
                    Join Discord
                </button>
                <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black hover:scale-105 transition-all font-bold">
                    Follow on X
                </button>
            </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-20">Roadmap 2026</h2>
        <div className="grid md:grid-cols-4 gap-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 hidden md:block" />
            {[
                { q: 'Q1', title: 'Mainnet Launch', desc: 'Public access to Arc Mainnet' },
                { q: 'Q2', title: 'Arc Bridge', desc: 'Trustless cross-chain assets' },
                { q: 'Q3', title: 'AI SDK', desc: 'Agentic workflows on-chain' },
                { q: 'Q4', title: 'Global Expansion', desc: 'Fiat on-ramps in 50+ countries' },
            ].map((item, idx) => (
                <div key={idx} className="glass p-8 rounded-3xl relative z-10 border-white/10">
                    <div className="text-arc-blue font-black mb-2">{item.q}</div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-32 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">FAQ</h2>
        <div className="space-y-4">
            {[
                { q: 'What is Arc Network?', a: 'Arc is a high-performance Layer 2 scaling solution built for instant payments and AI agents.' },
                { q: 'How do I bridge USDC to Arc?', a: 'You can use the official Arc Bridge to transfer USDC from Ethereum or Base in less than 2 minutes.' },
                { q: 'Is Arc EVM compatible?', a: 'Yes, Arc is fully EVM compatible, meaning any contract that runs on Ethereum can run on Arc.' },
            ].map((faq, idx) => (
                <div key={idx} className="glass p-6 rounded-2xl border-white/5">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-arc-blue" />
                        {faq.q}
                    </h4>
                    <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
