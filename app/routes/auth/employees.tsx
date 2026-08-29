import {
  EllipsisVertical,
  Search,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "~/api";
import { InputLabel } from "~/components/InputLabel";
import TripleDotAction from "~/components/TripleDotAction";
import AuthLayout from "~/layouts/authlayout";

interface EmployeeProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  hire_date: string;
  status: string;
}

const EmployeesPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await api.get("/employees/");
        if (response.data) {
          console.log(response.data);
          setEmployees(response.data);
        }
      } catch (error) {
        console.log("Error fetching employees: ", error);
      }
    }

    fetchEmployees();
  }, []);

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
          <button
            className="font-bold bg-indigo-500 border border-indigo-500 px-4 py-2 rounded cursor-pointer"
            onClick={() => setModalActive(true)}
          >
            Add Employee
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
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_60px] justify-items-start text-xs font-semibold dark:text-neutral-300 p-4 border-b dark:border-neutral-500/40">
          <span className="uppercase">employee</span>
          <span className="uppercase">Position & Dept</span>
          <span className="uppercase">Supervisory</span>
          <span className="uppercase">Shift</span>
          <span className="uppercase">Status</span>
          <span className="uppercase">Actions</span>
        </div>
        {employees.length > 0 ? (
          employees.map((employee, _) => (
            <div
              key={employee.id}
              className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_60px] justify-items-start font-semibold dark:text-neutral-300 p-4 "
            >
              <div className="flex items-center gap-2">
                <img alt="" className="h-10 w-10 bg-white rounded-full" />
                <div className="flex flex-col">
                  <span className="text-sm">
                    {employee.first_name} {employee.last_name}
                  </span>
                  <span className="text-xs text-neutral-300">
                    ID: EMP-{`${employee.id}`.padStart(4, "0")}
                  </span>
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
              <TripleDotAction />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center p-4">
            <span className="text-sm dark:text-neutral-300">
              No Employees found.
            </span>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default EmployeesPage;

function EmployeeFormModal({ setModal }: { setModal: Function }) {
  const inputStyle = "border border-neutral-500/40 rounded-lg p-2";

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-800/80 flex items-center justify-center">
      <div
        className="absolute inset-0 top-0 left-0 h-screen w-screen bg-neutral-800/80 z-100]"
        onClick={() => setModal(false)}
      />
      <div className="flex flex-col gap-4 rounded-xl bg-neutral-900 border border-neutral-500/40 p-8 min-w-120 z-101">
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
        <div className="grid grid-cols-3 gap-4">
          <InputLabel label="First name">
            <input type="text" name="" id="" className={`${inputStyle}`} />
          </InputLabel>
          <InputLabel label="Middle name">
            <input type="text" name="" id="" className={`${inputStyle}`} />
          </InputLabel>
          <InputLabel label="Last name">
            <input type="text" name="" id="" className={`${inputStyle}`} />
          </InputLabel>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputLabel label="Department">
            <select name="" id="" className={`${inputStyle}`}>
              <option value="">IT Department</option>
              <option value="">HR Department</option>
              <option value="">Management</option>
            </select>
          </InputLabel>
          <InputLabel label="Supervisor">
            <select name="" id="" className={`${inputStyle}`}>
              <option value="">Supervisor 1</option>
              <option value="">Supervisor 2</option>
              <option value="">Supervisor 3</option>
            </select>
          </InputLabel>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <InputLabel label="Phone number">
            <input type="text" name="" id="" className={`${inputStyle}`} />
          </InputLabel>
          <InputLabel label="Email">
            <input type="text" name="" id="" className={`${inputStyle}`} />
          </InputLabel>
          <InputLabel label="Position">
            <select name="" id="" className={`${inputStyle}`}>
              <option value="">IT</option>
              <option value="">HR</option>
              <option value="">Manager</option>
            </select>
          </InputLabel>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputLabel label="Birth date">
            <input type="text" name="" id="" className={`${inputStyle}`} />
          </InputLabel>
          <InputLabel label="Hire date">
            <input type="text" name="" id="" className={`${inputStyle}`} />
          </InputLabel>
        </div>
        <div className="flex self-end gap-4 items-end mt-6">
          <button className="px-4 py-2 border-white border rounded-lg">
            Draft
          </button>
          <button className="px-4 py-2 bg-emerald-500 border rounded-lg">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
