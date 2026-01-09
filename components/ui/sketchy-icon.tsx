"use client";

import React, { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";

interface SketchyIconProps {
    icon: LucideIcon;
    className?: string;
    color?: string;
    delay?: number;
}

export default function SketchyIcon({ icon: Icon, className = "w-12 h-12", color = "currentColor", delay = 0 }: SketchyIconProps) {
    const [filterId] = useState(() => `rough-paper-${Math.random().toString(36).substr(2, 9)}`);

    return (
        <div className={`relative ${className} group`}>
            {/* 
         SVG Turbulence Filter for the "Boiling Line" (Squigglevision) effect.
         Values adjusted for a more distinct 'pencil' feel.
      */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id={filterId}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.04"
                            numOctaves="2"
                            result="noise"
                        >
                            <animate
                                attributeName="seed"
                                values="0;20;40;60;80"
                                dur="0.5s"
                                repeatCount="indefinite"
                                calcMode="discrete"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                    </filter>
                </defs>
            </svg>

            <style jsx global>{`
        @keyframes dash {
          from {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        
        .sketch-anim path, 
        .sketch-anim circle, 
        .sketch-anim rect, 
        .sketch-anim line, 
        .sketch-anim polyline {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 2.5s ease-out forwards;
        }
      `}</style>

            {/* The Icon with the filter and the draw-in animation applied */}
            <div
                className="sketch-anim"
                style={{
                    filter: `url(#${filterId})`,
                    animationDelay: `${delay}s`
                }}
            >
                <Icon
                    className={`w-full h-full ${color}`}
                    strokeWidth={1.5}
                />
            </div>
        </div>
    );
}
