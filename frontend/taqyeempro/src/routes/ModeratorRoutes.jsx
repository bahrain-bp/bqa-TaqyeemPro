import ModeratorLayout from "@/components/layouts/ModeratorLayout";
import Account from "@/components/pages/Account";
import Exams from "@/components/pages/ModeratorPages/Exams";
import GeneratedQuestions from "@/components/pages/ModeratorPages/GeneratedQuestions";
import ModeratorDashboard from "@/components/pages/ModeratorPages/ModeratorDashboard";
import QuestionsList from "@/components/pages/ModeratorPages/QuestionsList";
import Reports from "@/components/pages/ModeratorPages/Reports";
import Users from "@/components/pages/ModeratorPages/Users";
import NotFound from "@/components/pages/NotFound";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function ModeratorRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ModeratorLayout />}>
          <Route index element={<ModeratorDashboard />} />
          <Route path="account" element={<Account />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="exams" element={<Exams />} />
          <Route path="generated-questions" element={<GeneratedQuestions />} />
          <Route path="generated-questions/:subjectGradeLang" element={<QuestionsList />} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </div>
  );
}
