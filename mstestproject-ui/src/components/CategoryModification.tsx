import React, { useState } from 'react';
import { CategoryDto } from '../types';
import './Modification.css';

interface CategoryFormProps {
    category: CategoryDto | null;
    onSubmit: (category: CategoryDto) => void;
    onCancel: () => void;
}

const CategoryModification: React.FC<CategoryFormProps> = ({ category, onSubmit, onCancel }) => {
    const [formState, setFormState] = useState<CategoryDto>({
        id: category?.id || 0,
        name: category?.name || '',
        description: category?.description || '',
        displayOrder: category?.displayOrder || 0,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const validationErrors: { [key: string]: string } = {};

        if (!formState.name.trim()) validationErrors.name = 'Category name is required.';
        if (!formState.description.trim()) validationErrors.description = 'Description is required.';
        if (formState.displayOrder < 0) validationErrors.displayOrder = 'Display order must be non-negative.';

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState((prev) => ({
            ...prev,
            [name]: name === 'displayOrder' ? parseInt(value, 10) || 0 : value,
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
                <label htmlFor="name">Category Name</label>
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
                    type="text"
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
                    {formState.id === 0 ? 'Add' : 'Update'}
                </button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CategoryModification;
