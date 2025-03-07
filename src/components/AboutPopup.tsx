
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle } from "lucide-react";

const AboutPopup: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="About the game">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">About Bunny Clicker Game</DialogTitle>
          <DialogDescription>
            How to play and game mechanics
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold">🐰 Basic Gameplay</h3>
              <p>Click to feed your bunnies. When they've eaten enough food, they'll multiply!</p>
              <p className="mt-2">Each multiplication requires more food than the last, but results in twice as many bunnies!</p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold">💰 Bunny Market</h3>
              <p>Sell your bunnies for money in the Bunny Market. The market price fluctuates between:</p>
              <ul className="list-disc ml-5 mt-1">
                <li><span className="font-semibold text-green-500">High Demand</span>: Double prices!</li>
                <li><span className="font-semibold text-yellow-500">Normal Demand</span>: Regular prices</li>
                <li><span className="font-semibold text-red-500">Low Demand</span>: Half prices</li>
              </ul>
              <p className="mt-2">Each bunny has a random quality: Low (60%), Mid (30%), or High (10%), which affects its value.</p>
              <p className="mt-2 italic">Note: You must always keep at least 1 bunny!</p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold">⚙️ Upgrades</h3>
              <p>Use your money to purchase upgrades that automate feeding:</p>
              <ul className="list-disc ml-5 mt-1">
                <li>Carrot Farming: Bunnies learn to grow carrots (+1 feed/second)</li>
                <li>Smart Bunnies: Higher bunny intelligence (+2 feed/second)</li>
                <li>Robo-Feeders: Automated feeding machines (+5 feed/second)</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold">🎯 Game Goal</h3>
              <p>Reach 100 billion bunnies to take over the world! Keep growing your bunny population exponentially through feeding, multiplication, and automation.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">💾 Game Data</h3>
              <p>Your game progress is saved in your browser. If you want to start over, use the Reset button.</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AboutPopup;
