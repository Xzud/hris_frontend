import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login/", "routes/login.tsx"),
  route("/register/", "routes/register.tsx"),
  route("/dashboard/", "routes/auth/dashboard.tsx"),
  route("/employees/", "routes/auth/employees.tsx"),
  route("/attendance/", "routes/auth/attendance.tsx"),
  route("/attendance/clock", "routes/auth/attendance/clock.tsx"),
  route("/requests/", "routes/auth/requests.tsx"),
] satisfies RouteConfig;
