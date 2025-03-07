
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
          className="rounded-full w-10 h-10 flex items-center justify-center border-0 bg-white shadow-md hover:shadow-lg" 
          aria-label="About the game"
        >
          <HelpCircle className="h-5 w-5 text-clay-pink" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[500px] max-h-[80vh] overflow-hidden border-0 rounded-2xl shadow-lg bg-gradient-to-br from-white to-clay-blue-light">
        <DialogHeader>
          <DialogTitle className="text-2xl text-clay font-bold">How to Play Bunny Clicker</DialogTitle>
          <DialogDescription className="text-lg font-medium text-clay-blue">
            A fun game about growing your bunny family!
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[50vh] pr-4 mt-2">
          <div className="space-y-5 p-1">
            <section className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-clay-green flex items-center gap-2">
                <span className="text-2xl">🐰</span> How to Play
              </h3>
              <p className="mt-2">Click on the bunny to feed it! When your bunny eats enough food, it makes new baby bunnies!</p>
              <p className="mt-2">Each time your bunnies have babies, you'll need more food for the next time.</p>
            </section>
            
            <section className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-clay-pink flex items-center gap-2">
                <span className="text-2xl">💰</span> Selling Bunnies
              </h3>
              <p className="mt-2">You can sell some of your bunnies to get money. But remember - keep at least one bunny!</p>
              <p className="mt-2">Sometimes people will pay more for your bunnies (High Demand), and sometimes less (Low Demand). Try to sell when the price is high!</p>
            </section>
            
            <section className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-clay-blue flex items-center gap-2">
                <span className="text-2xl">⚙️</span> Cool Upgrades
              </h3>
              <p className="mt-2">Use your money to buy special upgrades that make your bunnies happier and help them make more babies!</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Bunny Feeding - makes each click give more food</li>
                <li>Auto Feeding - bunnies learn to feed themselves!</li>
              </ul>
            </section>
            
            <section className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-clay-yellow flex items-center gap-2">
                <span className="text-2xl">🎯</span> Game Goal
              </h3>
              <p className="mt-2">Try to get 100 bunnies to win the game! Can you take over the world with your bunny family?</p>
            </section>

            <section className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-clay-lavender flex items-center gap-2">
                <span className="text-2xl">💾</span> Starting Over
              </h3>
              <p className="mt-2">If you want to start a new game, press the reset button at the top of the screen.</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AboutPopup;
