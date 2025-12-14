import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Dashboard } from './components/dashboard/Dashboard';
import { LandingPage } from './components/landing/LandingPage';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!hasEntered ? (
        <LandingPage key="landing" onEnter={() => setHasEntered(true)} />
      ) : (
        <Dashboard key="dashboard" />
      )}
    </AnimatePresence>
  );
}

export default App;
