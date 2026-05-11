import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Layers, CheckCircle2, Copy, ExternalLink, ShieldAlert, Cpu } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';

const templates = [
  { id: 'erc20', name: 'ERC20 Token', desc: 'Standard fungible token contract', gas: '0.001 USDC' },
  { id: 'erc721', name: 'NFT Collection (ERC721)', desc: 'Non-fungible token collection', gas: '0.002 USDC' },
  { id: 'faucet', name: 'Token Faucet', desc: 'Distribute tokens to users', gas: '0.0015 USDC' },
  { id: 'counter', name: 'Simple Counter', desc: 'Basic state changing contract', gas: '0.0005 USDC' },
];

const Deploy = () => {
  const { account, isDemoMode, addToast, isWrongNetwork } = useWeb3();
  const [selected, setSelected] = useState(templates[0].id);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedContracts, setDeployedContracts] = useState([]);

  const handleDeploy = async () => {
    if (!account) return addToast("Please connect wallet first", "error");
    if (isWrongNetwork) return addToast("Switch to Arc Testnet to deploy", "error");

    setIsDeploying(true);
    addToast("Compiling contract...", "info");

    // Simulate deployment delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const hash = `0x${Math.random().toString(16).slice(2, 42)}`;
    const newContract = {
      id: Date.now(),
      type: templates.find(t => t.id === selected).name,
      address: hash,
      date: new Date().toLocaleString()
    };
    
    setDeployedContracts([newContract, ...deployedContracts]);
    setIsDeploying(false);
    addToast("Contract deployed successfully on Arc Testnet! +500 XP", "success");
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="mb-8">
        <h2 className="text-4xl font-black mb-4">Smart Contract Hub</h2>
        <p className="text-gray-400 max-w-2xl">
          Deploy verified smart contracts directly to the Arc Testnet. 
          Test your dApps instantly with our ultra-fast and low-cost execution environment.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Templates Selection */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Layers className="text-arc-blue" size={20} /> Select Template
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map(template => (
              <div 
                key={template.id}
                onClick={() => setSelected(template.id)}
                className={`glass p-6 rounded-2xl cursor-pointer transition-all border ${
                  selected === template.id ? 'border-arc-blue bg-arc-blue/5' : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <Cpu size={24} className={selected === template.id ? 'text-arc-blue' : 'text-gray-500'} />
                  {selected === template.id && <CheckCircle2 size={16} className="text-arc-blue" />}
                </div>
                <h4 className="font-bold mb-1">{template.name}</h4>
                <p className="text-xs text-gray-400 mb-4">{template.desc}</p>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Est. Gas: <span className="text-white">{template.gas}</span>
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-3xl border-arc-purple/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Rocket size={120} />
            </div>
            <h4 className="font-bold mb-2 text-lg">Deploy Configuration</h4>
            <p className="text-sm text-gray-400 mb-6">Contract will be deployed from: <br/><span className="font-mono text-white">{account || 'Not connected'}</span></p>
            
            <button 
              onClick={handleDeploy}
              disabled={isDeploying || !account || isWrongNetwork}
              className={`w-full py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 ${
                  isWrongNetwork ? 'bg-red-500/20 text-red-500 cursor-not-allowed' :
                  'bg-arc-blue text-black hover:bg-white'
              }`}
            >
              {isDeploying ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Rocket size={18} />}
              {isDeploying ? 'Deploying to Arc Testnet...' : 'Deploy Contract (+500 XP)'}
            </button>
            <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-black/20 p-3 rounded-lg border border-white/5">
              <ShieldAlert size={14} className="shrink-0 text-yellow-500" />
              <p>This is a simulated deployment environment for the ArcPay Hub. Real deployment requires custom ABI interaction.</p>
            </div>
          </motion.div>
        </div>

        {/* Deployed Contracts */}
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Code className="text-arc-purple" size={20} /> Your Deployments
          </h3>
          
          {deployedContracts.length === 0 ? (
            <div className="glass p-12 rounded-3xl border-white/5 text-center flex flex-col items-center justify-center h-[400px]">
              <Code size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400">No contracts deployed yet.</p>
              <p className="text-sm text-gray-500 mt-2">Select a template and deploy your first contract to earn the Builder badge.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {deployedContracts.map(contract => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={contract.id} 
                  className="glass p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs font-bold text-arc-blue uppercase tracking-widest mb-1">{contract.type}</div>
                      <div className="font-mono text-sm">{contract.address}</div>
                    </div>
                    <button onClick={() => {
                        navigator.clipboard.writeText(contract.address);
                        addToast("Contract address copied!", "info");
                    }} className="text-gray-400 hover:text-white">
                      <Copy size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{contract.date}</span>
                    <a 
                      href={`https://testnet.arcscan.app/address/${contract.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-arc-purple font-bold flex items-center gap-1 hover:underline"
                    >
                      View on ArcScan <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Deploy;
