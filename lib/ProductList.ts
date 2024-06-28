import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import { revalidatePath, revalidateTag } from "next/cache";

//common api for get the product list
export const getProductlist = async (ssr?: {
  isServerSide?: boolean;
}): Promise<ProductDataProps[] | null | any> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Product`, {
      method: "GET",
      next: {
        tags: ["product"],
      },
      cache: "no-store",
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

//common api for  update product data
export const updateProduct = async (body: ProductDataProps) => {
  const jsonConvert = JSON.stringify(body);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Product/${body.id}`,
      {
        method: "PUT",
        body: jsonConvert,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonResponse = await response.json();
    if (jsonResponse) {
      revalidatePath("/");
      return jsonResponse;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};
