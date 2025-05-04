import ModeratorLayout from "@/components/layouts/ModeratorLayout";
import Account from "@/components/pages/Account";
import GeneratedQuestions from "@/components/pages/ModeratorPages/GeneratedQuestions";
import ModeratorDashboard from "@/components/pages/ModeratorPages/ModeratorDashboard";
import QuestionsList from "@/components/pages/ModeratorPages/QuestionsList";
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
          <Route path="generated-questions" element={<GeneratedQuestions />} />
          <Route path="generated-questions/:id" element={<QuestionsList />} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </div>
  );
}
