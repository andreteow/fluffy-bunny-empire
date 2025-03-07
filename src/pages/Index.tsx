
import React from 'react';
import { GameProvider } from '@/context/GameContext';
import BunnyClicker from '@/components/BunnyClicker';
import BunnyMarket from '@/components/BunnyMarket';
import BunnyUpgrades from '@/components/BunnyUpgrades';
import GameStats from '@/components/GameStats';
import AboutPopup from '@/components/AboutPopup';
import ResetButton from '@/components/ResetButton';

const Index = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-bunny-light p-4 md:p-8">
        <header className="text-center mb-8 relative">
          <div className="absolute right-2 top-2 flex gap-2">
            <AboutPopup />
            <ResetButton />
          </div>
          
          <h1 className="text-4xl font-bold text-bunny animate-pulse-soft">
            🐰 Bunny Clicker Game 🐰
          </h1>
          <p className="text-gray-600 mt-2">
            Click to feed, multiply, and take over the world!
          </p>
        </header>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main game area */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <BunnyClicker />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BunnyMarket />
              <BunnyUpgrades />
            </div>
          </div>
          
          {/* Side panel */}
          <div className="lg:col-span-1">
            <GameStats />
          </div>
        </div>
        
        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>Bunny Clicker Game - Click, Feed, Multiply!</p>
        </footer>
      </div>
    </GameProvider>
  );
};

export default Index;
