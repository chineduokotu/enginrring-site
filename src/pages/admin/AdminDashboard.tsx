import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Image, Plus, AlertCircle, Loader2, Settings, Lock } from 'lucide-react';
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
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-navy mb-4 sm:mb-6">Dashboard</h1>

      {error && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm sm:text-base">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6">
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

        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <Settings className="w-6 sm:w-7 h-6 sm:h-7 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Active Services</p>
              <p className="text-2xl sm:text-3xl font-bold text-navy">{stats.services}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6">
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
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-soft hover:shadow-strong transition-shadow"
        >
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Plus className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
          </div>
          <span className="font-medium text-gray-700 text-sm sm:text-base">Add Product</span>
        </Link>

        <Link
          to="/admin/products"
          className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-soft hover:shadow-strong transition-shadow"
        >
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
          </div>
          <span className="font-medium text-gray-700 text-sm sm:text-base">Products</span>
        </Link>

        <Link
          to="/admin/services"
          className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-soft hover:shadow-strong transition-shadow"
        >
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Settings className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
          </div>
          <span className="font-medium text-gray-700 text-sm sm:text-base">Services</span>
        </Link>

        <Link
          to="/admin/gallery"
          className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-soft hover:shadow-strong transition-shadow"
        >
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
          </div>
          <span className="font-medium text-gray-700 text-sm sm:text-base">Gallery</span>
        </Link>

        <Link
          to="/admin/settings"
          className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-soft hover:shadow-strong transition-shadow"
        >
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
          </div>
          <span className="font-medium text-gray-700 text-sm sm:text-base">Settings</span>
        </Link>

        <a
          href="/store"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-soft hover:shadow-strong transition-shadow col-span-2 sm:col-span-1"
        >
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <span className="font-medium text-gray-700 text-sm sm:text-base">View Store</span>
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;

