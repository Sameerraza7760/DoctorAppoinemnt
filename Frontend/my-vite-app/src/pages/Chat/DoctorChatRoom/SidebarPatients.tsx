export interface Patient {
  _id: string;
  name: string;
}
interface SidebarProps {
  patients: Patient[];
  onPatientSelect: (patientId: string) => void;
}

function SidebarPatients({ patients, onPatientSelect }: SidebarProps) {
  return (
    <div className="sidebarPatients w-[16%] bg-gray-800 text-white p-4">
      <h2 className="text-2xl mb-4">Patients</h2>
      <ul>
        {patients?.map((patient) => (
          <li
            key={patient._id}
            onClick={() => onPatientSelect(patient._id)}
            className="mb-2 p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            {patient.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarPatients;
