import React, { useState } from 'react';
import { BookOpen, Upload, Download, Eye, Layers } from 'lucide-react';

const DifferentiatedMaterials: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  interface Material {
    id: number;
    grade: string;
    level: string;
    title: string;
    description: string;
    difficulty: string;
    color: string;
  }

  const [generatedMaterials, setGeneratedMaterials] = useState<Material[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessImage = async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    // Simulate API call to Google Gemini Vision
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated materials
    const mockMaterials = [
      {
        id: 1,
        grade: 'Grade 1-2',
        level: 'Beginner',
        title: 'Basic Addition with Pictures',
        description: 'Simple addition problems using visual aids and single digits',
        difficulty: 'Easy',
        color: 'bg-green-100 text-green-800'
      },
      {
        id: 2,
        grade: 'Grade 3-4',
        level: 'Intermediate',
        title: 'Addition with Word Problems',
        description: 'Story-based addition problems with two-digit numbers',
        difficulty: 'Medium',
        color: 'bg-yellow-100 text-yellow-800'
      },
      {
        id: 3,
        grade: 'Grade 5-6',
        level: 'Advanced',
        title: 'Multi-step Addition Problems',
        description: 'Complex addition with multiple steps and reasoning',
        difficulty: 'Hard',
        color: 'bg-red-100 text-red-800'
      }
    ];
    
    setGeneratedMaterials(mockMaterials);
    setIsProcessing(false);
  };

  const handleDownload = (materialId: number) => {
    // Simulate download
    console.log(`Downloading material ${materialId}`);
  };

  const handlePreview = (materialId: number) => {
    // Simulate preview
    console.log(`Previewing material ${materialId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <BookOpen className="h-8 w-8 text-orange-500 mr-3" />
          Differentiated Materials
        </h1>
        <p className="text-lg text-gray-600 mt-2">Upload textbook pages and get multiple versions for different grade levels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Textbook Page</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
              {uploadedImage ? (
                <div className="space-y-4">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded textbook page" 
                    className="max-w-full h-64 object-contain mx-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600">Textbook page uploaded successfully</p>
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="text-sm text-red-600 hover:text-red-700 underline"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">Upload a textbook page</p>
                    <p className="text-gray-600">PNG, JPG, or PDF up to 10MB</p>
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                      Choose File
                    </span>
                  </label>
                </div>
              )}
            </div>

            {uploadedImage && (
              <div className="mt-6">
                <button
                  onClick={handleProcessImage}
                  disabled={isProcessing}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Layers className="h-5 w-5 mr-2" />
                  )}
                  {isProcessing ? 'Processing...' : 'Generate Differentiated Materials'}
                </button>
              </div>
            )}
          </div>

          {/* Processing Status */}
          {isProcessing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Processing your textbook page...</p>
                  <p className="text-sm text-blue-700">AI is analyzing content and creating differentiated versions</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Generated Materials Section */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Materials</h2>
            
            {generatedMaterials.length > 0 ? (
              <div className="space-y-4">
                {generatedMaterials.map((material) => (
                  <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${material.color}`}>
                            {material.grade}
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{material.level}</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{material.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Difficulty:</span>
                          <span className="text-xs font-medium text-gray-700">{material.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handlePreview(material.id)}
                        className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleDownload(material.id)}
                        className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No materials generated yet</p>
                <p className="text-sm text-gray-400 mt-2">Upload a textbook page to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-orange-900 mb-2">Tips for Better Results</h3>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• Ensure the textbook page is clear and well-lit</li>
          <li>• Include the full page content including headers and page numbers</li>
          <li>• For best results, use pages with exercises, problems, or activities</li>
          <li>• The AI will automatically identify the subject and grade level</li>
        </ul>
      </div>
    </div>
  );
};

export default DifferentiatedMaterials;