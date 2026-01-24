import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Loader2, AlertCircle, CheckCircle, Image as ImageIcon, Film, X } from 'lucide-react';
import { galleryApi } from '../../services/api';
import type { GalleryItem } from '../../services/api';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const categories = ['Electrical', 'Solar', 'Security', 'Smart Home'];

const GalleryManagement: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Upload form state
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: categories[0],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    try {
      setError('');
      const response = await galleryApi.getAll();
      setItems(response.data);
    } catch {
      setError('Failed to load gallery items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetUploadForm = () => {
    setUploadData({ title: '', description: '', category: categories[0] });
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowUploadForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!uploadData.title || !uploadData.category) {
      setError('Please fill in title and category');
      return;
    }

    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', uploadData.title);
      formData.append('description', uploadData.description);
      formData.append('category', uploadData.category);
      formData.append('media', selectedFile);

      const response = await galleryApi.create(formData);
      setItems([response.data, ...items]);
      setSuccess('Media uploaded successfully!');
      resetUploadForm();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to upload media');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    setIsDeleting(true);
    try {
      await galleryApi.delete(deleteTarget._id);
      setItems(items.filter(item => item._id !== deleteTarget._id));
      setDeleteTarget(null);
      setSuccess('Item deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to delete item');
    } finally {
      setIsDeleting(false);
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
        <h1 className="text-xl sm:text-2xl font-bold text-navy">Gallery</h1>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full sm:w-auto"
        >
          <Upload className="w-5 h-5" />
          {showUploadForm ? 'Cancel' : 'Upload Media'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm sm:text-base">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError('')} className="flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700 text-sm sm:text-base">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          {success}
        </div>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-navy mb-4">Upload New Media</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                rows={2}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-sm sm:text-base"
                placeholder="Enter description"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media File <span className="text-red-500">*</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                />
                <p className="mt-1 text-xs sm:text-sm text-gray-500">Supported: Images (JPG, PNG, GIF, WebP) and Videos (MP4, MOV, AVI)</p>
              </div>

              {previewUrl && selectedFile && (
                <div className="flex-shrink-0">
                  {selectedFile.type.startsWith('video/') ? (
                    <video src={previewUrl} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg" />
                  ) : (
                    <img src={previewUrl} alt="Preview" className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg" />
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading && <Loader2 className="w-5 h-5 animate-spin" />}
                Upload
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-8 sm:p-12 text-center">
          <ImageIcon className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">No gallery items yet</h3>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">Get started by uploading your first image or video</p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload Media
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-soft overflow-hidden group">
              <div className="relative aspect-[4/3]">
                {item.mediaType === 'video' ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => {
                      const video = e.target as HTMLVideoElement;
                      video.pause();
                      video.currentTime = 0;
                    }}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Media type badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-black/50 text-white rounded-full flex items-center gap-1">
                    {item.mediaType === 'video' ? (
                      <>
                        <Film className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                        <span className="hidden xs:inline">Video</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                        <span className="hidden xs:inline">Image</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Delete button - always visible on mobile */}
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 sm:w-8 h-7 sm:h-8 bg-red-600 text-white rounded-lg flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
              </div>

              <div className="p-2.5 sm:p-4">
                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {item.category}
                </span>
                <h3 className="font-medium text-gray-900 mt-1.5 sm:mt-2 line-clamp-1 text-sm sm:text-base">{item.title}</h3>
                {item.description && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Gallery Item"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone and will also remove the media from storage.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default GalleryManagement;
