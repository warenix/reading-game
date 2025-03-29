'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function ScoreCard({ score, totalQuestions, onRestart }: ScoreCardProps) {
  const percentage = (score / totalQuestions) * 100;
  
  return (
    <Card className="p-8 max-w-md mx-auto text-center">
      <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-4xl font-bold mb-2 text-primary">
        {score} / {totalQuestions}
      </p>
      <p className="text-xl mb-6 text-muted-foreground">
        {percentage}% Correct
      </p>
      <Button onClick={onRestart} className="w-full">
        Try Again
      </Button>
    </Card>
  );
}