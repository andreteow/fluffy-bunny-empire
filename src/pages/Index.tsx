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
      <div className="min-h-screen bg-bunny-light p-4 md:p-8">
        <header className="text-center mb-8 pt-14 md:pt-6 relative">
          <div className="absolute right-2 top-2 md:top-2 flex gap-2 z-20">
            <AboutPopup />
            <ResetButton />
          </div>
          
          <h1 className="text-4xl font-bold text-bunny animate-pulse-soft z-10 relative">
            🐰 Bunny Clicker Game 🐰
          </h1>
          <p className="text-gray-600 mt-2">
            Click to feed, multiply, and take over the world!
          </p>
        </header>
        
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <Sheet open={statsOpen} onOpenChange={setStatsOpen}>
            <SheetTrigger className="rounded-full bg-bunny p-3 text-white shadow-lg">
              <BarChart2 className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-xl p-0">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BunnyMarket />
              <BunnyUpgrades />
            </div>
          </div>
          
          <div className="lg:col-span-1 hidden lg:block">
            <GameStats />
          </div>
        </div>
        
        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>Bunny Clicker Game - Click, Feed, Multiply!</p>
        </footer>

        <VictoryDialog />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .animate-fall {
            animation: fall 3s linear forwards;
          }
        `}} />
      </div>
    </GameProvider>
  );
};

export default Index;
