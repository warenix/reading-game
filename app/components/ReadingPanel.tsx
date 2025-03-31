'use client';

import { Article } from '../types';
import { cn } from '@/lib/utils';

interface ReadingPanelProps {
  article: Article;
  highlightRange?: [number, number];
}

export default function ReadingPanel({ article, highlightRange }: ReadingPanelProps) {
  const findParagraphWithHighlight = (paragraphs: string[], range?: [number, number]) => {
    if (!range) return -1;
    
    let currentPosition = 0;
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraphLength = paragraphs[i].length;
      if (range[0] >= currentPosition && range[0] < currentPosition + paragraphLength) {
        return i;
      }
      // Add 1 for the newline character
      currentPosition += paragraphLength + 1;
    }
    return -1;
  };

  const adjustHighlightRange = (paragraph: string, fullText: string, range?: [number, number]) => {
    if (!range) return undefined;
    
    const paragraphStart = fullText.indexOf(paragraph);
    if (paragraphStart === -1) return undefined;
    
    const highlightStart = Math.max(0, range[0] - paragraphStart);
    const highlightEnd = Math.min(paragraph.length, range[1] - paragraphStart);
    
    if (highlightStart >= paragraph.length || highlightEnd <= 0) return undefined;
    return [highlightStart, highlightEnd] as [number, number];
  };

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

  const renderContent = (content: string) => {
    const paragraphs = content.split('\n').filter(p => p.trim());
    
    if (paragraphs.length <= 1) {
      return (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {highlightText(content, highlightRange)}
        </p>
      );
    }

    const highlightParagraphIndex = findParagraphWithHighlight(paragraphs, highlightRange);

    return paragraphs.map((paragraph, index) => {
      const adjustedRange = index === highlightParagraphIndex 
        ? adjustHighlightRange(paragraph, content, highlightRange)
        : undefined;

      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {highlightText(paragraph, adjustedRange)}
        </p>
      );
    });
  };

  return (
    <div className="h-full overflow-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {article.title}
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        {renderContent(article.content)}
      </div>
    </div>
  );
}