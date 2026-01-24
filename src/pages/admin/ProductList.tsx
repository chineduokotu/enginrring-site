import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Loader2, AlertCircle, Package, Star, Download, CheckCircle } from 'lucide-react';
import { productsApi } from '../../services/api';
import type { Product } from '../../services/api';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setError('');
      const response = await productsApi.getAll();
      setProducts(response.data);
    } catch {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    setIsDeleting(true);
    try {
      await productsApi.delete(deleteTarget._id);
      setProducts(products.filter(p => p._id !== deleteTarget._id));
      setDeleteTarget(null);
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      setError('Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSeedProducts = async () => {
    try {
      setIsSeeding(true);
      setError('');
      await productsApi.seed();
      setSuccessMessage('Default products loaded! You can now edit them to customize your store.');
      await fetchProducts();
    } catch {
      setError('Failed to load default products. They may already exist.');
    } finally {
      setIsSeeding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-navy">Products</h1>
        <Link
          to="/admin/products/new"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm sm:text-base">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError('')} className="text-red-600 hover:text-red-800 text-lg">×</button>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700 text-sm sm:text-base">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-green-600 hover:text-green-800 text-lg">×</button>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4 bg-white rounded-xl shadow-soft">
          <Package className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">No products yet</h3>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">Get started by loading default products or adding your own</p>
          <div className="flex flex-col gap-3 justify-center max-w-xs mx-auto sm:max-w-none sm:flex-row sm:gap-4">
            <button
              onClick={handleSeedProducts}
              disabled={isSeeding}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSeeding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              Load Default Products
            </button>
            <Link
              to="/admin/products/new"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Custom Product
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-4 px-4">
            Load default products to quickly set up your store, then edit each one to customize.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-soft p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {product.images[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                        {product.category}
                      </span>
                      <span className="font-medium text-gray-900 text-sm">
                        ₦{product.price.toFixed(2)}
                      </span>
                      {product.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
                  <Link
                    to={`/admin/products/${product._id}/edit`}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(product)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {product.images[0] ? (
                              <img
                                src={product.images[0].url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        ₦{product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {product.featured ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-full">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/${product._id}/edit`}
                            className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(product)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone and will also remove all associated images.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ProductList;
