import { CircularProgress } from "@mui/material";
import { useUserContext } from "../../contexts/UserContexts/UserProvider";
import useLogin from "../../hooks/useLogin";
import { LoginFormSchema } from "../../zodSchema/loginSchema";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccsess from "../../components/Toast/ToastSuccsess";
function Signin() {
  const { userType } = useUserContext();
  const {
    onSubmit,
    showToast,
    isSubmitting,
    register,
    handleSubmit,
    serverError,
  } = useLogin(
    `http://localhost:8000/api/v1/users/${userType}/login`, // in this userType should be doctor or patient come from the context
    LoginFormSchema
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>{" "}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                {...register("password")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>{" "}
      {showToast && <ToastSuccsess Title={"Login Successful"} />}{" "}
      {serverError && <ToastDanger error={serverError} />}
    </div>
  );
}

export default Signin;
