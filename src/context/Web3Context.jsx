import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

const ARC_TESTNET_CONFIG = {
  chainId: '0x4CEBB2', // 5042002 in hex
  chainName: 'Arc Testnet',
  nativeCurrency: {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.testnet.arc.network'],
  blockExplorerUrls: ['https://testnet.arcscan.app'],
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [balance, setBalance] = useState('1,250.00');
  const [network, setNetwork] = useState('Arc Testnet');
  const [isConnecting, setIsConnecting] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [chainId, setChainId] = useState(null);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchToArcTestnet = async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ARC_TESTNET_CONFIG.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ARC_TESTNET_CONFIG],
          });
        } catch (addError) {
          console.error("Failed to add Arc Testnet", addError);
          addToast("Failed to add Arc Testnet to MetaMask", "error");
        }
      }
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

    if (window.ethereum) {
      try {
        setIsConnecting(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        setAccount(accounts[0]);
        setChainId(currentChainId);
        
        if (currentChainId !== ARC_TESTNET_CONFIG.chainId) {
          await switchToArcTestnet();
        }

        setIsConnecting(false);
        addToast("Wallet connected successfully", "success");
        localStorage.setItem('arc_connected', 'true');
      } catch (error) {
        console.error("User denied account access", error);
        setIsConnecting(false);
        addToast("Connection failed or rejected", "error");
      }
    } else {
      addToast("MetaMask not detected!", "error");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem('arc_connected');
    addToast("Wallet disconnected", "info");
  };

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
    if (!isDemoMode) {
      setAccount(null);
      localStorage.removeItem('arc_connected');
    } else {
      connectWallet();
    }
  };

  // Listen for account and chain changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          localStorage.removeItem('arc_connected');
        }
      });

      window.ethereum.on('chainChanged', (newChainId) => {
        setChainId(newChainId);
        if (newChainId !== ARC_TESTNET_CONFIG.chainId && !isDemoMode) {
          addToast("Unsupported network detected. Please switch to Arc Testnet.", "error");
        }
      });
    }
  }, [isDemoMode]);

  // Fetch real balance
  useEffect(() => {
    const fetchBalance = async () => {
        if (account && !isDemoMode && window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const rawBalance = await provider.getBalance(account);
                setBalance(parseFloat(ethers.formatEther(rawBalance)).toLocaleString(undefined, { minimumFractionDigits: 2 }));
            } catch (error) {
                console.error("Failed to fetch balance", error);
            }
        }
    };
    fetchBalance();
  }, [account, chainId, isDemoMode]);

  // Persist connection
  useEffect(() => {
    const wasConnected = localStorage.getItem('arc_connected');
    if (wasConnected === 'true' && window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <Web3Context.Provider value={{
      account,
      isDemoMode,
      balance,
      network: chainId === ARC_TESTNET_CONFIG.chainId || isDemoMode ? 'Arc Testnet' : 'Wrong Network',
      isConnecting,
      connectWallet,
      disconnectWallet,
      toggleDemoMode,
      toasts,
      addToast,
      removeToast,
      isWrongNetwork: !isDemoMode && account && chainId !== ARC_TESTNET_CONFIG.chainId,
      switchToArcTestnet
    }}>
      {children}
    </Web3Context.Provider>
  );
};
