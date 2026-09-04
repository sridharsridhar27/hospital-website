
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Pencil,
  Trash2,
  Stethoscope,
  Bone,
  HeartPulse,
} from 'lucide-react';

import {
  getServices,
  deleteService,
} from '../api/adminServiceApi';

const CATEGORY_CONFIG = {
  GENERAL: {
    title: 'General Services',
    description:
      'Manage general healthcare services.',
    Icon: Stethoscope,
  },

  ORTHOPAEDIC: {
    title: 'Orthopaedic Services',
    description:
      'Manage orthopaedic and musculoskeletal services.',
    Icon: Bone,
  },

  OBSTETRICS_GYNAECOLOGY: {
    title: 'Obstetrics & Gynaecology Services',
    description:
      'Manage women’s health services.',
    Icon: HeartPulse,
  },
};

function AdminServices() {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [deletingId, setDeletingId] =
    useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getServices();

      setServices(response.data || []);
    } catch (error) {
      console.error(
        'Failed to fetch services:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to load services.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this service?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError('');

      await deleteService(id);

      setServices((currentServices) =>
        currentServices.filter(
          (service) =>
            service.id !== id
        )
      );
    } catch (error) {
      console.error(
        'Failed to delete service:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to delete service.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryServices = (
    category
  ) => {
    return services.filter(
      (service) =>
        service.category === category
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <Link
              to="/"
              className="text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Services
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage hospital services and healthcare offerings.
            </p>

          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading services...
            </p>
          </div>
        )}

        {!loading && (
          <div className="space-y-10">

            {Object.entries(
              CATEGORY_CONFIG
            ).map(
              ([
                category,
                config,
              ]) => {
                const categoryServices =
                  getCategoryServices(
                    category
                  );

                const Icon =
                  config.Icon;

                return (
                  <section
                    key={category}
                  >

                    {/* Category Header */}
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                      <div>

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">

                            <Icon className="h-5 w-5" />

                          </div>

                          <div>

                            <h2 className="text-xl font-bold text-slate-900">
                              {config.title}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                              {
                                config.description
                              }
                            </p>

                          </div>

                        </div>

                      </div>

                      <Link
                        to={`/services/add?category=${category}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
                      >

                        <Plus className="h-4 w-4" />

                        Add Service

                      </Link>

                    </div>

                    {/* Empty */}
                    {categoryServices.length ===
                      0 && (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

                        <p className="text-sm font-medium text-slate-600">
                          No services added yet.
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Add the first service to this category.
                        </p>

                      </div>
                    )}

                    {/* Services */}
                    {categoryServices.length >
                      0 && (
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {categoryServices.map(
                          (service) => (
                            <div
                              key={
                                service.id
                              }
                              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                            >

                              {/* Image */}
                              <div className="h-56 bg-slate-100">

                                {service.imageUrl ? (
                                  <img
                                    src={
                                      service.imageUrl
                                    }
                                    alt={
                                      service.name
                                    }
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                    No image
                                  </div>
                                )}

                              </div>

                              {/* Content */}
                              <div className="p-5">

                                <h3 className="text-lg font-bold text-slate-900">
                                  {
                                    service.name
                                  }
                                </h3>

                                {/* Optional Description */}
                                {service.description && (
                                  <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-500">
                                    {
                                      service.description
                                    }
                                  </p>
                                )}

                                {/* Actions */}
                                <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">

                                  <Link
                                    to={`/services/edit/${service.id}`}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                                  >

                                    <Pencil className="h-4 w-4" />

                                    Edit

                                  </Link>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(
                                        service.id
                                      )
                                    }
                                    disabled={
                                      deletingId ===
                                      service.id
                                    }
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                  >

                                    <Trash2 className="h-4 w-4" />

                                    {deletingId ===
                                    service.id
                                      ? 'Deleting...'
                                      : 'Delete'}

                                  </button>

                                </div>

                              </div>

                            </div>
                          )
                        )}

                      </div>
                    )}

                  </section>
                );
              }
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminServices;

