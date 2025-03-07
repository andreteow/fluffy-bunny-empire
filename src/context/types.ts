
export interface GameState {
  bunnies: number;
  food: number;
  feedingsForNextMultiplication: number;
  totalFeedings: number;
  money: number;
  multiplier: number;
  marketDemand: 'low' | 'normal' | 'high';
  marketTimer: number;
  autoFeedRate: number;
  feedsPerClick: number;
  marketDemandDuration: number;
  highValueChance: number;
  midValueChance: number;
  highDemandChance: number;
  rarityValueMultiplier: number;
  highValueMultiplier: number;
  unlockedUpgrades: string[];
}

export interface GameContextType {
  gameState: GameState;
  feedBunny: () => void;
  sellBunnies: (amount: number) => void;
  buyUpgrade: (cost: number, effect: () => void, upgradeId?: string) => boolean;
  formatNumber: (num: number) => string;
  getProgressPercentage: () => number;
  marketPriceMultiplier: () => number;
  bunnyValue: (tier: 'low' | 'mid' | 'high') => number;
  resetGame: () => void;
}

export const initialGameState: GameState = {
  bunnies: 1,
  food: 0,
  feedingsForNextMultiplication: 10,
  totalFeedings: 0,
  money: 0,
  multiplier: 1,
  marketDemand: 'normal',
  marketTimer: 30,
  autoFeedRate: 0,
  feedsPerClick: 1,
  marketDemandDuration: 30,
  highValueChance: 0.1, // 10% chance for high value bunnies
  midValueChance: 0.3,  // 30% chance for mid value bunnies
  highDemandChance: 0.1, // 10% chance for high demand
  rarityValueMultiplier: 1,
  highValueMultiplier: 1,
  unlockedUpgrades: [],
};

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  effect: string;
  cost: number;
  icon: React.ReactNode;
  category: 'efficiency' | 'automation' | 'market' | 'rarity';
  isAvailable: (state: GameState) => boolean;
  effectFn: () => void;
  requiredBunnies?: number;
  requiredAutoFeedRate?: number;
  requiredUpgrade?: string;
}
