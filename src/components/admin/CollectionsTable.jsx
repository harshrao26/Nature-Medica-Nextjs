'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function CollectionsTable({ products, counts, currentFilter, currentPage, totalPages }) {
  const router = useRouter();
  const [updating, setUpdating] = useState({});

  const handleBadgeToggle = async (productId, badgeType, currentValue) => {
    setUpdating({ ...updating, [productId]: badgeType });

    try {
      const res = await fetch(`/api/admin/products/${productId}/badges`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [badgeType]: !currentValue
        })
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to update badge');
      }
    } catch (error) {
      alert('Error updating badge');
    } finally {
      setUpdating({ ...updating, [productId]: null });
    }
  };

  const filters = [
    { key: 'all', label: 'All Products', count: counts.all },
    { key: 'bestSeller', label: 'Best Sellers', count: counts.bestSeller },
    { key: 'newArrival', label: 'New Arrivals', count: counts.newArrival },
    { key: 'featured', label: 'Featured', count: counts.featured }
  ];

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map(filter => (
          <a
            key={filter.key}
            href={`?filter=${filter.key}`}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentFilter === filter.key
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {filter.label} ({filter.count})
          </a>
        ))}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Best Seller</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">New Arrival</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Featured</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  {/* Product Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <img
                          src={product.images?.[0]?.url || '/placeholder.png'}
                          alt={product.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{product.title}</p>
                        <p className="text-sm text-gray-500">{product.category?.name}</p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-900">₹{product.price}</p>
                      {product.mrp > product.price && (
                        <p className="text-sm text-gray-500 line-through">₹{product.mrp}</p>
                      )}
                    </div>
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      product.stock > 10 
                        ? 'bg-green-100 text-green-700'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>

                  {/* Best Seller Checkbox */}
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={product.isBestSeller}
                      disabled={updating[product._id] === 'isBestSeller'}
                      onChange={() => handleBadgeToggle(product._id, 'isBestSeller', product.isBestSeller)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500 cursor-pointer disabled:opacity-50"
                    />
                  </td>

                  {/* New Arrival Checkbox */}
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={product.isNewArrival}
                      disabled={updating[product._id] === 'isNewArrival'}
                      onChange={() => handleBadgeToggle(product._id, 'isNewArrival', product.isNewArrival)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer disabled:opacity-50"
                    />
                  </td>

                  {/* Featured Checkbox */}
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={product.isFeatured}
                      disabled={updating[product._id] === 'isFeatured'}
                      onChange={() => handleBadgeToggle(product._id, 'isFeatured', product.isFeatured)}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 cursor-pointer disabled:opacity-50"
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <a
                        href={`/admin/products/${product._id}/edit`}
                        className="text-blue-600 hover:text-blue-700"
                        title="Edit Product"
                      >
                        <FiEdit size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <a
              key={page}
              href={`?filter=${currentFilter}&page=${page}`}
              className={`px-4 py-2 border rounded ${
                page === currentPage
                  ? 'bg-green-600 text-white border-green-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
