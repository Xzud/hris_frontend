import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login/", "routes/login.tsx"),
  route("/register/", "routes/register.tsx"),
  route("/dashboard/", "routes/auth/dashboard.tsx"),
  route("/employees/", "routes/auth/employees.tsx"),
  route("/attendance/", "routes/auth/attendance.tsx"),
  route("/attendance/clock", "routes/auth/attendance/clock.tsx"),
  route("/shifts/", "routes/auth/shift.tsx"),
  route("/shifts/assignments/", "routes/auth/shifts/assignment.tsx"),

  route("/requests/", "routes/auth/requests.tsx"),
] satisfies RouteConfig;
