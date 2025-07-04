import React from 'react';
import { 
  FileText, 
  BookOpen, 
  MessageCircle, 
  PenTool, 
  Calendar,
  Gamepad2,
  Mic,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

interface DashboardProps {
  onModuleChange: (module: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onModuleChange }) => {
  const quickActions = [
    { id: 'content', name: 'Generate Content', icon: FileText, color: 'bg-blue-500', description: 'Create localized stories and lessons' },
    { id: 'materials', name: 'Create Materials', icon: BookOpen, color: 'bg-green-500', description: 'Upload textbook, get differentiated worksheets' },
    { id: 'knowledge', name: 'Ask Questions', icon: MessageCircle, color: 'bg-purple-500', description: 'Get simple explanations for complex topics' },
    { id: 'visual', name: 'Visual Aids', icon: PenTool, color: 'bg-orange-500', description: 'Generate diagrams and charts' },
    { id: 'planner', name: 'Plan Lessons', icon: Calendar, color: 'bg-indigo-500', description: 'AI-powered lesson planning' },
    { id: 'games', name: 'Educational Games', icon: Gamepad2, color: 'bg-pink-500', description: 'Generate fun learning games' },
  ];

  const stats = [
    { name: 'Content Created', value: '24', icon: FileText, change: '+12%' },
    { name: 'Students Helped', value: '156', icon: Users, change: '+8%' },
    { name: 'Time Saved', value: '32h', icon: Clock, change: '+15%' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Sahayak</h1>
        <p className="text-lg text-gray-600 mt-2">Your AI-powered teaching assistant for multi-grade classrooms</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onModuleChange(action.id)}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-left group"
              >
                <div className="flex items-center mb-4">
                  <div className={`h-12 w-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-4">{action.name}</h3>
                </div>
                <p className="text-gray-600">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Created Marathi story about farmers and soil types</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Generated differentiated math worksheets for grades 3-5</p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Explained water cycle with simple analogies</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;