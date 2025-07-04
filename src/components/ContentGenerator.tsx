import React, { useState } from 'react';
import { FileText, Globe, Sparkles, Download, Copy } from 'lucide-react';

const ContentGenerator: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('marathi');
  const [contentType, setContentType] = useState('story');
  const [topic, setTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('3-5');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const languages = [
    { code: 'marathi', name: 'Marathi', native: 'मराठी' },
    { code: 'hindi', name: 'Hindi', native: 'हिंदी' },
    { code: 'gujarati', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { code: 'bengali', name: 'Bengali', native: 'বাংলা' },
    { code: 'english', name: 'English', native: 'English' },
  ];

  const contentTypes = [
    { value: 'story', label: 'Story', description: 'Narrative content with characters and plot' },
    { value: 'explanation', label: 'Explanation', description: 'Simple explanations of concepts' },
    { value: 'poem', label: 'Poem', description: 'Rhythmic verse for memorization' },
    { value: 'dialogue', label: 'Dialogue', description: 'Conversation-based content' },
    { value: 'activity', label: 'Activity', description: 'Interactive learning activities' },
  ];

  const gradeLevels = [
    { value: '1-2', label: 'Grades 1-2', description: 'Basic concepts, simple language' },
    { value: '3-5', label: 'Grades 3-5', description: 'Intermediate concepts, moderate vocabulary' },
    { value: '6-8', label: 'Grades 6-8', description: 'Advanced concepts, complex language' },
    { value: 'mixed', label: 'Mixed Grades', description: 'Adaptable for multiple levels' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call to Google Gemini
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock generated content
    const mockContent = `शेतकरी आणि मातीचे प्रकार

एकदा एका छोट्या गावात रामू नावाचा शेतकरी राहत होता. रामूकडे मोठे शेत होते, पण त्याच्या शेतात वेगवेगळ्या प्रकारची माती होती.

उत्तरेकडील शेतात काळी माती होती. ही माती कापसासाठी खूप चांगली होती. काळी माती पाणी चांगले धरून ठेवते आणि पिकांना चांगले पोषण देते.

दक्षिणेकडील शेतात लाल माती होती. या मातीत लोह असते म्हणून ती लाल दिसते. या मातीत मूंगफली आणि ज्वार चांगले येते.

पूर्वेकडील शेतात वाळूमाती होती. ही माती पाणी लगेच शोषून घेते पण चांगले निचरा करते. या मातीत भाज्या चांगल्या येतात.

रामूने शिकले की प्रत्येक मातीचे वेगळे गुणधर्म आहेत आणि त्यानुसार योग्य पिके लावली पाहिजेत. यामुळे त्याची शेती यशस्वी झाली.

या कथेतून आपण शिकतो की मातीचे प्रकार ओळखून योग्य पिके लावणे महत्वाचे आहे.`;
    
    setGeneratedContent(mockContent);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FileText className="h-8 w-8 text-orange-500 mr-3" />
          Content Generator
        </h1>
        <p className="text-lg text-gray-600 mt-2">Create hyper-local, culturally relevant content in your preferred language</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Settings</h2>
            
            {/* Language Selection */}
            <div className="mb-6">
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
                    {lang.name} ({lang.native})
                  </option>
                ))}
              </select>
            </div>

            {/* Content Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="contentType"
                      value={type.value}
                      checked={contentType === type.value}
                      onChange={(e) => setContentType(e.target.value)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <div className="ml-2">
                      <span className="text-sm font-medium text-gray-900">{type.label}</span>
                      <p className="text-xs text-gray-500">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Grade Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {gradeLevels.map((grade) => (
                  <option key={grade.value} value={grade.value}>
                    {grade.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Request</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Create a story about farmers to explain different soil types"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent h-24 resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Sparkles className="h-5 w-5 mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Content</h2>
              {generatedContent && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </button>
                  <button className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              )}
            </div>
            
            {generatedContent ? (
              <div className="bg-gray-50 rounded-lg p-4 min-h-96">
                <pre className="whitespace-pre-wrap text-gray-800 font-medium leading-relaxed">
                  {generatedContent}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your generated content will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Fill in the details and click generate to start</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;