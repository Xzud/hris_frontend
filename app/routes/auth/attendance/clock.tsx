import {
  format,
  formatDuration,
  intervalToDuration,
  type Duration,
} from "date-fns";
import { EllipsisVertical, X } from "lucide-react";
import React, { useEffect, useState, type PropsWithChildren } from "react";
import Swal from "sweetalert2";
import { api } from "~/api";
import TripleDotAction from "~/components/TripleDotAction";
import AuthLayout from "~/layouts/authlayout";
import { useUserStore } from "~/userStore";

interface AttendanceProps {
  id: string;
  date: string;
  clock_in: string;
  clock_out: string;
  status: string;
}

const ClockPage = () => {
  const [statusOpen, setStatusOpen] = useState(false);
  const [attendances, setAttendance] = useState<AttendanceProps[]>([]);
  const [shiftStarted, setShiftStarted] = useState(false);

  const { employee } = useUserStore();

  useEffect(() => {
    if (!employee) return;

    fetchAttendances();
  }, [employee]);

  async function fetchAttendances() {
    console.log("Employee: ", employee);
    if (!employee) return;

    try {
      const response = await api.get(`/attendance/${employee.id}/`);
      if (response.status === 200) {
        setAttendance(response.data);
        setShiftStarted(response.data[0].clock_out === null);
      }
      console.log("Attendances: ", response);
    } catch (error) {
      console.error("Error on fetching attendance: ", error);
    }
  }

  function clockIn() {
    Swal.fire({
      title: "Clock-in",
      text: "Are you sure you want to continue?",
      icon: "question",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Clock in",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        attendanceClockIn();
      }
    });

    async function attendanceClockIn() {
      try {
        const response = await api.post("/attendance/clock-in/");
        console.log("Clock in response: ", response);
        if (response.status === 201) {
          await fetchAttendances();
          Swal.fire({
            title: "Clock-in",
            text: "You have succesfully clocked in!",
            icon: "success",
          });
          setStatusOpen(false);
        } else {
          Swal.fire({
            title: "Error",
            text: "Oh no, something went wrong.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error on clock-in: ", error);
        Swal.fire({
          title: "Error",
          text: "Oh no, something went wrong.",
          icon: "error",
        });
      }
    }
  }

  function clockOut() {
    Swal.fire({
      title: "Clock-out",
      text: "Are you sure you want to continue?",
      icon: "question",
      confirmButtonColor: "#fb2c36",
      confirmButtonText: "Yes, Clock out",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        AttendanceClockOut();
      }
    });

    async function AttendanceClockOut() {
      try {
        const response = await api.post("/attendance/clock-out/");

        console.log("Clock out response: ", response);
        if (response.status === 200) {
          await fetchAttendances();
          Swal.fire({
            title: "Clock-out",
            text: "You have succesfully clocked out!",
            icon: "success",
          });
          setStatusOpen(false);
        } else {
          Swal.fire({
            title: "Error",
            text: "Oh no, something went wrong.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error on clock-in: ", error);
        Swal.fire({
          title: "Error",
          text: "Oh no, something went wrong.",
          icon: "error",
        });
      }
    }
  }

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
              <button
                onClick={clockIn}
                disabled={shiftStarted}
                className={`w-40 flex items-center justify-center h-40 rounded-xl font-bold text-2xl ${shiftStarted ? "bg-neutral-500 cursor-not-allowed" : "bg-emerald-500 cursor-pointer"}`}
              >
                Clock In
              </button>
              <button
                onClick={clockOut}
                disabled={!shiftStarted}
                className={`w-40 flex items-center justify-center h-40 rounded-xl font-bold text-2xl ${shiftStarted ? "bg-red-500 cursor-pointer" : "bg-neutral-500 cursor-not-allowed"} `}
              >
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

      <div className="grid grid-cols-3 gap-4">
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
        {/* Attendance List */}
        <div className="col-span-2 rounded-xl dark:bg-neutral-800 border dark:border-neutral-500/30 mt-4">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_60px] text-xs font-semibold dark:text-neutral-300 p-4 border-b dark:border-neutral-500/40">
            <span className="uppercase">Status</span>
            <span className="uppercase">Clock In</span>
            <span className="uppercase">Clock Out</span>
            <span className="uppercase">Duration</span>
            <span className="uppercase">Actions</span>
          </div>
          {attendances.map((attendance, idx) => {
            const start = attendance.clock_in;
            const end = attendance.clock_out;
            const duration =
              start && end
                ? intervalToDuration({
                    start: new Date(attendance.clock_in),
                    end: new Date(attendance.clock_out),
                  })
                : null;

            const statusColor: Record<string, string> = {
              Late: "border-amber-500 bg-amber-500/40",
              Present: "border-green-500 bg-green-500/40",
            };

            return (
              <div
                key={`attendance-${idx}`}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_60px] justify-items-start items-center font-semibold dark:text-neutral-300 p-4 "
              >
                <span
                  className={`rounded-full py-1 px-4 border ${statusColor[attendance.status]}`}
                >
                  {attendance.status}
                </span>
                <span>{datetimeFormat(attendance.clock_in)}</span>
                <span>
                  {attendance.clock_out
                    ? datetimeFormat(attendance.clock_out)
                    : "-"}
                </span>
                <span>{duration ? formatCustomDuration(duration) : "-"}</span>
                <div className="items-end">
                  <TripleDotAction
                    deleteAction={async () => {
                      try {
                        const response = await api.delete(
                          `/attendance/${attendance.id}/delete/`,
                        );
                        if (response.status === 204) {
                          alert("Deleted successfully");
                          fetchAttendances();
                        }
                      } catch (error) {
                        console.log("Error deleting attendance: ", error);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AuthLayout>
  );

  function datetimeFormat(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  function formatCustomDuration(duration: Duration) {
    // Handle potential undefined values with || 0
    const h = duration.hours || 0;
    const m = duration.minutes || 0;

    // Add leading zero to minutes if needed (e.g., 5 -> "05")
    const formattedMinutes = m < 10 ? `0${m}` : m;

    return `${h}h ${formattedMinutes}m`;
  }
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
