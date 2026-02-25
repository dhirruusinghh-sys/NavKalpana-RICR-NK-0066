import React, { useRef } from "react";

const ImprovedTestPage = () => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [files, setFiles] = React.useState([]);
  const [isExtracting, setIsExtracting] = React.useState(false);
  const [extractedTopics, setExtractedTopics] = React.useState([]);
  const [viewMode, setViewMode] = React.useState("grid"); // grid or list
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'text/plain'
    );

    if (droppedFiles.length > 0) {
      addFilesWithProgress(droppedFiles);
    }
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      addFilesWithProgress(selectedFiles);
    }
  };

  const addFilesWithProgress = (filesToAdd) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFiles(prev => [...prev, ...filesToAdd.map(f => ({
            name: f.name,
            size: f.size,
            uploadedAt: new Date()
          }))]);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 100);
  };

  const handleExtract = () => {
    if (files.length === 0) return;

    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      // Simulate extracted topics
      const mockTopics = [
        { id: 1, name: "Machine Learning Basics", count: 12 },
        { id: 2, name: "Neural Networks", count: 8 },
        { id: 3, name: "Data Preprocessing", count: 6 },
        { id: 4, name: "Model Evaluation", count: 5 },
        { id: 5, name: "Feature Engineering", count: 7 },
        { id: 6, name: "Overfitting Prevention", count: 4 }
      ];
      setExtractedTopics(mockTopics);
    }, 2000);
  };

  const clearAll = () => {
    setFiles([]);
    setUploadProgress(0);
    setExtractedTopics([]);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter(f => f.name !== fileName));
  };

  const fileCount = files.length;
  const topicCount = extractedTopics.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
      {/* Top Navigation Bar */}
 
      <div className="flex  p-6  shadow-lg shadow-[#1c513e]   m-2 ml-2">

        {/* LEFT SIDEBAR */}
        <div className="w-80 ">

        
          {/* Recent Files Card */}
          <div className="bg-white h-[100%] shadow-sm border border-slate-200 p-6">
            <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              📋 Notes
              {fileCount > 0 && (
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">
                  {fileCount}
                </span>
              )}
            </h2>

            {fileCount === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-slate-400">No Notes</p>
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm flex-shrink-0">📄</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                      <p className="text-xs text-slate-400">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(file.name)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
                      title="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>


        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="flex-1">
          <div className="bg-white  shadow-sm border border-slate-200 min-h-[600px] flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900">Topics</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 ${topicCount > 0
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                  }`}>
                  {topicCount}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all ${viewMode === "grid"
                        ? 'bg-white shadow-sm text-slate-900'
                        : 'text-slate-400 hover:text-slate-600'
                      }`}
                    title="Grid view"
                  >
                    ⊞
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all ${viewMode === "list"
                        ? 'bg-white shadow-sm text-slate-900'
                        : 'text-slate-400 hover:text-slate-600'
                      }`}
                    title="List view"
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {topicCount === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <div className="relative">
                    <div className="text-7xl mb-4 opacity-25 animate-pulse">📁</div>
                    <div className="absolute -top-1 -right-3 text-3xl animate-bounce" style={{ animationDelay: "0.2s" }}>✨</div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-600 mb-2">No topics extracted yet</h3>
                  <p className="text-sm text-slate-400 max-w-xs text-center mb-8">
                    Upload your notes using the panel on the left, then click "Extract Topics" to let AI identify key points automatically
                  </p>
                  <button className="bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-100 active:bg-emerald-200 transition-colors shadow-sm">
                    View Sample Output →
                  </button>
                </div>
              ) : (
                <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 auto-rows-max" : "grid-cols-1"}`}>
                  {extractedTopics.map((topic, i) => (
                    <div
                      key={topic.id}
                      className="group bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-emerald-300 transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug flex-1">
                          {topic.name}
                        </h3>
                        <span className="ml-2 text-xs font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full flex-shrink-0">
                          {topic.count}
                        </span>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex-1 text-xs bg-white text-slate-700 py-1.5 rounded-lg hover:bg-slate-100 font-medium transition-colors">
                          View
                        </button>
                        <button className="flex-1 text-xs bg-white text-slate-700 py-1.5 rounded-lg hover:bg-slate-100 font-medium transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Stats */}
            {topicCount > 0 && (
              <div className="border-t border-slate-100 p-4 flex justify-between items-center text-xs text-slate-500 bg-slate-50">
                <span className="font-medium">Showing {topicCount} topics</span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5 font-medium">⚡ Fast processing</span>
                  <span className="flex items-center gap-1.5 font-medium">🔒 Secure</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImprovedTestPage;