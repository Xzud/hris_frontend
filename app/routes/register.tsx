import { InputField } from "./login";

export default function Register() {
  return (
    <div className="flex w-ful min-h-screen items-center justify-center">
      <div
        className="p-8 flex flex-col text-black
       bg-white shadow-purple-400 shadow-lg min-w-100 rounded-xl"
      >
        <span className="text-2xl font-bold">Register</span>
        <span className="text-xs text-neutral-500 font-semibold">
          Enter your details below to register!
        </span>

        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Email"
            type="email"
            placeholder="ex. example@email.com"
          />
          <div className="flex gap-4 justify-stretch items-center">
            <InputField label="First Name" placeholder="ex. John" />
            <InputField label="Last Name" placeholder="ex. Doe" />
          </div>
          <InputField label="Password" type="password" placeholder="*******" />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="*******"
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <input
            type="submit"
            value="Register my account"
            className="rounded-xl bg-purple-700 hover:bg-purple-400 p-2 text-white font-bold cursor-pointer"
          />
          <span className="text-xs self-center">
            Already have an account?{" "}
            <a href="/login" className="text-purple-500">
              Login here
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
