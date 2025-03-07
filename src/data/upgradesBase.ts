
import { Upgrade } from '@/context/types';

// Helper function to get upgrades by category
export const getUpgradesByCategory = (
  upgradesData: Upgrade[],
  category: 'efficiency' | 'automation' | 'market' | 'rarity'
) => {
  return upgradesData.filter(upgrade => upgrade.category === category);
};

// Helper function to get the next upgrade in a category based on current unlocked upgrades
export const getNextUpgradesInCategory = (
  upgradesData: Upgrade[],
  category: 'efficiency' | 'automation' | 'market' | 'rarity', 
  unlockedUpgrades: string[]
) => {
  const categoryUpgrades = getUpgradesByCategory(upgradesData, category);
  return categoryUpgrades.filter(upgrade => !unlockedUpgrades.includes(upgrade.id));
};
