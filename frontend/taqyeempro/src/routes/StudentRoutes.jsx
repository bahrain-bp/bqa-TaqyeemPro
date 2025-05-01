import StudentLayout from "@/components/layouts/StudentLayout";
import Account from "@/components/pages/Account";
import NotFound from "@/components/pages/NotFound";
import StudentDashboard from "@/components/pages/StudentPages/StudentDashboard";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function StudentRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </div>
  );
}
