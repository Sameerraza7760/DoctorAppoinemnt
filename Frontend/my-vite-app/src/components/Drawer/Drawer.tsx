import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, Input, TimePicker } from "antd";
import { DoctorData, additionalDoctorDetails } from "../../types/type.Doctor";
import { formatTime } from "../../utills/formatTime";
import { useEffect } from "react";
export interface ExtendedDoctorData
  extends DoctorData,
    additionalDoctorDetails {}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorDetail: ExtendedDoctorData;
}

function AppointmentDrawer({ isOpen, onClose, doctorDetail }: ModalProps) {
  const [form] = Form.useForm();
  const { doctorImage, startTiming, endTiming, fullName, startDay, endDay } =
    doctorDetail;
  const onFinish = (values: any) => {
    console.log("Received values:", values);
    onClose();
  };
  useEffect(() => {
    form.resetFields();
  }, [isOpen]);

  return (
    <Drawer
      title="Appointment Request"
      onClose={onClose}
      visible={isOpen}
      width="100%"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={doctorImage}
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
          name="name"
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
          name="phone"
          label="Your Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
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
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="appointmentTime"
          label="Appointment Time"
          rules={[
            { required: true, message: "Please select appointment time" },
          ]}
        >
          <TimePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="message" label="Additional Message">
          <Input.TextArea rows={4} placeholder="Enter any additional message" />
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
