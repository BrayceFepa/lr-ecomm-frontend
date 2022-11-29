import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const FrontendLayout = () => {
  return (
    <div>
      <>
        <NavBar />
      </>
      <Outlet />
    </div>
  );
};

export default FrontendLayout;
