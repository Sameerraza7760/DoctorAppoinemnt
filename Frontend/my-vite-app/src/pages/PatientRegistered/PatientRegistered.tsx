import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/Inputs/SelectInput";
import TextInput from "../../components/Inputs/TextInput";
import useRegistration from "../../hooks/useRegistration";

import "./style.css";
function PatientRegistered() {
  const navigate = useNavigate();
  const { onSubmit, isSubmitting, register, handleSubmit } = useRegistration(
    "/api/v1/users/register"
  );

  return (
    <div className="min-h-screen flex w-full">
      {" "}
      <div className="w-full sm:w-[50%] bg-white p-8 ">
        {" "}
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
              id="floating_password"
              label="Enter Your Password"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <SelectInput
              label="Gender"
              id="gender"
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              {...register("gender")}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                type="text"
                {...register("fullName")}
                id="floating_first_name"
                label="Enter Your FullName"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                type="text"
                id="floating_last_name"
                {...register("address")}
                label="Enter Your address"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                type="number"
                {...register("phoneNumber", { valueAsNumber: true })}
                id="floating_phone"
                label="Enter Your phoneNumber"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                type="text"
                {...register("maritalStatus")}
                name="maritalStatus"
                id="floating_company"
                label="Enter Your maritalStatus"
              />
            </div>
          </div>

          <Button
            styling={
              "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            }
            isSubmitting={isSubmitting}
            label={"Submit"}
          />

          <p className="text-gray-600 font-bold">
            Already have an account?
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>{" "}
      <div className="w-[50%] p-8 hidden sm:block ">
        <div className="w-full background-containerForPatient"></div>
      </div>{" "}
    </div>
  );
}

export default PatientRegistered;
