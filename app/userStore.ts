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

export interface EmployeeProfileProps {
  employee_number: string;
  department: string;
  employee_id: string;
  employee_status: string;
  first_name: string;
  last_name: string;
  hire_date: string;
  birth_date: string;
  position: PositionProps;
  email: string;
  status: string;
  id: number;
  supervisor: UserProps;
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
