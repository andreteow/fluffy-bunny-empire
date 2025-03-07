
import { useGame } from '@/context/GameContext';
import { Upgrade } from '@/context/types';
import { getUpgradesByCategory } from '@/data/upgradesData';

export type UpgradeCategory = 'efficiency' | 'automation' | 'market' | 'rarity';

export const useUpgrades = (activeTab: UpgradeCategory) => {
  const { gameState } = useGame();
  
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

  return {
    availableUpgrades,
    upcomingUpgrades,
    getCategoryStats,
  };
};
