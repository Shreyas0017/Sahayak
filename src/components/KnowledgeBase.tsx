import React, { useState } from 'react';
import { MessageCircle, Send, Globe, Lightbulb, BookOpen } from 'lucide-react';

const KnowledgeBase: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedLevel, setSelectedLevel] = useState('simple');
  type Message = {
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
  };
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'marathi', name: 'Marathi' },
    { code: 'hindi', name: 'Hindi' },
    { code: 'gujarati', name: 'Gujarati' },
    { code: 'tamil', name: 'Tamil' },
    { code: 'bengali', name: 'Bengali' },
  ];

  const levels = [
    { code: 'simple', name: 'Simple', description: 'Basic explanation with analogies' },
    { code: 'moderate', name: 'Moderate', description: 'Intermediate explanation with examples' },
    { code: 'detailed', name: 'Detailed', description: 'Comprehensive explanation with context' },
  ];

  const commonQuestions = [
    "Why is the sky blue?",
    "How does rain form?",
    "What makes plants green?",
    "Why do we have seasons?",
    "How do birds fly?",
    "What is gravity?",
    "Why do we need to sleep?",
    "How does the heart work?",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage: Message = { type: 'user', content: question, timestamp: new Date() };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock AI response
    const aiResponse: Message = {
      type: 'ai',
      content: `Here's a simple explanation about "${question}":

The sky appears blue because of the way sunlight interacts with tiny particles in our atmosphere. Think of sunlight as a rainbow of colors all mixed together - just like when you see a rainbow after rain!

**Simple Analogy:**
Imagine you're throwing different colored balls through a forest. Blue balls are smaller and get bounced around more by the trees (air particles), while red balls are bigger and go straight through. So we see more blue balls bouncing around in the sky!

**Key Points:**
• Sunlight contains all colors of the rainbow
• Blue light gets scattered more than other colors
• This scattering makes the sky appear blue to our eyes
• During sunrise/sunset, we see more reds and oranges because blue light gets scattered away

**Fun Fact:**
On Mars, the sky appears reddish-brown because Mars has different particles in its atmosphere!

Would you like me to explain this differently or do you have another question?`,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, aiResponse]);
    setIsLoading(false);
    setQuestion('');
  };

  const handleQuestionClick = (q: string) => {
    setQuestion(q);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <MessageCircle className="h-8 w-8 text-orange-500 mr-3" />
          Knowledge Base
        </h1>
        <p className="text-lg text-gray-600 mt-2">Get simple, accurate explanations for complex student questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="h-4 w-4 inline mr-1" />
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lightbulb className="h-4 w-4 inline mr-1" />
                  Explanation Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {levels.map((level) => (
                    <option key={level.code} value={level.code}>
                      {level.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {levels.find(l => l.code === selectedLevel)?.description}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Common Questions</h2>
            <div className="space-y-2">
              {commonQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(q)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-96">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-orange-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">AI Teaching Assistant</h3>
                  <p className="text-sm text-gray-500">Ask me anything about any subject</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {conversation.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Start a conversation by asking a question</p>
                  <p className="text-sm text-gray-400 mt-2">I'll provide simple explanations with analogies</p>
                </div>
              ) : (
                conversation.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {msg.type === 'ai' ? (
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="px-6 py-4 border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!question.trim() || isLoading}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;