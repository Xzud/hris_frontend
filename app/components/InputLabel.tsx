import React, {
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
} from "react";

type InputLabelProps = ComponentPropsWithoutRef<"div"> & {
  label: string;
};

export function InputItem({
  className,
  children,
}: { className?: string } & PropsWithChildren) {
  return (
    <div
      className={`border border-neutral-500/30 py-2 px-4 rounded-lg flex gap-2
        [&_input]:border-0 [&_input]:border-none [&_input]:outline-none [&_input]:flex-1  
        ${className}`}
    >
      {children}
    </div>
  );
}

export function InputLabel({
  label,
  children,
  className,
  ...props
}: InputLabelProps) {
  return (
    <div
      className={`flex flex-col gap-2 dark:text-neutral-300 ${className}`}
      {...props}
    >
      <span className="text-sm font-semibold">{label}</span>
      {children}
    </div>
  );
}
