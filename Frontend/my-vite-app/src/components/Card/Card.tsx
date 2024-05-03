import { Link } from "react-router-dom";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { DoctorData } from "../../types/type.Doctor";

interface CardProps {
  doctor: DoctorData;
}

function Card({ doctor }: CardProps) {
  const { _id, fullName, specialization, experience } = doctor;

  return (
    <div
      className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
      style={{ overflow: "hidden" }}
    >
      <Link to={`/doctorDetail/${_id}`} className="w-full">
        <img
          className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg transition-transform duration-300 transform hover:scale-105"
          src="https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
          alt={`${fullName}'s Avatar`}
        />
      </Link>
      <div className="p-5">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <Link to={`/doctorDetail/${_id}`} className="text-blue-500">
            <UserOutlined /> Dr {fullName}
          </Link>
        </h3>
        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
          <strong>
            <ProfileOutlined /> Specialization:
          </strong>{" "}
          {specialization}
          <br />
          <strong>
            <ProfileOutlined /> Experience:
          </strong>{" "}
          {experience}
          <br />
        </p>
      </div>
    </div>
  );
}

export default Card;
