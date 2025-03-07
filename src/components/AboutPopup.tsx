
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
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full w-10 h-10 flex items-center justify-center" 
          aria-label="About the game"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">How to Play Bunny Clicker</DialogTitle>
          <DialogDescription>
            A fun game about growing your bunny family!
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold">🐰 How to Play</h3>
              <p>Click on the bunny to feed it! When your bunny eats enough food, it makes new baby bunnies!</p>
              <p className="mt-2">Each time your bunnies have babies, you'll need more food for the next time.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold">💰 Selling Bunnies</h3>
              <p>You can sell some of your bunnies to get money. But remember - keep at least one bunny!</p>
              <p className="mt-2">Sometimes people will pay more for your bunnies (High Demand), and sometimes less (Low Demand). Try to sell when the price is high!</p>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold">⚙️ Cool Upgrades</h3>
              <p>Use your money to buy special upgrades that make your bunnies happier and help them make more babies!</p>
              <ul className="list-disc ml-5 mt-1">
                <li>Bunny Feeding - makes each click give more food</li>
                <li>Auto Feeding - bunnies learn to feed themselves!</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold">🎯 Game Goal</h3>
              <p>Try to get 10 bunnies to win the game! Can you take over the world with your bunny family?</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold">💾 Starting Over</h3>
              <p>If you want to start a new game, press the reset button at the top of the screen.</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AboutPopup;
