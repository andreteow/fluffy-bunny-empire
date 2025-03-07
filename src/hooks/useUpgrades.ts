
import { useGame } from '@/context/GameContext';
import { Upgrade } from '@/context/types';
import { getUpgradesByCategory } from '@/data/upgradesData';

export type UpgradeCategory = 'efficiency' | 'automation' | 'market' | 'rarity';

export const useUpgrades = (activeTab: UpgradeCategory) => {
  const { gameState } = useGame();
  
  // Get all upgrades for the current active tab
  const categoryUpgrades = getUpgradesByCategory(activeTab);
  
  // Treat all upgrades as available, only filtering out ones that are already unlocked
  // We're removing the isAvailable check to make all upgrades purchasable regardless of bunny count
  const availableUpgrades = categoryUpgrades.filter(upgrade => 
    !gameState.unlockedUpgrades.includes(upgrade.id)
  );
  
  // There are no "upcoming" upgrades anymore since all are treated as available
  const upcomingUpgrades: Upgrade[] = [];

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
