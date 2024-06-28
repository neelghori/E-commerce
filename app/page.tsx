import ProductList from "@Ecommerce/container/ProductList/ProductList";

//api calling for fetching product list in server side
const getProductList = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Product`, {
      method: "GET",
      next: {
        tags: ["product"],
      },
      cache: "no-cache",
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
  //above function calling to fetch the product list
  const productData = await getProductList();
  return (
    <main className="flex min-h-screen flex-col items-start mx-auto w-full justify-between">
      <ProductList productdata={productData} />
    </main>
  );
}
