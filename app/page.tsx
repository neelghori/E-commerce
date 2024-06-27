import ProductList from "@Ecommerce/container/ProductList/ProductList";
import { getProductlist } from "@Ecommerce/lib/ProductList";

export default async function Home() {
  const productData = await getProductlist();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ProductList productdata={productData} />
    </main>
  );
}
