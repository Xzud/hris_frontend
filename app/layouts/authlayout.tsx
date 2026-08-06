import {
  BadgeQuestionMark,
  Bell,
  CalendarCheck,
  FolderInput,
  Grip,
  Icon,
  LayoutDashboard,
  Settings,
  UsersRound,
} from "lucide-react";
import React, {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full dark:bg-neutral-900 min-h-screen ">
      {/* Side Navigation Bar */}
      <div className="flex flex-col px-8 py-10 dark:bg-neutral-950 sticky top-0 h-screen w-70 border-r border-neutral-500/40">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Simple HRIS</span>
          <span className="text-xs">Manage your employees</span>
        </div>
        <div className="flex flex-col mt-8 flex-1">
          <li className="list-none flex flex-col gap-2">
            <SideNavLink
              href="/dashboard/"
              icon={<LayoutDashboard />}
              name="Dashboard"
            />
            <SideNavLink
              href="/employees/"
              icon={<UsersRound />}
              name="Employees"
            />
            <SideNavLink icon={<CalendarCheck />} name="Attendance" />
            <SideNavLink icon={<FolderInput />} name="Requests" />
          </li>
        </div>
        <hr className="dark:border-neutral-500/40" />
        <div className="flex flex-col mt-4">
          <li className="list-none flex flex-col gap-2">
            <SideNavLink icon={<BadgeQuestionMark />} name="Help Center" />
            <SideNavLink icon={<Settings />} name="Settings" />
          </li>
        </div>
      </div>
      <div className="w-full">
        {/* Top Bar */}
        <div className="flex items-center gap-8 px-12 py-3 w-full dark:bg-neutral-950 border-b border-neutral-500/40">
          <div className="flex-1 flex items-center">
            <div className="flex-1"></div>
            <div className="flex gap-8 items-center">
              <Bell />
              <Grip />
            </div>
          </div>
          <div className="flex gap-4 items-center border-l dark:border-neutral-500/40 pl-8">
            <img alt="" className="rounded-full bg-white h-10 w-10" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">Alex Rivera</span>
              <span className="text-xs">IT Administrator</span>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

interface SideNavLinkProps {
  icon: ReactNode;
  name: string;
  href?: string;
}

function SideNavLink({ icon: Icon, name, href }: SideNavLinkProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const currentLink = window.location.pathname;
    if (href) {
      const isActive = currentLink.search(href);
      setActive(isActive >= 0);
    }
  }, []);

  return (
    <ul
      className={`flex gap-4 px-4 py-2 border-l-2 border-transparent cursor-pointer
   ${active ? "bg-indigo-700" : "hover:border-indigo-500 hover:bg-indigo-300/10"} transition-all rounded`}
    >
      {Icon}
      <a href={href}>{name}</a>
    </ul>
  );
}

export default AuthLayout;
