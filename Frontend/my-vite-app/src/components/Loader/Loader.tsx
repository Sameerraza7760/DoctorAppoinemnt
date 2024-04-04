import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="hsla(194, 67%, 53%, 1)" size={202} />
    </div>
  );
}

export default Loader;
