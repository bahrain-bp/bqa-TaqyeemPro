import React from "react";
import ModeratorNavBar from "./ModeratorNavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function ModeratorLayout() {
  return (
    <div>
      <ModeratorNavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
