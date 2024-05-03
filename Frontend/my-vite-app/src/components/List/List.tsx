import { DoctorData } from "../../types/type.Doctor";
import Card from "../Card/Card";
interface ListProps {
  doctors: DoctorData[];
}

function List({ doctors }: ListProps) {
  return (
    <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
      {doctors?.map((doctor) => (
        <Card key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
}

export default List;
