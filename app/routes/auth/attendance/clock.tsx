import { EllipsisVertical, X } from "lucide-react";
import React, { useState, type PropsWithChildren } from "react";
import AuthLayout from "~/layouts/authlayout";

const ClockPage = () => {
  const [statusOpen, setStatusOpen] = useState(false);
  return (
    <AuthLayout>
      {statusOpen && (
        <BaseModal close={() => setStatusOpen(false)}>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">Change your status</span>
              <span className="text-sm text-neutral-300">
                Choose any of the options below to change your status.
              </span>
            </div>
            <div className="grid grid-cols-3 mt-8 gap-4">
              <button className="w-40 flex items-center justify-center h-40 bg-emerald-500 rounded-xl font-bold text-2xl cursor-pointer">
                Clock In
              </button>
              <button className="w-40 flex items-center justify-center h-40 bg-red-500 rounded-xl font-bold text-2xl cursor-pointer">
                Clock Out
              </button>
              <button className="w-40 flex items-center justify-center h-40 bg-amber-500 rounded-xl font-bold text-2xl cursor-pointer">
                Break
              </button>
            </div>
          </div>
        </BaseModal>
      )}
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Clock</span>
          <span className="text-sm text-neutral-300">
            Time-in and Time-out to log your attendance hours.
          </span>
        </div>
        <div className="flex items-center justify-stretch gap-4">
          <button className="font-bold text-white border px-4 py-2 rounded cursor-pointer">
            Export Attendance
          </button>
          <button
            className="font-bold bg-indigo-500 border border-indigo-500 px-4 py-2 rounded cursor-pointer"
            onClick={() => setStatusOpen(true)}
          >
            Status
          </button>
        </div>
      </div>

      {/* Employee Attendance Bar */}
      <div className="w-full p-4 mt-8">
        <div className="flex items-center justify-between">
          <span>9:00 AM</span>
          <span>Today's Shift</span>
          <span>6:00 PM</span>
        </div>
        <div className="rounded-full overflow-hidden flex">
          <div className="bg-green-500 w-[5%] p-1"></div>
          <div className="bg-gray-500 w-full p-1"></div>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between mt-8">
        <div>
          <span>Total hours: 8h 25m</span>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 mt-4 rounded-xl dark:bg-neutral-800 border border-neutral-500/40">
          <div className="flex justify-between items-baseline">
            <span className="text-xl font-bold">My Requests</span>
            <button className="px-4 py-2 rounded bg-indigo-500 font-bold cursor-pointer">
              Apply
            </button>
          </div>
          <div className="mt-4 flex flex-col justify-stretch">
            <div className="flex justify-between items-end text-sm">
              <div className="">
                <span>Leave Request</span>
                <div className="flex gap-2">
                  <span>Aug 1, 2026</span>
                  <span>08:55 AM</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="px-2 py-1 rounded-full bg-amber-500/40 text-xs">
                  Pending
                </span>
                <div className="h-full flex items-center justify-center">
                  <EllipsisVertical className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Employee List */}
        <div className="rounded-xl dark:bg-neutral-800 border dark:border-neutral-500/30 mt-4">
          <div className="grid grid-cols-[1fr_1fr_1fr_60px] text-xs font-semibold dark:text-neutral-300 p-4 border-b dark:border-neutral-500/40">
            <span className="uppercase">Status</span>
            <span className="uppercase">Date</span>
            <span className="uppercase">Clock In</span>
            <span className="uppercase">Actions</span>
          </div>
          <div className="grid grid-cols-[1fr_1fr_1fr_60px] justify-items-start items-center font-semibold dark:text-neutral-300 p-4 ">
            <span className="rounded-full py-1 px-4 border border-green-500 bg-green-500/40">
              Time in
            </span>
            <span>Aug 1, 2026</span>
            <span>08:55 AM</span>
            <div className="items-end">
              <EllipsisVertical className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ClockPage;

function BaseModal({
  close,
  children,
}: { close: Function } & PropsWithChildren) {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-neutral-800/80 flex items-center justify-center">
      <div
        className="h-screen w-screen absolute z-90 top-0 left-0"
        onClick={() => close()}
      />
      <div className="rounded-xl bg-neutral-900 border z-100 border-neutral-500/40 p-8 min-w-120">
        {children}
      </div>
    </div>
  );
}
