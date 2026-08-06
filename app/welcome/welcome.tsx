import type { PropsWithChildren } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  const isAuthenticated = true;

  return (
    <div>
      <div className="h-20 w-full bg-white flex align-center justify-center">
        <div className="text-black flex items-center w-full max-w-7xl justify-between">
          <a href="">
            <img alt="" />
          </a>
          <div></div>
          {isAuthenticated ? (
            <div className="">
              <NavLink value="Dashboard" href="/dashboard" />
            </div>
          ) : (
            <div className="flex justify-between gap-2">
              <NavLink value="Login" href="/login" />
              <span>/</span>
              <NavLink value="Register" href="/register" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavLink({
  value,
  href,
  className,
}: {
  value: string;
  href?: string;
  className?: string;
}) {
  return (
    <a href={href} className={`hover:text-purple-600 ${className}`}>
      {value}
    </a>
  );
}
