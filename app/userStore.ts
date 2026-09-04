import { create } from "zustand";

interface UserProps {
  id: string;
  name: string;
  role: string;
  email: string;
  username: string;
  last_login: string;
}

interface PositionProps {
  id: string;
  name: string;
  description: string;
  level: number;
}

interface DepartmentProps {
  id: string;
  name: string;
}

export interface EmployeeShiftProps {
  id: string;
  name: string;
  shift_type: string;
  start_time: string | null;
  end_time: string | null;
  required_hours_per_day: number | null;
  required_hours_per_week: number | null;
  break_minutes: number;
  grace_period_minute: number;
}
export interface EmployeeAssignmentProps {
  id: string;
  assigned_by: string;
  days_off: number[];
  effective_from: string;
  effective_to: string | null;
  shift: EmployeeShiftProps;
  employee: EmployeeProfileProps;
}
export interface EmployeeProfileProps {
  employee_number: string;
  department: DepartmentProps;
  employee_id: string;
  employee_status: string;
  first_name: string;
  last_name: string;
  hire_date: string;
  birth_date: string;
  position: PositionProps;
  email: string;
  status: string;
  phone: string;
  id: number;
  supervisor: EmployeeProfileProps;
  employee_assignments: EmployeeAssignmentProps[];
  user: UserProps;
}

interface UserStoreProps {
  employee: EmployeeProfileProps | null;
  setEmployee: (employee: EmployeeProfileProps) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStoreProps>()((set) => ({
  employee: null,
  setEmployee: (employee) => set({ employee }),
  loading: true,
  setLoading: (loading) => set({ loading }),
}));
