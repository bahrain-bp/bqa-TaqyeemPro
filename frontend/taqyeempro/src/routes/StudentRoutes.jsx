import StudentLayout from "@/components/layouts/StudentLayout";
import Account from "@/components/pages/Account";
import NotFound from "@/components/pages/NotFound";
import StudentDashboard from "@/components/pages/StudentPages/StudentDashboard";
import StudentExamCard from "@/components/pages/StudentPages/StudentExamCard";
import StudentExamPage from "@/components/pages/StudentPages/StudentExamPage";
import StudentConfirmationPage from "@/components/pages/StudentPages/StudentConfirmationPage";
import StudentQuitPage from "@/components/pages/StudentPages/StudentQuitPage";
import About from "@/components/pages/About";
import ContactUs from "@/components/pages/ContactUs";


import React from "react";
import { Route, Routes } from "react-router-dom";

export default function StudentRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentLayout />}>  
          <Route index element={<StudentDashboard />} />
          <Route path="/StudentExamCard" element={<StudentExamCard />} />
          <Route path="/StudentExamPage" element={<StudentExamPage />} />
          <Route path="/StudentConfirmationPage" element={<StudentConfirmationPage />} />
          <Route path="/StudentQuitPage" element={<StudentQuitPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </div>
  );
}
