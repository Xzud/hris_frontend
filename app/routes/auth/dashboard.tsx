import { CircleQuestionMark, UserRoundCheck, UsersRound } from "lucide-react";
import { type ReactNode } from "react";
import AuthLayout from "~/layouts/authlayout";

const DashboardPage = () => {
  return (
    <AuthLayout>
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl font-bold">Dashboard</span>
          <span className="text-sm text-neutral-300">
            Overview analytics for human resources.
          </span>
        </div>
        <div className="flex items-center justify-stretch gap-4">
          <button className="font-bold text-white border px-4 py-2 rounded cursor-pointer">
            Extend Report
          </button>
          <button className="font-bold bg-indigo-500 border border-indigo-500 px-4 py-2 rounded cursor-pointer">
            Add Employee
          </button>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-4 mt-12 gap-8">
        <DashboardAnalyticsCard
          label={"Total Employees"}
          value="1,248"
          icon={
            <div className="bg-sky-400/20 text-sky-500 rounded-xl p-2">
              <UsersRound size={28} />
            </div>
          }
          details={<span>Active workforce headcount across all sectors.</span>}
        />
        <DashboardAnalyticsCard
          label="attendance today"
          value="98%"
          icon={
            <div className="bg-amber-400/20 text-amber-500 rounded-xl p-2">
              <UserRoundCheck size={28} />
            </div>
          }
          details={
            <span>
              Some message here.{" "}
              <a href="#" className="text-blue-500">
                Check Attendance List
              </a>
            </span>
          }
        />
        <DashboardAnalyticsCard />
        <DashboardAnalyticsCard />
      </div>
    </AuthLayout>
  );
};

export default DashboardPage;

interface DashboardAnalayticsCardProps {
  icon?: ReactNode;
  label?: string;
  value?: string;
  details?: ReactNode;
}

function DashboardAnalyticsCard({
  icon,
  label,
  value,
  details,
}: DashboardAnalayticsCardProps) {
  return (
    <div className="flex flex-col gap-4 dark:bg-neutral-800 p-5 rounded-xl">
      <div className="flex items-center justify-between">
        {icon || (
          <div className="bg-neutral-400/20 text-neutral-500 rounded-xl p-2">
            <CircleQuestionMark size={28} />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="uppercase text-xs text-neutral-400">
          {label || "[None]"}
        </span>
        <span className="font-bold text-4xl">{value || "--"}</span>
      </div>
      <hr className="border-neutral-500/30" />
      {details}
    </div>
  );
}
