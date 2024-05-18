import { useParams } from "react-router-dom";
import DoctorDetailHeader from "../../components/DoctorRelated/DoctorDetailHeader";
import DoctorServices from "../../components/DoctorRelated/DoctorServices";
import DoctorSpecialization from "../../components/DoctorRelated/DoctorSpecialization";
import Loader from "../../components/Loader/Loader";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import useResourceFetch from "../../hooks/useFetch";
import { ExtendedDoctorData } from "../../types/type.Doctor";
import DoctorDetailFooter from "../../components/DoctorRelated/DoctorDetailFooter";
import DoctorDetailButton from "../../components/DoctorRelated/DoctorDetailButton";
const DoctorDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useResourceFetch(`/api/v1/doctors/${id}`);

  if (isLoading) {
    return <Loader />;
  }

  const { doctor }: { doctor: ExtendedDoctorData } = data;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gray-100 min-h-screen">
        <DoctorDetailHeader doctorDetail={doctor} />
        <main className="container w-[90%] mx-auto py-8">
          {/* /// Doctor Detail content Here  */}
          <DoctorDetailButton doctorDetail={doctor} />
          <DoctorServices services={doctor.services} />
    
          <DoctorSpecialization specialization={doctor.specialization} />
    
          <ReviewSection doctorId={doctor._id} />
        </main>
        <DoctorDetailFooter />
      </div>
    </div>
  );
};

export default DoctorDetailPage;
