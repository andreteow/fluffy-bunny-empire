
import { GameState } from './types';

// Format large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

// Calculate market price multiplier based on demand
export const marketPriceMultiplier = (marketDemand: GameState['marketDemand']): number => {
  switch (marketDemand) {
    case "high": return 2;
    case "low": return 0.5;
    default: return 1;
  }
};

// Calculate bunny value based on tier and market demand
export const bunnyValue = (
  tier: 'low' | 'mid' | 'high',
  marketDemand: GameState['marketDemand']
): number => {
  const baseValue = 5; // Base value for a bunny
  let tierMultiplier = 1;
  
  switch (tier) {
    case 'mid': tierMultiplier = 1.5; break;
    case 'high': tierMultiplier = 2; break;
    default: tierMultiplier = 1;
  }
  
  return Math.floor(baseValue * tierMultiplier * marketPriceMultiplier(marketDemand));
};

// Calculate progress towards next multiplication
export const getProgressPercentage = (food: number, feedingsForNextMultiplication: number): number => {
  return (food / feedingsForNextMultiplication) * 100;
};
