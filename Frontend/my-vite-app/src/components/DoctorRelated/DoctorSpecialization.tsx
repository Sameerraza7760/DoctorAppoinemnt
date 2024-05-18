interface DoctorSpecializationProps {
  specialization: string;
}
const DoctorSpecialization = ({
  specialization,
}: DoctorSpecializationProps) => {
  return (
    <section className="bg-white shadow-md rounded-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Specialization
      </h2>
      <p className="text-gray-700">{specialization}</p>
    </section>
  );
};

export default DoctorSpecialization;
