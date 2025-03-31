'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Settings, Loader2, Edit } from 'lucide-react';
import { Article } from './types';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const customEndpoint = localStorage.getItem('articlesApiEndpoint') || '/api/articles';
        const response = await fetch(customEndpoint);
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl">
        <div className="flex justify-end gap-2 mb-4">
          <Link href="/editor">
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Editor
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100 hover:text-primary transition-colors">
              Reading Comprehension Practice
            </h1>
          </Link>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
            Improve your reading comprehension skills with interactive exercises and immediate feedback.
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          {filteredArticles.map((article) => (
            <Link 
              key={article.id} 
              href={`/game?articleId=${article.id}`}
              className="block"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {article.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {article.content.substring(0, 150)}...
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{article.questions.length} questions</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}