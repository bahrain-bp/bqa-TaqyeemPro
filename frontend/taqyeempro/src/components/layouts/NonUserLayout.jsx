import React from "react";
import NonUserNavBar from "./NonUserNavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function NonUserLayout() {
  return (
    <div>
      <NonUserNavBar />
      <div>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
