export interface Question {
  id: number;
  text: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  supportingTextRange: [number, number];
}

export interface Article {
  id: number;
  title: string;
  content: string;
  questions: Question[];
}

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  showExplanation: boolean;
  showHint: boolean;
  answers: number[];
}