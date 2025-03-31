'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Article, Question } from '../types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Copy } from 'lucide-react';

export default function EditorPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedRange, setSelectedRange] = useState<[number, number] | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const customEndpoint = localStorage.getItem('articlesApiEndpoint') || '/api/articles';
        const response = await fetch(customEndpoint);
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error('Failed to load articles:', err);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleSelect = (articleId: string) => {
    const article = articles.find(a => a.id === Number(articleId));
    setSelectedArticle(article || null);
    setSelectedRange(null);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || !contentRef.current) return;

    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(contentRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;
    const end = start + range.toString().length;

    setSelectedRange([start, end]);
  };

  const copyRange = () => {
    if (selectedRange) {
      navigator.clipboard.writeText(`[${selectedRange[0]}, ${selectedRange[1]}]`);
    }
  };

  const renderContent = (content: string) => {
    const paragraphs = content.split('\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">Article Editor</h1>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Select Article
            </label>
            <Select onValueChange={handleArticleSelect} value={selectedArticle?.id?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an article..." />
              </SelectTrigger>
              <SelectContent>
                {articles.map(article => (
                  <SelectItem key={article.id} value={article.id.toString()}>
                    {article.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedArticle && (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Selected Range
                </h2>
                <div className="flex items-center gap-2">
                  <code className="bg-muted p-2 rounded">
                    {selectedRange ? `[${selectedRange[0]}, ${selectedRange[1]}]` : 'No selection'}
                  </code>
                  {selectedRange && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyRange}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  )}
                </div>
              </div>

              <div 
                ref={contentRef}
                onMouseUp={handleTextSelection}
                className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 rounded-lg"
              >
                {renderContent(selectedArticle.content)}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}