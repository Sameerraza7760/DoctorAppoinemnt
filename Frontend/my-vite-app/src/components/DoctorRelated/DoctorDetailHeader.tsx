import { ExtendedDoctorData } from "../../types/type.Doctor";
interface DoctorDetailHeaderProps {
  doctorDetail: ExtendedDoctorData;
}
const DoctorHeader = ({ doctorDetail }: DoctorDetailHeaderProps) => {
  const { fullName, doctorImage } = doctorDetail;
  return (
    <header className="bg-blue-500 shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4 ">
        <h1 className="text-3xl font-semibold text-white">Dr.{fullName}</h1>
        <img
          src={typeof doctorImage === "string" ? doctorImage : undefined}
          alt="Doctor's Profile Picture"
          className="w-16 h-16 rounded-full"
        />
      </div>
    </header>
  );
};

export default DoctorHeader;
