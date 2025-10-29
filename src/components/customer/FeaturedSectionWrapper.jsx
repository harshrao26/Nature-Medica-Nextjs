import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import FeaturedSection from './FeaturedSection';

export default async function FeaturedSectionWrapper() {
  await connectDB();

  const products = await Product.find({
    isFeatured: true,
    visibility: true,
    stock: { $gt: 0 }
  })
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  if (!products || products.length === 0) {
    return null;
  }

  return <FeaturedSection products={JSON.parse(JSON.stringify(products))} />;
}
