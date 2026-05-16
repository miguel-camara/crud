interface Product {
  id?: number | string;
  name: string;
  price: number;
  description: string;
  image?: string | null;
  category?: string | null;
  stock: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
