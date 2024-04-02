import { ReactNode } from "react";
import DoctorSidebar from "../Sidebar/DoctorSidebar";
interface ChilderInterface {
  children: ReactNode;
}
const DoctorLayout = ({ children }: ChilderInterface) => {
  return (
    <div className="flex w-full">
      <div>
        <DoctorSidebar />
      </div>
      <div className="container w-[80%] mx-auto">{children}</div>
    </div>
  );
};

export default DoctorLayout;
