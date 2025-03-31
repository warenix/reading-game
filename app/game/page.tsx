'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ReadingPanel from '../components/ReadingPanel';
import QuestionPanel from '../components/QuestionPanel';
import ScoreCard from '../components/ScoreCard';
import type { GameState, Article } from '../types';
import { Loader2, Home, HelpCircle } from "lucide-react";
import { Button } from '@/components/ui/button';

export default function GamePage() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('articleId');
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    showExplanation: false,
    showHint: false,
    answers: new Array(article?.questions?.length || 0).fill(undefined),
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const customEndpoint = localStorage.getItem('articlesApiEndpoint') || '/api/articles';
        const response = await fetch(customEndpoint);
        if (!response.ok) throw new Error('Failed to fetch articles');
        const articles = await response.json();
        const selectedArticle = articles.find((a: Article) => a.id === Number(articleId));
        if (!selectedArticle) throw new Error('Article not found');
        setArticle(selectedArticle);
        // Initialize answers array with the correct length
        setGameState(prev => ({
          ...prev,
          answers: new Array(selectedArticle.questions.length).fill(undefined)
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">
            {error || 'Failed to load questions'}
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = article.questions[gameState.currentQuestionIndex];
  const isGameComplete = gameState.currentQuestionIndex >= article.questions.length;

  const handleAnswerSelect = (answerIndex: number) => {
    setGameState(prev => ({
      ...prev,
      answers: prev.answers.map((ans, i) => 
        i === prev.currentQuestionIndex ? answerIndex : ans
      ),
      showHint: false,
    }));
  };

  const handleNext = () => {
    if (!gameState.showExplanation) {
      // Show explanation and update score if answer is correct
      const isCorrect = gameState.answers[gameState.currentQuestionIndex] === currentQuestion.correctAnswer;
      setGameState(prev => ({
        ...prev,
        showExplanation: true,
        showHint: false,
        score: isCorrect ? prev.score + 1 : prev.score,
      }));
    } else {
      // Move to next question
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        showExplanation: false,
        showHint: false,
      }));
    }
  };

  const handleRestart = () => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      showExplanation: false,
      showHint: false,
      answers: new Array(article.questions.length).fill(undefined),
    });
  };

  const toggleHint = () => {
    setGameState(prev => ({
      ...prev,
      showHint: !prev.showHint,
    }));
  };

  if (isGameComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <ScoreCard
            score={gameState.score}
            totalQuestions={article.questions.length}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleHint}
            className={gameState.showHint ? 'bg-primary text-primary-foreground' : ''}
            disabled={gameState.showExplanation}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Hint
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          <ReadingPanel
            article={article}
            highlightRange={
              gameState.showExplanation || gameState.showHint
                ? currentQuestion.supportingTextRange
                : undefined
            }
          />
          <QuestionPanel
            question={currentQuestion}
            showExplanation={gameState.showExplanation}
            selectedAnswer={gameState.answers[gameState.currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
}