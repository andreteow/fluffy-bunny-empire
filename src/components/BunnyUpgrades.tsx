
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUpgrades, UpgradeCategory } from '@/hooks/useUpgrades';
import UpgradeCategoryTab from './upgrades/UpgradeCategory';

const BunnyUpgrades: React.FC = () => {
  const { gameState } = useGame();
  const [activeTab, setActiveTab] = useState<UpgradeCategory>('efficiency');
  
  const { availableUpgrades, upcomingUpgrades, getCategoryStats } = useUpgrades(activeTab);

  return (
    <Card className="p-6 bg-gradient-to-br from-clay-green-light to-white border-0 rounded-2xl shadow-md">
      <h3 className="text-2xl font-bold mb-5 text-clay-green-dark">Upgrades</h3>
      
      <Tabs defaultValue="efficiency" value={activeTab} onValueChange={(value) => setActiveTab(value as UpgradeCategory)}>
        <TabsList className="grid grid-cols-4 mb-5 bg-clay-green bg-opacity-10">
          <TabsTrigger 
            value="efficiency" 
            className="data-[state=active]:bg-clay-green data-[state=active]:text-white"
          >
            Feeding
          </TabsTrigger>
          <TabsTrigger 
            value="automation" 
            className="data-[state=active]:bg-clay-green data-[state=active]:text-white"
          >
            Auto
          </TabsTrigger>
          <TabsTrigger 
            value="market" 
            className="data-[state=active]:bg-clay-green data-[state=active]:text-white"
          >
            Market
          </TabsTrigger>
          <TabsTrigger 
            value="rarity" 
            className="data-[state=active]:bg-clay-green data-[state=active]:text-white"
          >
            Rarity
          </TabsTrigger>
        </TabsList>
        
        {['efficiency', 'automation', 'market', 'rarity'].map((category) => (
          <UpgradeCategoryTab 
            key={category}
            category={category as UpgradeCategory}
            availableUpgrades={availableUpgrades}
            upcomingUpgrades={upcomingUpgrades}
            gameState={gameState}
          />
        ))}
      </Tabs>
      
      <div className="mt-4 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-clay-green">{getCategoryStats()}</span>
        </div>
      </div>
    </Card>
  );
};

export default BunnyUpgrades;
