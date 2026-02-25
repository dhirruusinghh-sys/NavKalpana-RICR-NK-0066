import { useState, useMemo } from 'react';
import { Search, Grid3X3, List, BookOpen, TrendingUp } from 'lucide-react';
import CourseCard from './CourseCard';

const coursesData = [
  {
    id: 1,
    title: "Advanced Algorithms",
    professor: "Prof. Alan Turing",
    time: "10:00 AM",
    progress: 75,
    tags: ["Core", "CS301"],
    next: "10:00 AM",
    assignments: "2 assignments due",
    category: "Core"
  },
  {
    id: 2,
    title: "Database Systems",
    professor: "Prof. Ada Lovelace",
    time: "Tue, Thu 02:00 PM",
    progress: 40,
    tags: ["Core", "CS305"],
    next: "02:00 PM",
    assignments: "1 assignment due",
    category: "Core"
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    professor: "Prof. Jony Ive",
    time: "11:00 AM",
    progress: 90,
    tags: ["Design", "UX210", "Project-heavy"],
    next: "Final review",
    assignments: "1 project left",
    category: "Design"
  },
  {
    id: 4,
    title: "Computer Architecture",
    professor: "Prof. Grace Hopper",
    time: "03:00 PM",
    progress: 55,
    tags: ["Lab", "CS210"],
    next: "Mon, 03:00 PM",
    assignments: "2 labs due",
    category: "Lab"
  },
];

const tabs = [
  { id: 'all', label: 'All Courses', count: null },
  { id: 'active', label: 'In Progress', count: null },
  { id: 'completed', label: 'Completed', count: null },
];

export default function Courses() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredCourses = useMemo(() => {
    let filtered = coursesData;
    
    if (activeTab === 'active') filtered = filtered.filter(c => c.progress > 0 && c.progress < 100);
    if (activeTab === 'completed') filtered = filtered.filter(c => c.progress === 100);
    
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.professor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeTab, searchQuery]);

  const stats = useMemo(() => {
    const total = coursesData.length;
    const completed = coursesData.filter(c => c.progress === 100).length;
    const inProgress = coursesData.filter(c => c.progress > 0 && c.progress < 100).length;
    const avgProgress = Math.round(coursesData.reduce((acc, c) => acc + c.progress, 0) / total);
    return { total, completed, inProgress, avgProgress };
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-8" style={{ backgroundColor: '#eefdf8' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: '#1c513e' }}>My Courses</h1>
            <p className="text-sm" style={{ color: '#1c513e', opacity: 0.7 }}>Track your learning progress</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: '#1c513e', opacity: 0.5 }} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-64 rounded-xl border outline-none transition-all shadow-sm"
                style={{ 
                  backgroundColor: 'white', 
                  borderColor: '#d0fae5',
                  color: '#1c513e'
                }}
              />
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl border shadow-sm" style={{ backgroundColor: 'white', borderColor: '#d0fae5' }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#d0fae5' }}>
                <BookOpen className="w-5 h-5" style={{ color: '#1c513e' }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: '#1c513e' }}>{stats.total}</p>
                <p className="text-xs uppercase tracking-wide" style={{ color: '#1c513e', opacity: 0.6 }}>Total</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border shadow-sm" style={{ backgroundColor: 'white', borderColor: '#d0fae5' }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#d0fae5' }}>
                <TrendingUp className="w-5 h-5" style={{ color: '#1c513e' }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: '#1c513e' }}>{stats.inProgress}</p>
                <p className="text-xs uppercase tracking-wide" style={{ color: '#1c513e', opacity: 0.6 }}>Active</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border shadow-sm" style={{ backgroundColor: 'white', borderColor: '#d0fae5' }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#d0fae5' }}>
                <div className="w-5 h-5 rounded-full border-2 border-t-transparent" style={{ borderColor: '#1c513e' }} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: '#1c513e' }}>{stats.avgProgress}%</p>
                <p className="text-xs uppercase tracking-wide" style={{ color: '#1c513e', opacity: 0.6 }}>Avg Progress</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border shadow-sm" style={{ backgroundColor: 'white', borderColor: '#d0fae5' }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#1c513e' }}>
                <div className="w-5 h-5 rounded-full bg-white" />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: '#1c513e' }}>{stats.completed}</p>
                <p className="text-xs uppercase tracking-wide" style={{ color: '#1c513e', opacity: 0.6 }}>Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2 p-1 rounded-xl border shadow-sm" style={{ backgroundColor: 'white', borderColor: '#d0fae5' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeTab === tab.id ? '#1c513e' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#1c513e',
                  opacity: activeTab === tab.id ? 1 : 0.7
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: '#1c513e', opacity: 0.7 }}>
              Showing <span className="font-semibold" style={{ color: '#1c513e' }}>{filteredCourses.length}</span> courses
            </span>
            <div className="flex rounded-lg border p-1 shadow-sm" style={{ backgroundColor: 'white', borderColor: '#d0fae5' }}>
              <button 
                onClick={() => setViewMode('grid')}
                className="p-2 rounded-md transition-colors"
                style={{ 
                  backgroundColor: viewMode === 'grid' ? '#d0fae5' : 'transparent',
                  color: '#1c513e'
                }}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className="p-2 rounded-md transition-colors"
                style={{ 
                  backgroundColor: viewMode === 'list' ? '#d0fae5' : 'transparent',
                  color: '#1c513e'
                }}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2' 
              : 'grid-cols-1'
          }`}>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed" style={{ backgroundColor: 'white', borderColor: '#d0fae5' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#eefdf8' }}>
              <Search className="w-8 h-8" style={{ color: '#1c513e', opacity: 0.4 }} />
            </div>
            <h3 className="text-lg font-semibold mb-1" style={{ color: '#1c513e' }}>No courses found</h3>
            <p style={{ color: '#1c513e', opacity: 0.6 }}>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}