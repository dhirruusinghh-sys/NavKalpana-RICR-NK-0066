"use client";

import { Calendar, Code, FileText, Users, Clock, Rocket, TestTube, CheckCircle } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Discovery",
    date: "Jan 2024",
    content: "Initial project discovery, stakeholder interviews, and requirements gathering. Establishing project scope and objectives.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2, 3],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Strategy",
    date: "Feb 2024",
    content: "Strategic planning, resource allocation, and timeline establishment. Risk assessment and mitigation planning.",
    category: "Planning",
    icon: CheckCircle,
    relatedIds: [1, 3, 4],
    status: "completed",
    energy: 95,
  },
  {
    id: 3,
    title: "Design",
    date: "Feb-Mar 2024",
    content: "UI/UX design, wireframing, prototyping, and design system creation. User feedback integration.",
    category: "Design",
    icon: FileText,
    relatedIds: [2, 4, 5],
    status: "completed",
    energy: 90,
  },
  {
    id: 4,
    title: "Development",
    date: "Mar-Apr 2024",
    content: "Frontend and backend implementation, API integration, database design, and core feature development.",
    category: "Development",
    icon: Code,
    relatedIds: [3, 5, 6],
    status: "in-progress",
    energy: 65,
  },
  {
    id: 5,
    title: "Testing",
    
    content: "QA testing, user acceptance testing, performance optimization, and bug fixes.",
    category: "Testing",
    icon: TestTube,
    relatedIds: [4, 6, 7],
  },
  {
    id: 6,
    title: "Review",
    date: "Apr-May 2024",
    content: "Stakeholder review, feedback collection, final adjustments, and approval process.",
    category: "Review",
    icon: Users,
    relatedIds: [5, 7],
    status: "pending",
    energy: 25,
  },
  {
    id: 7,
    title: "Launch",
    date: "May 2024",
    content: "Production deployment, monitoring setup, user onboarding, and post-launch support.",
    category: "Release",
    icon: Rocket,
    relatedIds: [6],
    status: "pending",
    energy: 10,
  },
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default RadialOrbitalTimelineDemo;