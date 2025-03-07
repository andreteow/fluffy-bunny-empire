
import React, { useContext } from 'react';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { Clock, Zap, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const GameStats: React.FC = () => {
  const { gameState, formatNumber } = useGame();
  
  // Format time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate goal percentage - 10,000 bunnies to win
  const calculateGoalPercentage = () => {
    return Math.min(100, (gameState.bunnies / 10000) * 100);
  };

  return (
    <Card className="p-6 bg-white border-0 rounded-2xl shadow-sm h-full">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Stats</h3>
      
      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total feedings</span>
          <span className="font-medium text-gray-800">{formatNumber(gameState.totalFeedings)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Bunnies</span>
          <span className="font-medium text-gray-800">{formatNumber(gameState.bunnies)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Bunny types</span>
          <span className="font-medium text-gray-800">
            B: {formatNumber(gameState.bunnyTypes.low)}, 
            Q: {formatNumber(gameState.bunnyTypes.mid)}, 
            P: {formatNumber(gameState.bunnyTypes.high)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Next breeding</span>
          <span className="font-medium text-gray-800">{formatNumber(gameState.feedingsForNextMultiplication)} feedings</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Current money</span>
          <span className="font-medium text-gray-800">${formatNumber(gameState.money)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Feeds per click</span>
          <span className="font-medium text-gray-800">{gameState.feedsPerClick}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Auto-feed rate</span>
          <span className="font-medium text-gray-800">{gameState.autoFeedRate}/sec</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Elapsed time</span>
          <span className="font-medium text-gray-800">{formatTime(gameState.elapsedTime)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">High value chance</span>
          <span className="font-medium text-gray-800">{(gameState.highValueChance * 100).toFixed(0)}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Mid value chance</span>
          <span className="font-medium text-gray-800">{(gameState.midValueChance * 100).toFixed(0)}%</span>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Goal Progress</span>
            <span className="text-gray-600">{calculateGoalPercentage().toFixed(0)}%</span>
          </div>
          <Progress 
            value={calculateGoalPercentage()} 
            className="h-2 bg-gray-100" 
            indicatorClassName="bg-gray-800"
          />
          <p className="text-xs text-gray-500 mt-1">
            {gameState.bunnies >= 10000 
              ? 'You did it! You\'ve won the game!' 
              : `${formatNumber(10000 - gameState.bunnies)} more bunnies to win the game`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default GameStats;
