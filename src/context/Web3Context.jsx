import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

const ARC_TESTNET_CONFIG = {
  chainId: "0x4D8D02",
  chainName: "Arc Testnet",
  rpcUrls: ["https://rpc.testnet.arc.network"],
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 6
  },
  blockExplorerUrls: ["https://testnet.arcscan.app"]
};

export const USDC_CONTRACT_ADDRESS = import.meta.env.VITE_PAYMENT_TOKEN_ADDRESS || '0x3600000000000000000000000000000000000000';
export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint amount) returns (bool)"
];

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [balance, setBalance] = useState('0.00');
  const [network, setNetwork] = useState('Disconnected');
  const [isConnecting, setIsConnecting] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [chainId, setChainId] = useState(null);

  // Gamification State
  const [xp, setXp] = useState(12450);
  const [streak, setStreak] = useState(5);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [badges, setBadges] = useState(['Early Builder', 'Arc Explorer']);

  const isCorrectNetwork = (id) => {
    return id && String(id).toLowerCase() === String(ARC_TESTNET_CONFIG.chainId).toLowerCase();
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchToArcTestnet = async () => {
  if (!window.ethereum) {
    addToast("MetaMask not detected!", "error");
    return false;
  }
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ARC_TESTNET_CONFIG.chainId }],
    });
    addToast("Switched to Arc Testnet", "success");
    return true;
  } catch (switchError) {
    // 4902 indicates the chain is not added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [ARC_TESTNET_CONFIG],
        });
        addToast("Arc Testnet added and switched", "success");
        return true;
      } catch (addError) {
        console.error("Failed to add Arc Testnet", addError);
        addToast("Failed to add Arc Testnet to MetaMask", "error");
        return false;
      }
    } else {
      console.error("Failed to switch network", switchError);
      addToast("Failed to switch to Arc Testnet", "error");
      return false;
    }
  }
};


  // Helper to ensure connection, network, and return signer
  const ensureNetworkAndSigner = async () => {
    if (isDemoMode) return null; // Handled separately
    if (!window.ethereum) {
      addToast("MetaMask not detected! Please install MetaMask.", "error");
      throw new Error("No MetaMask");
    }

    try {
      // 1. Explicitly request accounts (TRIGGERS POPUP)
      console.log("Requesting accounts...");
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const currentAccount = accounts[0];
      setAccount(currentAccount);

      // 2. Check Network and Switch if needed
      let currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      setChainId(currentChainId);

      if (!isCorrectNetwork(currentChainId)) {
        addToast("Please switch to Arc Testnet to continue", "warning");
        const switched = await switchToArcTestnet();
        if (!switched) {
            throw new Error("Wrong Network");
        }
        // update chain ID after switch
        currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(currentChainId);
      }

      // 3. Create provider and return signer
      console.log("Creating BrowserProvider...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return { signer, currentAccount };
    } catch (error) {
      console.error("Wallet interaction failed:", error);
      if (error.code === 4001) {
          addToast("Action rejected in MetaMask", "error");
      }
      throw error;
    }
  };

  const connectWallet = async () => {
    if (isDemoMode) {
      setIsConnecting(true);
      setTimeout(() => {
        setAccount('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
        setIsConnecting(false);
        addToast("Connected to Demo Mode", "info");
      }, 1000);
      return;
    }

    setIsConnecting(true);
    try {
      await ensureNetworkAndSigner();
      addToast("Wallet connected successfully", "success");
    } catch (error) {
      // Errors handled in ensureNetworkAndSigner
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCheckIn = async () => {
    if (isDemoMode) {
        setXp(prev => prev + 100);
        setStreak(prev => prev + 1);
        setLastCheckIn(new Date().toDateString());
        addToast("Daily check-in successful! +100 XP", "success");
        return;
    }

    try {
        const { signer, currentAccount } = await ensureNetworkAndSigner();
        
        console.log("Executing Check-In Transaction (0 USDC transfer)...");
        addToast("Please confirm the check-in transaction in MetaMask", "info");
        
        const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, ERC20_ABI, signer);
        
        // Option B: send minimal USDC testnet transfer (0 USDC to self)
        const tx = await usdcContract.transfer(currentAccount, 0);
        
        addToast("Transaction submitted! Waiting for confirmation...", "info");
        const receipt = await tx.wait();
        console.log("Check-in confirmed:", receipt.hash);
        
        setXp(prev => prev + 100);
        setStreak(prev => prev + 1);
        setLastCheckIn(new Date().toDateString());
        
        addToast(
            <div>
                Check-in successful! +100 XP<br/>
                <a href={`https://testnet.arcscan.app/tx/${receipt.hash}`} target="_blank" rel="noreferrer" className="underline font-bold text-arc-blue mt-1 block">
                    View on ArcScan
                </a>
            </div>, 
            "success"
        );
    } catch (error) {
        console.error("Check-in failed", error);
        // Error toast already handled by ensureNetworkAndSigner for 4001
        if (error.code !== 4001 && error.message !== "Wrong Network" && error.message !== "No MetaMask") {
            addToast("Check-in transaction failed.", "error");
        }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('0.00');
    setChainId(null);
    addToast("Wallet disconnected", "info");
  };

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
    if (!isDemoMode) {
      setAccount(null);
    } else {
      connectWallet();
    }
  };

  // Listen for account and chain changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };

      const handleChainChanged = (newChainId) => {
        setChainId(newChainId);
        if (!isCorrectNetwork(newChainId) && !isDemoMode && account) {
          addToast("Unsupported network detected. Please switch to Arc Testnet.", "error");
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [isDemoMode, account]);

  // Fetch real balance
  useEffect(() => {
    const fetchBalance = async () => {
        if (account && !isDemoMode && window.ethereum && isCorrectNetwork(chainId)) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, ERC20_ABI, provider);
                const rawBalance = await usdcContract.balanceOf(account);
                
                try {
                  const decimals = await usdcContract.decimals();
                  setBalance(parseFloat(ethers.formatUnits(rawBalance, decimals)).toLocaleString(undefined, { minimumFractionDigits: 2 }));
                } catch (e) {
                  const fallbackDecimals = Number(import.meta.env.VITE_PAYMENT_TOKEN_DECIMALS) || 6;
                  setBalance(parseFloat(ethers.formatUnits(rawBalance, fallbackDecimals)).toLocaleString(undefined, { minimumFractionDigits: 2 }));
                }
            } catch (error) {
                console.error("Failed to fetch balance", error);
            }
        } else if (!account) {
            setBalance('0.00');
        }
    };
    fetchBalance();
  }, [account, chainId, isDemoMode]);

  return (
    <Web3Context.Provider value={{
      account,
      isDemoMode,
      balance,
      network: !account ? 'Disconnected' : isCorrectNetwork(chainId) || isDemoMode ? 'Arc Testnet' : 'Wrong Network',
      isConnecting,
      connectWallet,
      disconnectWallet,
      toggleDemoMode,
      toasts,
      addToast,
      removeToast,
      isWrongNetwork: !isDemoMode && account && !isCorrectNetwork(chainId),
      switchToArcTestnet,
      xp,
      streak,
      lastCheckIn,
      badges,
      handleCheckIn,
      ensureNetworkAndSigner
    }}>
      {children}
    </Web3Context.Provider>
  );
};
