import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { api } from "~/api";
import Button from "~/components/Button";
import { InputLabel } from "~/components/InputLabel";
import TripleDotAction from "~/components/TripleDotAction";
import { defaultProfileImage } from "~/globals";
import AuthLayout from "~/layouts/authlayout";
import type { EmployeeProfileProps } from "~/userStore";

interface PositionProps {
  id: number;
  name: string;
}

interface DepartmentProps {
  id: number;
  name: string;
}

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [employees, setEmployees] = useState<EmployeeProfileProps[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function deleteEmployeeRecord(employee_id: number) {
    try {
      const response = await api.delete("/employees/" + employee_id + "/");

      if (response.status === 204) {
        Swal.fire({
          title: "Deleted",
          text: "Deleted succesfully!",
          icon: "success",
        });
        fetchEmployees();
      }
    } catch (error) {
      console.log("Error deleting employee record: ", error);
    }
  }

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
          <Button>
            Export
          </Button>
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
          employees.map((employee, _) => {
            const fullName =
              `${employee?.supervisor?.first_name ?? ""} ${employee?.supervisor?.last_name ?? ""}`.trim();

            return (
              <div
                key={employee.id}
                className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_60px] justify-items-start font-semibold dark:text-neutral-300 p-4 "
              >
                <div className="flex items-center gap-2">
                  <img
                    src={defaultProfileImage}
                    className="h-10 w-10 bg-white rounded-full"
                  />
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
                  <span className="text-sm">{employee?.position?.name}</span>
                  <span className="text-xs text-neutral-300">
                    {employee?.department?.name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">{fullName ?? "-"}</span>
                  <span className="text-xs text-neutral-300">
                    {employee?.supervisor?.position?.name}
                  </span>
                </div>
                <span className="text-xs uppercase">Morning</span>
                <span className="text-xs uppercase">Active</span>
                <TripleDotAction
                  actions={[
                    {
                      label: "Preview",
                      action: () => {
                        navigate(`/employees/${employee.id}`);
                      },
                    },
                    {
                      label: "Edit",
                      action: () => {},
                    },
                    {
                      label: "Delete",
                      action: () => {
                        Swal.fire({
                          title: "Delete",
                          text: "Are you sure you want to delete this employee record?",
                          icon: "warning",
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: "Yes, Delete",
                          showCancelButton: true,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteEmployeeRecord(employee.id);
                          }
                        });
                      },
                      className: "text-red-500",
                    },
                  ]}
                />
              </div>
            );
          })
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
  const emptyEmployeeDetails = {
    first_name: "",
    middle_name: "",
    last_name: "",
    department_id: "",
    supervisor_id: "",
    phone: "",
    email: "",
    position_id: "",
    birth_date: null,
    hire_date: new Date().toISOString().split("T")[0],
  };
  const [employee, setEmployee] = useState(emptyEmployeeDetails);
  const [supervisors, setSupervisors] = useState<EmployeeProfileProps[]>([]);
  const [positions, setPositions] = useState<PositionProps[]>([]);
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);

  useEffect(() => {
    fetchDepartments();
    fetchPositions();
    fetchSupervisors();
  }, []);

  function updateEmployeeDetail(key: string, value: string) {
    console.log(`Updateing: ${key} | ${value}`);
    setEmployee({ ...employee, [key]: value });
  }

  async function createEmployee(e: any) {
    e.preventDefault();

    console.log("Creating employee: ", employee);

    try {
      const response = await api.post("/employees/", employee);
      if (response.status === 201) {
        alert("Employee created successfully");
        setModal(false); // Close modal after successfully created
      }
    } catch (error) {
      console.log("Error creating employee: ", error);
      alert("Something went wrong");
    }
  }

  async function fetchDepartments() {
    try {
      const response = await api.get("/departments/");
      if (response.status === 200) {
        setDepartments(response.data);
      }
    } catch (error) {
      console.log("Error fetching departments: ", error);
    }
  }

  async function fetchSupervisors() {
    try {
      const response = await api.get("/employees/superiors/");
      console.log("Superiors: ", response);
      if (response.status === 200) {
        setSupervisors(response.data);
      }
    } catch (error) {
      console.log("Error fetching supervisors: ", error);
    }
  }

  async function fetchPositions() {
    try {
      const response = await api.get("/positions/");
      if (response.status === 200) {
        setPositions(response.data);
      }
    } catch (error) {
      console.log("Error fetching positions: ", error);
    }
  }

  const inputStyle = "border border-neutral-500/40 rounded-lg p-2";

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-neutral-800/80 flex items-center justify-center">
      <div
        className="absolute inset-0 top-0 left-0 h-screen w-screen bg-neutral-800/80 z-100]"
        onClick={() => setModal(false)}
      />
      <form
        onSubmit={createEmployee}
        className="flex flex-col gap-4 rounded-xl bg-neutral-900 border border-neutral-500/40 p-8 min-w-120 z-101"
      >
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
            <input
              type="text"
              name=""
              id=""
              placeholder="ex. John"
              className={`${inputStyle}`}
              required
              onChange={(e) =>
                updateEmployeeDetail("first_name", e.target.value)
              }
            />
          </InputLabel>
          <InputLabel label="Middle name">
            <input
              type="text"
              name=""
              id=""
              className={`${inputStyle}`}
              onChange={(e) =>
                updateEmployeeDetail("middle_name", e.target.value)
              }
            />
          </InputLabel>
          <InputLabel label="Last name">
            <input
              type="text"
              name=""
              id=""
              placeholder="ex. Doe"
              className={`${inputStyle}`}
              required
              onChange={(e) =>
                updateEmployeeDetail("last_name", e.target.value)
              }
            />
          </InputLabel>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputLabel label="Department">
            <select
              name=""
              id=""
              className={`${inputStyle}`}
              onChange={(e) =>
                updateEmployeeDetail("department_id", e.target.value)
              }
            >
              <option value="" className="dark:bg-neutral-900">
                Select Department
              </option>
              {departments.map((value, idx) => {
                return (
                  <option
                    key={`dpt-${idx}`}
                    className="dark:bg-neutral-900"
                    value={value.id}
                  >
                    {value.name}
                  </option>
                );
              })}
            </select>
          </InputLabel>
          <InputLabel label="Supervisor">
            <select
              name=""
              id=""
              className={`${inputStyle}`}
              onChange={(e) =>
                updateEmployeeDetail("supervisor_id", e.target.value)
              }
            >
              <option value="" className="dark:bg-neutral-900">
                Select Supervisor
              </option>
              {supervisors.map((value, idx) => {
                return (
                  <option
                    key={`spv-${idx}`}
                    className="dark:bg-neutral-900"
                    value={value.id}
                  >
                    {value.first_name} {value.last_name}
                  </option>
                );
              })}
            </select>
          </InputLabel>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <InputLabel label="Phone number">
            <input
              type="text"
              name=""
              id=""
              placeholder="ex. 09*********"
              className={`${inputStyle}`}
              onChange={(e) => updateEmployeeDetail("phone", e.target.value)}
            />
          </InputLabel>
          <InputLabel label="Email">
            <input
              type="text"
              name=""
              id=""
              placeholder="ex. johndoe@example.com"
              onChange={(e) => updateEmployeeDetail("email", e.target.value)}
              className={`${inputStyle}`}
            />
          </InputLabel>
          <InputLabel label="Position">
            <select
              name=""
              id=""
              className={`${inputStyle}`}
              onChange={(e) =>
                updateEmployeeDetail("position_id", e.target.value)
              }
            >
              <option value="" className="dark:bg-neutral-900">
                Select Position
              </option>
              {positions.map((value, idx) => {
                return (
                  <option
                    key={`position-${idx}`}
                    className="dark:bg-neutral-900"
                    value={value.id}
                  >
                    {value.name}
                  </option>
                );
              })}
            </select>
          </InputLabel>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* TODO implement a handle for blank/null birthdate */}
          <InputLabel label="Birth date">
            <input
              type="date"
              name=""
              id=""
              className={`${inputStyle}`}
              onChange={(e) =>
                updateEmployeeDetail("birth_date", e.target.value)
              }
            />
          </InputLabel>
          <InputLabel label="Hire date">
            <input
              type="date"
              name=""
              id=""
              value={employee.hire_date}
              onChange={(e) =>
                updateEmployeeDetail("hire_date", e.target.value)
              }
              className={`${inputStyle}`}
            />
          </InputLabel>
        </div>
        <div className="flex self-end gap-4 items-end mt-6">
          <button className="px-4 py-2 border-white border rounded-lg">
            Draft
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 border rounded-lg cursor-pointer"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
