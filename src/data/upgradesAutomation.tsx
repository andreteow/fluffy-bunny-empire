
import React from 'react';
import { Upgrade } from '@/context/types';
import { Carrot, Brain, Bot, Rabbit } from 'lucide-react';

export const automationUpgrades: Upgrade[] = [
  {
    id: 'carrot-farming',
    name: 'Carrot Farming',
    description: 'Bunnies learn to grow their own carrots.',
    effect: '+1 auto feed per second',
    cost: 100,
    icon: <Carrot className="h-5 w-5" />,
    category: 'automation',
    isAvailable: (state) => state.bunnies >= 10 && !state.unlockedUpgrades.includes('carrot-farming'),
    effectFn: function() {
      return function(gameState) {
        gameState.autoFeedRate += 1;
      };
    },
    requiredBunnies: 10,
  },
  {
    id: 'smart-bunnies',
    name: 'Smart Bunnies',
    description: 'Bunnies develop higher intelligence.',
    effect: '+2 auto feeds per second',
    cost: 500,
    icon: <Brain className="h-5 w-5" />,
    category: 'automation',
    isAvailable: (state) => state.bunnies >= 50 && state.autoFeedRate >= 1 && state.unlockedUpgrades.includes('carrot-farming'),
    effectFn: function() {
      return function(gameState) {
        gameState.autoFeedRate += 2;
      };
    },
    requiredBunnies: 50,
    requiredAutoFeedRate: 1,
    requiredUpgrade: 'carrot-farming',
  },
  {
    id: 'bunny-cooperation',
    name: 'Bunny Cooperation',
    description: 'Rabbits work together to feed each other.',
    effect: '+5 auto feeds per second',
    cost: 2000,
    icon: <Rabbit className="h-5 w-5" />,
    category: 'automation',
    isAvailable: (state) => state.bunnies >= 100 && state.autoFeedRate >= 3 && state.unlockedUpgrades.includes('smart-bunnies'),
    effectFn: function() {
      return function(gameState) {
        gameState.autoFeedRate += 5;
      };
    },
    requiredBunnies: 100,
    requiredAutoFeedRate: 3,
    requiredUpgrade: 'smart-bunnies',
  },
  {
    id: 'robo-feeders',
    name: 'Robo-Feeders',
    description: 'Automated feeding machines.',
    effect: '+10 auto feeds per second',
    cost: 10000,
    icon: <Bot className="h-5 w-5" />,
    category: 'automation',
    isAvailable: (state) => state.bunnies >= 200 && state.autoFeedRate >= 8 && state.unlockedUpgrades.includes('bunny-cooperation'),
    effectFn: function() {
      return function(gameState) {
        gameState.autoFeedRate += 10;
      };
    },
    requiredBunnies: 200,
    requiredAutoFeedRate: 8,
    requiredUpgrade: 'bunny-cooperation',
  },
  {
    id: 'carrot-factory',
    name: 'Carrot Factory',
    description: 'Industrial-scale carrot farming begins.',
    effect: '+25 auto feeds per second',
    cost: 50000,
    icon: <Carrot className="h-5 w-5" />,
    category: 'automation',
    isAvailable: (state) => state.bunnies >= 500 && state.autoFeedRate >= 18 && state.unlockedUpgrades.includes('robo-feeders'),
    effectFn: function() {
      return function(gameState) {
        gameState.autoFeedRate += 25;
      };
    },
    requiredBunnies: 500,
    requiredAutoFeedRate: 18,
    requiredUpgrade: 'robo-feeders',
  },
  {
    id: 'bunny-ai',
    name: 'Bunny AI',
    description: 'AI-driven carrot distribution system optimizes feeding.',
    effect: '+50 auto feeds per second',
    cost: 250000,
    icon: <Brain className="h-5 w-5" />,
    category: 'automation',
    isAvailable: (state) => state.bunnies >= 1000 && state.autoFeedRate >= 43 && state.unlockedUpgrades.includes('carrot-factory'),
    effectFn: function() {
      return function(gameState) {
        gameState.autoFeedRate += 50;
      };
    },
    requiredBunnies: 1000,
    requiredAutoFeedRate: 43,
    requiredUpgrade: 'carrot-factory',
  },
  {
    id: 'self-sustaining-bunnies',
    name: 'Self-Sustaining Bunnies',
    description: 'Rabbits achieve total independence.',
    effect: '+100 auto feeds per second',
    cost: 1000000,
    icon: <Rabbit className="h-5 w-5" />,
    category: 'automation',
    isAvailable: (state) => state.bunnies >= 5000 && state.autoFeedRate >= 93 && state.unlockedUpgrades.includes('bunny-ai'),
    effectFn: function() {
      return function(gameState) {
        gameState.autoFeedRate += 100;
      };
    },
    requiredBunnies: 5000,
    requiredAutoFeedRate: 93,
    requiredUpgrade: 'bunny-ai',
  },
];
