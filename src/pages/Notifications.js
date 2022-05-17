import React from "react";
import NoNotification from "../assets/notify.svg";

export const Notifications = () => {
  return (
    <div className="bg-white dark:bg-slate-900 shadow rounded min-h-[85vh]">
      <img
        className="mx-auto pt-32"
        src={NoNotification}
        alt="no_notifications"
        width={"70%"}
      />
      <p className="text-center p-5 mt-3 text-slate-700 dark:text-slate-200">
        No nofications yet.
      </p>
    </div>
  );
};
