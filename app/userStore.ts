import { create } from "zustand";

interface UserProps {
  id: string;
  name: string;
  roles: string[];
  email: string;
  username: string;
  employee_profile: EmployeeProfileProps;
}

interface EmployeeProfileProps {
  department: string;
  employee_id: string;
  employee_status: string;
  first_name: string;
  last_name: string;
  position: string;
}

interface UserStoreProps {
  user: UserProps | undefined;
  setUser: (user: UserProps) => void;
}

export const useUserStore = create<UserStoreProps>()((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));
