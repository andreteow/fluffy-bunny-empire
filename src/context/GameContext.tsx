import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { GameState, GameContextType, initialGameState, LeaderboardEntry } from './types';
import { formatNumber, getProgressPercentage, marketPriceMultiplier, bunnyValue as calculateBunnyValue } from './gameUtils';
import { feedBunny as feedBunnyAction, sellBunnies as sellBunniesAction, buyUpgrade as buyUpgradeAction, resetGame as resetGameAction } from './gameActions';
import { useMarketDemandCycle, useAutoFeed } from './gameEffects';
import { supabase } from "@/integrations/supabase/client";

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
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
  const { toast } = useToast();

  // Load leaderboard from Supabase
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLeaderboardLoading(true);
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('time', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform to match our LeaderboardEntry interface
          const leaderboardEntries: LeaderboardEntry[] = data.map(entry => ({
            id: entry.id,
            name: entry.name,
            time: entry.time,
            timestamp: new Date(entry.timestamp).getTime()
          }));
          
          setLeaderboard(leaderboardEntries);
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error);
        toast({
          title: "Error loading leaderboard",
          description: "There was an error loading the leaderboard data.",
          variant: "destructive",
        });
      } finally {
        setIsLeaderboardLoading(false);
      }
    };

    fetchLeaderboard();
  }, [toast]);

  // Update elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 1
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

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
    localStorage.removeItem(STORAGE_KEY);
  }, [toast]);

  // Add leaderboard entry to Supabase
  const addLeaderboardEntry = useCallback(async (name: string, time: number) => {
    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert([
          { name, time }
        ]);
      
      if (error) {
        throw error;
      }
      
      const newEntry: LeaderboardEntry = {
        name,
        time,
        timestamp: Date.now()
      };
      
      setLeaderboard(prev => [...prev, newEntry].sort((a, b) => a.time - b.time));
      
      toast({
        title: "Added to Leaderboard",
        description: `Congratulations ${name}! Your time: ${formatTime(time)}`,
      });
    } catch (error) {
      console.error('Error adding leaderboard entry:', error);
      toast({
        title: "Error",
        description: "There was an error adding your score to the leaderboard.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Format time for toast messages
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
