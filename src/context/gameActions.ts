
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
  effect: () => (gameState: GameState) => void,
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
  
  // Create a copy of the current state to modify
  const newState = { ...gameState };
  
  // Deduct the cost of the upgrade
  newState.money = newState.money - cost;
  
  // Apply the upgrade effect by calling the function with the game state
  if (effect) {
    const effectFunction = effect();
    if (effectFunction) {
      effectFunction(newState);
    }
  }
  
  // Add the upgrade ID to unlockedUpgrades if provided
  if (upgradeId && !newState.unlockedUpgrades.includes(upgradeId)) {
    newState.unlockedUpgrades.push(upgradeId);
  }
  
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
  // Create a fresh copy of the initial state to ensure complete reset
  const freshInitialState: GameState = {
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
  };
  
  // Reset to initial state - this ensures all upgrades, effects, and counters are reset
  setGameState(freshInitialState);
  
  toast({
    title: "Game Reset",
    description: "Your game has been reset to the beginning.",
  });
};
