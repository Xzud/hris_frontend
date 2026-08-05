import {
  BadgeQuestionMark,
  CalendarCheck,
  FolderInput,
  LayoutDashboard,
  Settings,
  UsersRound,
} from "lucide-react";
import React, { type ReactNode } from "react";

const Dashboard = () => {
  return (
    <div className="flex w-full dark:bg-neutral-900 min-h-screen">
      {/* Side Navigation Bar */}
      <div className="flex flex-col px-8 py-10 dark:bg-neutral-950 fixed top-0 h-full max-h-screen w-70">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Simple HRIS</span>
          <span className="text-xs">Manage your employees</span>
        </div>
        <div className="flex flex-col mt-8 flex-1">
          <li className="list-none">
            <SideNavLink icon={<LayoutDashboard />} name="Dashboard" />
            <SideNavLink icon={<UsersRound />} name="Employee" />
            <SideNavLink icon={<CalendarCheck />} name="Attendance" />
            <SideNavLink icon={<FolderInput />} name="Requests" />
          </li>
        </div>
        <hr className="dark:border-neutral-500/20" />
        <div className="flex flex-col mt-4">
          <li className="list-none">
            <SideNavLink icon={<BadgeQuestionMark />} name="Help Center" />
            <SideNavLink icon={<Settings />} name="Settings" />
          </li>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1"></div>
    </div>
  );
};

interface SideNavLinkProps {
  icon: ReactNode;
  name: string;
  href?: string;
}

function SideNavLink({ icon: Icon, name, href }: SideNavLinkProps) {
  return (
    <ul
      className="flex gap-4 px-4 py-2 border-l-2 border-transparent cursor-pointer
   hover:border-indigo-500 hover:bg-indigo-300/10 transition-all rounded"
    >
      {Icon}
      <a href={href}>{name}</a>
    </ul>
  );
}

export default Dashboard;
