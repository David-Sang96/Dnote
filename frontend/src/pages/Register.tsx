import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { PiSpinnerBold } from "react-icons/pi";
import { RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrength from "../components/PasswordStrength";
import authRequest from "../ultis/authRequest";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Register = () => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmPasswordShow, setConfirmPasswordShow] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    const responseStatus = await authRequest({
      path: "/auth/register",
      method: "POST",
      values: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      setIsLoading,
    });
    if (responseStatus?.status === 201) {
      reset();
      navigate("/log-in");
    }
  };

  watch();

  return (
    <section className="mx-auto max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="pb-4 text-xl font-semibold">Register Form</h2>
        <div className="mb-6">
          <label
            htmlFor="input-group-2"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
              <FaUserCircle size={20} className="text-teal-600" />
            </div>
            <input
              type="text"
              id="input-group-2"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
              placeholder="John Doe..."
              {...register("name", {
                required: `You must specify a name`,
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Name must not be more than 20 characters",
                },
              })}
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-500">
              {<CiWarning className="text-lg" />}
              {errors.name.message}
            </p>
          )}
          {errors.name?.type === "minLength" && (
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-500">
              {<CiWarning className="text-lg font-bold" />}
              {errors.name.message}
            </p>
          )}
          {errors.name?.type === "maxLength" && (
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-500">
              {<CiWarning className="text-lg" />}
              {errors.name.message}
            </p>
          )}
        </div>
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
        <div className="mb-2">
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
        <div className="mb-6">
          <PasswordStrength password={getValues().password} />
        </div>
        <div className="mb-6">
          <label
            htmlFor="input-group-4"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
              <FaLock size={20} className="text-teal-600" />
            </div>
            <input
              type={`${confirmPasswordShow ? "text" : "password"}`}
              id="input-group-4"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-teal-500 dark:focus:ring-teal-500"
              placeholder="confirm password..."
              {...register("confirm_password", {
                validate: (value) =>
                  value === getValues().password ||
                  "The passwords do not match",
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center pe-3.5"
              onClick={() => setConfirmPasswordShow((prev) => !prev)}
            >
              {confirmPasswordShow ? (
                <RxEyeOpen size={20} className="text-teal-600" />
              ) : (
                <GoEyeClosed size={20} className="text-teal-600" />
              )}
            </button>
          </div>
          {errors.confirm_password && (
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-500">
              {<CiWarning className="text-lg font-bold" />}
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 ${isLoading && "cursor-not-allowed bg-teal-400 hover:bg-teal-500"}`}
        >
          {isLoading && <PiSpinnerBold size={17} className="animate-spin" />}
          Register
        </button>
      </form>
      <div className="mt-3 text-center text-sm">
        Already have an account?{" "}
        <Link to={"/log-in"} className="font-medium text-teal-600">
          Login
        </Link>
      </div>
    </section>
  );
};

export default Register;
