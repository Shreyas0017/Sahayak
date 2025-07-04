import React, { useState } from 'react';
import { PenTool, Image, Download, Sparkles, Eye } from 'lucide-react';

const VisualAids: React.FC = () => {
  const [description, setDescription] = useState('');
  const [diagramType, setDiagramType] = useState('flowchart');
  const [complexity, setComplexity] = useState('simple');
  const [generatedAid, setGeneratedAid] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const diagramTypes = [
    { value: 'flowchart', label: 'Flowchart', description: 'Process flows and decision trees' },
    { value: 'cycle', label: 'Cycle Diagram', description: 'Circular processes like water cycle' },
    { value: 'hierarchy', label: 'Hierarchy', description: 'Organization and classification' },
    { value: 'timeline', label: 'Timeline', description: 'Sequential events and history' },
    { value: 'comparison', label: 'Comparison', description: 'Compare and contrast elements' },
    { value: 'anatomy', label: 'Anatomy', description: 'Body parts and structures' },
    { value: 'map', label: 'Map/Layout', description: 'Geographic or spatial layouts' },
    { value: 'chart', label: 'Chart/Graph', description: 'Data visualization' },
  ];

  const complexityLevels = [
    { value: 'simple', label: 'Simple', description: 'Basic shapes and minimal text' },
    { value: 'moderate', label: 'Moderate', description: 'Some detail with labels' },
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive with annotations' },
  ];

  const sampleDescriptions = [
    "Water cycle showing evaporation, condensation, and precipitation",
    "Human digestive system with major organs",
    "Plant life cycle from seed to flower",
    "Solar system with planets in order",
    "Food chain in a forest ecosystem",
    "How a volcano erupts",
    "States of matter: solid, liquid, gas",
    "Photosynthesis process in plants",
  ];

  const handleGenerate = async () => {
    if (!description.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call to generate visual aid
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // For demo purposes, we'll show a placeholder SVG
    const mockSVG = `
      <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Water Cycle Diagram -->
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Sky Background -->
        <rect width="400" height="200" fill="url(#skyGradient)"/>
        
        <!-- Sun -->
        <circle cx="350" cy="50" r="25" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
        
        <!-- Clouds -->
        <ellipse cx="100" cy="60" rx="30" ry="20" fill="#FFF" opacity="0.8"/>
        <ellipse cx="120" cy="50" rx="35" ry="25" fill="#FFF" opacity="0.8"/>
        <ellipse cx="140" cy="60" rx="30" ry="20" fill="#FFF" opacity="0.8"/>
        
        <!-- Mountains -->
        <polygon points="0,200 80,120 160,200" fill="#8B7355"/>
        <polygon points="120,200 200,100 280,200" fill="#A0522D"/>
        
        <!-- Water Body -->
        <ellipse cx="320" cy="250" rx="70" ry="30" fill="#4682B4"/>
        
        <!-- Evaporation Arrows -->
        <path d="M 320 220 Q 325 190 330 160" stroke="#FF6B6B" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
        <path d="M 340 225 Q 345 195 350 165" stroke="#FF6B6B" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
        
        <!-- Condensation Arrows -->
        <path d="M 150 80 Q 155 110 160 140" stroke="#4ECDC4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
        
        <!-- Precipitation -->
        <path d="M 130 80 L 125 100 M 140 75 L 135 95 M 150 80 L 145 100" stroke="#4682B4" stroke-width="2"/>
        
        <!-- Labels -->
        <text x="350" y="190" text-anchor="middle" font-family="Arial" font-size="12" fill="#333">Evaporation</text>
        <text x="120" y="40" text-anchor="middle" font-family="Arial" font-size="12" fill="#333">Condensation</text>
        <text x="100" y="110" text-anchor="middle" font-family="Arial" font-size="12" fill="#333">Precipitation</text>
        <text x="320" y="290" text-anchor="middle" font-family="Arial" font-size="12" fill="#333">Collection</text>
        
        <!-- Arrow marker -->
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
          </marker>
        </defs>
      </svg>
    `;
    
    setGeneratedAid(mockSVG);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (generatedAid) {
      const blob = new Blob([generatedAid], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'visual-aid.svg';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <PenTool className="h-8 w-8 text-orange-500 mr-3" />
          Visual Aids Generator
        </h1>
        <p className="text-lg text-gray-600 mt-2">Generate simple diagrams and charts for blackboard teaching</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Diagram Settings</h2>
            
            {/* Diagram Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagram Type</label>
              <select
                value={diagramType}
                onChange={(e) => setDiagramType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {diagramTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {diagramTypes.find(t => t.value === diagramType)?.description}
              </p>
            </div>

            {/* Complexity Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Complexity Level</label>
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {complexityLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {complexityLevels.find(l => l.value === complexity)?.description}
              </p>
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you want to visualize..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent h-24 resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!description.trim() || isGenerating}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Sparkles className="h-5 w-5 mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Visual Aid'}
            </button>
          </div>

          {/* Sample Descriptions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Descriptions</h3>
            <div className="space-y-2">
              {sampleDescriptions.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setDescription(sample)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Visual Aid</h2>
              {generatedAid && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download SVG
                  </button>
                </div>
              )}
            </div>
            
            {generatedAid ? (
              <div className="bg-gray-50 rounded-lg p-4 min-h-96 flex items-center justify-center">
                <div
                  dangerouslySetInnerHTML={{ __html: generatedAid }}
                  className="max-w-full"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your visual aid will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Describe what you want to visualize and click generate</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Tips for Better Visual Aids</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Be specific about what you want to show (e.g., "water cycle with evaporation arrows")</li>
          <li>• Mention key elements you want included (labels, arrows, colors)</li>
          <li>• Keep it simple for easy blackboard reproduction</li>
          <li>• Generated diagrams are in SVG format for easy scaling and editing</li>
        </ul>
      </div>
    </div>
  );
};

export default VisualAids;