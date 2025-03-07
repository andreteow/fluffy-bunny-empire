
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
}

export interface GameContextType {
  gameState: GameState;
  feedBunny: () => void;
  sellBunnies: (amount: number) => void;
  buyUpgrade: (cost: number, effect: () => void) => boolean;
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
};
