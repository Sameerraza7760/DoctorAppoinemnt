interface AlertNotificationProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}
const AlertNotification = ({
  type,
  message,
  onClose,
}: AlertNotificationProps) => {
  return (
    <div
      className={`fixed top-6 right-6 max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden transition duration-500 transform ${
        type === "success"
          ? "border-l-4 border-green-500"
          : "border-l-4 border-red-500"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p
            className={`text-sm font-semibold ${
              type === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </p>
          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.457 3.457a1 1 0 011.414 0L10 8.586l5.129-5.128a1 1 0 111.414 1.414L11.414 10l5.128 5.129a1 1 0 11-1.414 1.414L10 11.414l-5.129 5.128a1 1 0 01-1.414-1.414L8.586 10 3.457 4.871a1 1 0 010-1.414z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AlertNotification;
