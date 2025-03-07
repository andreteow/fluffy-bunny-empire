
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Upgrade, GameState } from '@/context/types';
import UpgradeItem from './UpgradeItem';

interface UpgradeCategoryProps {
  category: 'efficiency' | 'automation' | 'market' | 'rarity';
  availableUpgrades: Upgrade[];
  upcomingUpgrades: Upgrade[];
  gameState: GameState;
}

const UpgradeCategory: React.FC<UpgradeCategoryProps> = ({
  category,
  availableUpgrades,
  upcomingUpgrades,
  gameState,
}) => {
  return (
    <TabsContent value={category} className="space-y-3">
      {availableUpgrades.length === 0 && upcomingUpgrades.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">
          Get more bunnies to unlock upgrades!
        </p>
      ) : (
        <div className="space-y-3">
          {/* Show available upgrades */}
          {availableUpgrades
            .filter(u => !gameState.unlockedUpgrades.includes(u.id))
            .map((upgrade) => (
              <UpgradeItem key={upgrade.id} upgrade={upgrade} isAvailable={true} />
            ))}
          
          {/* Show upcoming upgrades (greyed out) */}
          {upcomingUpgrades.slice(0, 3).map((upgrade) => (
            <UpgradeItem key={upgrade.id} upgrade={upgrade} isAvailable={false} />
          ))}
          
          {/* Show already purchased upgrades */}
          {availableUpgrades
            .filter(u => gameState.unlockedUpgrades.includes(u.id))
            .map((upgrade) => (
              <UpgradeItem key={upgrade.id} upgrade={upgrade} isAvailable={false} />
            ))}
        </div>
      )}
    </TabsContent>
  );
};

export default UpgradeCategory;
