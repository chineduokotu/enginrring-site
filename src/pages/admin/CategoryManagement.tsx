import * as React from 'react';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { categoriesApi } from '../../services/api';
import type { Category } from '../../services/api';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Delete confirmation state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await categoriesApi.getAll();
      setCategories(response.data);
    } catch {
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await categoriesApi.create(newCategoryName.trim());
      setNewCategoryName('');
      setSuccess('Category created successfully');
      fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await categoriesApi.delete(categoryToDelete._id);
      setSuccess(`Category "${categoryToDelete.name}" and all its products deleted`);
      fetchCategories();
    } catch {
      setError('Failed to delete category');
    } finally {
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleSeed = async () => {
    try {
      setIsSubmitting(true);
      await categoriesApi.seed();
      setSuccess('Default categories seeded successfully');
      fetchCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to seed categories');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">Category Management</h1>
          <p className="text-gray-500 mt-1">Add or remove product categories</p>
        </div>
        {categories.length === 0 && !isLoading && (
          <button
            onClick={handleSeed}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Seed Defaults
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Add Category Form */}
      <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-6 mb-8">
        <h2 className="text-lg font-semibold text-navy mb-4">Add New Category</h2>
        <form onSubmit={handleCreateCategory} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name (e.g., Inverters)"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || !newCategoryName.trim()}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-primary/20"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            <span>Add Category</span>
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-navy">Existing Categories</h2>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No categories found. Add your first category above!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {categories.map((category) => (
              <div
                key={category._id}
                className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-navy text-lg">{category.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteClick(category)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                  title="Delete category and products"
                >
                  <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onCancel={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Category?"
        message={`Are you sure you want to delete the "${categoryToDelete?.name}" category? This will also DELETE ALL PRODUCTS in this category. This action cannot be undone.`}
        confirmText="Delete Category & Products"
      />
    </div>
  );
};

export default CategoryManagement;




