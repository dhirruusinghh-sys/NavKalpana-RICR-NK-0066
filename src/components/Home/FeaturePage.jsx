"use client";

import React from "react";

const leftNodes = [
  { id: 1, name: "Google Drive" },
  { id: 2, name: "Notion" },
  { id: 3, name: "WhatsApp" },
];

const rightNodes = [
  { id: 4, name: "Google Docs" },
  { id: 5, name: "Zapier" },
  { id: 6, name: "Messenger" },
];

export default function IntegrationGraph() {
  return (
    <div className="relative w-full h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      
      {/* SVG Lines */}
      <svg className="absolute w-full h-full pointer-events-none">
        {/* Left side curves */}
        {leftNodes.map((_, i) => (
          <path
            key={i}
            d={`M 35% ${40 + i * 10}% Q 50% 50% 50% 50%`}
            stroke="#d1d5db"
            strokeWidth="2"
            fill="transparent"
          />
        ))}

        {/* Right side curves */}
        {rightNodes.map((_, i) => (
          <path
            key={i}
            d={`M 65% ${40 + i * 10}% Q 50% 50% 50% 50%`}
            stroke="#d1d5db"
            strokeWidth="2"
            fill="transparent"
          />
        ))}
      </svg>

      {/* Center Circle */}
      <div className="absolute w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center text-black font-bold text-xl z-10">
        AI
      </div>

      {/* Left Nodes */}
      <div className="absolute left-[30%] flex flex-col gap-12">
        {leftNodes.map((node) => (
          <div
            key={node.id}
            className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
          >
            {node.name[0]}
          </div>
        ))}
      </div>

      {/* Right Nodes */}
      <div className="absolute right-[30%] flex flex-col gap-12">
        {rightNodes.map((node) => (
          <div
            key={node.id}
            className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
          >
            {node.name[0]}
          </div>
        ))}
      </div>
    </div>
  );
}
