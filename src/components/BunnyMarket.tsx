
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleDollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const BunnyMarket: React.FC = () => {
  const { gameState, sellBunnies, formatNumber, bunnyValue, marketPriceMultiplier } = useGame();
  const [sellAmount, setSellAmount] = useState<number>(1);

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSellAmount(isNaN(value) || value < 1 ? 1 : Math.min(value, gameState.bunnies));
  };

  const handleSell = () => {
    sellBunnies(sellAmount);
  };

  const handleQuickSell = (percentage: number) => {
    const amount = Math.max(1, Math.floor(gameState.bunnies * (percentage / 100)));
    sellBunnies(amount);
  };

  // Calculate estimated earnings
  const estimateEarnings = () => {
    const lowValue = bunnyValue('low') * sellAmount * 0.6;
    const midValue = bunnyValue('mid') * sellAmount * 0.3;
    const highValue = bunnyValue('high') * sellAmount * 0.1;
    return Math.floor(lowValue + midValue + highValue);
  };

  // Return market status icon
  const getMarketIcon = () => {
    switch (gameState.marketDemand) {
      case 'high': return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'low': return <TrendingDown className="h-5 w-5 text-red-500" />;
      default: return <CircleDollarSign className="h-5 w-5 text-yellow-500" />;
    }
  };

  // Get market status color
  const getMarketStatusColor = () => {
    switch (gameState.marketDemand) {
      case 'high': return 'text-green-500';
      case 'low': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <Card className="p-4 bg-bunny-blue bg-opacity-40 border-2 border-bunny-blue rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Bunny Market</h3>
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${getMarketStatusColor()}`}>
            {gameState.marketDemand.toUpperCase()} DEMAND
          </span>
          {getMarketIcon()}
          <span className="text-sm">
            {gameState.marketTimer}s
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Current balance:</span>
          <span className="font-semibold">${formatNumber(gameState.money)}</span>
        </div>
        
        <div className="flex justify-between text-sm mb-3">
          <span>Price multiplier:</span>
          <span className={`font-semibold ${getMarketStatusColor()}`}>
            ×{marketPriceMultiplier()}
          </span>
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Label htmlFor="sellAmount">Amount to sell:</Label>
            <Input
              id="sellAmount"
              type="number"
              min={1}
              max={gameState.bunnies}
              value={sellAmount}
              onChange={handleSellAmountChange}
              className="bg-white"
            />
          </div>
          <div className="flex-1">
            <Label>Estimated earnings:</Label>
            <div className="h-10 flex items-center font-semibold">
              ${formatNumber(estimateEarnings())}
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleSell} 
          className="w-full mb-2 bg-bunny hover:bg-bunny-dark"
          disabled={gameState.bunnies < 1}
        >
          Sell {sellAmount} {sellAmount === 1 ? 'Bunny' : 'Bunnies'}
        </Button>
        
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleQuickSell(10)}
            disabled={gameState.bunnies < 10}
            className="text-xs"
          >
            Sell 10%
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleQuickSell(50)}
            disabled={gameState.bunnies < 2}
            className="text-xs"
          >
            Sell 50%
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleQuickSell(100)}
            disabled={gameState.bunnies < 1}
            className="text-xs"
          >
            Sell All
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BunnyMarket;
