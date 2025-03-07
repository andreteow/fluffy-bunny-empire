
import { useCallback } from 'react';
import { GameState } from '../types';
import { 
  feedBunny as feedBunnyAction, 
  sellBunnies as sellBunniesAction, 
  buyUpgrade as buyUpgradeAction, 
  resetGame as resetGameAction 
} from '../gameActions';
import { ToastProps } from '@/components/ui/toast';

type ToastFunction = (props: { title: string; description: string; variant?: ToastProps['variant'] }) => void;

export const useGameActions = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  toast: ToastFunction,
  formatNumber: (num: number) => string
) => {
  const feedBunny = useCallback(() => {
    feedBunnyAction(gameState, setGameState, toast, formatNumber);
  }, [gameState, setGameState, toast, formatNumber]);

  const sellBunnies = useCallback((amount: number) => {
    sellBunniesAction(amount, gameState, setGameState, toast);
  }, [gameState, setGameState, toast]);

  const buyUpgrade = useCallback((cost: number, effect: () => (gameState: GameState) => void, upgradeId?: string): boolean => {
    return buyUpgradeAction(cost, effect, gameState, setGameState, toast, upgradeId);
  }, [gameState, setGameState, toast]);

  const resetGame = useCallback(() => {
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
      feedsPerClick: 1,
      marketDemandDuration: 30,
      highValueChance: 0.1,
      midValueChance: 0.3,
      highDemandChance: 0.1,
      rarityValueMultiplier: 1,
      highValueMultiplier: 1,
      unlockedUpgrades: [],
      elapsedTime: 0,
      bunnyTypes: {
        low: 1,
        mid: 0,
        high: 0
      }
    };
    
    resetGameAction(initialGameState, setGameState, toast);
    localStorage.removeItem('bunnyClickerGameState');
  }, [setGameState, toast]);

  return {
    feedBunny,
    sellBunnies,
    buyUpgrade,
    resetGame
  };
};
