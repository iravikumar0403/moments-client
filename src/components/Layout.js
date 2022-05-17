import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";
import { Suggestions } from "./Suggestions";

export const Layout = () => {
  return (
    <div className="grid-container container mx-auto max-w-screen-xl">
      <SideNav />
      <main className="min-h-screen w-full px-4 pt-[10vh] pb-[10vh] md:pb-4 rounded">
        <Outlet />
      </main>
      <Suggestions />
      <BottomNav />
    </div>
  );
};
