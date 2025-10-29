'use client';

import ProductCard from '@/components/customer/ProductCard';

export default function FeaturedSection({ products }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            ⭐ Featured Products
          </h2>
          <p className="text-gray-600">Handpicked wellness essentials for you</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-10 text-center">
          <a
            href="/shop?filter=featured"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 font-bold rounded-lg hover:bg-purple-600 hover:text-white transition-all shadow-md hover:shadow-lg"
          >
            View All Featured Products
          </a>
        </div>
      </div>
    </section>
  );
}
