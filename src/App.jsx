import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Deploy from './pages/Deploy';
import Faucet from './pages/Faucet';
import Missions from './pages/Missions';
import { useWeb3 } from './context/Web3Context';
import Toast from './components/Toast';
import { AnimatePresence } from 'framer-motion';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  const { isDemoMode, toasts, removeToast } = useWeb3();

  return (
    <div className="min-h-screen bg-arc-dark text-white selection:bg-arc-blue selection:text-black">
      {/* Global Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-arc-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-arc-purple/5 blur-[120px] rounded-full" />
      </div>

      <main>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />

          {/* Dashboard Routes wrapped in Sidebar Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/deploy" element={<Deploy />} />
            <Route path="/faucet" element={<Faucet />} />
            <Route path="/missions" element={<Missions />} />
          </Route>
        </Routes>
      </main>

      {/* Transaction Notifications */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast 
              key={toast.id} 
              message={toast.message} 
              type={toast.type} 
              onClose={() => removeToast(toast.id)} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
