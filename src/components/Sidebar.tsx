import React from 'react';
import { 
  FileText, 
  BookOpen, 
  MessageCircle, 
  PenTool, 
  Calendar,
  Gamepad2,
  Mic,
  Home,
  X
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange, isOpen, onClose }) => {
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'content', name: 'Content Generator', icon: FileText },
    { id: 'materials', name: 'Differentiated Materials', icon: BookOpen },
    { id: 'knowledge', name: 'Knowledge Base', icon: MessageCircle },
    { id: 'visual', name: 'Visual Aids', icon: PenTool },
    { id: 'planner', name: 'Lesson Planner', icon: Calendar },
    { id: 'games', name: 'Educational Games', icon: Gamepad2 },
    { id: 'assessment', name: 'Audio Assessment', icon: Mic },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={onClose} />
      )}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-4 md:mt-0">
          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Teaching Modules
            </p>
          </div>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => {
                  onModuleChange(module.id);
                  onClose();
                }}
                className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-colors duration-150 ${
                  activeModule === module.id
                    ? 'bg-orange-50 text-orange-700 border-r-2 border-orange-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {module.name}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;