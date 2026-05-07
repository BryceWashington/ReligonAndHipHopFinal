import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EraDivider from './components/EraDivider';
import TimelineItem from './components/TimelineItem';
import Modal from './components/Modal';
import type { TimelineData } from './types';
import timelineDataRaw from './data/timelineData.json';

const timelineData = timelineDataRaw as TimelineData[];

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineData | null>(null);

  // Era details
  const eras = [
    {
      id: 1,
      title: "The Community Leader",
      description: "In the early years of hip-hop, the MC functioned as a street-level authority, speaking truth to power and reflecting the harsh realities of marginalized communities. They were voices of the people, aiming to bring awareness and mobilize change."
    },
    {
      id: 2,
      title: "The Godlike Idol",
      description: "As hip-hop achieved massive commercial success and global dominance, a shift occurred. MCs began to adopt deity-like personas, equating their market dominance and lyrical abilities with divine authority."
    },
    {
      id: 3,
      title: "The Spiritual Peer",
      description: "The modern era sees a rejection of the pedestal. Artists are increasingly using their platform for expressing vulnerability, admitting flaws, and admitting they are not spiritual saviors but fellow peers navigating the same issues as all of us."
    }
  ];

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem]);

  return (
    <div className="min-h-screen pb-32">
      <Header />

      <main className="max-w-6xl mx-auto px-6 mt-12 relative">
        {/* Central Vertical Line */}
        <div className="timeline-line" />

        {eras.map((era) => (
          <React.Fragment key={era.id}>
            <EraDivider 
              era={era.id}
              title={era.title}
              description={era.description}
            />
            
            <div className="space-y-12">
              {timelineData
                .filter(item => item.era === era.id)
                .sort((a, b) => a.year - b.year)
                .map((item, index) => (
                  <TimelineItem 
                    key={item.id}
                    item={item}
                    index={index}
                    onOpen={setSelectedItem}
                  />
                ))}
            </div>
          </React.Fragment>
        ))}
      </main>

      {/* Modal Overlay */}
      <Modal 
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default App;
