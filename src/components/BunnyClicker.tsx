
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

const BunnyClicker: React.FC = () => {
  const { gameState, feedBunny, formatNumber, getProgressPercentage } = useGame();
  const [isHopping, setIsHopping] = useState(false);

  const handleClick = () => {
    feedBunny();
    setIsHopping(true);
    setTimeout(() => setIsHopping(false), 600); // Match animation duration
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 text-clay-pink-dark">
        Bunnies: {formatNumber(gameState.bunnies)}
      </h2>
      
      <Card 
        className="p-8 bg-gradient-to-br from-bunny-pink to-white border-0 rounded-2xl shadow-lg mb-6 flex flex-col items-center cursor-pointer w-full max-w-md transform transition-all duration-200 hover:shadow-xl" 
        onClick={handleClick}
      >
        <div className={`bunny-clicker ${isHopping ? 'animate-hop' : ''}`}>
          <div className="text-9xl mb-3">🐰</div>
        </div>
        <p className="text-xl font-semibold text-clay">Click to feed!</p>
        {gameState.feedsPerClick > 1 && (
          <p className="text-sm text-clay-pink-dark mt-1">+{gameState.feedsPerClick} feeds per click</p>
        )}
      </Card>
      
      <div className="w-full max-w-md">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-clay">Progress to next multiplication:</span>
          <span className="font-bold">
            {gameState.food} / {gameState.feedingsForNextMultiplication}
          </span>
        </div>
        <Progress 
          value={getProgressPercentage()} 
          className="h-4 bg-gray-100 rounded-full" 
          // Clay-inspired progress indicator
          indicatorClassName="bg-clay-green transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default BunnyClicker;
