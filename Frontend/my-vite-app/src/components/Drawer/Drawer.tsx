import { Drawer } from "antd";

import { DoctorData, additionalDoctorDetails } from "../../types/type.Doctor";
import { formatTime } from "../../utills/formatters";
import CreateAppointmentForm from "../Form/CreateAppointmentForm";
export interface ExtendedDoctorData
  extends DoctorData,
    additionalDoctorDetails {}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorDetail: ExtendedDoctorData;
}

function AppointmentDrawer({ isOpen, onClose, doctorDetail }: ModalProps) {
  const {
    doctorImage,
    startTiming,
    endTiming,
    fullName,
    startDay,
    endDay,
    _id,
  } = doctorDetail;

  return (
    <Drawer
      title="Appointment Request"
      onClose={onClose}
      open={isOpen}
      width="100%"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={typeof doctorImage === "string" ? doctorImage : undefined}
          alt="Doctor"
          style={{ width: "100px", borderRadius: "50%" }}
        />
        <h2 style={{ margin: "10px 0", color: "#333", fontSize: "17px" }}>
          {fullName}
        </h2>
        <p style={{ color: "#666", fontSize: "17px" }}>
          Availability: {startDay} to {endDay}, {formatTime(startTiming)} to{" "}
          {formatTime(endTiming)}
        </p>
      </div>
      <div className="form w-[90%] mx-auto">
        {" "}
        <CreateAppointmentForm doctorId={_id} />{" "}
      </div>
    </Drawer>
  );
}

export default AppointmentDrawer;
