import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Pencil,
  Trash2,
  List,
} from 'lucide-react';

import {
  getConditions,
  deleteCondition,
} from '../api/adminConditionApi';

function AdminConditions() {
  const [conditions, setConditions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [deletingId, setDeletingId] =
    useState(null);

  /*
   * =========================================================
   * FETCH CONDITIONS
   * =========================================================
   */
  const fetchConditions = async () => {
    try {
      setLoading(true);
      setError('');

      const response =
        await getConditions();

      setConditions(
        response.data || []
      );
    } catch (error) {
      console.error(
        'Failed to fetch conditions:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to load conditions.'
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * INITIAL LOAD
   * =========================================================
   */
  useEffect(() => {
    fetchConditions();
  }, []);

  /*
   * =========================================================
   * DELETE CONDITION
   * =========================================================
   */
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this condition? All items belonging to this condition will also be deleted.'
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError('');

      await deleteCondition(id);

      setConditions(
        (currentConditions) =>
          currentConditions.filter(
            (condition) =>
              condition.id !== id
          )
      );
    } catch (error) {
      console.error(
        'Failed to delete condition:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to delete condition.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <Link
              to="/"
              className="text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Conditions
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage patient conditions and
              their healthcare information.
            </p>

          </div>

          <Link
            to="/conditions/add"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            <Plus className="h-4 w-4" />

            Add Condition
          </Link>

        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <p className="text-sm text-slate-500">
              Loading conditions...
            </p>

          </div>
        )}

        {/* =====================================================
            EMPTY
        ===================================================== */}

        {!loading &&
          conditions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

              <p className="text-sm font-medium text-slate-600">
                No conditions added yet.
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Add the first condition to
                display it on the website.
              </p>

            </div>
          )}

        {/* =====================================================
            CONDITIONS
        ===================================================== */}

        {!loading &&
          conditions.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {conditions.map(
                (condition) => (
                  <div
                    key={condition.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >

                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div className="h-56 bg-slate-100">

                      {condition.imageUrl ? (
                        <img
                          src={
                            condition.imageUrl
                          }
                          alt={
                            condition.name
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          No image
                        </div>
                      )}

                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div className="p-5">

                      <h2 className="text-lg font-bold text-slate-900">
                        {condition.name}
                      </h2>

                      <p className="mt-1 text-xs font-medium text-teal-700">
                        /{condition.slug}
                      </p>

                      {condition.description && (
                        <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-500">
                          {
                            condition.description
                          }
                        </p>
                      )}

                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4">

                        {/* Manage Items */}

                        <Link
                          to={`/conditions/${condition.id}/items`}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
                        >
                          <List className="h-4 w-4" />

                          Manage Items
                        </Link>

                        {/* Edit + Delete */}

                        <div className="flex gap-3">

                          <Link
                            to={`/conditions/edit/${condition.id}`}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                          >
                            <Pencil className="h-4 w-4" />

                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                condition.id
                              )
                            }
                            disabled={
                              deletingId ===
                              condition.id
                            }
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />

                            {deletingId ===
                            condition.id
                              ? 'Deleting...'
                              : 'Delete'}
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

      </div>

    </div>
  );
}

export default AdminConditions;