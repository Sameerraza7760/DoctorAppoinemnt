interface ToastSuccsessProps {
  Title: string;
}
function ToastSuccsess({ Title }: ToastSuccsessProps) {
  return (
    <div
      id="toast-success"
      className="fixed bottom-4 left-4 flex items-center w-full max-w-xs p-4 mb-4 text-white bg-blue-500 rounded-lg shadow transition-all duration-1000 ease-in-out"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-green-500">
        {" "}
        {/* Change bg-green-100 to bg-green-500 */}
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium">{Title}</p>
        <p className="text-xs">You have successfully registered as a doctor.</p>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}

export default ToastSuccsess;
