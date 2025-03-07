
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Upgrade, GameState } from '@/context/types';
import UpgradeItem from './UpgradeItem';
import { UpgradeCategory } from '@/hooks/useUpgrades';

interface UpgradeCategoryTabProps {
  category: UpgradeCategory;
  availableUpgrades: Upgrade[];
  upcomingUpgrades: Upgrade[];
  gameState: GameState;
}

const UpgradeCategoryTab: React.FC<UpgradeCategoryTabProps> = ({
  category,
  availableUpgrades,
  upcomingUpgrades,
  gameState,
}) => {
  return (
    <TabsContent value={category} className="space-y-3">
      {availableUpgrades.length === 0 && upcomingUpgrades.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">
          No upgrades available in this category yet.
        </p>
      ) : (
        <div className="space-y-3">
          {/* Show all upgrades as available, only check if they're already purchased */}
          {[...availableUpgrades, ...upcomingUpgrades]
            .filter(u => !gameState.unlockedUpgrades.includes(u.id))
            .map((upgrade) => (
              <UpgradeItem key={upgrade.id} upgrade={upgrade} isAvailable={true} />
            ))}
          
          {/* Show already purchased upgrades */}
          {[...availableUpgrades, ...upcomingUpgrades]
            .filter(u => gameState.unlockedUpgrades.includes(u.id))
            .map((upgrade) => (
              <UpgradeItem key={upgrade.id} upgrade={upgrade} isAvailable={false} />
            ))}
        </div>
      )}
    </TabsContent>
  );
};

export default UpgradeCategoryTab;
