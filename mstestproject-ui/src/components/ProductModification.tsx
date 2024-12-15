import React, { useState, useEffect } from 'react';
import { ProductDto, CategoryDto } from '../types';
import { getCategories } from '../services/api';
import './Modification.css';

interface ProductFormProps {
  product: ProductDto | null;
  onSubmit: (product: ProductDto) => void;
  onCancel: () => void;
}

const ProductModification: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [formState, setFormState] = useState<ProductDto>({
    id: product?.id || 0,
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    categoryId: product?.categoryId || 0,
    displayOrder: product?.displayOrder || 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const validate = () => {
    const validationErrors: { [key: string]: string } = {};

    if (!formState.name.trim()) validationErrors.name = 'Product name is required.';
    if (!formState.description.trim())
      validationErrors.description = 'Product description is required.';
    if (formState.price <= 0) validationErrors.price = 'Price must be greater than zero.';
    if (!formState.categoryId) validationErrors.categoryId = 'Category must be selected.';
    if (formState.displayOrder < 0)
      validationErrors.displayOrder = 'Display order must be a non-negative number.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'displayOrder' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(formState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <small className="error-message">{errors.name}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type='text'
          id="description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && (
          <small className="error-message">{errors.description}</small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formState.price}
          onChange={handleInputChange}
          className={errors.price ? 'error' : ''}
        />
        {errors.price && <small className="error-message">{errors.price}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="categoryId">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formState.categoryId}
          onChange={handleInputChange}
          className={errors.categoryId ? 'error' : ''}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <small className="error-message">{errors.categoryId}</small>
        )}
      </div>

      <div className="form-group" hidden>
        <label htmlFor="displayOrder">Display Order</label>
        <input
          type="number"
          id="displayOrder"
          name="displayOrder"
          value={formState.displayOrder}
          onChange={handleInputChange}
          className={errors.displayOrder ? 'error' : ''}
        />
        {errors.displayOrder && (
          <small className="error-message">{errors.displayOrder}</small>
        )}
      </div>

      <div className="form-actions">
        <button type="submit">
          {formState.id === 0 ? "Add" : "Update"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductModification;
