import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AlertNotification from "../../components/Toast/AlertNotification";
import useSocket from "../../hooks/useSocket";
import useToggle from "../../hooks/useToggle";
import { RootState } from "../../store/store";
import "./style.css";
function Home() {
  const { close: handleCloseNotification } = useToggle();
  const { socket, isConnected } = useSocket();
  const [appointmentStatus, setAppointmentStatus] = useState<
    string | undefined
  >("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const currentUser = useSelector(
    (state: RootState) => state?.user?.currentUser
  );
  console.log("outside", currentUser?._id);

  useEffect(() => {
    if (socket && isConnected) {
      console.log("Socket connected:", socket.connected);

      socket.on("receivedNotificationtoPatient", (data) => {
        console.log("Notification received:", data);
        setIsVisible(true);
        setAppointmentStatus(data.status);
      });
    }
    
  }, [socket, isConnected]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <AlertNotification
          type="success"
          message={`Doctor has ${appointmentStatus} your Appointment `}
          onClose={handleCloseNotification}
        />
      )}
      <div>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="container mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8  md:grid-cols-5 lg:gap-x-8 lg:gap-y-12">
              <div className="shadow-md">
                <div className="mb-2 h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:mb-4 sm:h-60 md:h-40">
                  <img
                    src=""
                    loading="lazy"
                    alt="Photo by christian ferrer"
                    className="d1 h-full w-full object-cover object-center"
                  />
                </div>

                <div className="p-4">
                  <div className="font-bold text-indigo-500 md:text-lg">
                    Instant Video Consulation
                  </div>
                  <p className="mb-3 text-sm text-gray-500 md:mb-4 md:text-base">
                    connect withinn second
                  </p>
                </div>
              </div>

              <div className="shadow-md">
                <div className="mb-2 h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:mb-4 sm:h-60 md:h-40">
                  <img
                    src=""
                    loading="lazy"
                    alt="Photo by Ayo Ogunseinde"
                    className="d2 h-full w-full object-cover object-center"
                  />
                </div>

                <div className="p-4">
                  <div className="font-bold text-indigo-500 md:text-lg">
                    Instant Video Consulation
                  </div>
                  <p className="mb-3 text-sm text-gray-500 md:mb-4 md:text-base">
                    connect withinn second
                  </p>
                </div>
              </div>

              <div className="shadow-md">
                <div className="mb-2 h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:mb-4 sm:h-60 md:h-40">
                  <img
                    src="https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?auto=format&q=75&fit=crop&w=500"
                    loading="lazy"
                    alt="Photo by Midas Hofstra"
                    className="d3 h-full w-full object-cover object-center"
                  />
                </div>

                <div className="p-4">
                  <div className="font-bold text-indigo-500 md:text-lg">
                    Instant Video Consulation
                  </div>
                  <p className="mb-3 text-sm text-gray-500 md:mb-4 md:text-base">
                    connect withinn second
                  </p>
                </div>
              </div>

              <div className="shadow-md">
                <div className="mb-2 h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:mb-4 sm:h-60 md:h-40">
                  <img
                    src=""
                    loading="lazy"
                    alt="Photo by Elizeu Dias"
                    className="d4 h-full w-full object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <div className="font-bold text-indigo-500 md:text-lg">
                    Instant Video Consulation
                  </div>
                  <p className="mb-3 text-sm text-gray-500 md:mb-4 md:text-base">
                    connect withinn second
                  </p>
                </div>
              </div>

              <div className="shadow-md ">
                <div className="mb-2 h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:mb-4 sm:h-60 md:h-40">
                  <img
                    src=""
                    loading="lazy"
                    alt="Photo by Matheus Ferrero"
                    className="d5 h-full w-full object-cover object-center"
                  />
                </div>

                <div className="p-4">
                  <div className="font-bold text-indigo-500 md:text-lg">
                    Instant Video Consulation
                  </div>
                  <p className="mb-3 text-sm text-gray-500 md:mb-4 md:text-base">
                    connect withinn second
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            {/* text - start */}
            <div className="mb-10 md:mb-16">
              <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                Selected
              </h2>

              <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text but is random or otherwise generated.
              </p>
            </div>
            {/* text - end */}

            <div className="container h-[40%] w-[80%] mx-auto grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
              {/* product - start */}
              <div className="card-container h-full">
                <a
                  href="#"
                  className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                >
                  <img
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                    loading="lazy"
                    alt="Photo by Austin Wade"
                    className="s3 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </a>

                <div className="flex items-start justify-between gap-2 px-2">
                  <div className="flex flex-col">
                    <a
                      href="#"
                      className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                    >
                      Gynacylogist/Obstretition
                    </a>
                    <span className="text-gray-500">
                      Explor for women health and pragnancy{" "}
                    </span>
                  </div>
                </div>
              </div>
              {/* product - end */}

              {/* product - start */}
              <div>
                <a
                  href="#"
                  className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                >
                  <img
                    src="https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&q=75&fit=crop&crop=top&w=600&h=700"
                    loading="lazy"
                    alt="Photo by Nick Karvounis"
                    className="s4 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </a>

                <div className="flex items-start justify-between gap-2 px-2">
                  <div className="flex flex-col">
                    <a
                      href="#"
                      className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                    >
                      Daititian/Nutration
                    </a>
                    <span className="text-gray-500">
                      Get Guidence on Eating Right{" "}
                    </span>
                  </div>
                </div>
              </div>
              {/* product - end */}

              {/* product - start */}
              <div>
                <a
                  href="#"
                  className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                >
                  <img
                    src=""
                    loading="lazy"
                    alt="Photo by Austin Wade"
                    className="s1 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </a>

                <div className="flex items-start justify-between gap-2 px-2">
                  <div className="flex flex-col">
                    <a
                      href="#"
                      className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                    >
                      Dentist
                    </a>
                    <span className="text-gray-500">Theeting Troubles</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-gray-600 lg:text-lg">
                      $35.00
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="#"
                  className="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                >
                  <img
                    src=""
                    loading="lazy"
                    alt="Photo by Vladimir Fedotov"
                    className="s2 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </a>

                <div className="flex items-start justify-between gap-2 px-2">
                  <div className="flex flex-col">
                    <a
                      href="#"
                      className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                    >
                      Physiotherapist
                    </a>
                    <span className="text-gray-500">Pulled A Mucles</span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="font-bold text-gray-600 lg:text-lg">
                      $49.99
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="text-gray-600 body-font w-[80%] mx-auto">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <div className="flex">
                <div className="px-8 py-10 w-full border-4 border-gray-200">
                  <h2 className="w-[70%] mx-auto text-3xl title-font font-medium text-indigo-500 mb-1">
                    Read top articles from health experts
                  </h2>
                  {/* <h1 className="title-font text-sm font-medium text-gray-900 mb-3">
                  Health articles that keep you informed about good health
                  practices and achieve your goals.
                </h1> */}
                  <p className="leading-relaxed w-[70%]  mx-auto">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>{" "}
                  <button className="mx-auto items-center flex justify-center  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    See All Article
                  </button>
                </div>
              </div>
            </div>

            <div className="flex lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex-row md:items-start md:text-left items-center text-center">
              <div className="lg:w-2/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="a1 object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/420x260"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    The Catalyzer
                  </h2>
                  <p className="mt-1">$16.00</p>
                </div>
              </div>
              <div className="lg:w-2/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="a2 object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/420x260"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    The Catalyzer
                  </h2>
                  <p className="mt-1">$16.00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="mb-10 md:mb-16">
              <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                Meet our Team
              </h2>

              <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text but is random or otherwise generated.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5 lg:gap-x-8 lg:gap-y-12">
              <div className="flex flex-col items-center">
                <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:mb-4 md:h-32 md:w-32">
                  <img
                    src="https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256"
                    loading="lazy"
                    alt="Photo by Radu Florin"
                    className="t6 h-full w-full object-cover object-center"
                  />
                </div>

                <div>
                  <div className="text-center font-bold text-indigo-500 md:text-lg">
                    Cold ,cough or fever
                  </div>
                  <p className="mb-3 text-center text-sm text-gray-500 md:mb-4 md:text-base">
                    Consult now
                  </p>

                  <div className="flex justify-center">
                    <div className="flex gap-4">
                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>

                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:mb-4 md:h-32 md:w-32">
                  <img
                    src="https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?auto=format&q=75&fit=crop&w=256"
                    loading="lazy"
                    alt="Photo by christian ferrer"
                    className="t3 h-full w-full object-cover object-center"
                  />
                </div>

                <div>
                  <div className="text-center font-bold text-indigo-500 md:text-lg">
                    Cold ,cough or fever
                  </div>
                  <p className="mb-3 text-center text-sm text-gray-500 md:mb-4 md:text-base">
                    Consult now
                  </p>

                  <div className="flex justify-center">
                    <div className="flex gap-4">
                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>

                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:mb-4 md:h-32 md:w-32">
                  <img
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&q=75&fit=crop&w=256"
                    loading="lazy"
                    alt="Photo by Ayo Ogunseinde"
                    className="t2 h-full w-full object-cover object-center"
                  />
                </div>

                <div>
                  <div className="text-center font-bold text-indigo-500 md:text-lg">
                    Cold ,cough or fever
                  </div>
                  <p className="mb-3 text-center text-sm text-gray-500 md:mb-4 md:text-base">
                    Consult now
                  </p>

                  <div className="flex justify-center">
                    <div className="flex gap-4">
                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>

                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:mb-4 md:h-32 md:w-32">
                  <img
                    src=""
                    loading="lazy"
                    alt="Photo by Midas Hofstra"
                    className="t1 h-full w-full object-cover object-center"
                  />
                </div>

                <div>
                  <div className="text-center font-bold text-indigo-500 md:text-lg">
                    Cold ,cough or fever
                  </div>
                  <p className="mb-3 text-center text-sm text-gray-500 md:mb-4 md:text-base">
                    Consult now
                  </p>

                  <div className="flex justify-center">
                    <div className="flex gap-4">
                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>

                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:mb-4 md:h-32 md:w-32">
                  <img
                    src=""
                    loading="lazy"
                    alt="Photo by Midas Hofstra"
                    className="t1 h-full w-full object-cover object-center"
                  />
                </div>

                <div>
                  <div className="text-center font-bold text-indigo-500 md:text-lg">
                    Cold ,cough or fever
                  </div>
                  <p className="mb-3 text-center text-sm text-gray-500 md:mb-4 md:text-base">
                    Consult now
                  </p>
                  <div className="flex justify-center">
                    <div className="flex gap-4">
                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>

                      <a
                        href="#"
                        target="_blank"
                        className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                      >
                        <svg
                          className="h-5 w-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
