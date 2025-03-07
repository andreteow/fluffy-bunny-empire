
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { Clock, Zap, BarChart3 } from 'lucide-react';

const GameStats: React.FC = () => {
  const { gameState, formatNumber } = useGame();
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Update elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate goal percentage with more precision for large numbers
  const calculateGoalPercentage = () => {
    const percentage = (gameState.bunnies / 100) * 100;
    if (percentage < 0.0001) {
      return percentage.toExponential(4);
    } else if (percentage < 0.01) {
      return percentage.toFixed(6);
    } else {
      return percentage.toFixed(4);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-clay-yellow-light to-white border-0 rounded-2xl shadow-md h-full">
      <h3 className="text-2xl font-bold mb-5 text-clay-yellow-dark">Stats</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between p-2 bg-white rounded-lg shadow-sm">
          <span className="font-medium text-clay">Total feedings:</span>
          <span className="font-bold">{formatNumber(gameState.totalFeedings)}</span>
        </div>
        
        <div className="flex justify-between p-2 bg-white rounded-lg shadow-sm">
          <span className="font-medium text-clay">Bunnies:</span>
          <span className="font-bold">{formatNumber(gameState.bunnies)}</span>
        </div>
        
        <div className="flex justify-between p-2 bg-white rounded-lg shadow-sm">
          <span className="font-medium text-clay">Next multiplication at:</span>
          <span className="font-bold">{formatNumber(gameState.feedingsForNextMultiplication)} feedings</span>
        </div>
        
        <div className="flex justify-between p-2 bg-white rounded-lg shadow-sm">
          <span className="font-medium text-clay">Current money:</span>
          <span className="font-bold text-clay-green">${formatNumber(gameState.money)}</span>
        </div>
        
        <div className="flex justify-between p-2 bg-white rounded-lg shadow-sm">
          <span className="font-medium text-clay">Feeds per click:</span>
          <span className="font-bold">{gameState.feedsPerClick}</span>
        </div>
        
        <div className="flex justify-between p-2 bg-white rounded-lg shadow-sm">
          <span className="font-medium text-clay">Auto-feed rate:</span>
          <span className="font-bold">{gameState.autoFeedRate}/sec</span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
          <span className="flex items-center gap-1 font-medium text-clay">
            <Clock className="h-4 w-4 text-clay-blue" /> Elapsed time:
          </span>
          <span className="font-bold">{formatTime(elapsedTime)}</span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
          <span className="flex items-center gap-1 font-medium text-clay">
            <Zap className="h-4 w-4 text-clay-pink" /> High value chance:
          </span>
          <span className="font-bold">{(gameState.highValueChance * 100).toFixed(0)}%</span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
          <span className="flex items-center gap-1 font-medium text-clay">
            <BarChart3 className="h-4 w-4 text-clay-lavender" /> Mid value chance:
          </span>
          <span className="font-bold">{(gameState.midValueChance * 100).toFixed(0)}%</span>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="font-bold text-clay">Goal: 100 bunnies to take over the world!</p>
          <p className="text-sm mt-2 font-medium">
            {gameState.bunnies >= 100 
              ? '🎉 You did it! The world is covered in bunnies!' 
              : `${calculateGoalPercentage()}% complete`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default GameStats;
