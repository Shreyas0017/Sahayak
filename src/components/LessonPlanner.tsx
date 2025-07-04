import React, { useState } from 'react';
import { Calendar, Clock, Users, BookOpen, Target, CheckCircle, Plus, Trash2 } from 'lucide-react';

const LessonPlanner: React.FC = () => {
  const [lessonData, setLessonData] = useState({
    subject: '',
    topic: '',
    duration: '45',
    grades: ['3', '4', '5'],
    objectives: [''],
    activities: [{ name: '', duration: '', type: 'instruction' }],
    resources: [''],
    assessment: ''
  });

  interface LessonPlan {
    title: string;
    duration: string;
    grades: string[];
    objectives: string[];
    timeline: { time: string; activity: string; type: string }[];
    resources: string[];
    differentiation: { [key: string]: string[] };
    assessment: { [key: string]: string[] };
  }
  
    const [generatedPlan, setGeneratedPlan] = useState<LessonPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const subjects = [
    'Mathematics',
    'Science',
    'English',
    'Hindi',
    'Marathi',
    'Social Studies',
    'Environmental Studies',
    'Art & Craft',
    'Physical Education'
  ];

  const activityTypes = [
    { value: 'instruction', label: 'Instruction', color: 'bg-blue-100 text-blue-800' },
    { value: 'discussion', label: 'Discussion', color: 'bg-green-100 text-green-800' },
    { value: 'practice', label: 'Practice', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'assessment', label: 'Assessment', color: 'bg-red-100 text-red-800' },
    { value: 'group', label: 'Group Work', color: 'bg-purple-100 text-purple-800' }
  ];

  const handleGeneratePlan = async () => {
    if (!lessonData.subject || !lessonData.topic) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPlan = {
      title: `${lessonData.subject}: ${lessonData.topic}`,
      duration: `${lessonData.duration} minutes`,
      grades: lessonData.grades,
      objectives: [
        'Students will understand the basic concepts of the topic',
        'Students will be able to apply knowledge in practical situations',
        'Students will demonstrate comprehension through activities'
      ],
      timeline: [
        { time: '0-5 min', activity: 'Introduction & Warm-up', type: 'instruction' },
        { time: '5-15 min', activity: 'Concept Introduction', type: 'instruction' },
        { time: '15-25 min', activity: 'Interactive Discussion', type: 'discussion' },
        { time: '25-35 min', activity: 'Practice Activities', type: 'practice' },
        { time: '35-40 min', activity: 'Group Exercise', type: 'group' },
        { time: '40-45 min', activity: 'Summary & Assessment', type: 'assessment' }
      ],
      resources: [
        'Blackboard and chalk',
        'Textbook pages 45-50',
        'Visual aids (charts/diagrams)',
        'Worksheets for practice',
        'Real-world examples'
      ],
      differentiation: {
        'Advanced Students': ['Extension questions', 'Peer tutoring roles', 'Research assignments'],
        'Struggling Students': ['Simplified explanations', 'Visual aids', 'Extra practice time'],
        'Different Grades': ['Grade-specific examples', 'Varied complexity levels', 'Adapted activities']
      },
      assessment: {
        'Formative': ['Observation during activities', 'Question-answer sessions', 'Peer discussions'],
        'Summative': ['End-of-lesson quiz', 'Worksheet completion', 'Practical demonstration']
      }
    };
    
    setGeneratedPlan(mockPlan);
    setIsGenerating(false);
  };

  const addObjective = () => {
    setLessonData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const removeObjective = (index: number) => {
    setLessonData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setLessonData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Calendar className="h-8 w-8 text-orange-500 mr-3" />
          AI Lesson Planner
        </h1>
        <p className="text-lg text-gray-600 mt-2">Create structured lesson plans for multi-grade classrooms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lesson Details</h2>
            
            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={lessonData.subject}
                onChange={(e) => setLessonData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Topic */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <input
                type="text"
                value={lessonData.topic}
                onChange={(e) => setLessonData(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="e.g., Water Cycle, Addition with Regrouping"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Duration (minutes)
              </label>
              <select
                value={lessonData.duration}
                onChange={(e) => setLessonData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
            </div>

            {/* Grades */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="h-4 w-4 inline mr-1" />
                Grades Present
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((grade) => (
                  <label key={grade} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={lessonData.grades.includes(grade.toString())}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLessonData(prev => ({ ...prev, grades: [...prev.grades, grade.toString()] }));
                        } else {
                          setLessonData(prev => ({ ...prev, grades: prev.grades.filter(g => g !== grade.toString()) }));
                        }
                      }}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="ml-1 text-sm text-gray-700">{grade}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="h-4 w-4 inline mr-1" />
                Learning Objectives
              </label>
              {lessonData.objectives.map((objective, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    placeholder="Students will be able to..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {lessonData.objectives.length > 1 && (
                    <button
                      onClick={() => removeObjective(index)}
                      className="ml-2 p-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addObjective}
                className="flex items-center text-sm text-orange-600 hover:text-orange-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Objective
              </button>
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={!lessonData.subject || !lessonData.topic || isGenerating}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <BookOpen className="h-5 w-5 mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Lesson Plan'}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Lesson Plan</h2>
            
            {generatedPlan ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{generatedPlan.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {generatedPlan.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Grades {generatedPlan.grades.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Objectives */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Learning Objectives</h4>
                  <ul className="space-y-1">
                    {generatedPlan.objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Lesson Timeline</h4>
                  <div className="space-y-3">
                    {generatedPlan.timeline.map((item: { time: string; activity: string; type: string }, index: number) => {
                      const activityType = activityTypes.find(t => t.value === item.type);
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-600 min-w-0 flex-shrink-0">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{item.activity}</div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activityType?.color}`}>
                            {activityType?.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Required Resources</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {generatedPlan.resources.map((resource: string, index: number) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Differentiation */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Differentiation Strategies</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(generatedPlan.differentiation).map(([category, strategies]) => (
                      <div key={category} className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">{category}</h5>
                        <ul className="space-y-1">
                          {(strategies as string[]).map((strategy, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              • {strategy}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessment */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Assessment Methods</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(generatedPlan.assessment).map(([type, methods]) => (
                      <div key={type} className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-2">{type} Assessment</h5>
                        <ul className="space-y-1">
                          {(methods as string[]).map((method, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              • {method}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your lesson plan will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Fill in the lesson details and click generate</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlanner;