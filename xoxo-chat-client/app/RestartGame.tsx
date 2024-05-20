'use client';

import useGameStore from '@/app/store/gameStore';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const RestartGame = () => {
  const router = useRouter();
  const { restart } = useGameStore();

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              toast.success('The game is restarted.', {
                id: 'announcement'
              });
              restart();
              router.refresh();
            }}
            className="w-fit"
            variant="ghost"
          >
            <RotateCcw size="32" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Restart the game</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RestartGame;
