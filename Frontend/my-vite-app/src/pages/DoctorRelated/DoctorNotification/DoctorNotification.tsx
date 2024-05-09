import { useEffect, useState } from "react";
import AlertNotification from "../../../components/Toast/AlertNotification";
const DoctorNotification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const type = "success";
  const message = "This is a sample notification message";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <AlertNotification
          type={type}
          message={message}
          onClose={handleClose}
        />
      )}
      <div className="w-full">
        <h1 className="text-3xl text-center font-serif font-semibold mb-4 text-blue-800 mt-4">
          Appoinments
        </h1>
      </div>
      <div className="container w-full max-w-md p-5 rounded-md bg-white shadow-lg m-3">
        <div className="flex items-center space-x-4 w-full">
          <div className="img h-12 w-12 rounded-full overflow-hidden">
            <img
              src="https://t4.ftcdn.net/jpg/00/99/45/65/240_F_99456590_ptYpzWcFSDPvRq879SvpuZC4qJ4dMnZ1.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="content flex-grow">
            <h1 className="text-lg font-bold text-blue-700">John Doe</h1>
            <p className="text-sm text-green-400">Karachi</p>
            <p className="text-sm text-gray-400 font-semibold">
              Karachi Malir B47/8
            </p>
            <p className="text-sm text-gray-400">Monday, August 23, 2019</p>
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md ">
              Approve
            </button>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md">
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorNotification;
