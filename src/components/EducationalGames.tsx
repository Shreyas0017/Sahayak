import React, { useState } from 'react';
import { Gamepad2, Play, RefreshCw, Trophy, Star } from 'lucide-react';

const EducationalGames: React.FC = () => {
  const [gameType, setGameType] = useState('quiz');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('3-5');
  type GameQuestion = {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };

  type GeneratedGame = {
    type: string;
    title: string;
    description: string;
    questions: GameQuestion[];
  } | null;

  const [generatedGame, setGeneratedGame] = useState<GeneratedGame>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gameState, setGameState] = useState<{
    currentQuestion: number;
    score: number;
    showResult: boolean;
    selectedAnswer: number | null;
    isCorrect: boolean;
  }>({
    currentQuestion: 0,
    score: 0,
    showResult: false,
    selectedAnswer: null,
    isCorrect: false
  });

  const gameTypes = [
    { value: 'quiz', label: 'Quiz Game', description: 'Multiple choice questions' },
    { value: 'matching', label: 'Matching Game', description: 'Match related items' },
    { value: 'word', label: 'Word Games', description: 'Word puzzles and vocabulary' },
    { value: 'math', label: 'Math Games', description: 'Number games and calculations' },
    { value: 'memory', label: 'Memory Game', description: 'Remember and recall information' },
    { value: 'sorting', label: 'Sorting Game', description: 'Categorize and organize items' }
  ];

  const subjects = [
    'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 
    'Environmental Studies', 'General Knowledge'
  ];

  const handleGenerateGame = async () => {
    if (!subject || !topic) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock game data
    const mockGame = {
      type: gameType,
      title: `${subject}: ${topic}`,
      description: `Interactive ${gameType} game about ${topic}`,
      questions: [
        {
          question: "What is the process by which plants make their own food?",
          options: ["Photosynthesis", "Respiration", "Digestion", "Circulation"],
          correct: 0,
          explanation: "Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to make glucose and oxygen."
        },
        {
          question: "Which part of the plant absorbs water from the soil?",
          options: ["Leaves", "Stem", "Roots", "Flowers"],
          correct: 2,
          explanation: "Roots absorb water and nutrients from the soil to help the plant grow."
        },
        {
          question: "What do plants need to carry out photosynthesis?",
          options: ["Only water", "Only sunlight", "Sunlight, water, and carbon dioxide", "Only carbon dioxide"],
          correct: 2,
          explanation: "Plants need sunlight, water, and carbon dioxide to make their own food through photosynthesis."
        },
        {
          question: "What gas do plants release during photosynthesis?",
          options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
          correct: 1,
          explanation: "Plants release oxygen as a byproduct of photosynthesis, which is essential for animals and humans to breathe."
        }
      ]
    };
    
    setGeneratedGame(mockGame);
    setGameState({
      currentQuestion: 0,
      score: 0,
      showResult: false,
      selectedAnswer: null,
      isCorrect: false
    });
    setIsGenerating(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!generatedGame) return;
    const correct = generatedGame.questions[gameState.currentQuestion].correct === answerIndex;
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      isCorrect: correct,
      showResult: true,
      score: correct ? prev.score + 1 : prev.score
    }));
  };

  const handleNextQuestion = () => {
    if (generatedGame && gameState.currentQuestion < generatedGame.questions.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null,
        showResult: false,
        isCorrect: false
      }));
    }
  };

  const resetGame = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      showResult: false,
      selectedAnswer: null,
      isCorrect: false
    });
  };

  const isGameComplete = !!generatedGame && Array.isArray(generatedGame.questions) &&
    gameState.currentQuestion === generatedGame.questions.length - 1 && gameState.showResult;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Gamepad2 className="h-8 w-8 text-orange-500 mr-3" />
          Educational Games
        </h1>
        <p className="text-lg text-gray-600 mt-2">Generate fun, interactive games to make learning engaging</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game Settings */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Game Settings</h2>
            
            {/* Game Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Game Type</label>
              <select
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {gameTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {gameTypes.find(t => t.value === gameType)?.description}
              </p>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select Subject</option>
                {subjects.map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>

            {/* Topic */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Photosynthesis, Multiplication Tables"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Grade Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="1-2">Grades 1-2</option>
                <option value="3-5">Grades 3-5</option>
                <option value="6-8">Grades 6-8</option>
              </select>
            </div>

            <button
              onClick={handleGenerateGame}
              disabled={!subject || !topic || isGenerating}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Play className="h-5 w-5 mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Game'}
            </button>
          </div>
        </div>

        {/* Game Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {generatedGame ? (
              <div className="space-y-6">
                {/* Game Header */}
                <div className="text-center border-b border-gray-200 pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{generatedGame.title}</h2>
                  <p className="text-gray-600 mt-1">{generatedGame.description}</p>
                  <div className="flex items-center justify-center space-x-4 mt-4">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">Score: {gameState.score}/{generatedGame.questions.length}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Question {gameState.currentQuestion + 1} of {generatedGame.questions.length}
                    </div>
                  </div>
                </div>

                {!isGameComplete ? (
                  /* Current Question */
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {generatedGame.questions[gameState.currentQuestion].question}
                      </h3>
                      
                      <div className="space-y-2">
                        {generatedGame.questions[gameState.currentQuestion].options.map((option: string, index: number) => {
                          let buttonClass = "w-full p-3 text-left rounded-md border transition-colors ";
                          
                          if (gameState.selectedAnswer === null) {
                            buttonClass += "border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500";
                          } else if (index === generatedGame.questions[gameState.currentQuestion].correct) {
                            buttonClass += "border-green-500 bg-green-50 text-green-800";
                          } else if (index === gameState.selectedAnswer) {
                            buttonClass += "border-red-500 bg-red-50 text-red-800";
                          } else {
                            buttonClass += "border-gray-300 bg-gray-50 text-gray-500";
                          }
                          
                          return (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={gameState.selectedAnswer !== null}
                              className={buttonClass}
                            >
                              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {gameState.showResult && (
                      <div className={`p-4 rounded-lg ${gameState.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <div className="flex items-center mb-2">
                          {gameState.isCorrect ? (
                            <Star className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <RefreshCw className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <span className={`font-medium ${gameState.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {gameState.isCorrect ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div>
                        <p className={`text-sm ${gameState.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {generatedGame.questions[gameState.currentQuestion].explanation}
                        </p>
                        
                        <div className="mt-4">
                          <button
                            onClick={handleNextQuestion}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                          >
                            {gameState.currentQuestion === generatedGame.questions.length - 1 ? 'Finish Game' : 'Next Question'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Game Complete */
                  <div className="text-center py-8">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Game Complete!</h3>
                    <p className="text-lg text-gray-600 mb-4">
                      You scored {gameState.score} out of {generatedGame.questions.length}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={resetGame}
                        className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Play Again
                      </button>
                      <button
                        onClick={() => setGeneratedGame(null)}
                        className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        New Game
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Gamepad2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your educational game will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Configure settings and click generate to start</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalGames;