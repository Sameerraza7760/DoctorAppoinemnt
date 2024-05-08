import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, Input, TimePicker } from "antd";
import { useToasts } from "react-toast-notifications";
import usePostData from "../../hooks/useApiRequests";
import { AppointmentRequest } from "../../types/type.AppoinmentRequest";
import { DoctorData, additionalDoctorDetails } from "../../types/type.Doctor";
import { formatDate, formatTime } from "../../utills/formatters";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export interface ExtendedDoctorData
  extends DoctorData,
    additionalDoctorDetails {}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorDetail: ExtendedDoctorData;
}

function AppointmentDrawer({ isOpen, onClose, doctorDetail }: ModalProps) {
  const { currentUser } = useSelector((state: RootState) => state?.user);
  const { addToast } = useToasts();
  const { postData } = usePostData();
  const [form] = Form.useForm();

  const {
    doctorImage,
    startTiming,
    endTiming,
    fullName,
    startDay,
    endDay,
    _id,
  } = doctorDetail;

  const onFinish = async (data: AppointmentRequest) => {
    const { appointmentDate, appointmentTime, ...otherValues } = data;
    const formData: AppointmentRequest = {
      ...otherValues,
      appointmentDate: formatDate(appointmentDate), //  make the date in readble format
      appointmentTime: formatTime(appointmentTime), // make the time in readble format
      doctorId: _id,
      status: "pending",
      patientId: currentUser?._id
    };

    try {
      await postData("/api/v1/appointment/createAppointment", formData);
      addToast("Appointment Request Sent", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      form.resetFields();
      onClose();
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };
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
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="fullName"
          label="Your Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Your Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Your Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              message: "Please enter a valid phone number",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Enter your phone number"
          />
        </Form.Item>
        <Form.Item
          name="appointmentDate"
          label="Appointment Date"
          rules={[
            { required: true, message: "Please select appointment date" },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            onChange={(value) => (value ? formatDate(value.valueOf()) : null)}
          />
        </Form.Item>
        <Form.Item
          name="appointmentTime"
          label="Appointment Time"
          rules={[
            { required: true, message: "Please select appointment time" },
          ]}
        >
          <TimePicker
            style={{ width: "100%" }}
            onChange={(value) => (value ? formatTime(value.valueOf()) : null)}
          />
        </Form.Item>
        <Form.Item name="address" label="Additional address">
          <Input.TextArea rows={1} placeholder="Enter any additional address" />
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "20%", backgroundColor: "#12AEEB" }}
            >
              Submit Appointment Request
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default AppointmentDrawer;
