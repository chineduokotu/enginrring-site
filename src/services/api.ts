import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Product types
export type ProductImage = {
  url: string;
  publicId: string;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: ProductImage[];
  featured: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

// Products API
export const productsApi = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  create: (formData: FormData) =>
    api.post<Product>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: string, formData: FormData) =>
    api.put<Product>(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: string) => api.delete(`/products/${id}`),
  seed: () => api.post('/products/seed'),
};

// Gallery types
export type GalleryItem = {
  _id: string;
  title: string;
  description: string;
  category: string;
  mediaType: 'image' | 'video';
  url: string;
  publicId: string;
  createdAt: string;
  updatedAt: string;
};

// Gallery API
export const galleryApi = {
  getAll: () => api.get<GalleryItem[]>('/gallery'),
  create: (formData: FormData) =>
    api.post<GalleryItem>('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: string) => api.delete(`/gallery/${id}`),
};

// Service types
export type Service = {
  _id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  whatsappNumber: string;
  whatsappContactName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Services API
export const servicesApi = {
  getAll: () => api.get<Service[]>('/services'),
  getAllAdmin: () => api.get<Service[]>('/services/all'),
  getById: (id: string) => api.get<Service>(`/services/${id}`),
  create: (data: FormData | Partial<Service>) => {
    if (data instanceof FormData) {
      return api.post<Service>('/services', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return api.post<Service>('/services', data);
  },
  update: (id: string, data: FormData | Partial<Service>) => {
    if (data instanceof FormData) {
      return api.put<Service>(`/services/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return api.put<Service>(`/services/${id}`, data);
  },
  delete: (id: string) => api.delete(`/services/${id}`),
  seed: () => api.post('/services/seed'),
};

export default api;
