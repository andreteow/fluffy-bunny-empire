
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
    <Card className="p-4 bg-bunny-green bg-opacity-40 border-2 border-bunny-green rounded-xl">
      <h3 className="text-xl font-bold mb-4">Upgrades</h3>
      
      <Tabs defaultValue="efficiency" value={activeTab} onValueChange={(value) => setActiveTab(value as UpgradeCategory)}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="efficiency">Feeding</TabsTrigger>
          <TabsTrigger value="automation">Auto</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="rarity">Rarity</TabsTrigger>
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
          <span>{getCategoryStats()}</span>
        </div>
      </div>
    </Card>
  );
};

export default BunnyUpgrades;
