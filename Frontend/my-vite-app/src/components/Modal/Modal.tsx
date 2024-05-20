import { TimePicker } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import useApiRequest from "../../hooks/useApiRequests";
import useResourceFetch from "../../hooks/useFetch";
import { setCurrentUser } from "../../store/auth/authSlice";
import { additionalDoctorDetails } from "../../types/type.Doctor";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DayOfWeek = {
  value: string;
  label: string;
};

function Modal({ isOpen, onClose }: ModalProps) {
  const dispatch = useDispatch();

  const { addToast } = useToasts();
  const { addAdditionDoctorsDetail } = useApiRequest();
  const { data: metadata } = useResourceFetch("/api/v1/metadata");

  const [selectedServices, setselectedServices] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [doctorDetails, setDoctorDetails] = useState<additionalDoctorDetails>({
    education: "",
    services: [],
    startTiming: 0,
    endTiming: 0,
    doctorImage: null,
    startDay: "",
    endDay: "",
  });

  const handleServicesChange = (e: any) => {
    const selectedValue = e.target.value;
    if (!selectedServices.includes(selectedValue)) {
      setselectedServices([...selectedServices, selectedValue]);
    }
  };

  const removeSpecialty = (specialtyToRemove: string) => {
    setselectedServices(
      selectedServices.filter((specialty) => specialty !== specialtyToRemove)
    );
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      services: selectedServices,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setDoctorDetails((prevDetails) => ({
        ...prevDetails,
        doctorImage: file,
      }));
    }
  };

  const handleStartTimeChange = (time: any) => {
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      startTiming: time ? time.toISOString() : "",
    }));
  };

  const handleEndTimeChange = (time: any) => {
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      endTiming: time ? time.toISOString() : "",
    }));
  };

  const saveDoctorDetails = async (e: React.FormEvent) => {
    console.log(doctorDetails);
    e.preventDefault();
    const url = "/api/v1/doctors/addAdditionalDetail";
    const updatedUserDetails = await addAdditionDoctorsDetail(
      url,
      doctorDetails
    );
    if (!updatedUserDetails) return;
    dispatch(setCurrentUser(updatedUserDetails));
    addToast("Additional Skills added", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });

    setDoctorDetails({
      education: "",
      services: [],
      startTiming: 0,
      endTiming: 0,
      doctorImage: null,
      startDay: "",
      endDay: "",
    });
    onClose();
  };

  useEffect(() => {
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      services: selectedServices,
    }));
  }, [selectedServices]);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative bg-white rounded-lg overflow-hidden max-w-3xl w-full">
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Additional Doctor Details
              </h3>
              <form className="space-y-4">
                <div className="mt-1 flex items-center">
                  <div className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    {selectedFile ? (
                      <img
                        className="h-full w-full object-cover"
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected file"
                      />
                    ) : (
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM6 10c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"
                          clipRule="evenodd"
                        />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                    )}
                  </div>
                  <label
                    htmlFor="file-upload"
                    className="ml-5 mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    Choose a file
                  </label>
                  <input
                    id="file-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                    required
                    onChange={handleFileChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="services"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Specialties
                  </label>
                  <select
                    id="services"
                    onChange={handleServicesChange}
                    value=""
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="" disabled>
                      Select Services
                    </option>
                    {metadata.specialties.length > 0
                      ? metadata.specialties.map((service: string) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selected Specialties
                  </label>
                  <div className="mt-1 flex flex-wrap">
                    {selectedServices?.map((services) => (
                      <div
                        key={services}
                        className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 m-1 flex items-center"
                      >
                        <span>{services}</span>
                        <button
                          type="button"
                          onClick={() => removeSpecialty(services)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>{" "}
                </div>
                <div>
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    id="education"
                    required
                    value={doctorDetails.education}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                    placeholder="Education"
                  />
                </div>{" "}
                <div>
                  {" "}
                  <label htmlFor="">Start Time</label>
                  <TimePicker
                    onChange={handleStartTimeChange}
                    style={{ width: "100%" }}
                  />
                </div>{" "}
                <div>
                  {" "}
                  <label htmlFor="">End Time</label>
                  <TimePicker
                    onChange={handleEndTimeChange}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="start-day"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Day
                  </label>
                  <select
                    id="start-day"
                    name="startDay"
                    value={doctorDetails.startDay}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                  >
                    {metadata.daysOfWeek &&
                      metadata.daysOfWeek.map((day: DayOfWeek) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="end-day"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Day
                  </label>
                  <select
                    id="end-day"
                    name="endDay"
                    value={doctorDetails.endDay}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
                  >
                    {metadata.daysOfWeek?.map((day: DayOfWeek) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={saveDoctorDetails}
                    className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Save Detail
                  </button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
