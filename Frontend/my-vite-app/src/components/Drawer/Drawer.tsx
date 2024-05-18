import { Drawer } from "antd";
import { DoctorData, additionalDoctorDetails } from "../../types/type.Doctor";
import { formatTime } from "../../utills/formatters";
import CreateAppointmentForm from "../Form/CreateAppointmentForm";
import PatientChatRoom from "./../../pages/Chat/PatientChat";

interface ExtendedDoctorData extends DoctorData, additionalDoctorDetails {}

interface AppointmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  doctorDetail: ExtendedDoctorData;
  view: string;
}

const AppointmentDrawer: React.FC<AppointmentDrawerProps> = ({
  isOpen,
  onClose,
  doctorDetail,
  view,
}) => {
  const {
    doctorImage,
    startTiming,
    endTiming,
    fullName,
    startDay,
    endDay,
    _id,
  } = doctorDetail;

  const renderDoctorInfo = () => (
    <div style={{ textAlign: "center" }} className="w-[90%] mx-auto">
      <img
        src={typeof doctorImage === "string" ? doctorImage : undefined}
        alt="Doctor's Profile Picture"
        className="w-16 h-16 rounded-full pl-6 "
      />
      <h2 style={{ margin: "10px 0", color: "#333", fontSize: "17px" }}>
        Dr: {fullName}
      </h2>
      <p style={{ color: "#666", fontSize: "17px" }}>
        Availability: {startDay} to {endDay}, {formatTime(startTiming)} to{" "}
        {formatTime(endTiming)}
      </p>
    </div>
  );

  return (
    <Drawer
      title="Appointment Request"
      onClose={onClose}
      visible={isOpen}
      width="100%"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      {renderDoctorInfo()}
      <div className="form w-[90%] mx-auto">
        {view === "createAppointmentForm" ? (
          <CreateAppointmentForm doctorId={_id} />
        ) : (
          <PatientChatRoom doctorId={_id} />
        )}
      </div>
    </Drawer>
  );
};

export default AppointmentDrawer;
