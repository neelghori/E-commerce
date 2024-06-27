export interface ProductDataProps {
  createdAt: string;
  product_name: string;
  product_image: string;
  product_price: string;
  inventory: number;
  id: number;
  quantity?: number;
  quantity_type?: string;
}
