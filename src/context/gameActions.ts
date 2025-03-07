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
  // Add food based on feedsPerClick
  const newFood = gameState.food + gameState.feedsPerClick;
  const newTotalFeedings = gameState.totalFeedings + gameState.feedsPerClick;
  
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
  
  // Calculate money earned (tier distribution based on chances)
  let moneyEarned = 0;
  for (let i = 0; i < amount; i++) {
    const rand = Math.random();
    let tier: 'low' | 'mid' | 'high' = 'low';
    
    if (rand < gameState.highValueChance) {
      tier = 'high';
    } else if (rand < gameState.highValueChance + gameState.midValueChance) {
      tier = 'mid';
    }
    
    // Apply multipliers based on tier
    let value = bunnyValue(tier, gameState.marketDemand);
    
    // Apply rarity value multiplier for mid and high tiers
    if (tier === 'mid' || tier === 'high') {
      value = Math.floor(value * gameState.rarityValueMultiplier);
    }
    
    // Apply high value multiplier for high tier
    if (tier === 'high') {
      value = Math.floor(value * gameState.highValueMultiplier);
    }
    
    moneyEarned += value;
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
  toast: ToastFunction,
  upgradeId?: string
): boolean => {
  // Check if user has enough money
  if (gameState.money < cost) {
    toast({
      title: "Not enough money",
      description: `You need $${cost} to purchase this upgrade.`,
      variant: "destructive",
    });
    return false;
  }
  
  // First create a copy of the current state
  const newState = { ...gameState };
  
  // Deduct the cost of the upgrade
  newState.money = newState.money - cost;
  
  // Apply the upgrade effect by calling the function 
  // (this modifies the newState directly inside the effect function)
  effect();
  
  // Update the state with all changes
  setGameState(newState);
  
  toast({
    title: "Upgrade purchased!",
    description: "Your bunny empire grows stronger!",
  });
  
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
