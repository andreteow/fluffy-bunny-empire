
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { GameState, GameContextType, initialGameState } from './types';
import { formatNumber, getProgressPercentage, marketPriceMultiplier, bunnyValue as calculateBunnyValue } from './gameUtils';
import { feedBunny as feedBunnyAction, sellBunnies as sellBunniesAction, buyUpgrade as buyUpgradeAction, resetGame as resetGameAction } from './gameActions';
import { useMarketDemandCycle, useAutoFeed } from './gameEffects';

const STORAGE_KEY = 'bunnyClickerGameState';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // Load saved game state or use initial state
  const loadSavedState = (): GameState => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Error loading saved game:', error);
    }
    return initialGameState;
  };

  const [gameState, setGameState] = useState<GameState>(loadSavedState());
  const { toast } = useToast();

  // Save game state whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [gameState]);

  const getProgressPercentageCallback = useCallback(() => {
    return getProgressPercentage(gameState.food, gameState.feedingsForNextMultiplication);
  }, [gameState.food, gameState.feedingsForNextMultiplication]);

  const marketPriceMultiplierCallback = useCallback(() => {
    return marketPriceMultiplier(gameState.marketDemand);
  }, [gameState.marketDemand]);

  const bunnyValue = useCallback((tier: 'low' | 'mid' | 'high'): number => {
    return calculateBunnyValue(tier, gameState.marketDemand);
  }, [gameState.marketDemand]);

  const feedBunny = useCallback(() => {
    feedBunnyAction(gameState, setGameState, toast, formatNumber);
  }, [gameState, toast]);

  const sellBunnies = useCallback((amount: number) => {
    sellBunniesAction(amount, gameState, setGameState, toast);
  }, [gameState, toast]);

  const buyUpgrade = useCallback((cost: number, effect: () => (gameState: GameState) => void, upgradeId?: string): boolean => {
    return buyUpgradeAction(cost, effect, gameState, setGameState, toast, upgradeId);
  }, [gameState, toast]);

  const resetGame = useCallback(() => {
    resetGameAction(initialGameState, setGameState, toast);
    // Also clear localStorage when resetting
    localStorage.removeItem(STORAGE_KEY);
  }, [toast]);

  useMarketDemandCycle(setGameState, toast);
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

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
