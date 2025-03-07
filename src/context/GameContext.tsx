import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Game state interface
interface GameState {
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

// Game context interface
interface GameContextType {
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

// Initial game state
const initialGameState: GameState = {
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

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { toast } = useToast();

  // Format large numbers
  const formatNumber = (num: number): string => {
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
  const marketPriceMultiplier = (): number => {
    switch (gameState.marketDemand) {
      case 'high': return 2;
      case 'low': return 0.5;
      default: return 1;
    }
  };

  // Calculate bunny value based on tier and market demand
  const bunnyValue = (tier: 'low' | 'mid' | 'high'): number => {
    const baseValue = 5; // Base value for a bunny
    let tierMultiplier = 1;
    
    switch (tier) {
      case 'mid': tierMultiplier = 1.5; break;
      case 'high': tierMultiplier = 2; break;
      default: tierMultiplier = 1;
    }
    
    return Math.floor(baseValue * tierMultiplier * marketPriceMultiplier());
  };

  // Calculate progress towards next multiplication
  const getProgressPercentage = (): number => {
    return (gameState.food / gameState.feedingsForNextMultiplication) * 100;
  };

  // Handle feeding the bunny
  const feedBunny = () => {
    const newFood = gameState.food + 1;
    const newTotalFeedings = gameState.totalFeedings + 1;
    
    // Check if we've reached the threshold for multiplication
    if (newFood >= gameState.feedingsForNextMultiplication) {
      const newBunnies = gameState.bunnies * 2;
      const newThreshold = Math.floor(gameState.feedingsForNextMultiplication * 2.5);
      
      setGameState(prevState => ({
        ...prevState,
        bunnies: newBunnies,
        food: 0,
        feedingsForNextMultiplication: newThreshold,
        totalFeedings: newTotalFeedings,
      }));
      
      // Show multiplication notification
      toast({
        title: "Bunnies multiplied!",
        description: `Your bunnies doubled to ${formatNumber(newBunnies)}!`,
      });
    } else {
      setGameState(prevState => ({
        ...prevState,
        food: newFood,
        totalFeedings: newTotalFeedings,
      }));
    }
  };

  // Handle selling bunnies
  const sellBunnies = (amount: number) => {
    // Check for minimum 1 bunny requirement
    if (amount <= 0 || amount >= gameState.bunnies) {
      // Always keep at least 1 bunny
      if (gameState.bunnies <= 1) {
        toast({
          title: "Cannot sell bunnies",
          description: "You must keep at least 1 bunny at all times!",
          variant: "destructive",
        });
        return;
      }
      
      // If trying to sell all, adjust to sell all except one
      amount = gameState.bunnies - 1;
    }
    
    // Calculate money earned (random tier distribution)
    let moneyEarned = 0;
    for (let i = 0; i < amount; i++) {
      const rand = Math.random();
      let tier: 'low' | 'mid' | 'high' = 'low';
      
      if (rand > 0.9) {
        tier = 'high';
      } else if (rand > 0.6) {
        tier = 'mid';
      }
      
      moneyEarned += bunnyValue(tier);
    }
    
    setGameState(prevState => ({
      ...prevState,
      bunnies: prevState.bunnies - amount,
      money: prevState.money + moneyEarned,
    }));
    
    toast({
      title: `Sold ${amount} bunnies`,
      description: `Earned $${moneyEarned} from the sale!`,
    });
  };

  // Handle buying upgrades
  const buyUpgrade = (cost: number, effect: () => void): boolean => {
    if (gameState.money < cost) {
      toast({
        title: "Not enough money",
        description: `You need $${cost} to purchase this upgrade.`,
        variant: "destructive",
      });
      return false;
    }
    
    setGameState(prevState => ({
      ...prevState,
      money: prevState.money - cost,
    }));
    
    effect();
    return true;
  };

  // Reset game to initial state
  const resetGame = () => {
    setGameState(initialGameState);
    toast({
      title: "Game Reset",
      description: "Your game has been reset to the beginning.",
    });
  };

  // Market demand cycle (changes every 30 seconds)
  useEffect(() => {
    const marketInterval = setInterval(() => {
      setGameState(prevState => {
        // Update timer
        const newTimer = prevState.marketTimer > 0 ? prevState.marketTimer - 1 : 30;
        
        // If timer hit zero, change demand
        if (newTimer === 30) {
          const rand = Math.random();
          let newDemand: 'low' | 'normal' | 'high' = 'normal';
          
          if (rand < 0.1) {
            newDemand = 'high';
          } else if (rand > 0.8) {
            newDemand = 'low';
          }
          
          // Only notify if demand changed
          if (newDemand !== prevState.marketDemand) {
            toast({
              title: `Market Demand: ${newDemand.toUpperCase()}`,
              description: newDemand === 'high' 
                ? "Prices are doubled! Good time to sell!" 
                : newDemand === 'low' 
                  ? "Prices have dropped. Maybe wait to sell." 
                  : "Market has stabilized."
            });
          }
          
          return {
            ...prevState,
            marketTimer: newTimer,
            marketDemand: newDemand,
          };
        }
        
        return {
          ...prevState,
          marketTimer: newTimer,
        };
      });
    }, 1000);
    
    return () => clearInterval(marketInterval);
  }, [toast]);

  // Auto-feed mechanism
  useEffect(() => {
    if (gameState.autoFeedRate === 0) return;
    
    const autoFeedInterval = setInterval(() => {
      for (let i = 0; i < gameState.autoFeedRate; i++) {
        feedBunny();
      }
    }, 1000);
    
    return () => clearInterval(autoFeedInterval);
  }, [gameState.autoFeedRate]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        feedBunny,
        sellBunnies,
        buyUpgrade,
        formatNumber,
        getProgressPercentage,
        marketPriceMultiplier,
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
