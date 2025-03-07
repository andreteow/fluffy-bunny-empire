
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleDollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const BunnyMarket: React.FC = () => {
  const { gameState, sellBunnies, formatNumber, bunnyValue, marketPriceMultiplier } = useGame();
  const [sellAmount, setSellAmount] = useState<number>(1);

  useEffect(() => {
    if (gameState.bunnies <= 1) {
      setSellAmount(0);
    } else if (sellAmount >= gameState.bunnies) {
      setSellAmount(gameState.bunnies - 1); // Keep at least 1 bunny
    }
  }, [gameState.bunnies, sellAmount]);

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      setSellAmount(0);
    } else {
      // Ensure we keep at least 1 bunny
      setSellAmount(Math.min(value, gameState.bunnies - 1));
    }
  };

  const handleSell = () => {
    if (sellAmount > 0) {
      sellBunnies(sellAmount);
    }
  };

  const handleQuickSell = (percentage: number) => {
    if (gameState.bunnies <= 1) return;
    
    const amount = Math.max(1, Math.floor((gameState.bunnies - 1) * (percentage / 100)));
    sellBunnies(amount);
  };

  const estimateEarnings = () => {
    const lowValue = bunnyValue('low') * sellAmount * (1 - gameState.highValueChance - gameState.midValueChance);
    const midValue = bunnyValue('mid') * sellAmount * gameState.midValueChance * gameState.rarityValueMultiplier;
    const highValue = bunnyValue('high') * sellAmount * gameState.highValueChance * gameState.rarityValueMultiplier * gameState.highValueMultiplier;
    return Math.floor(lowValue + midValue + highValue);
  };

  const getMarketIcon = () => {
    switch (gameState.marketDemand) {
      case 'high': return <TrendingUp className="h-5 w-5 text-clay-green" />;
      case 'low': return <TrendingDown className="h-5 w-5 text-clay-coral" />;
      default: return <CircleDollarSign className="h-5 w-5 text-clay-yellow" />;
    }
  };

  const getMarketStatusColor = () => {
    switch (gameState.marketDemand) {
      case 'high': return 'text-clay-green';
      case 'low': return 'text-clay-coral';
      default: return 'text-clay-yellow';
    }
  };

  const canSell = gameState.bunnies > 1 && sellAmount > 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-clay-blue-light to-white border-0 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-bold text-clay-blue-dark">Bunny Market</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm">
          <span className={`font-semibold ${getMarketStatusColor()}`}>
            {gameState.marketDemand.toUpperCase()} DEMAND
          </span>
          {getMarketIcon()}
          <span className="text-sm font-medium">
            {gameState.marketTimer}s
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Current balance:</span>
          <span className="font-bold text-clay">${formatNumber(gameState.money)}</span>
        </div>
        
        <div className="flex justify-between text-sm mb-3">
          <span className="font-medium">Price multiplier:</span>
          <span className={`font-bold ${getMarketStatusColor()}`}>
            ×{marketPriceMultiplier()}
          </span>
        </div>
        
        {gameState.bunnies <= 1 ? (
          <div className="p-4 mb-4 bg-clay-yellow-light border-l-4 border-clay-yellow rounded-r-md text-sm text-clay">
            You must keep at least 1 bunny at all times! Get more bunnies to sell.
          </div>
        ) : (
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="sellAmount" className="font-medium mb-1.5">Amount to sell:</Label>
              <Input
                id="sellAmount"
                type="number"
                min={0}
                max={gameState.bunnies - 1}
                value={sellAmount}
                onChange={handleSellAmountChange}
                className="bg-white border-clay-blue-light focus:border-clay-blue focus:ring-clay-blue-light"
              />
            </div>
            <div className="flex-1">
              <Label className="font-medium mb-1.5">Estimated earnings:</Label>
              <div className="h-10 flex items-center font-bold text-clay-blue">
                ${formatNumber(estimateEarnings())}
              </div>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleSell} 
          className="w-full mb-3 bg-clay-blue hover:bg-clay-blue-dark clay-btn"
          disabled={!canSell}
        >
          Sell {sellAmount} {sellAmount === 1 ? 'Bunny' : 'Bunnies'}
        </Button>
        
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleQuickSell(10)}
            disabled={gameState.bunnies <= 1}
            className="text-xs border-clay-blue-light text-clay-blue hover:bg-clay-blue-light hover:text-white"
          >
            Sell 10%
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleQuickSell(50)}
            disabled={gameState.bunnies <= 1}
            className="text-xs border-clay-blue-light text-clay-blue hover:bg-clay-blue-light hover:text-white"
          >
            Sell 50%
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleQuickSell(100)}
            disabled={gameState.bunnies <= 1}
            className="text-xs border-clay-blue-light text-clay-blue hover:bg-clay-blue-light hover:text-white"
          >
            Sell All*
          </Button>
        </div>
        {gameState.bunnies > 1 && (
          <p className="text-xs text-gray-500 mt-1">*Keeps 1 bunny minimum</p>
        )}
      </div>
    </Card>
  );
};

export default BunnyMarket;
