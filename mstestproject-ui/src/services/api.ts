import axios from 'axios';
import { CategoryDto, ProductDto } from '../types';

const BASE_URL = 'https://localhost:7223/api';

// Categories
export const getCategories = async (): Promise<CategoryDto[]> => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
};

export const createCategory = async (category: Omit<CategoryDto, 'id'>): Promise<void> => {
  await axios.post(`${BASE_URL}/categories`, category);
};

export const updateCategory = async (category: CategoryDto): Promise<void> => {
  await axios.put(`${BASE_URL}/categories/${category.id}`, category);
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/categories/${id}`);
};

export const reorderCategories = async (category1: CategoryDto, category2: CategoryDto): Promise<void> => {
  await axios.put(`${BASE_URL}/Categories/swaporder/${category1.id}/${category2.id}`)
}

// Products
export const getProducts = async (categoryId: number): Promise<ProductDto[]> => {
  const response = await axios.get(`${BASE_URL}/products/category/${categoryId}`);
  return response.data;
};

export const createProduct = async (product: Omit<ProductDto, 'id'>): Promise<void> => {
  await axios.post(`${BASE_URL}/products`, product);
};

export const updateProduct = async (product: ProductDto): Promise<void> => {
  await axios.put(`${BASE_URL}/products/${product.id}`, product);
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/products/${id}`);
};

export const reorderProducts = async (product1: ProductDto, product2: ProductDto): Promise<void> => {
  await axios.put(`${BASE_URL}/Products/swaporder/${product1.id}/${product2.id}`)
}