
import ProductList from "@/components/shared/product/product-list";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { getFeaturedProducts, getLatestProducts, } from '@/lib/actions/product.actions';
import ProductCarousel from '@/components/shared/product/product-carousel'


export default async function Homepage() {
  const latestProducts = await getLatestProducts()
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={LATEST_PRODUCTS_LIMIT} />
    </>
  );
}
