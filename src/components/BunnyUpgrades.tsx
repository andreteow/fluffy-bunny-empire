
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Brain, Carrot, Bot } from 'lucide-react';

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
  isAvailable: (gameState: any) => boolean;
  effect: () => void;
  requiredBunnies: number;
  requiredAutoFeedRate?: number;
}

const BunnyUpgrades: React.FC = () => {
  const { gameState, buyUpgrade, formatNumber } = useGame();
  
  const upgrades: Upgrade[] = [
    {
      id: 'carrot-farming',
      name: 'Carrot Farming',
      description: 'Bunnies learn to grow carrots. +1 auto feed per second.',
      cost: 100,
      icon: <Carrot className="h-5 w-5" />,
      isAvailable: (state) => state.bunnies >= 10,
      effect: () => {
        // Increase auto feed rate
        gameState.autoFeedRate += 1;
      },
      requiredBunnies: 10
    },
    {
      id: 'smart-bunnies',
      name: 'Smart Bunnies',
      description: 'Bunnies develop higher intelligence. +2 auto feed per second.',
      cost: 500,
      icon: <Brain className="h-5 w-5" />,
      isAvailable: (state) => state.bunnies >= 50 && state.autoFeedRate >= 1,
      effect: () => {
        // Increase auto feed rate
        gameState.autoFeedRate += 2;
      },
      requiredBunnies: 50,
      requiredAutoFeedRate: 1
    },
    {
      id: 'robo-feeders',
      name: 'Robo-Feeders',
      description: 'Automated feeding machines. +5 auto feed per second.',
      cost: 2000,
      icon: <Bot className="h-5 w-5" />,
      isAvailable: (state) => state.bunnies >= 200 && state.autoFeedRate >= 3,
      effect: () => {
        // Increase auto feed rate
        gameState.autoFeedRate += 5;
      },
      requiredBunnies: 200,
      requiredAutoFeedRate: 3
    }
  ];

  // Get available upgrades based on bunny count
  const availableUpgrades = upgrades.filter(upgrade => {
    return gameState.bunnies >= upgrade.requiredBunnies && 
           (upgrade.requiredAutoFeedRate === undefined || 
            gameState.autoFeedRate >= upgrade.requiredAutoFeedRate);
  });

  // Get the next upgrade that's not yet available but could be soon
  const nextUpgrade = upgrades.find(upgrade => {
    return !availableUpgrades.includes(upgrade) && 
           (gameState.bunnies >= upgrade.requiredBunnies || 
            upgrade.requiredBunnies - gameState.bunnies <= 100);
  });

  return (
    <Card className="p-4 bg-bunny-green bg-opacity-40 border-2 border-bunny-green rounded-xl">
      <h3 className="text-xl font-bold mb-4">Upgrades</h3>
      
      {availableUpgrades.length === 0 && !nextUpgrade ? (
        <p className="text-center text-muted-foreground py-4">
          Get more bunnies to unlock upgrades!
        </p>
      ) : (
        <div className="space-y-3">
          {/* Show available upgrades */}
          {availableUpgrades.map((upgrade) => (
            <TooltipProvider key={upgrade.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center px-4 py-3 border-bunny"
                    onClick={() => buyUpgrade(upgrade.cost, upgrade.effect)}
                    disabled={gameState.money < upgrade.cost}
                  >
                    <div className="flex items-center gap-2">
                      {upgrade.icon}
                      <span>{upgrade.name}</span>
                    </div>
                    <span className="text-sm font-semibold">${formatNumber(upgrade.cost)}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{upgrade.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          
          {/* Show next upgrade (greyed out) */}
          {nextUpgrade && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center px-4 py-3 border-bunny opacity-50"
                    disabled={true}
                  >
                    <div className="flex items-center gap-2">
                      {nextUpgrade.icon}
                      <span>{nextUpgrade.name}</span>
                    </div>
                    <span className="text-sm font-semibold">${formatNumber(nextUpgrade.cost)}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{nextUpgrade.description}</p>
                  {nextUpgrade.requiredBunnies > gameState.bunnies && (
                    <p className="text-red-500 mt-1">
                      Requires {formatNumber(nextUpgrade.requiredBunnies)} bunnies
                    </p>
                  )}
                  {nextUpgrade.requiredAutoFeedRate !== undefined && 
                   gameState.autoFeedRate < nextUpgrade.requiredAutoFeedRate && (
                    <p className="text-red-500 mt-1">
                      Requires auto-feed rate of {nextUpgrade.requiredAutoFeedRate}/sec
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
      
      <div className="mt-4 text-sm">
        <div className="flex justify-between">
          <span>Current auto-feed rate:</span>
          <span className="font-semibold">{gameState.autoFeedRate}/sec</span>
        </div>
      </div>
    </Card>
  );
};

export default BunnyUpgrades;
