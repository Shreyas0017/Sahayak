import React, { useState } from 'react';
import { PenTool, Image, Download, Sparkles, Eye, AlertCircle, Key } from 'lucide-react';

const VisualAids: React.FC = () => {
  const [description, setDescription] = useState('');
  const [diagramType, setDiagramType] = useState('flowchart');
  const [complexity, setComplexity] = useState('simple');
  const [generatedAid, setGeneratedAid] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

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

  const buildPrompt = () => {
    const selectedType = diagramTypes.find(type => type.value === diagramType);
    const selectedComplexity = complexityLevels.find(level => level.value === complexity);

    return `Create an SVG diagram for: "${description}"

Requirements:
- Diagram type: ${selectedType?.label} (${selectedType?.description})
- Complexity level: ${selectedComplexity?.label} (${selectedComplexity?.description})
- Create a complete, valid SVG with proper structure
- Use educational colors and clear, readable fonts
- Include appropriate labels and annotations
- Make it suitable for blackboard teaching (simple, clear lines)
- Optimize for 400x300 viewBox dimensions
- Use semantic elements and proper grouping
- Include arrows, connectors, and visual flow indicators where appropriate

IMPORTANT: 
- Return ONLY the complete SVG code starting with <svg> and ending with </svg>
- Do not include any explanatory text before or after the SVG
- Use clean, educational styling suitable for classroom use
- Ensure all text is legible and properly positioned
- Use appropriate colors that work well for educational materials

Generate the complete SVG diagram now:`;
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    if (!apiKey) {
      setError('Gemini API key not found in environment variables');
      return;
    }
    
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: buildPrompt()
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 20,
            topP: 0.8,
            maxOutputTokens: 4096,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate visual aid');
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        let content = data.candidates[0].content.parts[0].text;
        
        // Clean up the response to extract only the SVG
        const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/i);
        if (svgMatch) {
          content = svgMatch[0];
        } else {
          // If no SVG found, try to extract from code blocks
          const codeBlockMatch = content.match(/```[\s\S]*?<svg[\s\S]*?<\/svg>[\s\S]*?```/i);
          if (codeBlockMatch) {
            const svgInCode = codeBlockMatch[0].match(/<svg[\s\S]*?<\/svg>/i);
            if (svgInCode) {
              content = svgInCode[0];
            }
          }
        }
        
        // Validate that we have a proper SVG
        if (!content.includes('<svg')) {
          throw new Error('Generated content is not a valid SVG');
        }
        
        setGeneratedAid(content);
      } else {
        throw new Error('No content generated');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the visual aid');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedAid) {
      const blob = new Blob([generatedAid], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `visual-aid-${diagramType}-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadPNG = () => {
    if (generatedAid) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 800;
        canvas.height = 600;
        ctx?.drawImage(img, 0, 0, 800, 600);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `visual-aid-${diagramType}-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        }, 'image/png');
      };
      
      const svgBlob = new Blob([generatedAid], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      img.src = url;
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

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!description.trim() || !apiKey || isGenerating}
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
                  <button
                    onClick={handleDownloadPNG}
                    className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download PNG
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
          <li>• Use the sample descriptions as templates for your own requests</li>
          <li>• Complex diagrams work better with "detailed" complexity setting</li>
        </ul>
      </div>
    </div>
  );
};

export default VisualAids;