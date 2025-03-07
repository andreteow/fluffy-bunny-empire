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
    const success = buyUpgrade(upgrade.cost, upgrade.effectFn, upgrade.id);
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
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 text-left w-full truncate whitespace-normal">{upgrade.description} {upgrade.effect}</p>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{upgrade.description} <strong>{upgrade.effect}</strong>.</p>
          {isUnlocked && (
            <p className="text-green-500 mt-1">Already purchased!</p>
          )}
          {!isAvailable && !isUnlocked && !canAfford && (
            <p className="text-red-500 mt-1">
              Not enough money (need ${formatNumber(upgrade.cost)})
            </p>
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
