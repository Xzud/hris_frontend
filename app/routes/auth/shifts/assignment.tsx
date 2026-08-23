import React from "react";
import AssignmentTable from "~/components/AssignmentTable";
import AuthLayout from "~/layouts/authlayout";

const ShiftAssignmentPage = () => {
  return <AuthLayout>
      {/* Title Header */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Shift Assignments</span>
          <span className="text-sm text-neutral-300">
            Assign shift/schedules for your employees.
          </span>
        </div>
        <div className="flex items-center justify-stretch gap-4">
          <button className="font-bold text-white border px-4 py-2 rounded cursor-pointer">
            Export Shift Assignments
          </button>
          <button className="font-bold bg-indigo-500 border border-indigo-500 px-4 py-2 rounded cursor-pointer">
            Assign Shift
          </button>
        </div>
      </div>
      
      <AssignmentTable />
</AuthLayout>;
};

export default ShiftAssignmentPage;
