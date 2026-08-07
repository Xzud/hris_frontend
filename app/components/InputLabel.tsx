import React, { type ComponentPropsWithoutRef } from "react";

type InputLabelProps = ComponentPropsWithoutRef<"div"> & {
  label: string;
};
export function InputLabel({
  label,
  children,
  className,
  ...props
}: InputLabelProps) {
  return (
    <div
      className={`flex flex-col gap-2 dark:text-neutral-300 min-w-60 ${className}`}
      {...props}
    >
      <span className="text-sm font-semibold">{label}</span>
      {children}
    </div>
  );
}
