import axios from 'axios';

import {
  getAdminToken,
} from '../utils/adminAuth';


const API_URL =
  'http://localhost:5000/api/gallery';


/*
 * =========================================================
 * ADMIN AUTH HEADERS
 * =========================================================
 */

const getAuthHeaders = () => {
  const token =
    getAdminToken();

  return token
    ? {
        Authorization:
          `Bearer ${token}`,
      }
    : {};
};


/*
 * =========================================================
 * GET ALL GALLERY ITEMS
 * =========================================================
 *
 * PUBLIC
 *
 * No authentication is required.
 *
 * Backend returns temporary signed
 * media URLs.
 */

export const getGalleryItems =
  async () => {
    const response =
      await axios.get(
        API_URL
      );

    return response.data;
  };


/*
 * =========================================================
 * UPLOAD GALLERY MEDIA
 * =========================================================
 *
 * ADMIN ONLY
 *
 * Uploads an image or video to R2.
 *
 * The backend expects:
 *
 * FormData:
 * file -> selected file
 */

export const uploadGalleryMedia =
  async (file) => {
    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    const response =
      await axios.post(
        `${API_URL}/upload`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),

            /*
             * Do not manually set the
             * multipart boundary.
             *
             * Axios/browser will set it
             * automatically.
             */
          },
        }
      );

    return response.data;
  };


/*
 * =========================================================
 * CREATE GALLERY ITEM
 * =========================================================
 *
 * ADMIN ONLY
 *
 * Saves the uploaded mediaKey and
 * media type in PostgreSQL.
 */

export const createGalleryItem =
  async (payload) => {
    const response =
      await axios.post(
        API_URL,
        payload,
        {
          headers: {
            ...getAuthHeaders(),

            'Content-Type':
              'application/json',
          },
        }
      );

    return response.data;
  };


/*
 * =========================================================
 * DELETE GALLERY ITEM
 * =========================================================
 *
 * ADMIN ONLY
 */

export const deleteGalleryItem =
  async (id) => {
    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );

    return response.data;
  };