
import { useCallback } from 'react';
import { GameState } from '../types';
import { getProgressPercentage, marketPriceMultiplier, bunnyValue as calculateBunnyValue } from '../gameUtils';

export const useGameCalculations = (gameState: GameState) => {
  const getProgressPercentageCallback = useCallback(() => {
    return getProgressPercentage(gameState.food, gameState.feedingsForNextMultiplication);
  }, [gameState.food, gameState.feedingsForNextMultiplication]);

  const marketPriceMultiplierCallback = useCallback(() => {
    return marketPriceMultiplier(gameState.marketDemand);
  }, [gameState.marketDemand]);

  const bunnyValue = useCallback((tier: 'low' | 'mid' | 'high'): number => {
    return calculateBunnyValue(tier, gameState.marketDemand);
  }, [gameState.marketDemand]);

  return {
    getProgressPercentageCallback,
    marketPriceMultiplierCallback,
    bunnyValue
  };
};
