import type { PropsWithChildren } from "react";
import TripleDotAction from "./TripleDotAction";

const ShiftTable = () => {
  const tableGridClass = "grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr_60px]";
  return (
    <div className="col-span-2 rounded-xl dark:bg-neutral-800 border dark:border-neutral-500/30 mt-4">
      <div
        className={`${tableGridClass} text-xs font-semibold dark:text-neutral-300 p-4 border-b dark:border-neutral-500/40`}
      >
        <ShiftHeaderLabel>Type</ShiftHeaderLabel>
        <ShiftHeaderLabel>Name</ShiftHeaderLabel>
        <ShiftHeaderLabel>DayOffs</ShiftHeaderLabel>
        <ShiftHeaderLabel>Time In/Out</ShiftHeaderLabel>
        <ShiftHeaderLabel>Hours (Day)</ShiftHeaderLabel>
        <ShiftHeaderLabel>Hours (Week)</ShiftHeaderLabel>
        <ShiftHeaderLabel>Actions</ShiftHeaderLabel>
      </div>
      <div
        className={`${tableGridClass} justify-items-start items-center font-semibold dark:text-neutral-300 p-4 `}
      >
        <ShiftContentItem>
          <span className="rounded-full py-1 px-4 border border-green-500 bg-green-500/40">
            Flex-Weekly
          </span>
        </ShiftContentItem>
        <ShiftContentItem>-</ShiftContentItem>
        <ShiftContentItem>-</ShiftContentItem>
        <ShiftContentItem>-</ShiftContentItem>
        <ShiftContentItem>-</ShiftContentItem>
        <ShiftContentItem>-</ShiftContentItem>
        <ShiftContentItem className="items-end">
          <TripleDotAction />
        </ShiftContentItem>
      </div>
    </div>
  );
};

function ShiftHeaderLabel({
  children,
  centered = true,
}: { centered?: boolean } & PropsWithChildren) {
  return (
    <span
      className={`w-full ${centered && "flex items-center justify-center"} uppercase`}
    >
      {children}
    </span>
  );
}

function ShiftContentItem({
  children,
  className,
}: { className?: string } & PropsWithChildren) {
  return (
    <span className={`w-full flex items-center justify-center ${className}`}>
      {children}
    </span>
  );
}

export default ShiftTable;
