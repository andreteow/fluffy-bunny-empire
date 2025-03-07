
import { Upgrade } from '@/context/types';
import { efficiencyUpgrades } from './upgradesEfficiency';
import { automationUpgrades } from './upgradesAutomation';
import { marketUpgrades } from './upgradesMarket';
import { rarityUpgrades } from './upgradesRarity';
import { getUpgradesByCategory as getUpgradesByCategoryBase, getNextUpgradesInCategory as getNextUpgradesInCategoryBase } from './upgradesBase';

// Combine all upgrade categories
export const upgradesData: Upgrade[] = [
  ...efficiencyUpgrades,
  ...automationUpgrades,
  ...marketUpgrades,
  ...rarityUpgrades,
];

// Helper function to get upgrades by category
export const getUpgradesByCategory = (category: 'efficiency' | 'automation' | 'market' | 'rarity') => {
  return getUpgradesByCategoryBase(upgradesData, category);
};

// Helper function to get the next upgrade in a category based on current unlocked upgrades
export const getNextUpgradesInCategory = (category: 'efficiency' | 'automation' | 'market' | 'rarity', unlockedUpgrades: string[]) => {
  return getNextUpgradesInCategoryBase(upgradesData, category, unlockedUpgrades);
};
