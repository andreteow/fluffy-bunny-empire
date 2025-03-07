
import React, { useState, useCallback, ReactNode, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { GameState, initialGameState, LeaderboardEntry } from './types';
import { formatNumber } from './gameUtils';
import { useMarketDemandCycle, useAutoFeed } from './gameEffects';
import { supabase } from "@/integrations/supabase/client";
import { GameContext } from './GameContext';
import { useGameActions } from './hooks/useGameActions';
import { useGameCalculations } from './hooks/useGameCalculations';
import { useLeaderboard } from './hooks/useLeaderboard';

const STORAGE_KEY = 'bunnyClickerGameState';

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

  // Get leaderboard functionality
  const { 
    leaderboard, 
    isLeaderboardLoading, 
    addLeaderboardEntry 
  } = useLeaderboard(toast);

  // Update elapsed time only if the game has started (totalFeedings > 0)
  useEffect(() => {
    // Only start the timer if the user has made at least one feeding
    if (gameState.totalFeedings > 0) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          elapsedTime: prev.elapsedTime + 1
        }));
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameState.totalFeedings]);

  // Save game state whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [gameState]);

  // Get game calculation functions
  const { 
    getProgressPercentageCallback,
    marketPriceMultiplierCallback,
    bunnyValue
  } = useGameCalculations(gameState);

  // Get game action functions
  const { 
    feedBunny,
    sellBunnies,
    buyUpgrade,
    resetGame
  } = useGameActions(gameState, setGameState, toast, formatNumber);

  // Setup effects for market demand cycle and auto-feeding
  useMarketDemandCycle(setGameState, toast);
  useAutoFeed(gameState, feedBunny);

  return (
    <GameContext.Provider
      value={{
        gameState,
        leaderboard,
        feedBunny,
        sellBunnies,
        buyUpgrade,
        formatNumber,
        getProgressPercentage: getProgressPercentageCallback,
        marketPriceMultiplier: marketPriceMultiplierCallback,
        bunnyValue,
        resetGame,
        addLeaderboardEntry,
        isLeaderboardLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
