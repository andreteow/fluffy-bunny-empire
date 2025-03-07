
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
  effect: string;
  cost: number;
  icon: React.ReactNode;
  isAvailable: (gameState: any) => boolean;
  effectFn: () => void;
  requiredBunnies: number;
  requiredAutoFeedRate?: number;
}

const BunnyUpgrades: React.FC = () => {
  const { gameState, buyUpgrade, formatNumber } = useGame();
  
  const upgrades: Upgrade[] = [
    {
      id: 'carrot-farming',
      name: 'Carrot Farming',
      description: 'Bunnies learn to grow carrots.',
      effect: '+1 auto feed per second',
      cost: 100,
      icon: <Carrot className="h-5 w-5" />,
      isAvailable: (state) => state.bunnies >= 10,
      effectFn: () => {
        // Increase auto feed rate
        gameState.autoFeedRate += 1;
      },
      requiredBunnies: 10
    },
    {
      id: 'smart-bunnies',
      name: 'Smart Bunnies',
      description: 'Bunnies develop higher intelligence.',
      effect: '+2 auto feed per second',
      cost: 500,
      icon: <Brain className="h-5 w-5" />,
      isAvailable: (state) => state.bunnies >= 50 && state.autoFeedRate >= 1,
      effectFn: () => {
        // Increase auto feed rate
        gameState.autoFeedRate += 2;
      },
      requiredBunnies: 50,
      requiredAutoFeedRate: 1
    },
    {
      id: 'robo-feeders',
      name: 'Robo-Feeders',
      description: 'Automated feeding machines.',
      effect: '+5 auto feed per second',
      cost: 2000,
      icon: <Bot className="h-5 w-5" />,
      isAvailable: (state) => state.bunnies >= 200 && state.autoFeedRate >= 3,
      effectFn: () => {
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

  const handleBuyUpgrade = (cost: number, effectFn: () => void) => {
    // Create a new function that doesn't directly mutate the state
    const safeEffectFn = () => {
      const newAutoFeedRate = gameState.autoFeedRate + (
        effectFn.toString().includes('+ 1') ? 1 : 
        effectFn.toString().includes('+ 2') ? 2 : 
        effectFn.toString().includes('+ 5') ? 5 : 0
      );
      
      return () => {
        // This properly updates the state through the context
        gameState.autoFeedRate = newAutoFeedRate;
      };
    };
    
    buyUpgrade(cost, safeEffectFn());
  };

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
                    className="w-full flex flex-col items-start justify-between px-4 py-3 border-bunny h-auto"
                    onClick={() => handleBuyUpgrade(upgrade.cost, upgrade.effectFn)}
                    disabled={gameState.money < upgrade.cost}
                  >
                    <div className="flex w-full justify-between">
                      <div className="flex items-center gap-2">
                        {upgrade.icon}
                        <span>{upgrade.name}</span>
                      </div>
                      <span className="text-sm font-semibold">${formatNumber(upgrade.cost)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{upgrade.description} {upgrade.effect}</p>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{upgrade.description} {upgrade.effect}.</p>
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
                    className="w-full flex flex-col items-start justify-between px-4 py-3 border-bunny opacity-50 h-auto"
                    disabled={true}
                  >
                    <div className="flex w-full justify-between">
                      <div className="flex items-center gap-2">
                        {nextUpgrade.icon}
                        <span>{nextUpgrade.name}</span>
                      </div>
                      <span className="text-sm font-semibold">${formatNumber(nextUpgrade.cost)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{nextUpgrade.description} {nextUpgrade.effect}</p>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{nextUpgrade.description} {nextUpgrade.effect}.</p>
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
