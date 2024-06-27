export const getCartList = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      method: "GET",
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
