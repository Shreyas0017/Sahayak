import React, { useState } from 'react';
import { Mic, Play, Pause, Square, Volume2, CheckCircle, AlertCircle } from 'lucide-react';

const AudioAssessment: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  type AssessmentResult = {
    overallScore: number;
    fluency: number;
    pronunciation: number;
    pace: number;
    accuracy: number;
    feedback: { type: 'positive' | 'suggestion'; text: string }[];
    detailedAnalysis: {
      wordsPerMinute: number;
      correctWords: number;
      totalWords: number;
      mispronunciations: string[];
      suggestions: string[];
    };
  };

  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [language, setLanguage] = useState('english');

  const sampleTexts = [
    {
      id: 1,
      title: "The Water Cycle",
      text: "Water evaporates from oceans, rivers, and lakes. It rises into the sky as water vapor. When it gets cold, it condenses into clouds. Then it falls back to Earth as rain or snow.",
      level: "Grade 3-4",
      language: "english"
    },
    {
      id: 2,
      title: "सूर्य की गर्मी",
      text: "सूर्य हमारे जीवन के लिए बहुत महत्वपूर्ण है। यह हमें प्रकाश और गर्मी देता है। पेड़-पौधे सूर्य की रोशनी से अपना भोजन बनाते हैं।",
      level: "Grade 3-4",
      language: "hindi"
    },
    {
      id: 3,
      title: "Photosynthesis",
      text: "Plants are amazing living things that can make their own food. They use sunlight, water, and carbon dioxide from the air to create glucose and oxygen through a process called photosynthesis.",
      level: "Grade 5-6",
      language: "english"
    }
  ];

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'Hindi' },
    { code: 'marathi', name: 'Marathi' },
    { code: 'gujarati', name: 'Gujarati' },
    { code: 'tamil', name: 'Tamil' }
  ];

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Auto-stop after 30 seconds (optional)
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecording(false);
          stream.getTracks().forEach(track => track.stop());
        }
      }, 30000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // MediaRecorder will handle the stop event
  };

  const handlePlayRecording = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const handleAnalyzeReading = async () => {
    if (!audioBlob || !selectedText) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock assessment result
    const mockResult = {
      overallScore: 85,
      fluency: 80,
      pronunciation: 90,
      pace: 85,
      accuracy: 88,
      feedback: [
        { type: 'positive' as const, text: 'Great pronunciation of difficult words' },
        { type: 'suggestion' as const, text: 'Try to read a bit slower for better clarity' },
        { type: 'positive' as const, text: 'Good understanding of punctuation pauses' }
      ],
      detailedAnalysis: {
        wordsPerMinute: 120,
        correctWords: 45,
        totalWords: 48,
        mispronunciations: ['photosynthesis', 'glucose'],
        suggestions: [
          'Practice breaking down complex words into syllables',
          'Focus on clear articulation of scientific terms',
          'Maintain consistent reading pace throughout'
        ]
      }
    };
    
    setAssessmentResult(mockResult);
    setIsAnalyzing(false);
  };

  const handleTextSelect = (text: string) => {
    setSelectedText(text);
    setAudioBlob(null);
    setAssessmentResult(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Mic className="h-8 w-8 text-orange-500 mr-3" />
          Audio Reading Assessment
        </h1>
        <p className="text-lg text-gray-600 mt-2">Record student reading and get AI-powered feedback on fluency and pronunciation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Text Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Reading Text</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {sampleTexts.filter(text => text.language === language).map((text) => (
                <div
                  key={text.id}
                  onClick={() => handleTextSelect(text.text)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedText === text.text
                      ? 'bg-orange-50 border-2 border-orange-200'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-medium text-gray-900">{text.title}</h3>
                  <p className="text-sm text-gray-600">{text.level}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{text.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Or Enter Custom Text</label>
              <textarea
                value={selectedText}
                onChange={(e) => setSelectedText(e.target.value)}
                placeholder="Enter text for reading assessment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent h-24 resize-none"
              />
            </div>
          </div>

          {/* Recording Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recording</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    disabled={!selectedText}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mic className="h-5 w-5 mr-2" />
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <Square className="h-5 w-5 mr-2" />
                    Stop Recording
                  </button>
                )}
              </div>

              {isRecording && (
                <div className="text-center">
                  <div className="inline-flex items-center text-red-600">
                    <div className="animate-pulse bg-red-500 rounded-full h-3 w-3 mr-2"></div>
                    Recording...
                  </div>
                </div>
              )}

              {audioBlob && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handlePlayRecording}
                      disabled={isPlaying}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 mr-2" />
                      ) : (
                        <Play className="h-5 w-5 mr-2" />
                      )}
                      {isPlaying ? 'Playing...' : 'Play Recording'}
                    </button>
                  </div>

                  <button
                    onClick={handleAnalyzeReading}
                    disabled={isAnalyzing}
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Volume2 className="h-5 w-5 mr-2" />
                    )}
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Reading'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment Results</h2>
            
            {assessmentResult ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-2xl font-bold ${getScoreBackground(assessmentResult.overallScore)} ${getScoreColor(assessmentResult.overallScore)}`}>
                    {assessmentResult.overallScore}%
                  </div>
                  <p className="text-lg font-medium text-gray-900 mt-2">Overall Reading Score</p>
                </div>

                {/* Detailed Scores */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Fluency', score: assessmentResult.fluency },
                    { label: 'Pronunciation', score: assessmentResult.pronunciation },
                    { label: 'Pace', score: assessmentResult.pace },
                    { label: 'Accuracy', score: assessmentResult.accuracy }
                  ].map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                        {metric.score}%
                      </div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Feedback */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Feedback</h3>
                  <div className="space-y-2">
                    {assessmentResult.feedback.map((item: { type: 'positive' | 'suggestion'; text: string }, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        {item.type === 'positive' ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        )}
                        <p className="text-sm text-gray-700">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Reading Statistics</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Words per minute: {assessmentResult.detailedAnalysis.wordsPerMinute}</li>
                        <li>• Correct words: {assessmentResult.detailedAnalysis.correctWords}/{assessmentResult.detailedAnalysis.totalWords}</li>
                        <li>• Accuracy: {Math.round((assessmentResult.detailedAnalysis.correctWords / assessmentResult.detailedAnalysis.totalWords) * 100)}%</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {assessmentResult.detailedAnalysis.suggestions.map((suggestion: string, index: number) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Mic className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Record a reading to see assessment results</p>
                  <p className="text-sm text-gray-400 mt-2">Select text and start recording to begin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Text Display */}
      {selectedText && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reading Text</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-800 leading-relaxed">{selectedText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioAssessment;