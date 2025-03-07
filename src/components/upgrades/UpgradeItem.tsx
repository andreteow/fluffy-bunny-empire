
import React from 'react';
import { Upgrade } from '@/context/types';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UpgradeItemProps {
  upgrade: Upgrade;
  isAvailable: boolean;
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, isAvailable }) => {
  const { gameState, buyUpgrade, formatNumber } = useGame();
  
  const canAfford = gameState.money >= upgrade.cost;
  const isUnlocked = gameState.unlockedUpgrades.includes(upgrade.id);
  
  const handleBuyUpgrade = () => {
    // Create effect function based on the upgrade's category and effect
    const effectFn = () => {
      // Apply effects based on upgrade category
      if (upgrade.category === 'efficiency') {
        if (upgrade.id === 'bunny-enthusiasm') gameState.feedsPerClick += 1;
        if (upgrade.id === 'bunny-training') gameState.feedsPerClick += 2;
        if (upgrade.id === 'mega-carrots') gameState.feedsPerClick += 5;
        if (upgrade.id === 'golden-carrots') gameState.feedsPerClick += 10;
        if (upgrade.id === 'hyperspeed-nibbling') gameState.feedsPerClick += 20;
      } 
      else if (upgrade.category === 'automation') {
        if (upgrade.id === 'carrot-farming') gameState.autoFeedRate += 1;
        if (upgrade.id === 'smart-bunnies') gameState.autoFeedRate += 2;
        if (upgrade.id === 'bunny-cooperation') gameState.autoFeedRate += 5;
        if (upgrade.id === 'robo-feeders') gameState.autoFeedRate += 10;
        if (upgrade.id === 'carrot-factory') gameState.autoFeedRate += 25;
        if (upgrade.id === 'bunny-ai') gameState.autoFeedRate += 50;
        if (upgrade.id === 'self-sustaining-bunnies') gameState.autoFeedRate += 100;
      }
      else if (upgrade.category === 'market') {
        if (upgrade.id === 'cuteness-training') {
          // +10% to all rabbit sale prices
          gameState.rarityValueMultiplier *= 1.1;
        }
        if (upgrade.id === 'viral-bunny-videos') {
          // Market demand increase lasts twice as long
          gameState.marketDemandDuration = 60;
        }
        if (upgrade.id === 'luxury-pet-shops') {
          // High-value rabbits appear 15% of the time
          gameState.highValueChance = 0.15;
        }
        if (upgrade.id === 'global-bunny-craze') {
          // High demand occurs 20% of the time
          gameState.highDemandChance = 0.2;
        }
        if (upgrade.id === 'rabbit-reality-show') {
          // Mid and high-value rabbits get a 1.5x price multiplier
          gameState.rarityValueMultiplier *= 1.5;
        }
      }
      else if (upgrade.category === 'rarity') {
        if (upgrade.id === 'selective-breeding') {
          // Mid-value rabbits now appear 40% of the time
          gameState.midValueChance = 0.4;
        }
        if (upgrade.id === 'designer-rabbits') {
          // High-value rabbits now appear 20% of the time
          gameState.highValueChance = 0.2;
        }
        if (upgrade.id === 'cybernetic-bunnies') {
          // High-value rabbits always sell at 2x price
          gameState.highValueMultiplier = 2;
        }
      }
    };
    
    // Pass only the cost and effectFn to buyUpgrade
    const success = buyUpgrade(upgrade.cost, effectFn);
    
    // If purchase was successful, add the upgrade to unlockedUpgrades
    if (success && !gameState.unlockedUpgrades.includes(upgrade.id)) {
      gameState.unlockedUpgrades.push(upgrade.id);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={`w-full flex flex-col items-start justify-between px-4 py-3 border-bunny h-auto 
              ${!isAvailable || isUnlocked ? 'opacity-50' : ''}`}
            onClick={() => isAvailable && !isUnlocked && handleBuyUpgrade()}
            disabled={!isAvailable || !canAfford || isUnlocked}
          >
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-2">
                {upgrade.icon}
                <span>{upgrade.name}</span>
              </div>
              <span className="text-sm font-semibold">${formatNumber(upgrade.cost)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 truncate">{upgrade.description} {upgrade.effect}</p>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{upgrade.description} <strong>{upgrade.effect}</strong>.</p>
          {isUnlocked && (
            <p className="text-green-500 mt-1">Already purchased!</p>
          )}
          {!isAvailable && !isUnlocked && (
            <div>
              {upgrade.requiredBunnies && upgrade.requiredBunnies > gameState.bunnies && (
                <p className="text-red-500 mt-1">
                  Requires {formatNumber(upgrade.requiredBunnies)} bunnies
                </p>
              )}
              {upgrade.requiredAutoFeedRate !== undefined && 
               gameState.autoFeedRate < upgrade.requiredAutoFeedRate && (
                <p className="text-red-500 mt-1">
                  Requires auto-feed rate of {upgrade.requiredAutoFeedRate}/sec
                </p>
              )}
              {upgrade.requiredUpgrade && 
               !gameState.unlockedUpgrades.includes(upgrade.requiredUpgrade) && (
                <p className="text-red-500 mt-1">
                  Requires {upgrade.requiredUpgrade} upgrade
                </p>
              )}
            </div>
          )}
          {isAvailable && !isUnlocked && !canAfford && (
            <p className="text-red-500 mt-1">
              Not enough money (need ${formatNumber(upgrade.cost)})
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UpgradeItem;
