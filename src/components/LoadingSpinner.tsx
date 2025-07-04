import React from 'react';
import { BookOpen } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <BookOpen className="h-16 w-16 text-orange-500 mx-auto animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <div className="h-16 w-16 border-4 border-orange-200 border-t-orange-500 rounded-full"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mt-4">Loading Sahayak...</h2>
        <p className="text-gray-600 mt-2">Preparing your AI teaching assistant</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;