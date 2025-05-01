import ModeratorLayout from "@/components/layouts/ModeratorLayout";
import Account from "@/components/pages/Account";
import ModeratorDashboard from "@/components/pages/ModeratorPages/ModeratorDashboard";
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
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </div>
  );
}
