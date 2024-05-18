interface DoctorServicesProps {
  services: string[];
}
const DoctorServices = ({ services }: DoctorServicesProps) => {
  const renderServices = () => {
    if (services && services.length > 0) {
      return (
        <ul className="list-disc list-inside">
          {services?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else {
      return <p>No services available</p>;
    }
  };

  return (
    <section className="container bg-white shadow-md rounded-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Services Offered
      </h2>
      {renderServices()}
    </section>
  );
};

export default DoctorServices;
