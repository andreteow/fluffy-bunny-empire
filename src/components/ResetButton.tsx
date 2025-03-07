
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RefreshCcw } from "lucide-react";

const ResetButton: React.FC = () => {
  const { resetGame } = useGame();
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    resetGame();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full w-10 h-10 flex items-center justify-center border-0 bg-white shadow-md hover:shadow-lg" 
          aria-label="Reset game"
        >
          <RefreshCcw className="h-5 w-5 text-clay-green" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-0 rounded-xl shadow-lg bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-clay">Reset Game?</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            This will reset all your progress, including your bunnies, money, and upgrades.
            This action cannot be undone!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-2">
          <AlertDialogCancel className="border border-clay-blue-light text-clay-blue hover:bg-clay-blue-light hover:text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleReset}
            className="bg-clay-pink hover:bg-clay-pink-dark"
          >
            Reset Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetButton;
