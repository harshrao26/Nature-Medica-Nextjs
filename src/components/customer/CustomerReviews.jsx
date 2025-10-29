'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const reviews = [
  {
    id: 1,
    name: 'Omkar Rao',
    age: '30Yrs',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    product: 'Magnesium Glycinate Men',
    productImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100',
    rating: 5,
    review: 'This has helped a lot with my muscle recovery (I gym a lot) and sleep. I take it every night after dinner.',
  },
  {
    id: 2,
    name: 'Ishani Sehgal',
    age: '34Yrs',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    product: 'Marine Collagen',
    productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100',
    rating: 5,
    review: 'My skin looks so healthy and glowing now. I did not expect this kind of result.',
  },
  {
    id: 3,
    name: 'Arjun Dubey',
    age: '32Yrs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    product: 'DHT Blocker with Biotin',
    productImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=100',
    rating: 5,
    review: 'This DHT Blocker has significantly restored my confidence by addressing the root cause of my hair loss.',
  },
  {
    id: 4,
    name: 'Priya Sharma',
    age: '28Yrs',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    product: 'Ashwagandha Capsules',
    productImage: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=100',
    rating: 5,
    review: 'Amazing product! My stress levels have reduced significantly. I feel more energetic and calm throughout the day.',
  },
  {
    id: 5,
    name: 'Rahul Mehta',
    age: '35Yrs',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    product: 'Vitamin D3 + K2',
    productImage: 'https://images.unsplash.com/photo-1550572017-4367-61a6-5ae7-5d8f22f92d84?w=100',
    rating: 5,
    review: 'My bone health has improved drastically. No more joint pain. Highly recommend this supplement!',
  },
  {
    id: 6,
    name: 'Sneha Iyer',
    age: '26Yrs',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    product: 'Omega-3 Fish Oil',
    productImage: 'https://images.unsplash.com/photo-1585435557343-3b092031d831?w=100',
    rating: 5,
    review: 'Best omega-3 I have tried. My skin and hair both improved. No fishy aftertaste!',
  },
  {
    id: 7,
    name: 'Vikram Singh',
    age: '42Yrs',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop',
    product: 'Turmeric Curcumin',
    productImage: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=100',
    rating: 5,
    review: 'Reduced my inflammation and joint pain. This is pure quality turmeric. Great value for money.',
  },
  {
    id: 8,
    name: 'Ananya Gupta',
    age: '31Yrs',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    product: 'Multivitamin for Women',
    productImage: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=100',
    rating: 5,
    review: 'Perfect multivitamin! My energy levels are up and I feel healthier. Definitely recommend to all women.',
  },
  {
    id: 9,
    name: 'Karan Verma',
    age: '29Yrs',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    product: 'Protein Powder',
    productImage: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=100',
    rating: 5,
    review: 'Best protein powder for post-workout recovery. Great taste and mixes well. Seeing amazing muscle gains!',
  },
  {
    id: 10,
    name: 'Divya Reddy',
    age: '27Yrs',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    product: 'Biotin Gummies',
    productImage: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=100',
    rating: 5,
    review: 'My hair and nails have never been stronger. These gummies taste amazing too!',
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('right');

  const cardsToShow = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      setIsAnimating(false);
    }, 500);
  };

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % reviews.length;
      visible.push(reviews[index]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-[#415f2d]/10 text-[#415f2d] rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real stories from real people who trust NatureMedica
          </p>
        </div>

        {/* Reviews Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          <button 
            onClick={handlePrev}
            disabled={isAnimating}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 bg-white shadow-xl rounded-full items-center justify-center hover:bg-[#415f2d] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={handleNext}
            disabled={isAnimating}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 bg-white shadow-xl rounded-full items-center justify-center hover:bg-[#415f2d] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Reviews Container with Animation */}
          <div className="relative overflow-hid den">
            <div 
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${
                isAnimating 
                  ? direction === 'right' 
                    ? 'transform translate-x-[-100%] opacity-0' 
                    : 'transform translate-x-[100%] opacity-0'
                  : 'transform translate-x-0 opacity-100'
              }`}
            >
              {visibleReviews.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}-${currentIndex}`}
                  className="relative"
                >
                  {/* Card */}
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 pt-16 h-full flex flex-col border border-gray-100 hover:border-[#415f2d] hover:-translate-y-2">
                    {/* Customer Image - Floating */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Verified Badge */}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#415f2d] rounded-full flex items-center justify-center ring-4 ring-white">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center justify-center gap-1 mb-4 mt-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 text-center leading-relaxed mb-6 flex-1 italic">
                      "{review.review}"
                    </p>

                    {/* Divider */}
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#415f2d] to-transparent mx-auto mb-4"></div>

                    {/* Customer Info */}
                    <div className="text-center">
                      <p className="font-bold text-gray-900 text-lg">{review.name}</p>
                      <p className="text-gray-500 text-sm">{review.age}</p>
                    </div>

                    {/* Product Info */}
                   
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
            <button 
              onClick={handlePrev}
              disabled={isAnimating}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#415f2d] hover:text-white transition-all duration-300 disabled:opacity-50 active:scale-95"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={handleNext}
              disabled={isAnimating}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#415f2d] hover:text-white transition-all duration-300 disabled:opacity-50 active:scale-95"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setDirection(index > currentIndex ? 'right' : 'left');
                    setCurrentIndex(index);
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'bg-[#415f2d] w-8 h-2' 
                    : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
