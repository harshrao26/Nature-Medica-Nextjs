'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ProductImages({ images, title }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <span className="text-gray-400">No image available</span>
        </div>
      </div>
    );
  }

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-square mb-6 rounded-xl overflow-hidden bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <img
          src={images[selectedImage]?.url || '/placeholder.png'}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-500 ease-in-out hover:scale-105"
          priority
        />
        
        {/* Zoom Button */}
        <button
          onClick={() => openLightbox(selectedImage)}
          className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md transition-colors duration-300 hover:bg-green-100 hover:text-green-700"
          aria-label="Zoom Image"
        >
          <FiZoomIn className="w-5 h-5 text-gray-800" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-2 py-0.5 rounded-full text-xs select-none">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-transform duration-300 focus:outline-none ${
                selectedImage === index
                  ? 'border-transparent shadow-[0_0_8px_2px_rgba(58,93,30,0.6)] rounded-lg'
                  : 'border-gray-200 hover:scale-105 hover:shadow-sm hover:border-green-700'
              }`}
              aria-label={`Select image ${index + 1}`}
            >
              <img
                src={image.url}
                alt={`${title} - ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox/Fullscreen Gallery */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 bg-white bg-opacity-30 rounded-full p-3 shadow-md transition-colors duration-300 hover:bg-green-100 hover:text-green-700 z-10"
            aria-label="Close Lightbox"
          >
            <FiX className="w-6 h-6 text-black" />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-6 bg-white bg-opacity-30 rounded-full p-3 shadow-md transition-colors duration-300 hover:bg-green-100 hover:text-green-700 z-10"
              aria-label="Previous Image"
            >
              <FiChevronLeft className="w-6 h-6 text-black" />
            </button>
          )}

          {/* Main Lightbox Image Container with Blur Background */}
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] p-12 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-30 rounded-xl"
              style={{ backgroundImage: `url(${images[lightboxIndex].url})` }}
            />
            <img
              key={images[lightboxIndex].url}
              src={images[lightboxIndex].url}
              alt={`${title} - ${lightboxIndex + 1}`}
              fill
              className="object-contain relative transition-opacity duration-500 ease-in-out"
              quality={100}
              draggable={false}
            />
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-6 bg-white bg-opacity-30 rounded-full p-3 shadow-md transition-colors duration-300 hover:bg-green-100 hover:text-green-700 z-10"
              aria-label="Next Image"
            >
              <FiChevronRight className="w-6 h-6 text-black" />
            </button>
          )}

          {/* Image Counter in Lightbox */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm select-none">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Navigation in Lightbox */}
          {images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3 max-w-md overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg border-2 transition-transform duration-300 focus:outline-none ${
                    lightboxIndex === index
                      ? 'border-transparent shadow-[0_0_10px_3px_rgba(58,93,30,0.7)]'
                      : 'border-white border-opacity-30 hover:border-opacity-60 hover:scale-105'
                  }`}
                  aria-label={`Select lightbox image ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
