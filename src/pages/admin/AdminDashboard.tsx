import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Image, Plus, AlertCircle, Loader2, Lock, BookOpen, ListTree, Wrench, ShieldCheck, Store } from 'lucide-react';
import { productsApi, galleryApi, servicesApi } from '../../services/api';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ products: 0, gallery: 0, services: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, galleryRes, servicesRes] = await Promise.all([
          productsApi.getAll(),
          galleryApi.getAll(),
          servicesApi.getAll(),
        ]);
        setStats({
          products: productsRes.data.length,
          gallery: galleryRes.data.length,
          services: servicesRes.data.length,
        });
      } catch {
        setError('Failed to load statistics');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-navy mb-4 sm:mb-6">Dashboard</h1>

      {error && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm sm:text-base">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 hover:shadow-strong transition-all border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Package className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Total Products</p>
              <p className="text-2xl sm:text-3xl font-bold text-navy">{stats.products}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 hover:shadow-strong transition-all border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <Wrench className="w-6 sm:w-7 h-6 sm:h-7 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Active Services</p>
              <p className="text-2xl sm:text-3xl font-bold text-navy">{stats.services}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 hover:shadow-strong transition-all border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-accent-yellow/20 rounded-xl flex items-center justify-center">
              <Image className="w-6 sm:w-7 h-6 sm:h-7 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Gallery Items</p>
              <p className="text-2xl sm:text-3xl font-bold text-navy">{stats.gallery}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-base sm:text-lg font-semibold text-navy mb-3 sm:mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
        <Link
          to="/admin/products/new"
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-soft hover:shadow-strong hover:bg-gray-50 transition-all border border-gray-100 group"
        >
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <Plus className="w-5 h-5 text-green-600" />
          </div>
          <span className="font-medium text-gray-700 text-xs sm:text-sm">Add Product</span>
        </Link>

        <Link
          to="/admin/products"
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-soft hover:shadow-strong hover:bg-gray-50 transition-all border border-gray-100 group"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-medium text-gray-700 text-xs sm:text-sm">Products</span>
        </Link>

        <Link
          to="/admin/categories"
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-soft hover:shadow-strong hover:bg-gray-50 transition-all border border-gray-100 group"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <ListTree className="w-5 h-5 text-amber-600" />
          </div>
          <span className="font-medium text-gray-700 text-xs sm:text-sm">Categories</span>
        </Link>

        <Link
          to="/admin/services"
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-soft hover:shadow-strong hover:bg-gray-50 transition-all border border-gray-100 group"
        >
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <Wrench className="w-5 h-5 text-green-600" />
          </div>
          <span className="font-medium text-gray-700 text-xs sm:text-sm">Services</span>
        </Link>

        <Link
          to="/admin/gallery"
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-soft hover:shadow-strong hover:bg-gray-50 transition-all border border-gray-100 group"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <Image className="w-5 h-5 text-purple-600" />
          </div>
          <span className="font-medium text-gray-700 text-xs sm:text-sm">Gallery</span>
        </Link>

        <Link
          to="/admin/settings"
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-soft hover:shadow-strong hover:bg-gray-50 transition-all border border-gray-100 group"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <Lock className="w-5 h-5 text-gray-600" />
          </div>
          <span className="font-medium text-gray-700 text-xs sm:text-sm">Settings</span>
        </Link>
      </div>

      {/* Admin Instruction Manual */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden mb-8">
        <div className="bg-navy p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Admin Instruction Manual</h2>
              <p className="text-gray-300 text-sm">How to manage your store and services</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Products Guide */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Package className="w-5 h-5" />
                <h3>Managing Products</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  <span><strong>Add New:</strong> Click "Add Product" to create items with images, prices, and categories.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  <span><strong>Featured Items:</strong> Check the "Featured" box to highlight products on the store's home page.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  <span><strong>Inquiries:</strong> "Inquire" buttons on the store link directly to your WhatsApp.</span>
                </li>
              </ul>
            </div>

            {/* Categories Guide */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-600 font-bold">
                <ListTree className="w-5 h-5" />
                <h3>Categories & Organization</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0 mt-1.5" />
                  <span><strong>Structure:</strong> Products are grouped by categories (e.g., Solar, Electrical) for easy browsing.</span>
                </li>
                <li className="flex gap-2 text-red-600 bg-red-50 p-2 rounded-lg italic">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span><strong>Warning:</strong> Deleting a category will DELETE all products assigned to it. Use with caution!</span>
                </li>
              </ul>
            </div>

            {/* Services Guide */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600 font-bold">
                <Wrench className="w-5 h-5" />
                <h3>Services & Inquiries</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0 mt-1.5" />
                  <span><strong>WhatsApp Setup:</strong> Each service can have its own dedicated contact number and name.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0 mt-1.5" />
                  <span><strong>visibility:</strong> Toggle services "Active" or "Inactive" to control if they appear on the site.</span>
                </li>
              </ul>
            </div>

            {/* Gallery & Security Guide */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-purple-600 font-bold">
                <ShieldCheck className="w-5 h-5" />
                <h3>Gallery & Security</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0 mt-1.5" />
                  <span><strong>Visuals:</strong> Upload project images/videos to showcase your work in the Gallery.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0 mt-1.5" />
                  <span><strong>Security:</strong> The site is protected with password hashing and rate limiting for logins.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0 mt-1.5" />
                  <span><strong>Updates:</strong> Regularly change your password in Settings to keep the panel secure.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">Need deep technical help? Contact your developer.</p>
            <a
              href="/store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy-dark transition-all shadow-md"
            >
              <Store className="w-4 h-4" />
              Open Live Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;





