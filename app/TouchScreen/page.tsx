'use client';

import { Cairo } from 'next/font/google';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { SuccessMessage } from '@/components/success-message';
import axios from 'axios';

const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '700'] });

const variants = [
  { cardColor: '#E6BE65', quoteImage: '/Blue.png' },
  { cardColor: '#60969B', quoteImage: '/Yellow.png' },
  { cardColor: '#437F9A', quoteImage: '/Yellow.png' },
  { cardColor: '#B1707A', quoteImage: '/Blue.png' },
];

interface Quote {
  id: number;
  quote: string;
  author: string;
}

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    axios
      .get('https://ecce.up.railway.app/api/cards/')
      .then((res) => setQuotes(res.data))
      .catch(console.error);
  }, []);

  const handleCardClick = (quote: Quote) => setSelectedQuote(quote);

  const handleConfirm = () => {
    if (!selectedQuote) return;
    axios
      .put(`https://ecce.up.railway.app/api/cards/${selectedQuote.id}`)
      .then(() => {
        setSelectedQuote(null);
        setShowSuccess(true);
      })
      .catch(console.error);
  };

  return (
    <div
      className={`grid grid-cols-10 h-screen bg-[#F7F8E6] ${cairo.className}`}
    >
      <SuccessMessage show={showSuccess} onHide={() => setShowSuccess(false)} />

      <div className="col-span-10 flex justify-center items-center">
        <ConfirmationDialog
          open={selectedQuote !== null}
          onOpenChange={(open) => !open && setSelectedQuote(null)}
          quote={selectedQuote?.quote || ''}
          author={selectedQuote?.author || ''}
          onConfirm={handleConfirm}
        />
        <div className="flex flex-col justify-center max-w-3/4 h-full">
          <div>
            <p className="text-6xl text-left font-bold mb-10 text-[#1C3743]">
              Which piece of research aligns most closely with your beliefs
              about early childhood?
            </p>
          </div>
          <div className="grid grid-cols-4 gap-x-5 gap-y-6 items-start">
            {quotes.map((quote, index) => {
              const variant = variants[index % variants.length];
              return (
                <div
                  key={quote.id}
                  onClick={() => handleCardClick(quote)}
                  className={`rounded-lg shadow-sm relative px-4 py-3 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    index < 4 ? 'self-stretch' : ''
                  }`}
                  style={{ backgroundColor: variant.cardColor }}
                >
                  <p className="text-xl font-regular mt-3">{quote.quote}</p>
                  <div className="flex flex-row justify-between items-end mt-4">
                    <Image
                      src={variant.quoteImage}
                      width={25}
                      height={25}
                      alt="q"
                    />
                    <p className="text-[10pt] text-right text-white text-shadow-2xs text-shadow-grey">
                      {quote.author}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
