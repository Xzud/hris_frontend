import { Search } from "lucide-react";
import React from "react";
import { InputLabel } from "~/components/InputLabel";
import AuthLayout from "~/layouts/authlayout";

const RequestPage = () => {
  return (
    <AuthLayout>
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Requests</span>
          <span className="text-sm text-neutral-300">
            Manage employee requests such as leave, promotions, and other
            HRIS-related approvals.
          </span>
        </div>
        <div className="flex items-center justify-stretch gap-4">
          <button className="font-bold text-white border px-4 py-2 rounded cursor-pointer">
            Export
          </button>
          <button className="font-bold bg-indigo-500 border border-indigo-500 px-4 py-2 rounded cursor-pointer">
            Create Request
          </button>
        </div>
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
          <InputLabel label="Request Type">
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Types</option>
            </select>
          </InputLabel>
          <InputLabel label="Status">
            <select
              name=""
              id=""
              className="border border-neutral-500/30 p-2 rounded-xl"
            >
              <option value="All">All Statuses</option>
            </select>
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
    </AuthLayout>
  );
};

export default RequestPage;
