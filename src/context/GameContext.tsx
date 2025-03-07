
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { GameState, GameContextType, initialGameState } from './types';
import { formatNumber, getProgressPercentage, marketPriceMultiplier, bunnyValue as calculateBunnyValue } from './gameUtils';
import { feedBunny as feedBunnyAction, sellBunnies as sellBunniesAction, buyUpgrade as buyUpgradeAction, resetGame as resetGameAction } from './gameActions';
import { useMarketDemandCycle, useAutoFeed } from './gameEffects';

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { toast } = useToast();

  // Memoize functions to prevent unnecessary re-renders
  const getProgressPercentageCallback = useCallback(() => {
    return getProgressPercentage(gameState.food, gameState.feedingsForNextMultiplication);
  }, [gameState.food, gameState.feedingsForNextMultiplication]);

  const marketPriceMultiplierCallback = useCallback(() => {
    return marketPriceMultiplier(gameState.marketDemand);
  }, [gameState.marketDemand]);

  const bunnyValue = useCallback((tier: 'low' | 'mid' | 'high'): number => {
    return calculateBunnyValue(tier, gameState.marketDemand);
  }, [gameState.marketDemand]);

  // Game actions
  const feedBunny = useCallback(() => {
    feedBunnyAction(gameState, setGameState, toast, formatNumber);
  }, [gameState, toast]);

  const sellBunnies = useCallback((amount: number) => {
    sellBunniesAction(amount, gameState, setGameState, toast);
  }, [gameState, toast]);

  const buyUpgrade = useCallback((cost: number, effect: () => void): boolean => {
    return buyUpgradeAction(cost, effect, gameState, setGameState, toast);
  }, [gameState, toast]);

  const resetGame = useCallback(() => {
    resetGameAction(initialGameState, setGameState, toast);
  }, [toast]);

  // Set up market demand cycle
  useMarketDemandCycle(setGameState, toast);

  // Set up auto-feed mechanism
  useAutoFeed(gameState, feedBunny);

  return (
    <GameContext.Provider
      value={{
        gameState,
        feedBunny,
        sellBunnies,
        buyUpgrade,
        formatNumber,
        getProgressPercentage: getProgressPercentageCallback,
        marketPriceMultiplier: marketPriceMultiplierCallback,
        bunnyValue,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for using game context
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
