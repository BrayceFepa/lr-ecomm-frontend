import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Home from "../components/frontend/Home";
import FrontendLayout from "../layouts/frontend/FrontendLayout";
import Page403 from "../components/Errors/Page403";
import Page404 from "../components/Errors/Page404";
import Login from "../components/frontend/Auth/Login";
import Register from "../components/frontend/Auth/Register";
import Collections from "../components/frontend/Collections/ViewCategory";
import ViewProduct from "../components/frontend/Collections/ViewProduct";
import ProductDetails from "../components/frontend/Collections/ProductDetails";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FrontendLayout />}>
        <Route index element={<Home />} />
        {/* Auhtentification pages */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Simple Pages */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:slug" element={<ViewProduct />} />
        <Route
          path="collections/:category/:product"
          element={<ProductDetails />}
        />

        {/* Error pages */}
        <Route path="403" element={<Page403 />} />
        <Route path="404" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
