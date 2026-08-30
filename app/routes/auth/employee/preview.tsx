import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "~/api";
import AuthLayout from "~/layouts/authlayout";
import type { EmployeeProfileProps } from "~/userStore";

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
      <div className="w-full flex mb-12">
        <Link
          to={"/employees/"}
          className="flex gap-2 items-center cursor-pointer"
        >
          <ChevronLeft />
          <span className="font-bold">Back</span>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-12">
        <div>
          <img
            src=""
            alt=""
            className="bg-neutral-500 h-70 rounded-xl w-full"
          />
        </div>
        <div className="col-span-3 flex gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase font-bold">Full name</span>
            <span className="border rounded-lg px-4 py-2">{`${employee?.first_name} ${employee?.last_name}`}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase font-bold">Email</span>
            <span className="border rounded-lg px-4 py-2">
              {employee?.email}
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EmployeePreviewPage;
