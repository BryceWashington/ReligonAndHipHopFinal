import React, { useState, useEffect } from 'react';
import type { TimelineData } from '../types';

interface ModalProps {
  item: TimelineData | null;
  onClose: () => void;
}

const getYoutubeUrl = (url: string) => {
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/;
    const match = url.match(regExp);
    const id = (match && match[2].length === 11) ? match[2] : null;
    
    if (!id) return null;

    // Extract timestamp
    let t = '';
    const urlSearchParams = new URLSearchParams(url.split('?')[1] || '');
    const timeParam = urlSearchParams.get('t') || urlSearchParams.get('start');
    
    if (timeParam) {
      t = timeParam.replace('s', ''); // Handle 177s format
    } else {
      // Fallback for formats like &t=177
      const tMatch = url.match(/[?&](t|start)=(\d+)/);
      if (tMatch) t = tMatch[2];
    }
    
    return `https://www.youtube.com/embed/${id}${t ? `?start=${t}` : ''}`;
  } catch (e) {
    console.error("Error parsing YouTube URL", e);
    return null;
  }
};

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  const [activeEmbedIndex, setActiveEmbedIndex] = useState(0);

  // Reset index when item changes
  useEffect(() => {
    setActiveEmbedIndex(0);
  }, [item?.id]);

  if (!item) return null;

  const embedLinks = item.mediaLinks.filter(l => l.type === 'embed');
  const activeEmbed = embedLinks[activeEmbedIndex];
  const youtubeEmbedUrl = activeEmbed ? getYoutubeUrl(activeEmbed.url) : null;

  // Reset index when item changes (using a key on the component is better but this works)
  // Actually, we can use a key in the parent, but let's just use effect-like logic
  // if we were in a class, or just reset it when item opens.
  // The simplest is to key the Modal content.

  return (
    <div key={item.id} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative bg-white border border-zinc-200 w-full max-w-5xl max-h-full overflow-y-auto rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-500 hover:text-zinc-900 transition-all shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Media Section */}
          <div className="lg:w-[45%] bg-zinc-50 border-r border-zinc-100 flex flex-col items-center justify-center min-h-[400px]">
            {/* Multi-embed Switcher */}
            {embedLinks.length > 1 && (
              <div className="flex gap-2 mb-4 px-4 overflow-x-auto max-w-full no-scrollbar">
                {embedLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveEmbedIndex(idx)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeEmbedIndex === idx 
                        ? 'bg-zinc-900 text-white shadow-md' 
                        : 'bg-zinc-200 text-zinc-500 hover:bg-zinc-300'
                    }`}
                  >
                    {link.title}
                  </button>
                ))}
              </div>
            )}

            <div className="w-full aspect-video flex items-center justify-center relative">
              {youtubeEmbedUrl ? (
                <iframe
                  key={youtubeEmbedUrl}
                  className="w-full h-full"
                  src={youtubeEmbedUrl}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img 
                  src={item.coverArt} 
                  alt={item.title}
                  className="w-full h-full object-contain p-12"
                />
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-[55%] p-8 md:p-12 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="bg-zinc-900 text-zinc-50 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                Era {item.era}
              </span>
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
                {item.year}
              </span>
            </div>

            <h3 className="text-zinc-500 text-lg font-medium mb-2">{item.artist}</h3>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 mb-10 leading-tight">{item.title}</h2>
            
            <div className="prose prose-zinc max-w-none mb-12">
              <h4 className="text-zinc-400 uppercase tracking-[0.2em] text-[10px] font-black mb-6">Annotation</h4>
              <p className="text-zinc-700 text-lg leading-relaxed font-serif border-l-2 border-zinc-200 pl-8">
                {item.annotation}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-10 border-t border-zinc-100">
              {item.mediaLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-zinc-50 text-zinc-900 p-4 rounded-xl font-bold hover:bg-zinc-100 transition-all border border-zinc-200"
                >
                  <span className="text-sm uppercase tracking-wider">{link.title}</span>
                  <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
