'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiFilter, FiX, FiTag, FiDollarSign, FiTrendingUp, FiChevronDown } from 'react-icons/fi';

export default function FilterSidebar({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilters = {
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '',
  };
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice || '');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent body scroll when drawer is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const applyFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');
    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
    setMinPrice('');
    setMaxPrice('');
  };

  const hasActiveFilters = currentFilters.category || currentFilters.minPrice || currentFilters.maxPrice || currentFilters.sort;
  const activeFilterCount = [
    currentFilters.category,
    currentFilters.minPrice || currentFilters.maxPrice,
    currentFilters.sort
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-40 bg-[#415f2d] text-white p-4 rounded-full shadow-2xl hover:bg-[#344b24] transition-all"
      >
        <div className="relative">
          <FiFilter className="w-6 h-6 " />
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 transform transition-transform duration-300 max-h-[85vh] flex flex-col ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drawer Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FiFilter className="w-5 h-5 text-[#415f2d]" />
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="bg-[#415f2d] text-white text-xs font-bold px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiTag className="w-4 h-4 text-[#000000]" />
              <h4 className="font-semibold text-gray-900 text-sm uppercase">Categories</h4>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 cursor-pointer">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  !currentFilters.category ? 'border-[#415f2d] bg-[#415f2d]' : 'border-gray-300'
                }`}>
                  {!currentFilters.category && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="category"
                  checked={!currentFilters.category}
                  onChange={() => applyFilter('category', '')}
                  className="sr-only"
                />
                <span className={`text-sm font-medium ${
                  !currentFilters.category ? 'text-[#415f2d]' : 'text-gray-700'
                }`}>
                  All Categories
                </span>
              </label>
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    currentFilters.category === category.slug ? 'border-[#415f2d] bg-[#415f2d]' : 'border-gray-300'
                  }`}>
                    {currentFilters.category === category.slug && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <input
                    type="radio"
                    name="category"
                    checked={currentFilters.category === category.slug}
                    onChange={() => applyFilter('category', category.slug)}
                    className="sr-only"
                  />
                  <span className={`text-sm font-medium ${
                    currentFilters.category === category.slug ? 'text-[#415f2d]' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Price Range */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiDollarSign className="w-4 h-4 text-[#415f2d]" />
              <h4 className="font-semibold text-gray-900 text-sm uppercase">Price Range</h4>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Min</label>
                <input
                  type="number"
                  placeholder="₹0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Max</label>
                <input
                  type="number"
                  placeholder="₹10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            <button
              onClick={applyPriceFilter}
              className="w-full bg-[#415f2d] text-white py-2.5 rounded-lg text-sm font-semibold"
            >
              Apply
            </button>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Sort */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiTrendingUp className="w-4 h-4 text-[#415f2d]" />
              <h4 className="font-semibold text-gray-900 text-sm uppercase">Sort By</h4>
            </div>
            <select
              value={currentFilters.sort || ''}
              onChange={(e) => applyFilter('sort', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="bestseller">Best Sellers</option>
            </select>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3">
            <button
              onClick={() => {
                clearFilters();
                setIsOpen(false);
              }}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 flex items-center justify-center gap-1"
            >
              <FiX className="w-4 h-4" />
              <span>Clear All</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 bg-[#415f2d] text-white rounded-lg font-semibold hover:bg-[#344b24] flex items-center justify-center gap-1"
            >
              <FiFilter className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar (unchanged) */}
      <aside className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#415f2d] to-[#344b24]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <FiFilter className="w-5 h-5 text-[#415f2d]" />
              </div>
              <h3 className="text-xl font-bold text-white">Filters</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[#415f2d] hover:text-gray-200 text-sm font-medium flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1.5 rounded-lg transition-all hover:bg-opacity-30 hover:text-gray-200 text-sm font-medium flex items-center gap-1 bg-white bg-opacity-20 px-3 py-1.5 rounded-lg transition-all hover:bg-opacity-30"
              >
                <FiX className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiTag className="w-4 h-4 text-[#415f2d]" />
              <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Categories</h4>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  !currentFilters.category ? 'border-[#415f2d] bg-[#415f2d]' : 'border-gray-300 group-hover:border-[#415f2d]'
                }`}>
                  {!currentFilters.category && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="category"
                  checked={!currentFilters.category}
                  onChange={() => applyFilter('category', '')}
                  className="sr-only"
                />
                <span className={`text-sm font-medium ${
                  !currentFilters.category ? 'text-[#415f2d]' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  All Categories
                </span>
              </label>
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    currentFilters.category === category.slug ? 'border-[#415f2d] bg-[#415f2d]' : 'border-gray-300 group-hover:border-[#415f2d]'
                  }`}>
                    {currentFilters.category === category.slug && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <input
                    type="radio"
                    name="category"
                    checked={currentFilters.category === category.slug}
                    onChange={() => applyFilter('category', category.slug)}
                    className="sr-only"
                  />
                  <span className={`text-sm font-medium flex-1 ${
                    currentFilters.category === category.slug ? 'text-[#415f2d]' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Price Range */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiDollarSign className="w-4 h-4 text-[#415f2d]" />
              <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Price Range</h4>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
                  <input
                    type="number"
                    placeholder="₹0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#415f2d] focus:ring-2 focus:ring-[#415f2d] focus:ring-opacity-20 outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
                  <input
                    type="number"
                    placeholder="₹10000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-[#415f2d] focus:ring-2 focus:ring-[#415f2d] focus:ring-opacity-20 outline-none transition"
                  />
                </div>
              </div>
              <button
                onClick={applyPriceFilter}
                className="w-full bg-[#415f2d] hover:bg-[#344b24] text-white py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Apply Price Filter
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Sort */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp className="w-4 h-4 text-[#415f2d]" />
              <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Sort By</h4>
            </div>
            <select
              value={currentFilters.sort || ''}
              onChange={(e) => applyFilter('sort', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:border-[#415f2d] focus:ring-2 focus:ring-[#415f2d] focus:ring-opacity-20 outline-none transition cursor-pointer"
            >
              <option value="">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="bestseller">Best Sellers</option>
            </select>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <>
              <div className="border-t border-gray-200"></div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-3">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {currentFilters.category && (
                    <span className="inline-flex items-center gap-1 bg-[#415f2d] bg-opacity-10 text-[#ffffff] px-3 py-1 rounded-full text-xs font-medium">
                      {categories.find(c => c.slug === currentFilters.category)?.name}
                      <button onClick={() => applyFilter('category', '')} className="hover:text-[#ffffff]">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {(currentFilters.minPrice || currentFilters.maxPrice) && (
                    <span className="inline-flex items-center gap-1 bg-[#415f2d] bg-opacity-10 text-[#ffffff] px-3 py-1 rounded-full text-xs font-medium">
                      ₹{currentFilters.minPrice || 0} - ₹{currentFilters.maxPrice || '∞'}
                      <button onClick={() => {
                        applyFilter('minPrice', '');
                        applyFilter('maxPrice', '');
                        setMinPrice('');
                        setMaxPrice('');
                      }} className="hover:text-[#344b24]">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {currentFilters.sort && (
                    <span className="inline-flex items-center gap-1 bg-[#415f2d] bg-opacity-10 text-[#ffffff] px-3 py-1 rounded-full text-xs font-medium">
                      {currentFilters.sort === 'price-asc' && 'Price: Low to High'}
                      {currentFilters.sort === 'price-desc' && 'Price: High to Low'}
                      {currentFilters.sort === 'rating' && 'Highest Rated'}
                      {currentFilters.sort === 'newest' && 'Newest First'}
                      {currentFilters.sort === 'bestseller' && 'Best Sellers'}
                      <button onClick={() => applyFilter('sort', '')} className="hover:text-[#344b24]">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
