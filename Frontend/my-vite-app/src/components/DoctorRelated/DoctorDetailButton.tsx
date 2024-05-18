import { useState } from "react";
import useToggle from "../../hooks/useToggle";
import Button from "../Button/Button";
import AppointmentDrawer from "../Drawer/Drawer";
import { ExtendedDoctorData } from "../../types/type.Doctor";

interface DoctorDetailButtonProps {
  doctorDetail: ExtendedDoctorData;
}
function DoctorDetailButton({ doctorDetail }: DoctorDetailButtonProps) {
  const { isOpen, open, close } = useToggle();
  const [drawerType, setDrawerType] = useState("");
  const handleDrawerOpen = (type: string) => {
    setDrawerType(type);
    open();
  };

  return (
    <div className="mb-4 mr-4">
      <Button
        label="Conversation With Doctor"
        onClick={() => handleDrawerOpen("chatWithDoctor")}
        type="button"
        styling="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
      />
      <Button
        label="Book Appointment"
        onClick={() => handleDrawerOpen("createAppointmentForm")}
        type="button"
        styling="mt-4 ml-5 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
      />
      <AppointmentDrawer
        isOpen={isOpen}
        onClose={close}
        doctorDetail={doctorDetail}
        view={drawerType}
      />
    </div>
  );
}

export default DoctorDetailButton;
