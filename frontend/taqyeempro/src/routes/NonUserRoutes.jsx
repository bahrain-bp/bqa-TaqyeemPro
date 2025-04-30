import NonUserLayout from "@/components/layouts/NonUserLayout";
import Home from "@/components/pages/Home";
import Login from "@/components/pages/Login";
import NotFound from "@/components/pages/NotFound";
import Register from "@/components/pages/Register";
import React from "react";
import { Routes, Route } from "react-router-dom";

export default function NonUserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NonUserLayout />}>
          <Route index element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </div>
  );
}
