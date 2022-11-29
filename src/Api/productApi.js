import axiosClient from "./axiosClient";

const productsApi = {
  register: (data) => {
    const url = "/api/register";
    return axiosClient.post(url, data);
  },

  login: (data) => {
    const url = "/api/login";
    return axiosClient.post(url, data);
  },

  logout: () => {
    const url = "/api/logout";
    return axiosClient.post(url);
  },

  checkAuth: () => {
    const url = "/api/checkAuth";
    return axiosClient.get(url);
  },

  storeCategory: (data) => {
    const url = "/api/store-category";
    return axiosClient.post(url, data);
  },

  fetchCategories: () => {
    const url = `/api/view-category`;
    return axiosClient.get(url);
  },

  editCategory: (id) => {
    const url = `/api/edit-category/${id}`;
    return axiosClient.get(url);
  },

  updateCategory: (id, data) => {
    const url = `/api/update-category/${id}`;
    return axiosClient.put(url, data);
  },

  deleteCategory: (id) => {
    const url = `/api/delete-category/${id}`;
    return axiosClient.delete(url);
  },

  getAllCategories: () => {
    const url = `/api/all-category`;
    return axiosClient.get(url);
  },

  storeProducts: (data) => {
    const url = `/api/store-product`;
    return axiosClient.post(url, data);
  },

  fetchProducts: () => {
    const url = `/api/view-products`;
    return axiosClient.get(url);
  },

  fetchProductById: (id) => {
    const url = `/api/edit-product/${id}`;
    return axiosClient.get(url);
  },

  updateProduct: (data, id) => {
    const url = `/api/update-product/${id}`;
    return axiosClient.post(url, data);
  },

  getCategories: () => {
    const url = `/api/get-categories`;
    return axiosClient.get(url);
  },

  getProducts: (product_slug) => {
    const url = `/api/fetch-products/${product_slug}`;
    return axiosClient.get(url);
  },

  viewProduct: (category, product) => {
    const url = `/api/view-product/${category}/${product}`;
    return axiosClient.get(url);
  },
};

export default productsApi;
