import { GameState } from './types';
import { bunnyValue } from './gameUtils';
import { ToastProps } from '@/components/ui/toast';

type ToastFunction = (props: { title: string; description: string; variant?: ToastProps['variant'] }) => void;

export const feedBunny = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  toast: ToastFunction,
  formatNumber: (num: number) => string
) => {
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

export const sellBunnies = (
  amount: number,
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  toast: ToastFunction
) => {
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
    
    moneyEarned += bunnyValue(tier, gameState.marketDemand);
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

export const buyUpgrade = (
  cost: number,
  effect: () => void,
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  toast: ToastFunction
): boolean => {
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

export const resetGame = (
  initialState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  toast: ToastFunction
) => {
  setGameState(initialState);
  toast({
    title: "Game Reset",
    description: "Your game has been reset to the beginning.",
  });
};
