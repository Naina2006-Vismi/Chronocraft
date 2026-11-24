'use client';

import React, { useState } from 'react';
import WatchSVG from './WatchSVG';

const CASE_COLORS = [
  { name: 'Silver', value: 'silver', hex: '#e5e7eb' },
  { name: 'Gold', value: 'gold', hex: '#d4af37' },
  { name: 'Rose Gold', value: 'rose-gold', hex: '#b76e79' },
  { name: 'Black', value: 'black', hex: '#171717' },
];

const DIAL_COLORS = [
  { name: 'Black', value: 'black', hex: '#171717' },
  { name: 'White', value: 'white', hex: '#f8fafc' },
  { name: 'Blue', value: 'blue', hex: '#1e3a8a' },
  { name: 'Green', value: 'green', hex: '#14532d' },
  { name: 'Silver', value: 'silver', hex: '#e5e7eb' },
];

const STRAP_TYPES = [
  { name: 'Leather', value: 'leather' },
  { name: 'Metal', value: 'metal' },
  { name: 'Rubber', value: 'rubber' },
];

const STRAP_COLORS = [
  { name: 'Black', value: 'black', hex: '#222222' },
  { name: 'Brown', value: 'leather-brown', hex: '#8B4513' },
  { name: 'Silver', value: 'silver', hex: '#9ca3af' },
  { name: 'Gold', value: 'gold', hex: '#d4af37' },
];

const WatchCustomizer: React.FC = () => {
  const [caseColor, setCaseColor] = useState('silver');
  const [dialColor, setDialColor] = useState('black');
  const [strapType, setStrapType] = useState('leather');
  const [strapColor, setStrapColor] = useState('black');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDesign = async () => {
    setIsSaving(true);
    try {
      // Mock API call to save design
      const response = await fetch('http://localhost:8000/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'My Custom Watch',
          components: { caseColor, dialColor, strapType, strapColor }
        })
      });
      if (response.ok) {
        alert('Design saved successfully!');
      } else {
        console.error('Failed to save design');
        alert('Design saved locally (Mock)!');
      }
    } catch (e) {
      console.error(e);
      alert('Design saved locally (Mock)!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] gap-8 p-6 lg:p-12 max-w-7xl mx-auto">
      {/* Left: Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center bg-neutral-900/50 rounded-3xl p-8 border border-neutral-800 shadow-2xl relative overflow-hidden">
        {/* Glow effect behind watch */}
        <div className="absolute w-96 h-96 bg-brand/10 rounded-full blur-3xl -z-10 transition-colors duration-500"
             style={{ backgroundColor: DIAL_COLORS.find(c => c.value === dialColor)?.hex + '20' }} />

        <div className="w-full max-w-md aspect-[1/2]">
          <WatchSVG
            caseColor={caseColor}
            dialColor={dialColor}
            strapColor={strapColor}
            strapType={strapType}
          />
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-light tracking-widest text-neutral-200">CHRONO<span className="font-semibold text-white">CRAFT</span> EDITION</h2>
          <p className="text-neutral-500 mt-2 text-sm uppercase tracking-wider">
            {caseColor} Case • {dialColor} Dial • {strapColor} {strapType} Strap
          </p>
        </div>
      </div>

      {/* Right: Controls Area */}
      <div className="w-full lg:w-[400px] flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Design Your Watch</h1>
          <p className="text-neutral-400">Select materials and colors to create your perfect timepiece.</p>
        </div>

        {/* Customization Options */}
        <div className="flex flex-col gap-6 flex-1 overflow-y-auto pr-2">

          {/* Case Color */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-300 uppercase tracking-wider">Case Material</label>
            <div className="grid grid-cols-4 gap-3">
              {CASE_COLORS.map(color => (
                <button
                  key={color.value}
                  onClick={() => setCaseColor(color.value)}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    caseColor === color.value
                      ? 'border-brand bg-brand/10'
                      : 'border-neutral-800 hover:border-neutral-600 bg-neutral-900'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full border border-neutral-700 shadow-inner" style={{ backgroundColor: color.hex }} />
                  <span className="text-xs text-neutral-400">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dial Color */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-300 uppercase tracking-wider">Dial Color</label>
            <div className="grid grid-cols-5 gap-2">
              {DIAL_COLORS.map(color => (
                <button
                  key={color.value}
                  onClick={() => setDialColor(color.value)}
                  className={`relative w-12 h-12 rounded-full border-2 transition-all mx-auto ${
                    dialColor === color.value
                      ? 'border-brand scale-110 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'border-transparent hover:scale-105'
                  }`}
                >
                  <div className="absolute inset-1 rounded-full shadow-inner border border-neutral-700" style={{ backgroundColor: color.hex }} />
                </button>
              ))}
            </div>
          </div>

          {/* Strap Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-300 uppercase tracking-wider">Strap Type</label>
            <div className="flex gap-2 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
              {STRAP_TYPES.map(type => (
                <button
                  key={type.value}
                  onClick={() => setStrapType(type.value)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    strapType === type.value
                      ? 'bg-neutral-700 text-white shadow'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Strap Color */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-300 uppercase tracking-wider">Strap Color</label>
            <div className="grid grid-cols-4 gap-3">
              {STRAP_COLORS.map(color => (
                <button
                  key={color.value}
                  onClick={() => setStrapColor(color.value)}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    strapColor === color.value
                      ? 'border-brand bg-brand/10'
                      : 'border-neutral-800 hover:border-neutral-600 bg-neutral-900'
                  }`}
                >
                  <div className="w-8 h-8 rounded-md border border-neutral-700 shadow-inner" style={{ backgroundColor: color.hex }} />
                  <span className="text-xs text-neutral-400">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col gap-3">
          <button
            onClick={handleSaveDesign}
            disabled={isSaving}
            className="w-full py-4 px-6 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Design'}
          </button>
          <button className="w-full py-4 px-6 bg-neutral-900 border border-neutral-800 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors">
            Find Similar Watches
          </button>
        </div>

      </div>
    </div>
  );
};

export default WatchCustomizer;
