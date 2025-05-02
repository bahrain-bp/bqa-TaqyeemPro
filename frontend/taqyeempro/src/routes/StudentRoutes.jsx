import StudentLayout from "@/components/layouts/StudentLayout";
import StudentDashboard from "@/components/pages/StudentDashboard";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function StudentRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentLayout />}>  
          <Route index element={<StudentDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}
