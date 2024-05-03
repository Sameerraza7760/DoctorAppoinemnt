import Modal from "../../components/Modal/Modal";
import useToggle from "../../hooks/useToggle";
import { useSelector } from "react-redux";

function DoctorProfile() {
  const { currentUser } = useSelector((state: any) => state.user);
  const { isOpen, open, close } = useToggle();

  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 lg:px-28 md:flex-row text-[#161931]">
      <div className="container mx-auto px-4">
        <div className=" flex justify-center items-center py-8">
          <div className="bg-blue-100 rounded-lg shadow-md overflow-hidden w-full max-w-md p-8">
            <div className="text-center">
              <img
                src={currentUser?.doctorImage}
                alt="Doctor"
                className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-blue-500"
              />
              <h2 className="text-3xl font-semibold text-gray-800">
                Dr: {currentUser?.fullName}
              </h2>
              <p className="text-gray-600">{currentUser?.email}</p>
            </div>
            <div className="mt-8">
              <div className="flex justify-between">
                {" "}
                <div className="bg-blue-100 rounded-md p-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    services
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {currentUser?.services?.map(
                      (speciality: string[], index: number) => (
                        <li key={index}>{speciality}</li>
                      )
                    )}
                  </ul>
                </div>{" "}
                <div className="bg-blue-100 rounded-md p-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    Specilization
                  </h3>
                  <p className="text-md font-serif text-gray-700 mb-2">
                    {currentUser?.specialization}
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-green-100 rounded-md p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Experience
                </h3>
                <p className="text-gray-700">{currentUser?.experience} years</p>
              </div>
            </div>{" "}
            <div className="mt-8 flex justify-center">
              <button
                onClick={open}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                More Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={close} />
    </div>
  );
}

export default DoctorProfile;
