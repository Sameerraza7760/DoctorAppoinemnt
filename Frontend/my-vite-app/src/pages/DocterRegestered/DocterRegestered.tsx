import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { doctorSchema } from "../../zodSchema/docterRegestered.Scheme";
import "./style.css";
function DocterRegestered() {
  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm({
    resolver: zodResolver(doctorSchema),
  });
  const onSubmit = (data:any) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex w-full">
      {" "}
      <div className="w-full sm:w-[50%] bg-white p-8 ">
        <form
         onSubmit={handleSubmit(onSubmit)}
          className=" w-[90%] mt-[70px] mx-auto m-5"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("email")}
            />
            {errors.email && typeof errors.email.message === "string" &&  (
              <span className="absolute top-full text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email address
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              {...register("password")}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // required
            />{" "}
           {errors.password && typeof errors.password.message === "string" && (
              <span className="absolute top-full text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              {...register("gender")}
              id="floating_repeat_gender"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // required
            />{" "}
            {errors.gender && typeof errors.gender.message === "string" && (
              <span className="absolute top-full text-red-500 text-sm">
                {errors.gender.message}
              </span>
            )}
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Gender
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                {...register("fullName")}
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                // required
              />{" "}
              {errors.fullName && typeof errors.fullName.message === "string" && (
                <span className="absolute top-full text-red-500 text-sm">
                  {errors.fullName.message}
                </span>
              )}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Full Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="floating_last_name"
                {...register("address")}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // required
              />{" "}
              {errors.address && typeof errors.address.message === "string" && (
                <span className="absolute top-full text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Address
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="string"
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                {...register("phonenumber")}
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // required
              />{" "}
              {errors.phonenumber &&
                typeof errors.phonenumber.message === "string" && (
                  <span className="absolute top-full text-red-500 text-sm">
                    {errors.phonenumber.message}
                  </span>
                )}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phone number (123-456-7890)
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                {...register("specialization")}
                name="specialization"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // required
              />{" "}
              {errors.specialization &&
                typeof errors.specialization.message === "string" && (
                  <span className="absolute top-full text-red-500 text-sm">
                    {errors.specialization.message}
                  </span>
                )}
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Specialization
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>{" "}
      <div className="w-[50%] p-8 hidden sm:block">
        <div className="w-full background-container"></div>
      </div>
    </div>
  );
}

export default DocterRegestered;
