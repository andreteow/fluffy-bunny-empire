
import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Trophy } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Enhanced confetti animation with Clay colors
const Confetti: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor: ['#FF80AB', '#4CAF50', '#29B6F6', '#FFEE58', '#FFB74D', '#B39DDB', '#4DB6AC'][Math.floor(Math.random() * 7)],
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `fall ${Math.random() * 3 + 2}s linear forwards, spin ${Math.random() * 2 + 1}s linear infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

const VictoryDialog: React.FC = () => {
  const { gameState, addLeaderboardEntry, resetGame } = useGame();
  const [open, setOpen] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check for victory condition - 10,000 bunnies instead of 10
    if (gameState.bunnies >= 10000 && !hasSubmitted) {
      setOpen(true);
    }
  }, [gameState.bunnies, hasSubmitted]);

  const handleNameSubmit = async () => {
    // Don't allow empty names
    if (!playerName.trim()) return;
    
    try {
      setIsSubmitting(true);
      // Add to leaderboard
      await addLeaderboardEntry(playerName, gameState.elapsedTime);
      setHasSubmitted(true);
      setOpen(false);
      resetGame(); // Reset the game after submitting score
    } catch (error) {
      console.error('Error submitting score:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinuePlaying = () => {
    // Reset the game when the player chooses to continue without adding to leaderboard
    setHasSubmitted(true);
    setOpen(false);
    resetGame();
  };

  return (
    <Dialog open={open} onOpenChange={(value) => {
      // Only allow closing via buttons
      if (!value) return;
      setOpen(value);
    }}>
      <DialogContent className="sm:max-w-md border-0 rounded-2xl shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-center gap-3 text-gray-800">
            <Trophy className="h-6 w-6 text-amber-500" />
            Congratulations!
            <PartyPopper className="h-6 w-6 text-amber-500" />
          </DialogTitle>
          <DialogDescription className="text-center text-base font-medium text-gray-600">
            You've reached 10,000 bunnies and won the game!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center p-6">
          <div className="text-6xl mb-5">🐰🏆🐰</div>
          <p className="text-center text-base mb-6 text-gray-600">
            Your time: {formatTime(gameState.elapsedTime)}
          </p>
          
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playerName" className="text-gray-700">Your Name</Label>
              <Input 
                id="playerName" 
                placeholder="Enter your name" 
                value={playerName} 
                onChange={(e) => setPlayerName(e.target.value)}
                className="border-gray-200"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
                onClick={handleNameSubmit}
                disabled={!playerName.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loader mr-2"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <Trophy className="mr-2 h-4 w-4" />
                    Add to Leaderboard
                  </>
                )}
              </Button>
              
              <Button 
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700" 
                variant="outline"
                onClick={handleContinuePlaying}
                disabled={isSubmitting}
              >
                Continue Playing
              </Button>
            </div>
          </div>
        </div>

        {open && <Confetti />}
      </DialogContent>
    </Dialog>
  );
};

// Format time as HH:MM:SS
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default VictoryDialog;
