
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Clock, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useGame } from '@/context/GameContext';
import { Card } from '@/components/ui/card';

const LeaderboardDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { leaderboard } = useGame();

  // Format time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get today's date at midnight for filtering
  const getTodayStart = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime();
  };

  // Filter entries for today only
  const dailyEntries = leaderboard.filter(entry => entry.timestamp >= getTodayStart());

  // Sort entries by time (ascending)
  const sortedAllTimeEntries = [...leaderboard].sort((a, b) => a.time - b.time);
  const sortedDailyEntries = [...dailyEntries].sort((a, b) => a.time - b.time);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-md bg-white border-gray-200"
        >
          <Trophy className="h-5 w-5 text-amber-500" />
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md p-0 border-0">
        <div className="h-full flex flex-col">
          <SheetHeader className="px-4 pt-4 pb-2">
            <SheetTitle className="text-xl flex items-center gap-2 text-gray-800">
              <Trophy className="h-5 w-5 text-amber-500" />
              Leaderboard
            </SheetTitle>
          </SheetHeader>
          
          <Tabs defaultValue="all-time" className="flex-1 flex flex-col">
            <div className="px-4">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="all-time" className="text-sm">
                  <List className="h-4 w-4 mr-2" />
                  All Time
                </TabsTrigger>
                <TabsTrigger value="daily" className="text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Today
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all-time" className="px-4 flex-1 overflow-y-auto">
              {sortedAllTimeEntries.length > 0 ? (
                <LeaderboardTable entries={sortedAllTimeEntries} formatTime={formatTime} />
              ) : (
                <EmptyState message="No entries yet. Be the first to win!" />
              )}
            </TabsContent>
            
            <TabsContent value="daily" className="px-4 flex-1 overflow-y-auto">
              {sortedDailyEntries.length > 0 ? (
                <LeaderboardTable entries={sortedDailyEntries} formatTime={formatTime} />
              ) : (
                <EmptyState message="No entries today. Be the first to win today!" />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Helper component for the leaderboard table
const LeaderboardTable: React.FC<{ 
  entries: Array<{ name: string; time: number; timestamp: number }>; 
  formatTime: (seconds: number) => string
}> = ({ entries, formatTime }) => {
  return (
    <div className="space-y-2">
      {entries.map((entry, index) => (
        <div 
          key={`${entry.name}-${entry.timestamp}`} 
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              {index + 1}
            </div>
            <span className="font-medium text-gray-800">{entry.name}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {formatTime(entry.time)}
          </div>
        </div>
      ))}
    </div>
  );
};

// Empty state component
const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center h-40">
      <Trophy className="h-10 w-10 text-gray-300 mb-3" />
      <p className="text-gray-500">{message}</p>
    </Card>
  );
};

export default LeaderboardDrawer;
