import {
  CircleQuestionMark,
  ClockAlert,
  EllipsisVertical,
  Search,
  UserMinus,
  UserRoundCheck,
} from "lucide-react";
import React from "react";
import { InputLabel } from "~/components/InputLabel";
import AuthLayout from "~/layouts/authlayout";

interface AttendanceAnalyticsCardProps {
  label: string;
  value: string;
  icon: any; // TODO figure out the correct type for this
  color: string;
}
const AttendanceAnalyticsCard = ({
  label,
  value,
  icon: Icon,
  color,
  children,
}: AttendanceAnalyticsCardProps & React.PropsWithChildren) => (
  <div className="p-8 flex flex-col gap-4 border border-neutral-500/40 rounded-xl bg-neutral-800">
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <Icon size={24} className={`${color}`} />
    </div>
    <span className={`text-5xl font-bold ${color}`}>{value}</span>
    <span>{children}</span>
  </div>
);

const AttendancePage = () => {
  return (
    <AuthLayout>
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Attendance</span>
          <span className="text-sm text-neutral-300">
            Monitor team clock-in/out and work hours.
          </span>
        </div>
        <div className="flex items-center justify-stretch gap-4">
          <button className="font-bold text-white border px-4 py-2 rounded cursor-pointer">
            Export Attendance
          </button>
          {/* <button className="font-bold bg-indigo-500 border border-indigo-500 px-4 py-2 rounded cursor-pointer">
            Add Employee
          </button> */}
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-4 gap-8 mt-12">
        <AttendanceAnalyticsCard
          label="Present Today"
          value="142"
          icon={UserRoundCheck}
          color="text-sky-500"
        >
          <strong className="text-green-500">+5%</strong> from yesterday
        </AttendanceAnalyticsCard>
        <AttendanceAnalyticsCard
          label="Late Today"
          value="8"
          icon={ClockAlert}
          color="text-amber-500"
        >
          <strong className="text-green-500">+5%</strong> from yesterday
        </AttendanceAnalyticsCard>
        <AttendanceAnalyticsCard
          label="Absent Today"
          value="2"
          icon={UserMinus}
          color="text-red-500"
        >
          <strong className="text-green-500">+5%</strong> from yesterday
        </AttendanceAnalyticsCard>
        <AttendanceAnalyticsCard
          label="[None]"
          value="--"
          icon={CircleQuestionMark}
          color="text-neutral-500"
        ></AttendanceAnalyticsCard>
      </div>

      {/* Employee Filter Panel */}
      <div className="p-4 rounded-xl dark:bg-neutral-800 border dark:border-neutral-500/30 mt-8">
        <div className="flex items-center justify-stretch gap-4">
          <InputLabel label="Search Employees" className="flex-1">
            <div className="flex items-center py-2 px-4 gap-2 border border-neutral-500/30 rounded-xl">
              <Search />
              <input
                type="text"
                className="border-none outline-none flex-1"
                placeholder="Search by name or ID..."
              />
            </div>
          </InputLabel>
          <InputLabel label="Department">
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Departments</option>
            </select>
          </InputLabel>
          <InputLabel label="Team">
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Teams</option>
            </select>
          </InputLabel>
          <InputLabel label="Level">
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Levels</option>
            </select>
          </InputLabel>
          <InputLabel label="Shift">
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Shifts</option>
            </select>
          </InputLabel>
        </div>
        <div className="flex justify-end items-center mt-4">
          <InputLabel label="Date From">
            <input
              type="date"
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            />
          </InputLabel>
          <InputLabel label="Date To">
            <input
              type="date"
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            />
          </InputLabel>
        </div>
        <hr className="border-neutral-500/40 my-5" />
        <div className="flex justify-between items-center">
          <span>
            Showing <strong>248</strong> employees
          </span>
          <div className="flex gap-4">
            <div className="flex items-center justify-center gap-1 text-sky-500 cursor-pointer">
              Reset Filters
            </div>
            <div className="bg-indigo-500 font-bold rounded px-4 py-2 cursor-pointer">
              Search
            </div>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="rounded-xl dark:bg-neutral-800 border dark:border-neutral-500/30 mt-8">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_60px] text-xs font-semibold dark:text-neutral-300 p-4 border-b dark:border-neutral-500/40">
          <span className="uppercase">Employee</span>
          <span className="uppercase">Date</span>
          <span className="uppercase">Clock In</span>
          <span className="uppercase">Clock Out</span>
          <span className="uppercase">Total Hours</span>
          <span className="uppercase">Status</span>
          <span className="uppercase">Actions</span>
        </div>
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_60px] justify-items-start items-center font-semibold dark:text-neutral-300 p-4 ">
          <div className="flex items-center gap-4">
            <img alt="" className="h-10 w-10 bg-white rounded-full" />
            <div className="flex flex-col">
              <span>Marcus Vance</span>
              <span className="text-xs text-neutral-300">ID: EMP-1042</span>
            </div>
          </div>
          <span>Aug 1, 2026</span>
          <span>08:55 AM</span>
          <span>--:--</span>
          <span>08h 10m</span>
          <span className="rounded-full py-1 px-4 border border-green-500 bg-green-500/40">
            On Time
          </span>
          <div className="items-end">
            <EllipsisVertical className="cursor-pointer" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AttendancePage;
