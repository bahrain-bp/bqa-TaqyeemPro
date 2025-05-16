import NonUserLayout from "@/components/layouts/NonUserLayout";
import About from "@/components/pages/About";
import ContactUs from "@/components/pages/ContactUs";
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
          <Route path="about" element={<About/>} />
          <Route path="contact" element={<ContactUs/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </div>
  );
}
