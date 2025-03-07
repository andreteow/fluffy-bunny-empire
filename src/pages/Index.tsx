
import React, { useState } from 'react';
import { GameProvider } from '@/context/GameContext';
import BunnyClicker from '@/components/BunnyClicker';
import BunnyMarket from '@/components/BunnyMarket';
import BunnyUpgrades from '@/components/BunnyUpgrades';
import GameStats from '@/components/GameStats';
import AboutPopup from '@/components/AboutPopup';
import ResetButton from '@/components/ResetButton';
import VictoryDialog from '@/components/VictoryDialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BarChart2 } from 'lucide-react';

const Index = () => {
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <GameProvider>
      <div className="min-h-screen bg-white p-4 md:p-8">
        <header className="text-center mb-10 pt-14 md:pt-6 relative">
          <div className="absolute right-2 top-2 md:top-2 flex gap-2 z-20">
            <AboutPopup />
            <ResetButton />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 z-10 relative">
            🐰 Bunny Clicker Game 🐰
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Click to feed, multiply, and take over the world!
          </p>
        </header>
        
        <div className="fixed bottom-4 left-4 z-50 lg:hidden">
          <Sheet open={statsOpen} onOpenChange={setStatsOpen}>
            <SheetTrigger className="rounded-full bg-gray-800 p-3 text-white shadow-md">
              <BarChart2 className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-xl p-0 border-0">
              <div className="p-4 h-full overflow-y-auto">
                <GameStats />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <BunnyClicker />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BunnyMarket />
              <BunnyUpgrades />
            </div>
          </div>
          
          <div className="lg:col-span-1 hidden lg:block">
            <GameStats />
          </div>
        </div>
        
        <footer className="text-center text-gray-500 text-sm mt-16">
          <p>Bunny Clicker Game - Click, Feed, Multiply!</p>
        </footer>

        <VictoryDialog />
      </div>
    </GameProvider>
  );
};

export default Index;
