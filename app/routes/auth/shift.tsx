import React from "react";
import ShiftTable from "~/components/ShiftTable";
import AuthLayout from "~/layouts/authlayout";

const ShiftPage = () => {
  return (
    <AuthLayout>
      {/* Title Header */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Manage Shift</span>
          <span className="text-sm text-neutral-300">
            Create shift/schedules for your employees.
          </span>
        </div>
        <div className="flex items-center justify-stretch gap-4">
          <button className="font-bold text-white border px-4 py-2 rounded cursor-pointer">
            Export Shifts
          </button>
          <button className="font-bold bg-indigo-500 border border-indigo-500 px-4 py-2 rounded cursor-pointer">
            Add Shift
          </button>
        </div>
      </div>

      {/* Shift Table */}
      <ShiftTable />
    </AuthLayout>
  );
};

export default ShiftPage;
