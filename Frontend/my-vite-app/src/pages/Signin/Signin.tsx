import TextInput from "../../components/Inputs/TextInput";
import useLogin from "../../hooks/useLogin";
import Button from "../../components/Button/Button";
import { LoginFormSchema } from "../../zodSchema/loginSchema";
import "./style.css";
function Signin() {
  const { onSubmit, isSubmitting, register, handleSubmit } = useLogin(
    "/api/v1/users/login",
    LoginFormSchema
  );
  return (
    <div className="min-h-screen flex w-full">
      {" "}
      <div className="w-full sm:w-[50%] bg-white p-8 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-[90%] mt-[70px] mx-auto m-5"
        >
          <div className="relative z-0 w-full mb-5 group">
            <TextInput
              type="email"
              id="floating_email"
              {...register("email")}
              label="Email address"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <TextInput
              type="password"
              {...register("password")}
              id="floaitng_password"
              label="Enter Your Password"
            />
          </div>

          <Button
            type="submit"
            styling={
              "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            }
            isSubmitting={isSubmitting}
            label={"Submit"}
          />
        </form>
      </div>{" "}
      <div className="w-[50%] p-8 hidden sm:block ">
        <div className="w-full background-container"></div>
      </div>
    </div>
  );
}

export default Signin;
