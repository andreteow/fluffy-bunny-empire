
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper, Trophy } from 'lucide-react';

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
  const { gameState } = useGame();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // Check for victory condition - 100 bunnies
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
      <DialogContent className="sm:max-w-md border-0 rounded-2xl shadow-lg bg-gradient-to-br from-white to-clay-pink-light">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-clay-yellow" />
            Congratulations!
            <PartyPopper className="h-8 w-8 text-clay-yellow" />
          </DialogTitle>
          <DialogDescription className="text-center text-lg font-medium text-clay">
            You've reached 100 bunnies and taken over the world!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center p-8">
          <div className="text-8xl mb-5 animate-pulse-soft">🐰🏆🐰</div>
          <p className="text-center text-lg mb-8 text-clay">
            Your bunny empire now rules supreme! What will you do next?
          </p>
          <Button 
            className="w-full clay-btn bg-clay-green hover:bg-clay-green-dark text-white" 
            size="lg" 
            onClick={handleNewGame}
          >
            <PartyPopper className="mr-2 h-5 w-5" />
            Continue Playing
          </Button>
        </div>

        {open && <Confetti />}
      </DialogContent>
    </Dialog>
  );
};

export default VictoryDialog;
