import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { upgradesData, getUpgradesByCategory } from '@/data/upgradesData';
import { Upgrade } from '@/context/types';

const BunnyUpgrades: React.FC = () => {
  const { gameState, buyUpgrade, formatNumber } = useGame();
  const [activeTab, setActiveTab] = useState<'efficiency' | 'automation' | 'market' | 'rarity'>('efficiency');
  
  // Get upgrades for the current active tab
  const categoryUpgrades = getUpgradesByCategory(activeTab);
  
  // Filter to get available upgrades that meet requirements
  const availableUpgrades = categoryUpgrades.filter(upgrade => 
    upgrade.isAvailable(gameState)
  );
  
  // Get the next upgrade that's not yet available but could be soon
  const upcomingUpgrades = categoryUpgrades.filter(upgrade => 
    !upgrade.isAvailable(gameState) && 
    !gameState.unlockedUpgrades.includes(upgrade.id)
  );
  
  const handleBuyUpgrade = (upgrade: Upgrade) => {
    // Create effect function based on the upgrade's category and effect
    const safeEffectFn = () => {
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
    
    buyUpgrade(upgrade.cost, safeEffectFn);
  };

  // Helper function to render upgrade buttons
  const renderUpgradeButton = (upgrade: Upgrade, isAvailable: boolean) => {
    const canAfford = gameState.money >= upgrade.cost;
    const isUnlocked = gameState.unlockedUpgrades.includes(upgrade.id);
    
    return (
      <TooltipProvider key={upgrade.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`w-full flex flex-col items-start justify-between px-4 py-3 border-bunny h-auto 
                ${!isAvailable || isUnlocked ? 'opacity-50' : ''}`}
              onClick={() => isAvailable && !isUnlocked && handleBuyUpgrade(upgrade)}
              disabled={!isAvailable || !canAfford || isUnlocked}
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
                    Requires {upgradesData.find(u => u.id === upgrade.requiredUpgrade)?.name} upgrade
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

  const getCategoryStats = () => {
    switch(activeTab) {
      case 'efficiency':
        return `Current feeds per click: ${gameState.feedsPerClick}`;
      case 'automation':
        return `Current auto-feed rate: ${gameState.autoFeedRate}/sec`;
      case 'market':
        return `Market demand interval: ${gameState.marketDemandDuration}s`;
      case 'rarity':
        return `High value chance: ${(gameState.highValueChance * 100).toFixed(0)}%, Mid value chance: ${(gameState.midValueChance * 100).toFixed(0)}%`;
      default:
        return '';
    }
  };

  return (
    <Card className="p-4 bg-bunny-green bg-opacity-40 border-2 border-bunny-green rounded-xl">
      <h3 className="text-xl font-bold mb-4">Upgrades</h3>
      
      <Tabs defaultValue="efficiency" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="efficiency">Feeding</TabsTrigger>
          <TabsTrigger value="automation">Auto</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="rarity">Rarity</TabsTrigger>
        </TabsList>
        
        {['efficiency', 'automation', 'market', 'rarity'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-3">
            {availableUpgrades.length === 0 && upcomingUpgrades.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Get more bunnies to unlock upgrades!
              </p>
            ) : (
              <div className="space-y-3">
                {/* Show available upgrades */}
                {availableUpgrades.filter(u => !gameState.unlockedUpgrades.includes(u.id)).map((upgrade) => (
                  renderUpgradeButton(upgrade, true)
                ))}
                
                {/* Show upcoming upgrades (greyed out) */}
                {upcomingUpgrades.slice(0, 3).map((upgrade) => (
                  renderUpgradeButton(upgrade, false)
                ))}
                
                {/* Show already purchased upgrades */}
                {availableUpgrades.filter(u => gameState.unlockedUpgrades.includes(u.id)).map((upgrade) => (
                  renderUpgradeButton(upgrade, false)
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-4 text-sm">
        <div className="flex justify-between">
          <span>{getCategoryStats()}</span>
        </div>
      </div>
    </Card>
  );
};

export default BunnyUpgrades;
