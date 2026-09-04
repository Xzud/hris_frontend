import { format, parse } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "~/api";
import Button from "~/components/Button";
import { InputItem, InputLabel } from "~/components/InputLabel";
import { defaultProfileImage } from "~/globals";
import AuthLayout from "~/layouts/authlayout";
import { type EmployeeProfileProps } from "~/userStore";

const EmployeePreviewPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeProfileProps>();

  useEffect(() => {
    fetchEmployeeProfile();
  }, []);

  async function fetchEmployeeProfile() {
    try {
      const response = await api.get(`/employees/${id}`);

      console.log("Employee profile: ", response);
      if (response.status === 200) setEmployee(response.data);
    } catch (error) {
      console.log("Error on fetching employee profile: ", error);
    }
  }

  return (
    <AuthLayout>
      <div className="w-full flex mb-4">
        <Link
          to={"/employees/"}
          className="flex gap-2 items-center cursor-pointer"
        >
          <ChevronLeft />
          <span className="font-bold">Back</span>
        </Link>
      </div>
      <div className="grid grid-cols-6">
        {/* Left Container */}
        <div className="col-span-4 flex flex-col gap-8">
          {/* Profile Container */}
          <div className="flex p-6 border-b border-b-neutral-500/40 gap-8">
            <img
              src={defaultProfileImage}
              alt=""
              className={"h-40 w-40 rounded bg-neutral-600"}
            />
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col">
                <span className="font-bold text-2xl">{`${employee?.first_name} ${employee?.last_name}`}</span>
                <span className="dark:text-neutral-400">
                  {employee?.position.name ?? "Not stated"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2">
                  <span className="dark:text-neutral-400">Email address</span>
                  <span>{employee?.email ?? "-"}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="dark:text-neutral-400">Phone number</span>
                  <span>{employee?.phone ? employee.phone : "-"}</span>
                </div>

                <div className="grid grid-cols-2">
                  <div className="grid grid-cols-[100px_1fr]">
                    <span className="dark:text-neutral-400">Account</span>
                    <span>{employee?.user ? "Yes" : "No"}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr]">
                    <span className="dark:text-neutral-400">Last Active</span>
                    <span>
                      {employee?.user?.last_login
                        ? format(
                            new Date(employee.user.last_login),
                            "MMM d, yyyy h:mm a",
                          )
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Personal Information Wrapper*/}
          <div className="pl-4 pr-8">
            {/* Personal Information */}
            <div className="flex flex-col py-4 px-6 rounded-xl bg-neutral-800">
              <div className="flex justify-between">
                <span className="font-bold text-lg">Personal Information</span>
                <div className="flex items-center gap-4">
                  <Button>Cancel</Button>
                  <Button className="bg-indigo-500">Save</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <InputLabel label="First Name">
                  <InputItem>
                    <input
                      type="text"
                      name=""
                      id=""
                      disabled
                      value={employee?.first_name ?? "-"}
                    />
                  </InputItem>
                </InputLabel>
                <InputLabel label="Last Name">
                  <InputItem>
                    <input
                      type="text"
                      name=""
                      id=""
                      disabled
                      value={employee?.last_name ?? "-"}
                    />
                  </InputItem>
                </InputLabel>
                <InputLabel label="Email Address">
                  <InputItem>
                    <input
                      type="text"
                      name=""
                      id=""
                      disabled
                      value={employee?.email ?? "-"}
                    />
                  </InputItem>
                </InputLabel>
                <InputLabel label="Phone Number">
                  <InputItem>
                    <input
                      type="text"
                      name=""
                      id=""
                      disabled
                      value={employee?.phone ?? "-"}
                    />
                  </InputItem>
                </InputLabel>
                <InputLabel label="Timezone">
                  <InputItem>
                    <input
                      type="text"
                      name=""
                      id=""
                      disabled
                      value={"PHST - GMT+8 | Asia/Manila"}
                    />
                  </InputItem>
                </InputLabel>
                <InputLabel label="Birth Date">
                  <InputItem>
                    <input
                      type="text"
                      name=""
                      id=""
                      disabled
                      value={
                        employee?.birth_date
                          ? format(new Date(employee.birth_date), "MMM d, yyyy")
                          : "-"
                      }
                    />
                  </InputItem>
                </InputLabel>
              </div>
            </div>
          </div>

          {/* Employee Information */}
          <div className="flex flex-col py-4 px-6">
            <span className="text-lg font-bold">Employment Details</span>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4">
              <InputLabel label="Position">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={employee?.position.name ?? "-"}
                  />
                </InputItem>
              </InputLabel>
              <InputLabel label="Department">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={employee?.department?.name ?? "-"}
                  />
                </InputItem>
              </InputLabel>
              <InputLabel label="Employee ID">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={employee?.employee_number ?? "-"}
                  />
                </InputItem>
              </InputLabel>
              <InputLabel label="Supervisor">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={`${employee?.supervisor?.first_name ?? "-"} ${employee?.supervisor?.last_name ?? ""}`}
                  />
                </InputItem>
              </InputLabel>
              <InputLabel label="Shift">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={
                      employee?.employee_assignments &&
                      employee.employee_assignments.length > 0
                        ? employee?.employee_assignments[0].shift.name
                        : "-"
                    }
                  />
                </InputItem>
              </InputLabel>
              <InputLabel label="Hire Date">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={
                      employee?.hire_date
                        ? format(employee.hire_date, "MMM d, yyyy")
                        : "-"
                    }
                  />
                </InputItem>
              </InputLabel>
              <InputLabel label="Shift Start">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={
                      employee?.employee_assignments &&
                      employee.employee_assignments.length > 0 &&
                      employee?.employee_assignments[0].shift.start_time
                        ? format(
                            parse(
                              employee?.employee_assignments[0].shift
                                .start_time,
                              "HH:mm:ss",
                              new Date(),
                            ),
                            "h:mm a",
                          )
                        : "-"
                    }
                  />
                </InputItem>
              </InputLabel>
              <InputLabel label="Shift End">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={
                      employee?.employee_assignments &&
                      employee.employee_assignments.length > 0 &&
                      employee?.employee_assignments[0].shift.end_time
                        ? format(
                            parse(
                              employee?.employee_assignments[0].shift.end_time,
                              "HH:mm:ss",
                              new Date(),
                            ),
                            "h:mm a",
                          )
                        : "-"
                    }
                  />
                </InputItem>
              </InputLabel>
              <InputLabel label="Required Hours Per Day">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={
                      employee?.employee_assignments &&
                      employee.employee_assignments.length > 0 &&
                      employee?.employee_assignments[0].shift
                        .required_hours_per_day
                        ? employee?.employee_assignments[0].shift
                            .required_hours_per_day
                        : "-"
                    }
                  />
                </InputItem>
              </InputLabel>
              <InputLabel label="Required Hours Per Week">
                <InputItem>
                  <input
                    type="text"
                    name=""
                    id=""
                    disabled
                    value={
                      employee?.employee_assignments &&
                      employee.employee_assignments.length > 0 &&
                      employee?.employee_assignments[0].shift
                        .required_hours_per_week
                        ? employee?.employee_assignments[0].shift
                            .required_hours_per_week
                        : "-"
                    }
                  />
                </InputItem>
              </InputLabel>
            </div>
          </div>
        </div>
        {/* Right Container */}
        <div className="border-l dark:border-l-neutral-500/40 px-12 col-span-2">
          {/* Notes Container */}
          <div className="flex flex-col">
            <span className="font-bold text-lg">Notes</span>
            <div className="flex flex-col gap-2 py-4">
              <div className="border-2 text-xs rounded-lg border-blue-400 bg-blue-400/40 py-2 px-4">
                <span>Sept 04, 2025 - Employee request leave</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EmployeePreviewPage;
