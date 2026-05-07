import React from 'react';

interface EraDividerProps {
  era: number;
  title: string;
  description: string;
}

const EraDivider: React.FC<EraDividerProps> = ({ era, title, description }) => {
  const colors = [
    'border-blue-600 text-blue-600 bg-blue-50',
    'border-red-600 text-red-600 bg-red-50',
    'border-emerald-600 text-emerald-600 bg-emerald-50'
  ];

  return (
    <div className="py-32 relative z-20 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className={`inline-block border-2 ${colors[era-1]} px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6`}>
          Era {era}
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-zinc-900 tracking-tight">{title}</h2>
        <p className="text-zinc-600 text-xl max-w-2xl mx-auto leading-relaxed font-serif">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EraDivider;
