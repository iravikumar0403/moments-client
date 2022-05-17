import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";

export const Layout = () => {
  return (
    <div className="grid-container container mx-auto max-w-screen-lg">
      <SideNav />
      <main className="min-h-screen w-100 max-w-lg pt-[10vh] pb-[10vh] md:pb-4 md:min-w-[32rem] mx-auto rounded">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
