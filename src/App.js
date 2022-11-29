import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/admin/DashBoard";
import Profile from "./components/admin/Profile";
import Home from "./components/frontend/Home";
import MasterLayout from "./layouts/admin/MasterLayout";
import PublicRoutes from "./Routes/PublicRoutes";
import Routers from "./Routes/Routers";

function App() {
  return (
    <div className="App">
      <PublicRoutes />
      <Routers />
    </div>
  );
}

export default App;
