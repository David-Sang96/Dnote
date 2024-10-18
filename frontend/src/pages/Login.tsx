import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { PiSpinnerBold } from "react-icons/pi";
import { RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import authRequest from "../ultis/authRequest";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const onSubmit = async (values: FormValues) => {
    const responseStatus = await authRequest({
      path: "/auth/login",
      values,
      setIsLoading,
      method: "POST",
    });
    if (responseStatus?.status === 200) {
      setAuthUser(responseStatus.data);
      reset();
      navigate("/");
    }
  };

  return (
    <section className="mx-auto max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="input-group-1"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
              <MdEmail size={20} className="text-teal-600" />
            </div>
            <input
              type="email"
              id="input-group-1"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
              placeholder="example@.com..."
              {...register("email", { required: "You must specify an email" })}
            />
          </div>
          {errors.email && (
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-500">
              {<CiWarning className="text-lg font-bold" />}
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="input-group-3"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
              <FaLock size={20} className="text-teal-600" />
            </div>
            <input
              type={`${passwordShow ? "text" : "password"}`}
              id="input-group-3"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
              placeholder="password..."
              {...register("password", {
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center pe-3.5"
              onClick={() => setPasswordShow((prev) => !prev)}
            >
              {passwordShow ? (
                <RxEyeOpen size={20} className="text-teal-600" />
              ) : (
                <GoEyeClosed size={20} className="text-teal-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-500">
              {<CiWarning className="text-lg font-bold" />}
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 ${isLoading && "cursor-not-allowed bg-teal-400 hover:bg-teal-500"}`}
        >
          {isLoading && <PiSpinnerBold size={17} className="animate-spin" />}
          Login
        </button>
      </form>
      <div className="mt-3 text-center text-sm">
        Don't have an account?{" "}
        <Link to={"/register"} className="font-medium text-teal-600">
          Register
        </Link>
      </div>
    </section>
  );
};

export default Login;
