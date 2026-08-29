import { X } from "lucide-react";
import React, { useState } from "react";
import AssignmentTable from "~/components/AssignmentTable";
import AuthLayout from "~/layouts/authlayout";

const ShiftAssignmentPage = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <AuthLayout>
      {modalActive && <ShiftAssignFormModal setModal={setModalActive} />}

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
          <button
            onClick={() => {
              setModalActive(true);
            }}
            className="font-bold bg-indigo-500 border border-indigo-500 px-4 py-2 rounded cursor-pointer"
          >
            Assign Shift
          </button>
        </div>
      </div>

      <AssignmentTable />
    </AuthLayout>
  );
};

export default ShiftAssignmentPage;

function ShiftAssignFormModal({ setModal }: { setModal: Function }) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div
        className="absolute inset-0 top-0 left-0 h-screen w-screen bg-neutral-800/80 z-1000]"
        onClick={() => setModal(false)}
      />
      <div className="rounded-xl bg-neutral-900 border border-neutral-500/40 p-8 min-w-120 z-10001">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Assign Shift</span>
            <span className="text-sm text-neutral-300">
              Complete the form below to assign a shift to an employee.
            </span>
          </div>
          <div>
            <X
              className="cursor-pointer hover:text-red-500"
              onClick={() => setModal(false)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mt-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase">First Name</span>
            <input
              type="text"
              name=""
              id=""
              className="border border-neutral-500/40 rounded-lg p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
