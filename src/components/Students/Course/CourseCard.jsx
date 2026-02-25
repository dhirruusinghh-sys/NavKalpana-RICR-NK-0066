import { useState } from 'react';
import { Clock, MoreHorizontal } from 'lucide-react';

export default function CourseCard({ course }) {
  const [isHovered, setIsHovered] = useState(false);

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#1c513e';
    if (progress >= 50) return '#1c513e';
    return '#1c513e';
  };

  const getStatusBadge = (progress) => {
    if (progress === 100) return { text: 'Completed', bgColor: '#1c513e', textColor: 'white' };
    if (progress > 0) return { text: 'In Progress', bgColor: '#d0fae5', textColor: '#1c513e' };
    return { text: 'Not Started', bgColor: '#eefdf8', textColor: '#1c513e' };
  };

  const status = getStatusBadge(course.progress);

  return (
    <div 
      className="group rounded-2xl p-6 shadow-sm border transition-all duration-300 cursor-pointer relative overflow-hidden"
      style={{ 
        backgroundColor: 'white', 
        borderColor: '#d0fae5',
        boxShadow: isHovered ? '0 10px 40px rgba(28, 81, 62, 0.1)' : '0 1px 3px rgba(28, 81, 62, 0.05)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Gradient Overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{ 
          background: 'linear-gradient(to bottom right, rgba(208, 250, 229, 0.3), transparent)',
          opacity: isHovered ? 1 : 0
        }} 
      />

      {/* Header */}
      <div className="relative flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ backgroundColor: status.bgColor, color: status.textColor }}
            >
              {status.text}
            </span>
            {course.progress >= 80 && (
              <span 
                className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: '#eefdf8', color: '#1c513e' }}
              >
                ⭐ On Track
              </span>
            )}
          </div>
          <h3 
            className="font-bold text-xl transition-colors line-clamp-1"
            style={{ color: '#1c513e' }}
          >
            {course.title}
          </h3>
          <div className="flex items-center gap-2 text-sm mt-1" style={{ color: '#1c513e', opacity: 0.7 }}>
            <span className="font-medium" style={{ color: '#1c513e', opacity: 0.9 }}>{course.professor}</span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#1c513e', opacity: 0.3 }} />
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.time}
            </span>
          </div>
        </div>
        
        <button 
          className="p-2 rounded-full transition-colors"
          style={{ 
            backgroundColor: isHovered ? '#eefdf8' : 'transparent',
            color: '#1c513e'
          }}
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Tags */}
      <div className="relative flex gap-2 mb-5 flex-wrap">
        {course.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors"
            style={{ 
              backgroundColor: '#eefdf8', 
              color: '#1c513e',
              borderColor: '#d0fae5'
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Progress Section */}
      <div className="relative mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: '#1c513e', opacity: 0.8 }}>Score Progress</span>
          <span className="text-sm font-bold" style={{ color: '#1c513e' }}>{course.progress}%</span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: '#eefdf8' }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out relative"
            style={{ 
              width: `${course.progress}%`,
              backgroundColor: getProgressColor(course.progress)
            }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}