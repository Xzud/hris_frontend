import {
  BadgeQuestionMark,
  Bell,
  CalendarCheck,
  ChevronDown,
  FolderInput,
  Grip,
  LayoutDashboard,
  LogOut,
  Settings,
  UsersRound,
} from "lucide-react";
import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { Link, useLocation, useNavigate, type To } from "react-router";
import { api } from "~/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/config";
import { useUserStore } from "~/userStore";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { loading: isLoading } = useUserStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const { pathname } = location;

  const sideNavigations = [
    { href: "/dashboard/", icon: <LayoutDashboard />, name: "Dashboard" },
    { href: "/employees/", icon: <UsersRound />, name: "Employees" },
    { href: "/requests/", icon: <FolderInput />, name: "Requests" },
  ];
  return (
    <div className="flex w-full dark:bg-neutral-900 min-h-screen ">
      {isLoading && <Loader />}
      {/* Side Navigation Bar */}
      <div className="flex flex-col px-8 py-10 dark:bg-neutral-950 sticky top-0 h-screen w-70 border-r border-neutral-500/40">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Simple HRIS</span>
          <span className="text-xs">Manage your employees</span>
        </div>
        <div className="flex flex-col mt-8 flex-1">
          <li className="list-none flex flex-col gap-2">
            {sideNavigations.map((navigation, idx) => {
              return (
                <SideNavLink
                  key={`sidenav-${idx}`}
                  href={navigation.href}
                  icon={navigation.icon}
                  name={navigation.name}
                  active={pathname == navigation.href}
                />
              );
            })}
          </li>
          <DropdownNavigation />
        </div>
        <hr className="dark:border-neutral-500/40" />
        <div className="flex flex-col mt-4">
          <li className="list-none flex flex-col gap-2">
            <SideNavLink
              icon={<BadgeQuestionMark />}
              name="Help Center"
              href={"#"}
            />
            <SideNavLink icon={<Settings />} name="Settings" href={"#"} />
          </li>
        </div>
      </div>
      <div className="w-full">
        <TopBar
          isOpen={profileOpen}
          toggle={() => setProfileOpen(!profileOpen)}
        />
        {/* Main Content */}
        <div className="p-8" onClick={() => setProfileOpen(false)}>
          {children}
        </div>
      </div>
    </div>
  );
};

function TopBar({ isOpen, toggle }: { isOpen: boolean; toggle: Function }) {
  const { employee } = useUserStore();
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      const response = await api.post("/auth/logout/");

      if (response.status === 200) {
        // NOTE this is not used for now, currently implementing session based authentication.
        localStorage.removeItem("simplehris_access_token");
        localStorage.removeItem("simplehris_refresh_token");

        alert("Logout successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  }

  return (
    /* Top Bar */
    <div className="flex items-center gap-8 px-12 py-3 w-full sticky top-0 dark:bg-neutral-950 border-b border-neutral-500/40">
      <div className="flex-1 flex items-center">
        <div className="flex-1"></div>
        <div className="flex gap-8 items-center">
          <Bell />
          <Grip />
        </div>
      </div>
      <div
        className="flex gap-4 items-center border-l cursor-pointer dark:border-neutral-500/40 pl-8"
        onClick={() => toggle()}
      >
        <img alt="" className="rounded-full bg-white h-10 w-10" />
        <div className="flex flex-col">
          <span className="text-sm font-bold">
            {employee?.first_name} {employee?.last_name}
          </span>
          <span className="text-xs">IT Administrator</span>
        </div>
        {isOpen && (
          <div className="absolute top-full rounded-b-xl right-8 min-w-48 bg-neutral-800">
            <button
              onClick={logoutUser}
              className="text-red-500 hover:opacity-80 p-4 cursor-pointer w-full"
            >
              <div className="flex justify-between items-center">
                <span>Logout</span>
                <LogOut />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DropdownNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="px-4 py-2 mt-2" onClick={() => setOpen(!open)}>
        <div className="flex justify-between items-center">
          <CalendarCheck />
          <span>Attendance</span>
          <ChevronDown className={`${open && "-rotate-90"} transition-all`} />
        </div>
      </button>
      <div className={`panel-animation mt-3 ${open ? "show" : ""}`}>
        <div className="text-sm flex flex-col gap-1">
          <Link to="/attendance/" className="p-2 pl-6 hover:bg-neutral-600/40">
            Manage
          </Link>
          <Link
            to="/attendance/clock/"
            className="p-2 pl-6 hover:bg-neutral-600/40"
          >
            Clock
          </Link>
        </div>
      </div>
    </>
  );
}

interface SideNavLinkProps {
  icon: ReactNode;
  name: string;
  href: To;
  active?: boolean;
}

function SideNavLink({
  icon: Icon,
  name,
  href = "#",
  active = false,
}: SideNavLinkProps) {
  return (
    <ul>
      <Link
        to={href}
        className={`flex gap-4 px-4 py-2 border-l-2 border-transparent cursor-pointer
        ${active ? "bg-indigo-700" : "hover:border-indigo-500 hover:bg-indigo-300/10"} transition-all rounded`}
      >
        {Icon}
        <span>{name}</span>
      </Link>
    </ul>
  );
}

function Loader() {
  const navigate = useNavigate();
  const { setEmployee, setLoading } = useUserStore();

  useEffect(() => {
    fetchMe();

    async function fetchMe() {
      try {
        const response = await api.get("/auth/me");
        if (response.status === 200) {
          setEmployee(response.data.employee);
          setLoading(false);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Auth error: ", error);
        navigate("/login")
      }
    }
  }, []);

  return (
    <div className="absolute left-0 top-0 z-100 flex flex-col gap-8 w-full dark:bg-neutral-900 min-h-screen items-center justify-center">
      <div className="auth-loader"></div>
      <span className="uppercase font-semibold dark:text-white">Loading</span>
    </div>
  );
}

export default AuthLayout;
