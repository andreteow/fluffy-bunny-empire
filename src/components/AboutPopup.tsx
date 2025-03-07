
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
          <DialogTitle className="text-2xl text-clay font-bold">How to Play Bunny Empire</DialogTitle>
          <DialogDescription className="text-lg font-medium text-clay-blue">
            Grow your bunny empire to 10,000 bunnies!
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[50vh] pr-4 mt-2">
          <div className="space-y-5 p-1">
            <section className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-clay-green flex items-center gap-2">
                <span className="text-2xl">🐰</span> How to Play
              </h3>
              <p className="mt-2">Click on the bunny to feed it! When your bunny eats enough food, it breeds and makes new bunnies!</p>
              <p className="mt-2">Each time your bunnies breed, you'll need more food for the next breeding cycle.</p>
            </section>
            
            <section className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-clay-pink flex items-center gap-2">
                <span className="text-2xl">💰</span> Selling Bunnies
              </h3>
              <p className="mt-2">You can sell your bunnies in the market to earn money. Keep at least one bunny to continue breeding!</p>
              <p className="mt-2">Market demand changes periodically - High demand means better prices, while Low demand means lower prices. Watch for market changes!</p>
              <p className="mt-2">Bunnies have different values: Basic (low value), Quality (medium value), and Premium (high value).</p>
            </section>
            
            <section className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-clay-blue flex items-center gap-2">
                <span className="text-2xl">⚙️</span> Cool Upgrades
              </h3>
              <p className="mt-2">Use your money to buy special upgrades:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Auto-Feeding - Your bunnies get fed automatically</li>
                <li>Feeds Per Click - Get more food per click</li>
                <li>Market Improvements - Better chances for valuable bunnies</li>
                <li>And more!</li>
              </ul>
            </section>
            
            <section className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-clay-yellow flex items-center gap-2">
                <span className="text-2xl">🎯</span> Game Goal
              </h3>
              <p className="mt-2">Grow your bunny empire to 10,000 bunnies to win the game! The game keeps running even when closed, so your bunnies keep breeding!</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AboutPopup;
