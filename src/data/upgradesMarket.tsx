
import React from 'react';
import { Upgrade } from '@/context/types';
import { Rabbit, Video, Gem, TrendingUp } from 'lucide-react';

export const marketUpgrades: Upgrade[] = [
  {
    id: 'cuteness-training',
    name: 'Cuteness Training',
    description: 'Rabbits learn to be even more adorable, increasing their value.',
    effect: '+10% to all rabbit sale prices',
    cost: 5000,
    icon: <Rabbit className="h-5 w-5" />,
    category: 'market',
    isAvailable: (state) => state.bunnies >= 100 && !state.unlockedUpgrades.includes('cuteness-training'),
    effectFn: function() {
      return function(gameState) {
        gameState.rarityValueMultiplier = gameState.rarityValueMultiplier * 1.1;
      };
    },
    requiredBunnies: 100,
  },
  {
    id: 'viral-bunny-videos',
    name: 'Viral Bunny Videos',
    description: 'Internet discovers the bunnies, increasing demand.',
    effect: 'Market demand increase lasts twice as long',
    cost: 20000,
    icon: <Video className="h-5 w-5" />,
    category: 'market',
    isAvailable: (state) => state.bunnies >= 250 && state.unlockedUpgrades.includes('cuteness-training'),
    effectFn: function() {
      return function(gameState) {
        gameState.marketDemandDuration = gameState.marketDemandDuration * 2;
      };
    },
    requiredBunnies: 250,
    requiredUpgrade: 'cuteness-training',
  },
  {
    id: 'luxury-pet-shops',
    name: 'Luxury Pet Shops',
    description: 'Some rabbits get sold as exclusive premium pets.',
    effect: 'High-value rabbits appear 15% of the time instead of 10%',
    cost: 100000,
    icon: <Gem className="h-5 w-5" />,
    category: 'market',
    isAvailable: (state) => state.bunnies >= 500 && state.unlockedUpgrades.includes('viral-bunny-videos'),
    effectFn: function() {
      return function(gameState) {
        gameState.highValueChance = 0.15;
      };
    },
    requiredBunnies: 500,
    requiredUpgrade: 'viral-bunny-videos',
  },
  {
    id: 'global-bunny-craze',
    name: 'Global Bunny Craze',
    description: 'Rabbits become a worldwide sensation.',
    effect: 'High demand occurs 20% of the time instead of 10%',
    cost: 500000,
    icon: <TrendingUp className="h-5 w-5" />,
    category: 'market',
    isAvailable: (state) => state.bunnies >= 1000 && state.unlockedUpgrades.includes('luxury-pet-shops'),
    effectFn: function() {
      return function(gameState) {
        gameState.highDemandChance = 0.2;
      };
    },
    requiredBunnies: 1000,
    requiredUpgrade: 'luxury-pet-shops',
  },
  {
    id: 'rabbit-reality-show',
    name: 'Rabbit Reality Show',
    description: 'A famous bunny-themed TV show drives demand.',
    effect: 'Mid and high-value rabbits get a 1.5x price multiplier',
    cost: 2500000,
    icon: <Video className="h-5 w-5" />,
    category: 'market',
    isAvailable: (state) => state.bunnies >= 5000 && state.unlockedUpgrades.includes('global-bunny-craze'),
    effectFn: function() {
      return function(gameState) {
        gameState.rarityValueMultiplier = gameState.rarityValueMultiplier * 1.5;
      };
    },
    requiredBunnies: 5000,
    requiredUpgrade: 'global-bunny-craze',
  },
];
