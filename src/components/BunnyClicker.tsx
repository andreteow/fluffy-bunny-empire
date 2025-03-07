
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
      <h2 className="text-2xl font-bold mb-2">
        Bunnies: {formatNumber(gameState.bunnies)}
      </h2>
      
      <Card className="p-6 bg-bunny-pink bg-opacity-40 border-4 border-bunny-pink rounded-3xl shadow-lg mb-4 flex flex-col items-center">
        <div 
          className={`bunny-clicker cursor-pointer ${isHopping ? 'animate-hop' : ''}`}
          onClick={handleClick}
        >
          <div className="text-8xl mb-2">🐰</div>
        </div>
        <p className="text-lg font-semibold">Click to feed!</p>
      </Card>
      
      <div className="w-full max-w-md">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress to next multiplication:</span>
          <span>
            {gameState.food} / {gameState.feedingsForNextMultiplication}
          </span>
        </div>
        <Progress value={getProgressPercentage()} className="h-3 bg-bunny-gray" />
      </div>
    </div>
  );
};

export default BunnyClicker;
