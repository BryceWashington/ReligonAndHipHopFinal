import React from 'react';
import type { TimelineData } from '../types';

interface TimelineItemProps {
  item: TimelineData;
  index: number;
  onOpen: (item: TimelineData) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, onOpen }) => {
  const isEven = index % 2 === 0;

  return (
    <div 
      className={`relative flex items-center justify-between mb-16 w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:flex-nowrap`}
    >
      <div className="hidden md:block w-1/2" />
      
      {/* Connector Dot */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-700 border-4 border-zinc-950 z-10" />

      {/* Content Card */}
      <div 
        onClick={() => onOpen(item)}
        className={`w-full md:w-[45%] bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-400 transition-all cursor-pointer group shadow-sm hover:shadow-xl ml-16 md:ml-0`}
      >
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={item.coverArt} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold text-zinc-900 shadow-sm">
            {item.year}
          </div>
        </div>
        
        <div className="p-8">
          <h3 className="text-zinc-400 text-xs uppercase tracking-widest font-black mb-2">
            {item.artist || 'Academic Resource'}
          </h3>
          <h2 className="text-2xl font-bold text-zinc-900 group-hover:text-black transition-colors leading-tight">
            {item.title}
          </h2>
          <p className="mt-4 text-zinc-600 line-clamp-2 text-sm leading-relaxed font-serif italic">
            {item.annotation}
          </p>
          <div className="mt-8 flex items-center text-zinc-900 text-sm font-bold">
            <span className="border-b-2 border-zinc-900 pb-0.5 group-hover:pr-4 transition-all">Explore Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
