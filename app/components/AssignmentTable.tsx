import { useEffect, useState, type PropsWithChildren } from "react";
import TripleDotAction from "./TripleDotAction";
import { api } from "~/api";
import { format } from "date-fns/format";
import { parse } from "date-fns";
import type { EmployeeProfileProps } from "~/userStore";
import type { EmployeeShiftProps } from "./ShiftTable";

interface EmployeeAssignmentProps {
  id: number;
  employee: EmployeeProfileProps;
  shift: EmployeeShiftProps;
  effective_from: string;
  effective_to: string;
  assigned_by: EmployeeProfileProps;
}

const AssignmentTable = () => {
  const [employeeAssignments, setEmployeeAssignments] = useState<
    EmployeeAssignmentProps[]
  >([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  async function fetchAssignments() {
    try {
      const response = await api.get("/shift-assignments/");

      if (response.status === 200) {
        console.log(response.data);
        setEmployeeAssignments(response.data);
      }
    } catch (error) {
      console.error("Error fetching emplyoee Assignments: ", error);
    }
  }
  const tableGridClass = "grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr_60px]";

  return (
    <div className="col-span-2 rounded-xl dark:bg-neutral-800 border dark:border-neutral-500/30 mt-4">
      <div
        className={`${tableGridClass} text-xs font-semibold dark:text-neutral-300 p-4 border-b dark:border-neutral-500/40`}
      >
        <AssignmentHeaderLabel>Type</AssignmentHeaderLabel>
        <AssignmentHeaderLabel>Employee</AssignmentHeaderLabel>
        <AssignmentHeaderLabel>Shift Name</AssignmentHeaderLabel>
        <AssignmentHeaderLabel>Effective From</AssignmentHeaderLabel>
        <AssignmentHeaderLabel>Effective To</AssignmentHeaderLabel>
        <AssignmentHeaderLabel>Assigned by</AssignmentHeaderLabel>
        <AssignmentHeaderLabel>Actions</AssignmentHeaderLabel>
      </div>
      {employeeAssignments.map((assignment, idx) => {
        const getFormatedTime = (time: string | undefined) => {
          if (!time) {
            return "-";
          }

          const datetime = parse(time, "HH:mm:ss", new Date());
          return format(datetime, "h:mm a");
        };

        return (
          <div
            key={"Assignment" + idx}
            className={`${tableGridClass} justify-items-start items-center font-semibold dark:text-neutral-300 p-4 `}
          >
            <AssignmentContentItem>
              <span
                className={`rounded-full py-1 px-2 border border-green-500 bg-green-500/40 text-[10px]`}
              >
                {assignment.shift.shift_type}
              </span>
            </AssignmentContentItem>
            <AssignmentContentItem>
              {assignment.employee.first_name} {assignment.employee.last_name}
            </AssignmentContentItem>
            <AssignmentContentItem>
              {assignment.shift.name}
            </AssignmentContentItem>
            <AssignmentContentItem>
              {format(new Date(assignment.effective_from), "MMM d, yyyy")}
            </AssignmentContentItem>
            <AssignmentContentItem>
              {assignment.effective_to
                ? format(new Date(assignment.effective_to), "MMM d, yyyy")
                : "-"}
            </AssignmentContentItem>
            <AssignmentContentItem>-</AssignmentContentItem>
            <AssignmentContentItem className="items-end">
              <TripleDotAction
                actions={[
                  {
                    label: "Edit",
                    action: () => {},
                  },
                  {
                    label: "Delete",
                    action: () => {},
                    className: "text-red-500",
                  },
                ]}
              />
            </AssignmentContentItem>
          </div>
        );
      })}
    </div>
  );
};

function AssignmentHeaderLabel({
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

function AssignmentContentItem({
  children,
  className,
  centered = true,
}: { className?: string; centered?: boolean } & PropsWithChildren) {
  return (
    <span
      className={`w-full ${centered && "text-center flex items-center justify-center text-sm"} ${className}`}
    >
      {children}
    </span>
  );
}

export default AssignmentTable;
