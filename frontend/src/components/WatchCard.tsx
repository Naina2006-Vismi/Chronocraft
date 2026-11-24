import React from 'react';

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

interface WatchCardProps {
  watch: Watch;
}

const WatchCard: React.FC<WatchCardProps> = ({ watch }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: watch.currency }).format(price);
  };

  const discount = Math.round((1 - watch.current_price / watch.reference_price) * 100);

  return (
    <div className="group relative flex flex-col bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden hover:border-brand/50 transition-colors cursor-pointer">
      {/* Image container */}
      <div className="relative aspect-square w-full bg-neutral-950 p-6 flex items-center justify-center overflow-hidden">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/5 transition-colors duration-500 z-0" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={watch.image_url}
          alt={`${watch.brand} ${watch.model}`}
          className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {discount > 0 && (
          <div className="absolute top-4 right-4 z-20 bg-brand text-black text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-1 flex-1">
        <span className="text-xs font-semibold tracking-widest text-brand uppercase">{watch.brand}</span>
        <h3 className="text-lg font-medium text-white line-clamp-1">{watch.model}</h3>
        <span className="text-sm text-neutral-500 mb-2">{watch.style}</span>

        <div className="mt-auto pt-4 border-t border-neutral-800 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">{formatPrice(watch.current_price)}</span>
            {watch.current_price < watch.reference_price && (
              <span className="text-xs text-neutral-500 line-through">{formatPrice(watch.reference_price)}</span>
            )}
          </div>
          <button className="text-neutral-400 hover:text-brand transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
