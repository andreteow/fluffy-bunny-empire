
import React from 'react';
import { GameState } from './types';
import { feedBunny } from './gameActions';
import { formatNumber } from './gameUtils';
import { ToastProps } from '@/components/ui/toast';

type ToastFunction = (props: { title: string; description: string; variant?: ToastProps['variant'] }) => void;

// Hook for market demand cycle
export const useMarketDemandCycle = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  toast: ToastFunction
) => {
  React.useEffect(() => {
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
  }, [toast, setGameState]);
};

// Hook for auto-feed mechanism
export const useAutoFeed = (
  gameState: GameState,
  feedBunnyAction: () => void
) => {
  React.useEffect(() => {
    if (gameState.autoFeedRate === 0) return;
    
    const autoFeedInterval = setInterval(() => {
      for (let i = 0; i < gameState.autoFeedRate; i++) {
        feedBunnyAction();
      }
    }, 1000);
    
    return () => clearInterval(autoFeedInterval);
  }, [gameState.autoFeedRate, feedBunnyAction]);
};
