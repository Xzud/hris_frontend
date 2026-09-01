import React from "react";
import { Link, useParams } from "react-router";
import AuthLayout from "~/layouts/authlayout";

const ShiftPreview = () => {
  const { id } = useParams();

  return (
    <AuthLayout>
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Edit Shift</span>
          <span className="text-sm text-neutral-300">
            Update shift details, assign employees, and manage schedules
          </span>
        </div>
        <div className="flex items-center justify-stretch gap-4">
          <Link to="/shifts/" className="font-bold text-white border px-4 py-2 rounded cursor-pointer">
            Back
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ShiftPreview;
