import "./style.css";
function Patientprofile() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden max-w-md">
      <div className="relative">
        <img
          src="https://readymadeui.com/profile_2.webp"
          className="w-full h-64 object-cover object-center"
          alt="Profile"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-x-0 bottom-0 pb-4 text-center">
          <p className="text-white text-sm font-semibold uppercase">John Doe</p>
          <h3 className="text-white text-lg font-bold mt-2">
            "This game has always been, and will always be, about buckets. A change of work is the best rest."
          </h3>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://readymadeui.com/profile_2.webp"
            className="w-20 h-20 rounded-full border-4 border-white -mt-10"
            alt="Profile"
          />
        </div>
        <div className="text-center">
          <p className="text-gray-700 text-sm font-semibold uppercase">John Doe</p>
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet odio at velit eleifend lobortis.
          </p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Patientprofile;
