'use client';

import { Question } from '../types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface QuestionPanelProps {
  question: Question;
  showExplanation: boolean;
  selectedAnswer?: number;
  onAnswerSelect: (index: number) => void;
  onNext: () => void;
}

export default function QuestionPanel({
  question,
  showExplanation,
  selectedAnswer,
  onAnswerSelect,
  onNext,
}: QuestionPanelProps) {
  return (
    <div className="h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {question.text}
      </h3>
      
      <RadioGroup
        className="space-y-4 mb-6"
        value={selectedAnswer?.toString()}
        onValueChange={(value) => onAnswerSelect(parseInt(value))}
        disabled={showExplanation}
      >
        {question.choices.map((choice, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem
              value={index.toString()}
              id={`choice-${index}`}
              className={showExplanation ? 
                question.correctAnswer === index ? "border-green-500" : 
                selectedAnswer === index ? "border-red-500" : "" 
                : ""
              }
            />
            <Label
              htmlFor={`choice-${index}`}
              className={showExplanation ?
                question.correctAnswer === index ? "text-green-600 dark:text-green-400" :
                selectedAnswer === index ? "text-red-600 dark:text-red-400" :
                "text-gray-600 dark:text-gray-400"
                : "text-gray-700 dark:text-gray-300"
              }
            >
              {choice}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {showExplanation && (
        <Card className="p-4 mb-6 bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
          <p className="text-blue-700 dark:text-blue-300">
            {question.explanation}
          </p>
        </Card>
      )}

      <div className="mt-auto">
        <Button
          className="w-full"
          onClick={onNext}
          disabled={selectedAnswer === undefined && !showExplanation}
        >
          {showExplanation ? 'Next Question' : 'Submit Answer'}
        </Button>
      </div>
    </div>
  );
}