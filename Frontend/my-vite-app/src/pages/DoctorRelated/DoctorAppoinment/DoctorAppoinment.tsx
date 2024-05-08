import { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import useResourceFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { AppointmentRequest } from "../../../types/type.AppoinmentRequest";
import AppointmentCard from "../../../components/Card/AppointmentCard";
const DoctorAppointment = () => {
  const { currentUser } = useSelector((state: any) => state?.user);
  const { data: requestedAppointments, isLoading } = useResourceFetch(
    `/api/v1/appointment/getDoctorAppointment/${currentUser._id}`
  );
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);

  useEffect(() => {
    if (requestedAppointments) {
      setAppointments(requestedAppointments?.data);
    }
  }, [requestedAppointments]);

  if (isLoading) {
    return <Loader />;
  }

  // useEffect(()=>())
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md my-4 w-[90%]">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Appointments</h1>
      {appointments && appointments.length > 0 ? (
        appointments.map((appointment: AppointmentRequest, i: number) => (
          <div key={i}>
            <AppointmentCard appointment={appointment} />
          </div>
        ))
      ) : (
        <p>No appointments available</p>
      )}
    </div>
  );
};

export default DoctorAppointment;
