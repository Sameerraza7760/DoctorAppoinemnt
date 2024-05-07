import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/Inputs/SelectInput";
import TextInput from "../../components/Inputs/TextInput";
import useRegistration from "../../hooks/useRegistration";
import "./style.css";
function DocterRegestered() {
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
              label="Email address"
              id="email"
              type="email"
              {...register("email")}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <TextInput
              label="Password"
              id="password"
              type="password"
              {...register("password")}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <SelectInput
              label="Gender"
              id="gender"
              {...register("gender")}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                label="fullName"
                type="text"
                {...register("fullName")}
                id="fullName"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                label="address"
                type="text"
                id="floating_last_name"
                {...register("address")}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                label="phoneNumber"
                type="number"
                {...register("phoneNumber", { valueAsNumber: true })}
                id="phoneNumber"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                label="specialization"
                type="text"
                {...register("specialization")}
                name="specialization"
                id="specialization"
              />
            </div>{" "}
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                label="experience"
                id="experience"
                type="number"
                {...register("experience", { valueAsNumber: true })}
                name="experience"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                label="feesPerConsultation"
                id="feesPerConsultation"
                type="number"
                {...register("feesPerConsultation", { valueAsNumber: true })}
                name="feesPerConsultation"
              />
            </div>{" "}
            <div className="relative z-0 w-full mb-5 group">
              <TextInput
                label="qualifications"
                type="text"
                id="qualifications"
                {...register("qualifications")}
                name="qualifications"
              />{" "}
            </div>{" "}
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
      <div className="w-[50%] p-8 hidden sm:block">
        <div className="w-full background-containerForDoctor"></div>
      </div>{" "}
    </div>
  );
}

export default DocterRegestered;
