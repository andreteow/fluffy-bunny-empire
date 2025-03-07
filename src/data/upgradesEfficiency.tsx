
import React from 'react';
import { Upgrade } from '@/context/types';
import { Carrot, Rabbit, Gem } from 'lucide-react';

export const efficiencyUpgrades: Upgrade[] = [
  {
    id: 'bunny-enthusiasm',
    name: 'Bunny Enthusiasm',
    description: 'Bunnies get extra excited when fed!',
    effect: '+1 feed per click',
    cost: 50,
    icon: <Rabbit className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => state.bunnies >= 5 && !state.unlockedUpgrades.includes('bunny-enthusiasm'),
    effectFn: () => {},
    requiredBunnies: 5,
  },
  {
    id: 'bunny-training',
    name: 'Bunny Training',
    description: 'Rabbits learn to eat faster.',
    effect: '+2 feeds per click',
    cost: 250,
    icon: <Rabbit className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => state.bunnies >= 20 && state.unlockedUpgrades.includes('bunny-enthusiasm'),
    effectFn: () => {},
    requiredBunnies: 20,
    requiredUpgrade: 'bunny-enthusiasm',
  },
  {
    id: 'mega-carrots',
    name: 'Mega Carrots',
    description: 'Super-sized carrots provide more nutrition.',
    effect: '+5 feeds per click',
    cost: 1000,
    icon: <Carrot className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => state.bunnies >= 50 && state.unlockedUpgrades.includes('bunny-training'),
    effectFn: () => {},
    requiredBunnies: 50,
    requiredUpgrade: 'bunny-training',
  },
  {
    id: 'golden-carrots',
    name: 'Golden Carrots',
    description: 'Rare, high-energy carrots increase feeding efficiency.',
    effect: '+10 feeds per click',
    cost: 5000,
    icon: <Gem className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => state.bunnies >= 200 && state.unlockedUpgrades.includes('mega-carrots'),
    effectFn: () => {},
    requiredBunnies: 200,
    requiredUpgrade: 'mega-carrots',
  },
  {
    id: 'hyperspeed-nibbling',
    name: 'Hyperspeed Nibbling',
    description: 'Bunnies develop ultra-fast chewing.',
    effect: '+20 feeds per click',
    cost: 25000,
    icon: <Rabbit className="h-5 w-5" />,
    category: 'efficiency',
    isAvailable: (state) => state.bunnies >= 500 && state.unlockedUpgrades.includes('golden-carrots'),
    effectFn: () => {},
    requiredBunnies: 500,
    requiredUpgrade: 'golden-carrots',
  },
];
