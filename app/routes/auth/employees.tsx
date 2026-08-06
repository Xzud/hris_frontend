import {
  EllipsisVertical,
  Search,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";
import AuthLayout from "~/layouts/authlayout";

const EmployeesPage = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <AuthLayout>
      {modalActive && <EmployeeFormModal setModal={setModalActive} />}
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Manage Employees</span>
          <span className="text-sm text-neutral-300">
            View and manage your team's employees, roles, and access in one
            place.
          </span>
        </div>
        <div className="flex items-center justify-stretch gap-4">
          <button className="font-bold text-white border px-4 py-2 rounded cursor-pointer">
            Export
          </button>
          <button className="font-bold bg-indigo-500 border border-indigo-500 px-4 py-2 rounded cursor-pointer" onClick={() => setModalActive(true)}>
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Filter Panel */}
      <div className="p-4 rounded-xl dark:bg-neutral-800 border dark:border-neutral-500/30 mt-8">
        <div className="flex items-center justify-stretch gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <span className="text-sm font-semibold dark:text-neutral-300">
              Search Employees
            </span>
            <div className="flex items-center py-2 px-4 gap-2 border border-neutral-500/30 rounded-xl">
              <Search />
              <input
                type="text"
                className="border-none outline-none flex-1"
                placeholder="Search by name or ID..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 dark:text-neutral-300 min-w-60">
            <span className="text-sm font-semibold">Department</span>
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Departments</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 dark:text-neutral-300 min-w-60">
            <span className="text-sm font-semibold">Team</span>
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Teams</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 dark:text-neutral-300 min-w-60">
            <span className="text-sm font-semibold">Level</span>
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Levels</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 dark:text-neutral-300 min-w-60">
            <span className="text-sm font-semibold">Shift</span>
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Shifts</option>
            </select>
          </div>
        </div>
        <hr className="border-neutral-500/40 my-5" />
        <div className="flex justify-between items-center">
          <span>
            Showing <strong>248</strong> employees
          </span>
          <div className="flex items-center justify-center gap-1 text-sky-500 cursor-pointer">
            Reset Filters
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="rounded-xl dark:bg-neutral-800 border dark:border-neutral-500/30 mt-8">
        <div className="grid grid-cols-6 justify-items-end text-xs font-semibold dark:text-neutral-300 p-4 border-b dark:border-neutral-500/40">
          <span className="uppercase place-self-start">employee</span>
          <span className="uppercase">Position & Dept</span>
          <span className="uppercase">Supervisory</span>
          <span className="uppercase">Shift</span>
          <span className="uppercase">Status</span>
          <span className="uppercase">Actions</span>
        </div>
        <div className="grid grid-cols-6 justify-items-end font-semibold dark:text-neutral-300 p-4 ">
          <div className="flex items-center place-self-start gap-2">
            <img alt="" className="h-10 w-10 bg-white rounded-full" />
            <div className="flex flex-col">
              <span className="text-sm">Marcus Vance</span>
              <span className="text-xs text-neutral-300">ID: EMP-1042</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Senior System Engineer</span>
            <span className="text-xs text-neutral-300">
              Engineering - Core Infra
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Serah Jenkins</span>
            <span className="text-xs text-neutral-300">VP Engineering</span>
          </div>
          <span className="text-xs uppercase">Morning</span>
          <span className="text-xs uppercase">Active</span>
          <div className="items-end">
            <EllipsisVertical className="cursor-pointer" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EmployeesPage;

function EmployeeFormModal({ setModal }: { setModal: Function }) {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-neutral-800/80 flex items-center justify-center">
      <div className="rounded-xl bg-neutral-900 border border-neutral-500/40 p-8 min-w-120">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Add Employee</span>
            <span className="text-sm text-neutral-300">
              Enter employee details below.
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
