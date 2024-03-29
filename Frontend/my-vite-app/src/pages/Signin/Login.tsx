import { CircularProgress } from "@mui/material";
import { useUserContext } from "../../contexts/UserContexts/UserProvider";
import useLogin from "../../hooks/useLogin";
import { LoginFormSchema } from "../../zodSchema/loginSchema";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccsess from "../../components/Toast/ToastSuccsess";
import "./style.css";
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
    "http://localhost:8000/api/v1/users/login", // in this userType should be doctor or patient come from the context
    LoginFormSchema
  );
  return (
    <div className="min-h-screen flex w-full">
      {" "}
      <div className="w-full sm:w-[50%] bg-white p-8 ">
        <form className=" w-[90%] mt-[70px] mx-auto m-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register("email")}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register("password")}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isSubmitting ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>{" "}
      <div className="w-[50%] p-8 hidden sm:block ">
        <div className="w-full background-container"></div>
      </div>
      {showToast && <ToastSuccsess Title={"Login Successful"} />}{" "}
      {serverError && <ToastDanger error={serverError} />}
    </div>
  );
}

export default Signin;
