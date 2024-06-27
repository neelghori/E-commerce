import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import { revalidateTag } from "next/cache";

export const getProductlist = async (): Promise<
  ProductDataProps[] | null | any
> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Product`, {
      method: "GET",
      next: {
        revalidate: 1000,
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
      revalidateTag("product");
      return jsonResponse;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};
