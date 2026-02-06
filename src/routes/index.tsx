import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Store from '../pages/Store';
import Gallery from '../pages/Gallery';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';

// Admin imports
import AdminLogin from '../pages/admin/AdminLogin';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductList from '../pages/admin/ProductList';
import ProductForm from '../pages/admin/ProductForm';
import GalleryManagement from '../pages/admin/GalleryManagement';
import ServiceManagement from '../pages/admin/ServiceManagement';
import ServiceForm from '../pages/admin/ServiceForm';
import AdminSettings from '../pages/admin/AdminSettings';
import CategoryManagement from '../pages/admin/CategoryManagement';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'store',
        element: <Store />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        path: 'privacy',
        element: <Privacy />,
      },
    ],
  },
  // Admin routes
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'products/new',
        element: <ProductForm />,
      },
      {
        path: 'products/:id/edit',
        element: <ProductForm />,
      },
      {
        path: 'services',
        element: <ServiceManagement />,
      },
      {
        path: 'services/new',
        element: <ServiceForm />,
      },
      {
        path: 'services/:id/edit',
        element: <ServiceForm />,
      },
      {
        path: 'categories',
        element: <CategoryManagement />,
      },
      {
        path: 'gallery',
        element: <GalleryManagement />,
      },
      {
        path: 'settings',
        element: <AdminSettings />,
      },
    ],
  },
]);

