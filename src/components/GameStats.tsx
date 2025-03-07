
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';

const GameStats: React.FC = () => {
  const { gameState, formatNumber } = useGame();

  return (
    <Card className="p-4 bg-bunny-yellow bg-opacity-40 border-2 border-bunny-yellow rounded-xl">
      <h3 className="text-xl font-bold mb-2">Stats</h3>
      
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Total feedings:</span>
          <span className="font-semibold">{formatNumber(gameState.totalFeedings)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Bunnies:</span>
          <span className="font-semibold">{formatNumber(gameState.bunnies)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Next multiplication at:</span>
          <span className="font-semibold">{formatNumber(gameState.feedingsForNextMultiplication)} feedings</span>
        </div>
        
        <div className="flex justify-between">
          <span>Current money:</span>
          <span className="font-semibold">${formatNumber(gameState.money)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Auto-feed rate:</span>
          <span className="font-semibold">{gameState.autoFeedRate}/sec</span>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Goal: 100 billion bunnies to take over the world!</p>
        <p className="text-xs mt-1">
          {gameState.bunnies >= 100000000000 
            ? '🎉 You did it! The world is covered in bunnies!' 
            : `${((gameState.bunnies / 100000000000) * 100).toFixed(10)}% complete`}
        </p>
      </div>
    </Card>
  );
};

export default GameStats;
