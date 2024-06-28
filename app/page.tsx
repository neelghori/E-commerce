import ProductList from "@Ecommerce/container/ProductList/ProductList";

const getProductList = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Product`, {
      method: "GET",
      next: {
        tags: ["product"],
      },
    });
    const jsonResponse = await response.json();
    if (jsonResponse) {
      return jsonResponse;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

export default async function Home() {
  const productData = await getProductList();
  return (
    <main className="flex min-h-screen flex-col items-start mx-auto w-full justify-between">
      <ProductList productdata={productData} />
    </main>
  );
}
