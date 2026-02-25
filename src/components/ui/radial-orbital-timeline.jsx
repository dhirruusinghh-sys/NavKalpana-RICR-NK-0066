"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap, Pause, Play, RotateCcw, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RadialOrbitalTimeline = ({ timelineData }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [viewMode, setViewMode] = useState("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showConnections, setShowConnections] = useState(true);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Primary color: #063e2a (dark green)
  const PRIMARY_COLOR = "#063e2a";
  const PRIMARY_LIGHT = "#0a5c3f";
  const PRIMARY_DARK = "#042818";

  const handleContainerClick = useCallback((e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  }, []);

  const toggleItem = useCallback((id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };

      // Close all other items
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  }, []);

  const getRelatedItems = useCallback((itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  }, [timelineData]);

  const isRelatedToActive = useCallback((itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  }, [activeNodeId, getRelatedItems]);

  // Auto-rotation effect
  useEffect(() => {
    let rotationTimer;

    if (autoRotate && viewMode === "orbital" && !isDragging) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.2) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode, isDragging]);

  const centerViewOnNode = useCallback((nodeId) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  }, [viewMode, timelineData]);

  const calculateNodePosition = useCallback((index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220; // Slightly larger radius
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );
    const scale = 0.8 + 0.2 * ((1 + Math.sin(radian)) / 2);

    return { x, y, angle, zIndex, opacity, scale };
  }, [rotationAngle, centerOffset]);

  const getStatusStyles = useCallback((status) => {
    switch (status) {
      case "completed":
        return "bg-[#063e2a] text-white border-[#063e2a]";
      case "in-progress":
        return "bg-white text-[#063e2a] border-[#063e2a] border-2";
      case "pending":
        return "bg-gray-100 text-gray-500 border-gray-300";
      default:
        return "bg-gray-100 text-gray-500 border-gray-300";
    }
  }, []);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case "completed":
        return "#063e2a";
      case "in-progress":
        return "#0a5c3f";
      case "pending":
        return "#9ca3af";
      default:
        return "#9ca3af";
    }
  }, []);

  // Drag handlers for manual rotation
  const handleMouseDown = useCallback((e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setIsDragging(true);
      setAutoRotate(false);
      dragStartRef.current = { x: e.clientX, y: e.clientY, angle: rotationAngle };
    }
  }, [rotationAngle]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const newAngle = (dragStartRef.current.angle + deltaX * 0.5) % 360;
    setRotationAngle(Number(newAngle.toFixed(3)));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const resetView = useCallback(() => {
    setRotationAngle(0);
    setCenterOffset({ x: 0, y: 0 });
    setAutoRotate(true);
    setExpandedItems({});
    setActiveNodeId(null);
  }, []);

  // Calculate connection lines
  const getConnectionLines = useCallback(() => {
    if (!showConnections || !activeNodeId) return [];

    const activeNode = timelineData.find(item => item.id === activeNodeId);
    if (!activeNode) return [];

    const activeIndex = timelineData.findIndex(item => item.id === activeNodeId);
    const activePos = calculateNodePosition(activeIndex, timelineData.length);

    return activeNode.relatedIds.map(relatedId => {
      const relatedIndex = timelineData.findIndex(item => item.id === relatedId);
      const relatedPos = calculateNodePosition(relatedIndex, timelineData.length);

      return {
        x1: activePos.x,
        y1: activePos.y,
        x2: relatedPos.x,
        y2: relatedPos.y,
        id: `${activeNodeId}-${relatedId}`
      };
    });
  }, [activeNodeId, showConnections, timelineData, calculateNodePosition]);

  const connections = getConnectionLines();

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center  from-gray-50 to-white overflow-hidden relative bg-[#f3f4f6]"
      ref={containerRef}
      onClick={handleContainerClick}
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Header Controls */}
      <div className="absolute top-6 left-6 z-50 flex flex-col gap-3 ">


        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-[#063e2a]/10 p-2 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setAutoRotate(!autoRotate);
            }}
            className="justify-start gap-2 text-[#063e2a] hover:bg-[#063e2a]/10"
          >
            {autoRotate ? <Pause size={16} /> : <Play size={16} />}
            {autoRotate ? "Pause" : "Play"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              resetView();
            }}
            className="justify-start gap-2 text-[#063e2a] hover:bg-[#063e2a]/10"
          >
            <RotateCcw size={16} />
            Reset
          </Button>


        </div>
      </div>



      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1200px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Connection Lines SVG */}
          <svg className="absolute w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
            {connections.map(conn => (
              <line
                key={conn.id}

                stroke="#063e2a"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.4"
                className="animate-pulse"
              />
            ))}
          </svg>

          {/* Central Hub */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#063e2a] via-[#0a5c3f] to-[#063e2a] shadow-2xl flex items-center justify-center z-20 animate-pulse">
            <div className="absolute w-28 h-28 rounded-full border-2 border-[#063e2a]/20 animate-ping"></div>
            <div className="absolute w-32 h-32 rounded-full border border-[#063e2a]/10 animate-ping" style={{ animationDelay: "0.5s" }}></div>
            <div className="w-10 h-10 rounded-full bg-white shadow-inner flex items-center justify-center">
              <Zap size={20} className="text-[#063e2a]" />
            </div>
          </div>

          {/* Orbit Ring */}
          <div className="absolute w-[440px] h-[440px] rounded-full border-2 border-dashed border-[#063e2a]/20 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[440px] h-[440px] rounded-full border border-[#063e2a]/10"></div>

          {/* Timeline Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const isHovered = hoveredNodeId === item.id;
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px) scale(${isExpanded ? 1.2 : position.scale})`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-500 ease-out"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                onMouseEnter={() => setHoveredNodeId(item.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Energy Glow Effect */}
                <div
                  className={`absolute rounded-full transition-all duration-500 ${isPulsing ? 'animate-pulse' : ''}`}
                  style={{
                    background: `radial-gradient(circle, ${getStatusColor(item.status)}20 0%, transparent 70%)`,
                    width: `${item.energy * 0.8 + 50}px`,
                    height: `${item.energy * 0.8 + 50}px`,
                    left: `-${(item.energy * 0.8 + 50 - 48) / 2}px`,
                    top: `-${(item.energy * 0.8 + 50 - 48) / 2}px`,
                    opacity: isHovered || isExpanded ? 0.8 : 0.4,
                  }}
                ></div>

                {/* Node Circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    transition-all duration-300 shadow-lg
                   
                    ${isHovered ? "scale-110 shadow-xl" : ""}
                    ${isPulsing ? "animate-bounce" : ""}
                  `}
                  style={{
                    border: `3px solid #063e2a`,
                  }}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>

                {/* Label */}
                <div
                  className={`
                    absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-sm font-bold tracking-wide
                    transition-all duration-300 px-3 py-1 rounded-full
                    ${isExpanded
                      ? "text-[#063e2a] bg-white shadow-md scale-110"
                      : isRelated
                        ? "text-[#063e2a] bg-[#063e2a]/10"
                        : "text-gray-600"
                    }
                  `}
                >
                  {item.title}
                </div>


                {/* Expanded Card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-white shadow-2xl border-[#063e2a]/20 overflow-visible animate-in fade-in zoom-in duration-300">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#063e2a]/30"></div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-t border-l border-[#063e2a]/20"></div>

                    <CardHeader className="pb-3 bg-gradient-to-r from-[#063e2a]/5 to-transparent">

                      <CardTitle className="text-base  text-[#063e2a]">
                        {item.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="text-sm text-gray-600">
                      <p className="leading-relaxed">{item.content}</p>


                      {/* Connected Nodes */}
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center mb-3">
                            <Link size={12} className="text-[#063e2a] mr-2" />
                            <h4 className="text-xs uppercase tracking-wider font-bold text-[#063e2a]">
                              Connected Phases
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-7 px-3 text-xs rounded-full border-[#063e2a]/30 bg-white hover:bg-[#063e2a] hover:text-white transition-all duration-300 text-[#063e2a]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={10} className="ml-1" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}


                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-6 text-xs text-gray-400">
        <p>Drag to rotate • Click nodes to expand • Click background to reset</p>
      </div>
    </div>
  );
};

export default RadialOrbitalTimeline;