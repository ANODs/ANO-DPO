"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, XIcon } from 'lucide-react';
import Link from "next/link";

// Типы для тестов
interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface Test {
  id: number;
  title: string;
  questions: Question[];
}

// Fallback данные (на случай если API недоступен)
const fallbackTests: Test[] = [
  {
    id: 1,
    title: "Промышленная робототехника (ДПО)",
    questions: [
      {
        question: "Какой параметр важен при настройке скорости движения робота при сварке?",
        options: [
          "Вид электрода",
          "Сила тока и скорость подачи проволоки",
          "Толщина защитного покрытия"
        ],
        correct: 1
      },
      {
        question: "Как называется процесс размещения продукции на поддонах с помощью робота?",
        options: [
          "Сортировка",
          "Упаковка",
          "Паллетирование"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 2,
    title: "Архитектор будущего: Нейросетевое искусство (ДПО)",
    questions: [
      {
        question: "Что является основным компонентом нейросетевого алгоритма?",
        options: [
          "Весовые коэффициенты",
          "Нейроны и связи между ними",
          "Алгоритмы сортировки"
        ],
        correct: 1
      },
      {
        question: "Как называется процесс обучения модели на размеченных данных?",
        options: [
          "Обучение с учителем",
          "Обучение без учителя",
          "Генетический алгоритм"
        ],
        correct: 0
      }
    ]
  }
];

// Функция для загрузки тестов из API
async function loadTests(): Promise<Test[]> {
  try {
    const response = await fetch('/api/tests');
    if (!response.ok) {
      throw new Error('Ошибка загрузки тестов');
    }
    const tests = await response.json();
    return tests;
  } catch (error) {
    console.error('Ошибка загрузки тестов из API:', error);
    return fallbackTests;
  }
}

const TestPage = () => {
  const [programs, setPrograms] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Загрузка тестов при монтировании компонента
  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      const tests = await loadTests();
      setPrograms(tests);
      setLoading(false);
    };
    fetchTests();
  }, []);

  const handleProgramSelect = (programId: number) => {
    setSelectedProgram(programId);
  };

  const startTest = () => {
    if (selectedProgram) {
      setTestStarted(true);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setSelectedAnswer(null);
      setShowResults(false);
      setScore(0);
      setShowAnswerFeedback(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswerFeedback) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setSelectedAnswer(answerIndex);
    setShowAnswerFeedback(true);
  };

  const handleNextQuestion = () => {
    const program = programs.find(p => p.id === selectedProgram);
    if (!program) return;

    if (currentQuestion < program.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(selectedAnswers[currentQuestion + 1] || null);
      setShowAnswerFeedback(false);
    } else {
      // Подсчет результата
      let correctAnswers = 0;
      program.questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correct) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setShowResults(true);
    }
  };

  const resetTest = () => {
    setSelectedProgram(null);
    setTestStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setSelectedAnswer(null);
    setShowResults(false);
    setScore(0);
    setShowAnswerFeedback(false);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(selectedAnswers[currentQuestion - 1] || null);
      setShowAnswerFeedback(false);
    }
  };

  const currentProgram = programs.find(p => p.id === selectedProgram);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
        <div className="w-full max-w-2xl h-[615px] shadow-xl bg-white rounded-lg flex items-center justify-center">
          <div className="text-xl text-gray-600">Загрузка тестов...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl lg:max-w-4xl">
        <AnimatePresence mode="wait">
          {!selectedProgram || !testStarted ? (
            <motion.div
              key="program-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-xl p-6 sm:p-8 h-[615px] flex flex-col overflow-y-auto"
            >
              {/* Title */}
              <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-gray-900 mb-4 sm:mb-6 flex-shrink-0">
                Выберите программу, по которой хотите пройти тестирование
              </h2>
              
              {/* Program options */}
              <div className="space-y-3 flex-1 overflow-y-auto overflow-x-clip">
                {programs.map((program, index) => (
                  <motion.div
                    key={program.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`min-h-14 px-4 py-3 rounded-lg border flex items-center cursor-pointer transition-all duration-200 ${
                      selectedProgram === program.id
                        ? 'border-purple-800 bg-white'
                        : 'border-gray-300 bg-white hover:border-purple-300'
                    }`}
                    onClick={() => handleProgramSelect(program.id)}
                  >
                    <div className="flex items-start space-x-4 w-full">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedProgram === program.id
                          ? 'border-purple-800'
                          : 'border-gray-400'
                      }`}>
                        {selectedProgram === program.id && (
                          <div className="w-2.5 h-2.5 bg-purple-800 rounded-full" />
                        )}
                      </div>
                      <span className={`text-base font-medium leading-relaxed ${
                        selectedProgram === program.id ? 'text-purple-800' : 'text-gray-900'
                      }`}>
                        {program.title}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startTest}
                disabled={!selectedProgram}
                className="w-full mt-6 sm:mt-8 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-medium text-base transition-colors flex-shrink-0"
              >
                Начать тест
              </motion.button>
            </motion.div>
          ) : showResults ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-xl p-6 sm:p-8 h-[615px] flex flex-col justify-center overflow-y-auto relative"
            >
              {/* Close button */}
              <button
                onClick={resetTest}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center flex-shrink-0">
                Результат тестирования
              </h2>
              
              {/* Score */}
              <div className="text-6xl sm:text-7xl font-black text-purple-600 mb-8 text-center flex-shrink-0">
                {Math.round((score / currentProgram!.questions.length) * 100)}%
              </div>
              
              {/* Description */}
              <p className="text-base text-gray-500 leading-relaxed mb-12 text-center max-w-md mx-auto">
                {score === currentProgram!.questions.length
                  ? "Отличный результат! Вы показали превосходные знания."
                  : score >= currentProgram!.questions.length * 0.8
                  ? "Хороший результат! У вас есть хорошая база знаний."
                  : score >= currentProgram!.questions.length * 0.6
                  ? "Неплохо, но результат может быть ещё лучше! Уровень знаний можно подтянуть на нашем курсе."
                  : "Есть над чем поработать. Рекомендуем пройти наш курс для улучшения знаний."}
              </p>
              
              {/* Button */}
              <div className="text-center flex-shrink-0">
                <Link href={`/programs/${selectedProgram}`}>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-lg font-medium text-base transition-colors">
                    Подробнее о курсе
                  </button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-xl p-6 sm:p-8 h-[615px] flex flex-col overflow-y-auto"
            >
              {/* Progress bar */}
              <div className="grid grid-cols-10 gap-0 h-1 rounded-sm overflow-hidden mb-4 sm:mb-6 flex-shrink-0">
                {Array.from({ length: 10 }, (_, index) => {
                  let bgColor = 'bg-gray-200';
                  
                  if (index < currentQuestion) {
                    // Проверяем правильность ответа для завершенных вопросов
                    const isCorrect = selectedAnswers[index] === currentProgram!.questions[index].correct;
                    bgColor = isCorrect ? 'bg-green-600' : 'bg-red-600';
                  } else if (index === currentQuestion) {
                    if (showAnswerFeedback && selectedAnswer !== null) {
                      const isCorrect = selectedAnswer === currentProgram!.questions[currentQuestion].correct;
                      bgColor = isCorrect ? 'bg-green-600' : 'bg-red-600';
                    } else {
                      bgColor = 'bg-purple-800';
                    }
                  }
                  
                  return (
                    <div
                      key={index}
                      className={`h-full ${bgColor}`}
                    />
                  );
                })}
              </div>
              
              {/* Question title */}
              <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-gray-900 mb-3 sm:mb-4 flex-shrink-0">
                Вопрос {currentQuestion + 1}
              </h2>
              
              {/* Question text */}
              <div className="text-base sm:text-lg font-medium text-gray-700 mb-4 sm:mb-6 flex-shrink-0">
                {currentProgram!.questions[currentQuestion].question}
              </div>
              
              {/* Answer options */}
              <div className="space-y-3 mb-6 sm:mb-8 flex-1 overflow-y-auto overflow-x-clip">
                {currentProgram!.questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = showAnswerFeedback && index === currentProgram!.questions[currentQuestion].correct;
                  const isWrong = showAnswerFeedback && isSelected && index !== currentProgram!.questions[currentQuestion].correct;
                  
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`min-h-14 px-4 py-3 rounded-lg border flex items-start justify-between cursor-pointer transition-all duration-200 ${
                        isCorrect
                          ? 'border-green-600 bg-white'
                          : isWrong
                          ? 'border-red-600 bg-white'
                          : isSelected
                          ? 'border-purple-800 bg-white'
                          : 'border-gray-300 bg-white hover:border-purple-300'
                      }`}
                      onClick={() => !showAnswerFeedback && handleAnswerSelect(index)}
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isCorrect
                            ? 'border-green-600 bg-green-600'
                            : isWrong
                            ? 'border-red-600 bg-red-600'
                            : isSelected
                            ? 'border-purple-800'
                            : 'border-gray-400'
                        }`}>
                          {(isSelected && !showAnswerFeedback) && (
                            <div className="w-2.5 h-2.5 bg-purple-800 rounded-full" />
                          )}
                        </div>
                        <span className={`text-base font-medium leading-relaxed ${
                          isCorrect
                            ? 'text-green-600'
                            : isWrong
                            ? 'text-red-600'
                            : isSelected
                            ? 'text-purple-800'
                            : 'text-gray-900'
                        }`}>
                          {option}
                        </span>
                      </div>
                      
                      <div className="flex-shrink-0 mt-0.5">
                        {showAnswerFeedback && isCorrect && (
                          <Check size={20} className="text-green-600" />
                        )}
                        {showAnswerFeedback && isWrong && (
                          <XIcon size={20} className="text-red-600" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Navigation */}
              <div className="flex justify-center items-center flex-shrink-0">
                {showAnswerFeedback && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextQuestion}
                    className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium text-base transition-colors"
                  >
                    {currentQuestion === currentProgram!.questions.length - 1 ? 'Завершить тест' : 'Следующий вопрос'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestPage;