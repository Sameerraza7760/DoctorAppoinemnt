import { ReactNode, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import DoctorSidebar from "../Sidebar/DoctorSidebar";

interface ChilderInterface {
  children: ReactNode;
}

const DoctorLayout = ({ children }: ChilderInterface) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-2/5" : "w-0"
        } overflow-hidden md:w-[250px]`}
        style={{ flex: "none" }} // Ensure the sidebar doesn't grow or shrink
      >
        <DoctorSidebar />
      </div>
      <div className="flex flex-col flex-1 min-h-screen overflow-y-auto">
        <div className="px-4 py-2">
          <button
            onClick={toggleSidebar}
            className="md:hidden px-3 py-2 text-black rounded-md"
          >
            <MenuOutlined />
          </button>
        </div>
        <div className="container mx-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DoctorLayout;
