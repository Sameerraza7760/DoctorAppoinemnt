import './style.css';
function DoctorHome() {
  // Placeholder data
  const appointmentSummary = 25;
  const patientStatistics = 150;
  const upcomingTasks = [
    { id: 1, title: "Review patient reports", time: "9:00 AM" },
    { id: 2, title: "Consultation with Mr. Smith", time: "10:30 AM" },
    { id: 3, title: "Follow-up call with Ms. Johnson", time: "2:00 PM" },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl text-center font-serif font-semibold mb-4 text-blue-800">
        Doctor Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Appointment Summary */}
        <div className="appoinment bg-white cursor-pointer p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
          <h3 className="text-2xl text-white font-semibold mb-2">Appointment Summary</h3>
          <p className="text-white-600">
            {appointmentSummary} appointments scheduled
          </p>
        </div>

        {/* Patient Statistics */}
        <div className="bg-doctor-Statistics cursor-pointer bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
          <h3 className="text-2xl font-semibold mb-2 text-white ">Patient Statistics</h3>
          <p className="text-white">
            {patientStatistics} patients in the system
          </p>
        </div>

        {/* Upcoming Tasks */}
        <div className="upcommingTask cursor-pointer bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
          <h3 className="text-lg font-semibold mb-2 text-white">
            Upcoming Tasks
          </h3>
          <ul className="space-y-2">
            {upcomingTasks.map((task) => (
              <li key={task.id}>
                <span className="text-white font-semibold">
                  {task.title}
                </span>
                <span className="text-white blue-600 ml-2">{task.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add more sections here */}
        {/* Example: */}
        {/* <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Another Section</h3>
                    <p className="text-gray-200">Content goes here</p>
                </div> */}
      </div>
    </div>
  );
}

export default DoctorHome;
