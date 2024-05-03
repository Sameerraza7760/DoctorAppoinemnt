import { useQuery } from "react-query";
import axios from "axios";

const useResourceFetch = (url: string) => {
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
  });
};

export default useResourceFetch;