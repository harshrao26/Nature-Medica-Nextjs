import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import ProductList from '@/components/customer/ProductList';
import FilterSidebar from '@/components/customer/FilterSidebar';

export default async function ProductsPage({ searchParams }) {
  await connectDB();

  const page = parseInt(searchParams.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  let query = { visibility: true };

  // Category filter
  if (searchParams.category) {
    const category = await Category.findOne({ slug: searchParams.category });
    if (category) {
      query.category = category._id;
    }
  }

  // Search filter
  if (searchParams.search) {
    query.$text = { $search: searchParams.search };
  }

  // Price filter
  if (searchParams.minPrice || searchParams.maxPrice) {
    query.price = {};
    if (searchParams.minPrice) query.price.$gte = parseInt(searchParams.minPrice);
    if (searchParams.maxPrice) query.price.$lte = parseInt(searchParams.maxPrice);
  }

  // Sort
  let sort = { createdAt: -1 };
  if (searchParams.sort === 'price-asc') sort = { price: 1 };
  if (searchParams.sort === 'price-desc') sort = { price: -1 };
  if (searchParams.sort === 'rating') sort = { ratingAvg: -1 };

  const products = await Product.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('category')
    .lean();

  const totalProducts = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / limit);

  const categories = await Category.find({ active: true }).lean();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-0 lg:px-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
          {/* Sidebar - Hidden on mobile, shows as drawer */}
          <aside className="lg:col-span-1">
            <FilterSidebar 
              categories={JSON.parse(JSON.stringify(categories))}
              currentFilters={searchParams}
            />
          </aside>
          
          {/* Main Product Grid */}
          <main className="lg:col-span-3">
            <ProductList 
              products={JSON.parse(JSON.stringify(products))}
              currentPage={page}
              totalPages={totalPages}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
