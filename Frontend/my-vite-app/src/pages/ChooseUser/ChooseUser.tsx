import { useEffect } from "react";
import { UserType } from "../../types/type.Role";
import { useUserContext } from "../../contexts/UserContexts/UserProvider";
import { useNavigate } from "react-router-dom";
import "./style.css";
function ChooseUser() {
  const { userType, setUserType } = useUserContext();
  const navigate = useNavigate();
  const handleUserSelection = (user: UserType) => {
    setUserType(user);
  };
  useEffect(() => {}, [userType]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full bg-blue-600 h-[100px] p-6 text-center">
        <div className="mx-auto text-center p-3 h-full">
          <h1 className="mx-auto text-center text-3xl text-bold text-white font-serif">
            Regester
          </h1>
        </div>
      </div>
      <div className="flex justify-center flex-col h-[70%] w-full gap-5 content-center p-8">
        {" "}
        <div>
          {" "}
          <h1 className="mx-auto text-center text-2xl font-bold text-gray-600 font-serif">
            Select User Type
          </h1>
        </div>
        <div
          className={`${
            userType === "doctor" ? "bg-blue-500" : "bg-gray-300"
          } h-1/5 w-3/4 mx-auto p-8 sm:rounded-lg text-lg cursor-pointer shadow-md`}
          onClick={() => handleUserSelection("doctor")}
        >
          <div className="flex gap-4">
            <img
              className="doctor w-12 h-12 rounded-full"
              src=""
              alt="Rounded avatar"
            />
            <h1
              className={`${
                userType === "doctor" ? "text-white" : "text-black"
              } font-bold`}
            >
              Doctor
            </h1>
          </div>
          <p
            className={`${
              userType === "doctor" ? "text-white" : "text-gray-500"
            }`}
          >
            Can Organize and Approve Appointment
          </p>
        </div>
        <div
          className={`${
            userType === "patient" ? "bg-blue-500" : "bg-gray-300"
          } h-1/5 w-3/4 mx-auto p-8 sm:rounded-lg text-lg cursor-pointer shadow-md`}
          onClick={() => handleUserSelection("patient")}
        >
          <div className="flex gap-4">
            <img src="" className="patient w-12 h-12 rounded-full" alt="" />
            <h1
              className={`${
                userType === "patient" ? "text-white" : "text-black"
              } font-bold`}
            >
              Patient
            </h1>
          </div>
          <p
            className={`${
              userType === "patient" ? "text-white" : "text-gray-500"
            }`}
          >
            Can Book Appointment
          </p>
        </div>
        <div className="flex-col gap-3 flex w-[300px] mx-auto ">
          <button
            onClick={() => navigate(`/register/${userType}`)}
            type="button"
            className="text-white w-[200px] bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Next
          </button>{" "}
          <p className="text-gray-600 font-bold">
            Already have an account?
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChooseUser;
