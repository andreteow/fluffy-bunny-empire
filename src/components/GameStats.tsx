import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { Clock, Activity, Zap, BarChart3 } from 'lucide-react';

const GameStats: React.FC = () => {
  const { gameState, formatNumber } = useGame();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cps, setCps] = useState(0);
  const prevFeedingsRef = useRef(gameState.totalFeedings);
  const feedingHistoryRef = useRef<{time: number, feedings: number}[]>([]);
  
  // Update elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Calculate CPS (clicks per second) using a 2-second rolling window instead of 5
  useEffect(() => {
    // Only update when feedings change
    if (gameState.totalFeedings !== prevFeedingsRef.current) {
      const now = Date.now();
      
      // Add current data point
      feedingHistoryRef.current.push({
        time: now,
        feedings: gameState.totalFeedings
      });
      
      // Remove data points older than 2 seconds (changed from 5 seconds)
      const cutoffTime = now - 2000;
      feedingHistoryRef.current = feedingHistoryRef.current.filter(
        point => point.time >= cutoffTime
      );
      
      // Calculate CPS if we have at least 2 data points
      if (feedingHistoryRef.current.length >= 2) {
        const oldest = feedingHistoryRef.current[0];
        const newest = feedingHistoryRef.current[feedingHistoryRef.current.length - 1];
        
        const feedingsDelta = newest.feedings - oldest.feedings;
        const timeDeltaSeconds = (newest.time - oldest.time) / 1000;
        
        if (timeDeltaSeconds > 0) {
          setCps(Math.round(feedingsDelta / timeDeltaSeconds));
        }
      }
      
      prevFeedingsRef.current = gameState.totalFeedings;
    }
  }, [gameState.totalFeedings]);
  
  // Format time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate goal percentage with more precision for large numbers
  const calculateGoalPercentage = () => {
    const percentage = (gameState.bunnies / 100000000000) * 100;
    if (percentage < 0.0001) {
      return percentage.toExponential(4);
    } else if (percentage < 0.01) {
      return percentage.toFixed(6);
    } else {
      return percentage.toFixed(4);
    }
  };

  return (
    <Card className="p-4 bg-bunny-yellow bg-opacity-40 border-2 border-bunny-yellow rounded-xl h-full">
      <h3 className="text-xl font-bold mb-4">Stats</h3>
      
      <div className="space-y-2 text-sm">
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
          <span>Feeds per click:</span>
          <span className="font-semibold">{gameState.feedsPerClick}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Auto-feed rate:</span>
          <span className="font-semibold">{gameState.autoFeedRate}/sec</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> Elapsed time:
          </span>
          <span className="font-semibold">{formatTime(elapsedTime)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Activity className="h-4 w-4" /> Current CPS:
          </span>
          <span className="font-semibold">{cps}/sec</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Zap className="h-4 w-4" /> High value chance:
          </span>
          <span className="font-semibold">{(gameState.highValueChance * 100).toFixed(0)}%</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" /> Mid value chance:
          </span>
          <span className="font-semibold">{(gameState.midValueChance * 100).toFixed(0)}%</span>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        <p>Goal: 100 billion bunnies to take over the world!</p>
        <p className="text-xs mt-1">
          {gameState.bunnies >= 100000000000 
            ? '🎉 You did it! The world is covered in bunnies!' 
            : `${calculateGoalPercentage()}% complete`}
        </p>
      </div>
    </Card>
  );
};

export default GameStats;
