import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-24 px-6 max-w-4xl mx-auto text-center border-b border-zinc-100">
      <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight text-zinc-900">
        The Evolving Spiritual Role of MCs within Hip-Hop
      </h1>
      <p className="text-zinc-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
        An interactive academic timeline exploring the shift of the MC from prophetic leader to deity-like idol, and finally to an introspective peer.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="./framing-paper.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-zinc-900 text-zinc-50 px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-all shadow-sm hover:shadow-md"
        >
          Read the Framing Paper (PDF)
        </a>
      </div>
    </header>
  );
};

export default Header;
