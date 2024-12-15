export interface CategoryDto {
  id: number;
  name: string;
  description: string;
  displayOrder: number;
}

export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  displayOrder: number;
}
