
import React from 'react';
import { Upgrade } from '@/context/types';
import { Zap, Carrot, Gem, Rabbit } from 'lucide-react';

export const efficiencyUpgrades: Upgrade[] = [
  {
    id: 'bunny-enthusiasm',
    name: 'Bunny Enthusiasm',
    description: 'Bunnies get more excited about being fed.',
    effect: '+2 feeds per click',
    cost: 100,
    icon: <Zap className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => !state.unlockedUpgrades.includes('bunny-enthusiasm'),
    effectFn: function() {
      return function(gameState) {
        gameState.feedsPerClick += 2;
      };
    },
  },
  {
    id: 'bunny-training',
    name: 'Bunny Training',
    description: 'Train your bunnies to eat more efficiently.',
    effect: '+4 feeds per click',
    cost: 500,
    icon: <Zap className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => state.unlockedUpgrades.includes('bunny-enthusiasm'),
    effectFn: function() {
      return function(gameState) {
        gameState.feedsPerClick += 4;
      };
    },
  },
  {
    id: 'mega-carrots',
    name: 'Mega Carrots',
    description: 'Super-sized carrots provide more nutrition.',
    effect: '+8 feeds per click',
    cost: 1000,
    icon: <Carrot className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => state.bunnies >= 50 && state.unlockedUpgrades.includes('bunny-training'),
    effectFn: function() {
      return function(gameState) {
        gameState.feedsPerClick += 8;
      };
    },
    requiredBunnies: 50,
    requiredUpgrade: 'bunny-training',
  },
  {
    id: 'golden-carrots',
    name: 'Golden Carrots',
    description: 'Rare, high-energy carrots increase feeding efficiency.',
    effect: '+16 feeds per click',
    cost: 5000,
    icon: <Gem className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => state.bunnies >= 200 && state.unlockedUpgrades.includes('mega-carrots'),
    effectFn: function() {
      return function(gameState) {
        gameState.feedsPerClick += 16;
      };
    },
    requiredBunnies: 200,
    requiredUpgrade: 'mega-carrots',
  },
  {
    id: 'hyperspeed-nibbling',
    name: 'Hyperspeed Nibbling',
    description: 'Bunnies develop ultra-fast chewing.',
    effect: '+32 feeds per click',
    cost: 25000,
    icon: <Rabbit className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => state.bunnies >= 500 && state.unlockedUpgrades.includes('golden-carrots'),
    effectFn: function() {
      return function(gameState) {
        gameState.feedsPerClick += 32;
      };
    },
    requiredBunnies: 500,
    requiredUpgrade: 'golden-carrots',
  },
];
