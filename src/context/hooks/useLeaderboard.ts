
import { useState, useEffect, useCallback } from 'react';
import { LeaderboardEntry } from '../types';
import { supabase } from "@/integrations/supabase/client";
import { ToastProps } from '@/components/ui/toast';

type ToastFunction = (props: { title: string; description: string; variant?: ToastProps['variant'] }) => void;

export const useLeaderboard = (toast: ToastFunction) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);

  // Load leaderboard from Supabase
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLeaderboardLoading(true);
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('time', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Transform to match our LeaderboardEntry interface
          const leaderboardEntries: LeaderboardEntry[] = data.map(entry => ({
            id: entry.id,
            name: entry.name,
            time: entry.time,
            timestamp: new Date(entry.timestamp).getTime()
          }));
          
          setLeaderboard(leaderboardEntries);
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error);
        toast({
          title: "Error loading leaderboard",
          description: "There was an error loading the leaderboard data.",
          variant: "destructive",
        });
      } finally {
        setIsLeaderboardLoading(false);
      }
    };

    fetchLeaderboard();
  }, [toast]);

  // Format time for toast messages
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Add leaderboard entry to Supabase
  const addLeaderboardEntry = useCallback(async (name: string, time: number) => {
    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert([
          { name, time }
        ]);
      
      if (error) {
        throw error;
      }
      
      const newEntry: LeaderboardEntry = {
        name,
        time,
        timestamp: Date.now()
      };
      
      setLeaderboard(prev => [...prev, newEntry].sort((a, b) => a.time - b.time));
      
      toast({
        title: "Added to Leaderboard",
        description: `Congratulations ${name}! Your time: ${formatTime(time)}`,
      });
    } catch (error) {
      console.error('Error adding leaderboard entry:', error);
      toast({
        title: "Error",
        description: "There was an error adding your score to the leaderboard.",
        variant: "destructive",
      });
    }
  }, [toast]);

  return {
    leaderboard,
    isLeaderboardLoading,
    addLeaderboardEntry
  };
};
