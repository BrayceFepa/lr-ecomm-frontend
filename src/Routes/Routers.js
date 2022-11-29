import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPrivateRoute from "../AdminPrivateRoute";
import Categories from "../components/admin/Category/Categories";
import EditCategory from "../components/admin/Category/EditCategory";
import ViewCategories from "../components/admin/Category/ViewCategories";
import DashBoard from "../components/admin/DashBoard";
import AddProduct from "../components/admin/Products/AddProduct";
import EditProduct from "../components/admin/Products/EditProduct";
import ViewProducts from "../components/admin/Products/ViewProducts";
import Profile from "../components/admin/Profile";
import MasterLayout from "../layouts/admin/MasterLayout";

const Routers = () => {
  return (
    <Routes>
      {/* Private routes */}
      <Route element={<AdminPrivateRoute />}>
        <Route path="/admin" element={<MasterLayout />}>
          <Route index element={<MasterLayout />} />

          {/* Cetgories Routes */}
          <Route path="add-category" element={<Categories />} />
          <Route path="edit-category/:category_id" element={<EditCategory />} />
          <Route path="view-categories" element={<ViewCategories />} />

          {/* Products Routes */}
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:productId" element={<EditProduct />} />
          <Route path="view-products" element={<ViewProducts />} />

          <Route path="dashboard" element={<DashBoard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
