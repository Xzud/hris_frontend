import { useEffect, useState, type PropsWithChildren } from "react";
import TripleDotAction from "./TripleDotAction";
import { api } from "~/api";
import { format } from "date-fns/format";
import { parse } from "date-fns";
import { useNavigate } from "react-router";
import type { EmployeeShiftProps } from "~/userStore";

const ShiftTable = () => {
  const navigate = useNavigate();

  const [employeeShifts, setEmployeeShifts] = useState<EmployeeShiftProps[]>(
    [],
  );

  useEffect(() => {
    fetchShifts();
  }, []);

  async function fetchShifts() {
    try {
      const response = await api.get("/employee-shifts/");

      if (response.status === 200) {
        console.log(response.data);
        setEmployeeShifts(response.data);
      }
    } catch (error) {
      console.error("Error fetching emplyoee shifts: ", error);
    }
  }
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
      {employeeShifts.map((shift, idx) => {
        const getFormatedTime = (time: string | undefined) => {
          if (!time) {
            return "-";
          }

          const datetime = parse(time, "HH:mm:ss", new Date());
          return format(datetime, "h:mm a");
        };

        return (
          <div
            key={"shift" + idx}
            className={`${tableGridClass} justify-items-start items-center font-semibold dark:text-neutral-300 p-4 `}
          >
            <ShiftContentItem>
              <span className="rounded-full py-1 px-4 border border-green-500 bg-green-500/40 text-xs">
                {shift.shift_type}
              </span>
            </ShiftContentItem>
            <ShiftContentItem>{shift.name}</ShiftContentItem>
            <ShiftContentItem>-</ShiftContentItem>
            <ShiftContentItem>
              {shift.start_time && shift.end_time
                ? getFormatedTime(shift.start_time) +
                  " / " +
                  getFormatedTime(shift.end_time)
                : "-"}
            </ShiftContentItem>
            <ShiftContentItem>
              {shift.required_hours_per_day ?? "-"}
            </ShiftContentItem>
            <ShiftContentItem>
              {shift.required_hours_per_week ?? "-"}
            </ShiftContentItem>
            <ShiftContentItem className="items-end">
              <TripleDotAction
                actions={[
                  {
                    label: "Edit",
                    action: () => {
                      navigate(`/shifts/${shift.id}`);
                    },
                  },
                  {
                    label: "Delete",
                    action: () => {},
                    className: "text-red-500",
                  },
                ]}
              />
            </ShiftContentItem>
          </div>
        );
      })}
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
  centered = true,
}: { className?: string; centered?: boolean } & PropsWithChildren) {
  return (
    <span
      className={`w-full ${centered && "text-center flex items-center justify-center"} ${className}`}
    >
      {children}
    </span>
  );
}

export default ShiftTable;
