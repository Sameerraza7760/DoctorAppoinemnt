import { useState } from "react";
import List from "../../../components/List/List";
import Loader from "../../../components/Loader/Loader";
import useResourceFetch from "../../../hooks/useFetch";
import { DoctorData } from "../../../types/type.Doctor";
import { CopyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function DoctorsList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const {
    data: doctors,
    isLoading,
    error,
  } = useResourceFetch("/api/v1/doctors");

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const filteredDoctors = doctors?.filter(
    (doctor: DoctorData) =>
      doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDisease === "" ||
        doctor.specialization
          .toLowerCase()
          .includes(selectedDisease.toLowerCase()))
  );

  const diseases: string[] = Array.from(
    new Set(
      doctors?.map((doctor: DoctorData) => doctor.specialization.toLowerCase())
    )
  );

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto w-full lg:py-16 lg:px-6 ">
        <div className="mx-auto w-full text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Doctor Application
          </h2>

          <span
            className="flex justify-end w-[100%] p-4 cursor-pointer"
            onClick={() => navigate("/appointment-updates")}
          >
            {" "}
            <CopyOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
          </span>

          <p className="font-light text-gray-500 lg:mb-8 sm:text-xl dark:text-gray-400">
            Explore the features and functionalities of our Doctor Application.
          </p>

          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Search by name..."
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-[50%]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-[50%]"
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
            >
              <option value="">All Diseases</option>
              {diseases?.map((disease) => (
                <option key={disease} value={disease}>
                  {disease}
                </option>
              ))}
            </select>
          </div>
        </div>
        <List doctors={filteredDoctors} />
      </div>
    </section>
  );
}

export default DoctorsList;
