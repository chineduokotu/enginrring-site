import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X, Loader2, AlertCircle, Save, Upload } from 'lucide-react';
import { servicesApi } from '../../services/api';
import type { Service } from '../../services/api';

const iconOptions = [
  { value: 'Zap', label: 'Electrical (Zap)' },
  { value: 'Shield', label: 'Security (Shield)' },
  { value: 'Sun', label: 'Solar (Sun)' },
  { value: 'Home', label: 'Smart Home (Home)' },
  { value: 'Fence', label: 'Fencing (Fence)' },
  { value: 'Wrench', label: 'Maintenance (Wrench)' },
  { value: 'Settings', label: 'General (Settings)' },
];

const ServiceForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Zap',
    image: '',
    features: [''],
    whatsappNumber: '',
    whatsappContactName: '',
    isActive: true,
  });

  useEffect(() => {
    if (id) {
      const fetchService = async () => {
        try {
          const response = await servicesApi.getById(id);
          const service = response.data;
          setFormData({
            name: service.name,
            description: service.description,
            icon: service.icon,
            image: service.image,
            features: service.features.length > 0 ? service.features : [''],
            whatsappNumber: service.whatsappNumber,
            whatsappContactName: service.whatsappContactName,
            isActive: service.isActive,
          });
        } catch {
          setError('Failed to load service');
        } finally {
          setIsFetching(false);
        }
      };
      fetchService();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData({ ...formData, features: newFeatures });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      // Clear URL input when file is selected
      setFormData({ ...formData, image: '' });
    }
  };

  const clearImageFile = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Service name is required');
      return;
    }
    if (!formData.whatsappNumber.trim()) {
      setError('WhatsApp number is required');
      return;
    }

    setIsLoading(true);

    try {
      // Use FormData if we have a file to upload
      if (imageFile) {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name.trim());
        formDataToSubmit.append('description', formData.description.trim());
        formDataToSubmit.append('icon', formData.icon);
        formDataToSubmit.append('image', imageFile);
        formDataToSubmit.append('features', JSON.stringify(formData.features.filter(f => f.trim() !== '')));
        formDataToSubmit.append('whatsappNumber', formData.whatsappNumber.trim());
        formDataToSubmit.append('whatsappContactName', formData.whatsappContactName.trim());
        formDataToSubmit.append('isActive', String(formData.isActive));

        if (isEditing && id) {
          await servicesApi.update(id, formDataToSubmit);
        } else {
          await servicesApi.create(formDataToSubmit);
        }
      } else {
        // Use regular JSON if no file
        const dataToSubmit: Partial<Service> = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          icon: formData.icon,
          image: formData.image.trim(),
          features: formData.features.filter(f => f.trim() !== ''),
          whatsappNumber: formData.whatsappNumber.trim(),
          whatsappContactName: formData.whatsappContactName.trim(),
          isActive: formData.isActive,
        };

        if (isEditing && id) {
          await servicesApi.update(id, dataToSubmit);
        } else {
          await servicesApi.create(dataToSubmit);
        }
      }

      navigate('/admin/services');
    } catch {
      setError(isEditing ? 'Failed to update service' : 'Failed to create service');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate('/admin/services')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
      >
        <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
        Back to Services
      </button>

      <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-navy mb-4 sm:mb-6">
          {isEditing ? 'Edit Service' : 'Add New Service'}
        </h1>

        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm sm:text-base">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              Service Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., Electrical Installation"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              placeholder="Describe the service..."
            />
          </div>

          {/* WhatsApp Number - IMPORTANT */}
          <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
            <label className="block text-sm font-bold text-green-800 mb-1.5 sm:mb-2">
              WhatsApp Number * (Quote requests will be sent here)
            </label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., +2341234567890"
            />
            <p className="text-xs sm:text-sm text-green-700 mt-2">
              Include country code. This person will receive quote requests for this service.
            </p>
          </div>

          {/* Contact Person Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              Contact Person Name
            </label>
            <input
              type="text"
              name="whatsappContactName"
              value={formData.whatsappContactName}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., John (Electrical Lead)"
            />
          </div>


          {/* Icon selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
              Icon
            </label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
            >
              {iconOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Service Image Section */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <label className="block text-sm font-bold text-gray-800 mb-3">
              Service Image
            </label>
            
            {/* Image Preview */}
            {(imagePreview || formData.image) && (
              <div className="mb-4 relative inline-block">
                <img
                  src={imagePreview || formData.image}
                  alt="Service preview"
                  className="w-40 h-28 object-cover rounded-lg border border-gray-300"
                />
                {imageFile && (
                  <button
                    type="button"
                    onClick={clearImageFile}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            <div className="space-y-4">
              {/* File Upload Option */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload from Device
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Choose File</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {imageFile && (
                    <span className="text-sm text-green-600 font-medium">
                      {imageFile.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-sm text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* URL Input Option */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={(e) => {
                    handleChange(e);
                    // Clear file when URL is entered
                    if (e.target.value) {
                      clearImageFile();
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  disabled={!!imageFile}
                />
                {imageFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Clear the uploaded file to enter a URL instead
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={`Feature ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    disabled={formData.features.length === 1}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 inline-flex items-center gap-2 text-primary hover:text-primary-dark"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
            <label htmlFor="isActive" className="text-gray-700">
              Service is active and visible to customers
            </label>
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/services')}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm sm:text-base"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isEditing ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
