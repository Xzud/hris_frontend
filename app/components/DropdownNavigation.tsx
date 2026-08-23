import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, type To } from "react-router";

interface DropdownNavgiationLinkProps {
  label: string;
  to: To;
}

export function DropdownNavigation({
  title,
  links,
}: {
  title: ReactNode;
  links: DropdownNavgiationLinkProps[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="px-4 py-2" onClick={() => setOpen(!open)}>
        <div className="flex justify-between">
          {title}
          <ChevronDown className={`${open && "-rotate-90"} transition-all`} />
        </div>
      </button>
      <div className={`panel-animation mt-3 ${open ? "show" : ""}`}>
        <div className="text-sm flex flex-col gap-1">
          {links.map((link, idx) => (
            <Link
              key={`dropdownnav-${link.label}-${idx}`}
              to={link.to}
              className="p-2 pl-6 hover:bg-neutral-600/40"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
