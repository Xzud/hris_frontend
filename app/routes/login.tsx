import React, { useEffect, useState, type ComponentProps } from "react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { api } from "~/api";
import { useUserStore } from "~/userStore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login Page" },
    { name: "description", content: "Login here!" },
  ];
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { setEmployee, employee } = useUserStore();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function LoginUser(e: any) {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    console.log(data);

    try {
      const response = await api.post("/auth/login/", data);

      console.log(response);
      if (response.status === 200) {
        setEmployee(response.data.employee);
        localStorage.setItem(
          "simplehris_access_token",
          response.data.access_token,
        );
        localStorage.setItem(
          "simplehris_refresh_token",
          response.data.refresh_token,
        );

        console.log("Employee set: ", employee);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="h-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col p-8 bg-white text-black rounded-xl shadow-lg shadow-purple-400 min-w-100">
        <div className="flex flex-col gap items-center">
          <span className="text-2xl font-bold mb-4">Login</span>
          <span className="text-neutral-500 text-xs">
            Welcome, enter your credentials to enter.
          </span>
        </div>
        <form onSubmit={LoginUser} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <InputField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              type="text"
              id="login_username"
              placeholder="Ex. employee1"
            />
            <InputField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              id="login_password"
              placeholder="********"
            />
          </div>
          <input
            type="submit"
            value="Login to dashboard"
            className="self-center w-full p-2 bg-purple-700 text-white text-md font-bold rounded-xl cursor-pointer hover:bg-purple-400 transition-colors duration-300"
          />
          <span className="text-xs text-neutral-500 self-center">
            Not registered yet?{" "}
            <a href="/register" className="text-purple-500">
              Register here
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

export function InputField({
  label,
  ...props
}: {
  label: string;
} & ComponentProps<"input">) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.id} className="text-xs text-neutral-500">
        {label}
      </label>
      <input {...props} className="border border-neutral-500 rounded p-2" />
    </div>
  );
}
