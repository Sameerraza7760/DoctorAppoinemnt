// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { useUserContext } from "../../contexts/UserContexts/UserProvider";
// export const fetchCurrentUser = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const accsessToken = localStorage.getItem("accessToken");
//     const { userType } = useUserContext();
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/v1/users/currentUser",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accsessToken}`,
//             "User-Type": userType,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
