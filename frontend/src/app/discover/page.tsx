'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import WatchCard from '@/components/WatchCard';

interface Watch {
  id: number;
  brand: string;
  model: string;
  current_price: number;
  reference_price: number;
  currency: string;
  style: string;
  image_url: string;
}

const BRANDS = ["All", "Rolex", "Omega", "Seiko", "Tudor", "Grand Seiko", "Cartier"];
const STYLES = ["All", "Diver", "Dress", "Chronograph", "Field", "Aviation"];

export default function DiscoverPage() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (selectedBrand !== "All") params.set('brand', selectedBrand);
    if (selectedStyle !== "All") params.set('style', selectedStyle);
    const query = params.toString();
    const url = `http://localhost:8000/watches${query ? `?${query}` : ''}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch watches");
        return res.json();
      })
      .then((data: Watch[]) => setWatches(data))
      .catch((err: unknown) => {
        if (!controller.signal.aborted) console.error(err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [selectedBrand, selectedStyle]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <nav className="w-full h-20 border-b border-surface-border flex items-center px-8 justify-between z-10 relative bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-brand flex items-center justify-center">
            <div className="w-4 h-4 bg-brand rounded-full"></div>
          </div>
          <span className="text-xl font-light tracking-widest text-white">CHRONO<span className="font-bold">CRAFT</span></span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-neutral-400">
          <Link href="/" className="hover:text-brand transition-colors">Design</Link>
          <Link href="/discover" className="text-white hover:text-brand transition-colors">Discover</Link>
          <a href="#" className="hover:text-brand transition-colors">Collection</a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Discover Collection</h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Explore our curated selection of premium timepieces. Filter by brand and style to find your perfect match.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Brand Filter */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Brand</span>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map(brand => (
                <button
                  key={brand}
                  onClick={() => {
                    setLoading(true);
                    setSelectedBrand(brand);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedBrand === brand
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Style Filter */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Style</span>
            <div className="flex flex-wrap gap-2">
              {STYLES.map(style => (
                <button
                  key={style}
                  onClick={() => {
                    setLoading(true);
                    setSelectedStyle(style);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedStyle === style
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {watches.length === 0 ? (
              <div className="w-full py-24 flex flex-col items-center justify-center text-neutral-500">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-lg">No watches found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {watches.map(watch => (
                  <WatchCard key={watch.id} watch={watch} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
