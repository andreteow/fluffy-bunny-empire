
import React from 'react';
import { Upgrade } from '@/context/types';
import { Dna, Bot } from 'lucide-react';

export const rarityUpgrades: Upgrade[] = [
  {
    id: 'selective-breeding',
    name: 'Selective Breeding',
    description: 'Bunnies develop better genetics.',
    effect: 'Mid-value rabbits now appear 40% of the time instead of 30%',
    cost: 50000,
    icon: <Dna className="h-5 w-5" />,
    category: 'rarity',
    isAvailable: (state) => state.bunnies >= 300 && !state.unlockedUpgrades.includes('selective-breeding'),
    effectFn: function() {
      return function(gameState) {
        gameState.midValueChance = 0.4;
      };
    },
    requiredBunnies: 300,
  },
  {
    id: 'designer-rabbits',
    name: 'Designer Rabbits',
    description: 'Genetic modifications make ultra-premium rabbits.',
    effect: 'High-value rabbits now appear 20% of the time',
    cost: 250000,
    icon: <Dna className="h-5 w-5" />,
    category: 'rarity',
    isAvailable: (state) => state.bunnies >= 1000 && state.unlockedUpgrades.includes('selective-breeding'),
    effectFn: function() {
      return function(gameState) {
        gameState.highValueChance = 0.2;
      };
    },
    requiredBunnies: 1000,
    requiredUpgrade: 'selective-breeding',
  },
  {
    id: 'cybernetic-bunnies',
    name: 'Cybernetic Bunnies',
    description: 'Advanced cybernetic enhancements create super rabbits.',
    effect: 'High-value rabbits always sell at 2x price',
    cost: 1000000,
    icon: <Bot className="h-5 w-5" />,
    category: 'rarity',
    isAvailable: (state) => state.bunnies >= 10000 && state.unlockedUpgrades.includes('designer-rabbits'),
    effectFn: function() {
      return function(gameState) {
        gameState.highValueMultiplier = 2;
      };
    },
    requiredBunnies: 10000,
    requiredUpgrade: 'designer-rabbits',
  },
];
