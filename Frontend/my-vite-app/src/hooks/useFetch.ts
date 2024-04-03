import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useResourceFetch = (url: string) => {
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      return response.data; // Axios already returns response data directly
    } catch (error) {
      throw new Error("Failed to fetch data"); // Throw error for error handling
    }
  };

  return useQuery({
    queryKey: [url],
    queryFn: fetchData
  });
};

export default useResourceFetch;
