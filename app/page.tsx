'use client';

import { Cairo } from 'next/font/google';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
  year: string;
  count: number;
  percentage: number;
}

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuotes = () => {
      axios
        .get('https://ecce.up.railway.app/api/cards/')
        .then((res) => setQuotes(res.data))
        .catch(console.error);
    };

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`overflow-hidden grid grid-cols-10 h-screen bg-[#F7F8E6] ${cairo.className}`}
    >
      <div className="col-span-1 relative bg-[#60969B] h-full ">
        <div className="absolute bottom-[-10%] -left-full w-[500px] h-[500px]">
          <Image
            src="/Kids.png"
            alt="Kids"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="col-span-9 flex justify-center items-center mt-10">
        <div className="flex flex-col  max-w-3/4 h-full">
          <div className="mb-36">
            <p className="text-3xl font-bold text-center text-[#1C3743]">
              إطار الجودة لمرحلة الطفولة المبكرة
            </p>
            <p className="text-3xl font-bold text-center text-[#1C3743]">
              KHDA ECCE QUALITY FRAMEWORK
            </p>
          </div>
          <div>
            <p className="text-6xl text-left font-bold mb-16 text-[#1C3743]">
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
                  className={`rounded-lg shadow-sm relative px-4 py-3 flex flex-col justify-between ${
                    index < 4 ? 'self-stretch' : ''
                  }`}
                  style={{ backgroundColor: variant.cardColor }}
                >
                  <p
                    className="absolute -top-5 -right-2 font-bold text-4xl text-white"
                    style={{
                      WebkitTextStroke: `4px ${variant.cardColor}`,
                      paintOrder: 'stroke fill',
                    }}
                  >
                    {quote.percentage}%
                  </p>
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
