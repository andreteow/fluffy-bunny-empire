
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Trophy } from 'lucide-react';

// Simple confetti animation
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
            backgroundColor: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'][Math.floor(Math.random() * 16)],
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
  const { gameState } = useGame();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // Check for victory condition - now 100 bunnies instead of 10
    if (gameState.bunnies >= 100) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [gameState.bunnies]);

  const handleNewGame = () => {
    // Just close the dialog without resetting the game
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Congratulations!
            <PartyPopper className="h-6 w-6 text-yellow-500" />
          </DialogTitle>
          <DialogDescription className="text-center">
            You've reached 100 bunnies and taken over the world!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center p-6">
          <div className="text-6xl mb-4">🐰🏆🐰</div>
          <p className="text-center mb-6">
            Your bunny empire now rules supreme! What will you do next?
          </p>
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleNewGame}
          >
            <PartyPopper className="mr-2 h-4 w-4" />
            Continue Playing
          </Button>
        </div>

        {open && <Confetti />}
      </DialogContent>
    </Dialog>
  );
};

export default VictoryDialog;
