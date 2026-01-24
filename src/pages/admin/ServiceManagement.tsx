import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, MessageCircle, AlertCircle, Loader2, ToggleLeft, ToggleRight, Download } from 'lucide-react';
import { servicesApi } from '../../services/api';
import type { Service } from '../../services/api';

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await servicesApi.getAllAdmin();
      setServices(response.data);
      setError('');
    } catch {
      setError('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSeedServices = async () => {
    try {
      setIsSeeding(true);
      setError('');
      await servicesApi.seed();
      setSuccessMessage('Default services loaded! You can now edit them to add specific WhatsApp numbers.');
      await fetchServices();
    } catch {
      setError('Failed to load default services. They may already exist.');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      await servicesApi.update(service._id, { isActive: !service.isActive });
      setServices(services.map(s => 
        s._id === service._id ? { ...s, isActive: !s.isActive } : s
      ));
    } catch {
      setError('Failed to update service status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await servicesApi.delete(id);
      setServices(services.filter(s => s._id !== id));
      setDeleteId(null);
    } catch {
      setError('Failed to delete service');
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
        <h1 className="text-xl sm:text-2xl font-bold text-navy">Manage Services</h1>
        <Link
          to="/admin/services/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm sm:text-base">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700 text-sm sm:text-base">
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-green-600 hover:text-green-800 text-lg">×</button>
        </div>
      )}

      {services.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4 bg-white rounded-xl shadow-soft">
          <p className="text-gray-500 mb-4">No services found.</p>
          <div className="flex flex-col gap-3 justify-center max-w-xs mx-auto sm:max-w-none sm:flex-row sm:gap-4">
            <button
              onClick={handleSeedServices}
              disabled={isSeeding}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSeeding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              Load Default Services
            </button>
            <Link
              to="/admin/services/new"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Custom Service
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-4 px-4">
            Load default services to quickly set up, then edit each one to add specific WhatsApp numbers.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {services.map((service) => (
              <div key={service._id} className="bg-white rounded-xl shadow-soft p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-navy truncate">{service.name}</p>
                      <button
                        onClick={() => handleToggleActive(service)}
                        className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          service.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {service.isActive ? (
                          <><ToggleRight className="w-3 h-3" /> Active</>
                        ) : (
                          <><ToggleLeft className="w-3 h-3" /> Inactive</>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{service.description}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">WhatsApp:</span>
                    <a 
                      href={`https://wa.me/${service.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      {service.whatsappNumber}
                    </a>
                  </div>
                  {service.whatsappContactName && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Contact:</span>
                      <span className="text-gray-700">{service.whatsappContactName}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
                  <Link
                    to={`/admin/services/${service._id}/edit`}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteId(service._id)}
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
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">WhatsApp Number</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact Person</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {services.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-navy">{service.name}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a 
                          href={`https://wa.me/${service.whatsappNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline flex items-center gap-1"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {service.whatsappNumber}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {service.whatsappContactName || '-'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleToggleActive(service)}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            service.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {service.isActive ? (
                            <>
                              <ToggleRight className="w-4 h-4" />
                              Active
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4" />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/services/${service._id}/edit`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(service._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
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

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-navy mb-2">Delete Service?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this service? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
