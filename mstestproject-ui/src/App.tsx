import { useEffect, useState } from 'react';
import './App.css'
import { createCategory, createProduct, deleteCategory, deleteProduct, getCategories, getProducts, reorderCategories, reorderProducts, updateCategory, updateProduct } from './services/api';
import { CategoryDto, ProductDto } from './types';
import Modal from './components/Modal';
import ProductModification from './components/ProductModification';
import Confirmation from './components/Confirmation';
import CategoryModification from './components/CategoryModification';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null)
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [products, setProducts] = useState<ProductDto[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null)
  const [error, setError] = useState<string | null>()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [newProductModalOpen, setNewProductModelOpen] = useState(false)
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false)
  const [updateProductModalOpen, setUpdateProductModelOpen] = useState(false)
  const [updateCategoryModalOpen, setUpdateCategoryModalOpen] = useState(false)
  const [categoryDeletionConfirmationModalOpen, setCategoryDeletionConfirmationModalOpen] = useState(false)
  const [productDeletionConfirmationModalOpen, setProductDeletionConfirmationModalOpen] = useState(false)
  const [swapCategoryDisplayOrder, setSwapCategoryDisplayOrder] = useState(false)
  const [swapProductDisplayOrder, setSwapProductDisplayOrder] = useState(false)

  const changeSelectedProduct = async (selected: ProductDto) => {
    if (swapProductDisplayOrder) {
      try {
        if (selectedProduct) {
          setLoading(true);
          await reorderProducts(selected, selectedProduct);
          setProducts(await getProducts(selectedCategory!.id))
          setSelectedProduct(products.filter(p => p.id === selected.id)[0])
          setMessage("Products' order swapped!")
        }
      } catch (err) {
        setError((err as Error).message || 'An error occurred while fetching products.');
      } finally {
        setLoading(false);
        setSwapProductDisplayOrder(false);
      }
    } else {
      setSelectedProduct(selected)
    }
  }

  const changeSelectedCategory = async (selected: CategoryDto | null) => {
    if (!selected) return;

    if (swapCategoryDisplayOrder) {
      try {
        if (selectedCategory) {
          setLoading(true);
          await reorderCategories(selected, selectedCategory);
          setCategories(await getCategories())
          setMessage("Categories' order swapped!")
        }
      } catch (err) {
        setError((err as Error).message || 'An error occurred while fetching products.');
      } finally {
        setLoading(false);
        setSwapCategoryDisplayOrder(false);
      }
    }
    else {
      try {
        setLoading(true);
        setSelectedCategory(selected);
        setProducts(await getProducts(selected?.id))
        setSelectedProduct(null)
        setMessage("Category products list updated")
      } catch (err) {
        setError((err as Error).message || 'An error occurred while fetching products.');
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setCategories(await getCategories());
        changeSelectedCategory(categories.length > 0 ? categories[0] : null)
      } catch (err) {
        setError((err as Error).message || 'An error occurred while fetching categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategoryHandler = async () => {
    if (selectedCategory) {
      try {
        setLoading(true)
        await deleteCategory(selectedCategory.id)
        setCategories(categories.filter(category => selectedCategory.id !== category.id));
        changeSelectedCategory(categories.length > 0 ? categories[0] : null)
        setMessage("Category deleted!")
      } catch (err) {
        setError((err as Error).message || 'An error occurred while deleting the category.');
      }
      finally {
        setLoading(false);
        setCategoryDeletionConfirmationModalOpen(false);
      }
    }
  }

  const deleteProductHandler = async () => {
    if (selectedProduct) {
      try {
        setLoading(true)
        await deleteProduct(selectedProduct.id)
        setProducts(products.filter(product => product.id !== selectedProduct.id));
        setSelectedProduct(null)
        setMessage("Product deleted!")
      } catch (err) {
        setError((err as Error).message || 'An error occurred while deleting the product.');
      }
      finally {
        setLoading(false);
        setProductDeletionConfirmationModalOpen(false)
      }
    }
  }

  const createProductHandler = async (product: ProductDto) => {
    try {
      setLoading(true)
      await createProduct(product)
      setProducts(await getProducts(product.categoryId))
    } catch (err) {
      setError((err as Error).message || 'An error occurred while creating a new product.');
    }
    finally {
      setLoading(false);
      setNewProductModelOpen(false)
    }
  }

  const createCategoryHandler = async (category: CategoryDto) => {
    try {
      setLoading(true)
      await createCategory(category)
      setCategories(await getCategories())
    } catch (err) {
      setError((err as Error).message || 'An error occurred while creating a new product.');
    }
    finally {
      setLoading(false);
      setNewCategoryModalOpen(false)
    }
  }

  const updateProductHandler = async (product: ProductDto) => {
    if (selectedProduct) {
      try {
        setLoading(true)
        await updateProduct(product)
        if (selectedCategory?.id === product.categoryId) {
          setProducts(await getProducts(product.categoryId))
          setSelectedProduct(null)
        }
      } catch (err) {
        setError((err as Error).message || 'An error occurred while updating the product.');
      }
      finally {
        setLoading(false);
        setUpdateProductModelOpen(false)
      }
    }
  }

  const updateCategoryHandler = async (category: CategoryDto) => {
    if (selectedCategory) {
      try {
        setLoading(true)
        await updateCategory(category)
        setCategories(await getCategories())
        changeSelectedCategory(categories.filter(c => c.id == category.id)[0])
      } catch (err) {
        setError((err as Error).message || 'An error occurred while updating the product.');
      }
      finally {
        setLoading(false);
        setUpdateCategoryModalOpen(false)
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="grid" id="categoryGrid">
          <div className="grid-header">
            <h2>Categories</h2>
            <div className="category-actions">
              <button onClick={() => setNewCategoryModalOpen(true)}>Add</button>
              <button onClick={() => setUpdateCategoryModalOpen(true)}>Update</button>
              <button onClick={() => setCategoryDeletionConfirmationModalOpen(true)}>Delete</button>
              <button onClick={() => setSwapCategoryDisplayOrder(true)} className={swapCategoryDisplayOrder ? 'active' : ''}>Swap Orders</button>
            </div>
          </div>
          <table className="grid-table" id="categoryTable">
            <thead>
              <tr>
                <th>#</th>
                <th>id</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody id="categoryTableBody">
              {categories.map((category) => (
                <tr key={category.id}
                  className={selectedCategory?.id === category.id ? 'selected' : ''}
                  onClick={async () => await changeSelectedCategory(category)}>
                  <td>{category.displayOrder}</td>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid" id="productGrid">
          <div className="grid-header">
            <h2>Products</h2>
            <div className="category-actions">
              <button onClick={() => setNewProductModelOpen(true)}>Add</button>
              <button onClick={() => setUpdateProductModelOpen(true)}>Update</button>
              <button onClick={() => setProductDeletionConfirmationModalOpen(true)}>Delete</button>
              <button onClick={() => setSwapProductDisplayOrder(true)} className={swapProductDisplayOrder ? 'active' : ''}>Swap Orders</button>
            </div>
          </div>
          <table className="grid-table" id="productTable">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody id="productTableBody">
              {products.map((product) => (
                <tr key={product.id}
                  className={selectedProduct?.id === product.id ? 'selected' : ''}
                  onClick={() => changeSelectedProduct(product)}>
                  <td>{product.displayOrder}</td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="container">
        <Modal isOpen={newProductModalOpen} onClose={() => setNewProductModelOpen(false)}>
          <ProductModification
            onCancel={() => setNewProductModelOpen(false)}
            onSubmit={createProductHandler}
            product={null} />
        </Modal>

        <Modal isOpen={newCategoryModalOpen} onClose={() => setNewCategoryModalOpen(false)}>
          <CategoryModification
            onCancel={() => setNewCategoryModalOpen(false)}
            onSubmit={createCategoryHandler}
            category={null} />
        </Modal>

        {selectedProduct &&
          (<Modal isOpen={updateProductModalOpen} onClose={() => setUpdateProductModelOpen(false)}>
            <ProductModification
              onCancel={() => setUpdateProductModelOpen(false)}
              onSubmit={updateProductHandler}
              product={selectedProduct} />
          </Modal>)
        }

        {selectedCategory &&
          (<Modal isOpen={updateCategoryModalOpen} onClose={() => setUpdateCategoryModalOpen(false)}>
            <CategoryModification
              onCancel={() => setUpdateCategoryModalOpen(false)}
              onSubmit={updateCategoryHandler}
              category={selectedCategory} />
          </Modal>)
        }

        <Modal
          isOpen={categoryDeletionConfirmationModalOpen}
          onClose={() => setCategoryDeletionConfirmationModalOpen(false)}>
          <Confirmation
            message='Are you sure? you are going to delete the selected category!'
            onConfirm={deleteCategoryHandler}
            onCancel={() => setCategoryDeletionConfirmationModalOpen(false)} />
        </Modal>

        <Modal
          isOpen={productDeletionConfirmationModalOpen}
          onClose={() => setProductDeletionConfirmationModalOpen(false)}>
          <Confirmation
            message='Are you sure? you are going to delete the selected product!'
            onConfirm={deleteProductHandler}
            onCancel={() => setProductDeletionConfirmationModalOpen(false)} />
        </Modal>

      </div>

      <div className="container">
        {loading &&
          (<div className="message-container message-loading">
            <span className="icon">🔄</span>
            <span>Loading, please wait...</span>
          </div>)
        }
        {message &&
          (<div className="message-container message-success">
            <span className="icon">✅</span>
            <span>{message}</span>
          </div>)
        }
        {error &&
          (<div className="message-container message-error">
            <span className="icon">⚠️</span>
            <span>{error}</span>
          </div>)
        }
      </div>
    </>
  )
}


export default App;
