import { useEffect, useState } from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import {
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
} from 'lucide-react';

import {
  getConditionById,
  getConditionItems,
  deleteConditionItem,
} from '../api/adminConditionApi';

function AdminConditionItems() {
  const { conditionId } = useParams();

  const [condition, setCondition] =
    useState(null);

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [deletingId, setDeletingId] =
    useState(null);

  /*
   * =========================================================
   * LOAD CONDITION + ITEMS
   * =========================================================
   */

  const fetchConditionItems = async () => {
    try {
      setLoading(true);
      setError('');

      /*
       * Load parent condition.
       */
      const conditionResponse =
        await getConditionById(
          conditionId
        );

      setCondition(
        conditionResponse.data
      );

      /*
       * Load items belonging to
       * this condition.
       */
      const itemsResponse =
        await getConditionItems(
          conditionId
        );

      setItems(
        itemsResponse.data || []
      );
    } catch (error) {
      console.error(
        'Failed to fetch condition items:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to load condition items.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConditionItems();
  }, [conditionId]);

  /*
   * =========================================================
   * DELETE ITEM
   * =========================================================
   */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this condition item?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError('');

      await deleteConditionItem(id);

      setItems(
        (currentItems) =>
          currentItems.filter(
            (item) =>
              item.id !== id
          )
      );
    } catch (error) {
      console.error(
        'Failed to delete condition item:',
        error
      );

      setError(
        error.response?.data?.message ||
          'Failed to delete condition item.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-7xl">

          <p className="text-sm text-slate-500">
            Loading condition items...
          </p>

        </div>

      </div>
    );
  }

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

        <div className="mb-10">

          <Link
            to="/conditions"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Conditions
          </Link>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {condition?.name ||
                  'Condition Items'}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage information and content
                belonging to this condition.
              </p>

            </div>

            <Link
              to={`/conditions/${conditionId}/items/add`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              <Plus className="h-4 w-4" />

              Add Item
            </Link>

          </div>

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
            CONDITION INFORMATION
        ===================================================== */}

        {condition && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col sm:flex-row">

              {/* Condition Image */}

              <div className="h-48 bg-slate-100 sm:h-auto sm:w-64">

                {condition.imageUrl ? (
                  <img
                    src={condition.imageUrl}
                    alt={condition.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">
                    No image
                  </div>
                )}

              </div>

              {/* Condition Details */}

              <div className="flex-1 p-6">

                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                  Condition
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {condition.name}
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  /{condition.slug}
                </p>

                {condition.description && (
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                    {condition.description}
                  </p>
                )}

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

            <h2 className="text-lg font-bold text-slate-800">
              No condition items yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add the first item for this
              condition.
            </p>

            <Link
              to={`/conditions/${conditionId}/items/add`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              <Plus className="h-4 w-4" />

              Add Item
            </Link>

          </div>
        )}

        {/* =====================================================
            ITEMS
        ===================================================== */}

        {items.length > 0 && (
          <div>

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  Condition Items
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {items.length}{' '}
                  {items.length === 1
                    ? 'item'
                    : 'items'}
                </p>

              </div>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >

                  {/* Item Image */}

                  <div className="h-48 bg-slate-100">

                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        No image
                      </div>
                    )}

                  </div>

                  {/* Item Content */}

                  <div className="p-5">

                    <h3 className="text-lg font-bold text-slate-900">
                      {item.name}
                    </h3>

                    {item.description && (
                      <p className="mt-3 line-clamp-5 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    )}

                    {/* Actions */}

                    <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">

                      <Link
                        to={`/conditions/${conditionId}/items/edit/${item.id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        <Pencil className="h-4 w-4" />

                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        disabled={
                          deletingId ===
                          item.id
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />

                        {deletingId ===
                        item.id
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminConditionItems;