'use client';

import { Article } from '../types';
import { cn } from '@/lib/utils';

interface ReadingPanelProps {
  article: Article;
  highlightRange?: [number, number];
}

export default function ReadingPanel({ article, highlightRange }: ReadingPanelProps) {
  const highlightText = (content: string, range?: [number, number]) => {
    if (!range) return content;

    const before = content.slice(0, range[0]);
    const highlight = content.slice(range[0], range[1]);
    const after = content.slice(range[1]);

    return (
      <>
        {before}
        <span className="bg-yellow-200 dark:bg-yellow-800">{highlight}</span>
        {after}
      </>
    );
  };

  return (
    <div className="h-full overflow-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {article.title}
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {highlightText(article.content, highlightRange)}
        </p>
      </div>
    </div>
  );
}