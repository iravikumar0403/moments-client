import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";

export const Layout = () => {
  return (
    <div className="grid-container container mx-auto max-w-screen-lg">
      <SideNav />
      <main className="min-h-screen w-100 max-w-lg mt-[10vh] mb-[10vh] md:mb-4 mx-auto rounded">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
