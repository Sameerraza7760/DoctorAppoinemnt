import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DoctorData } from "./../../types/type.Doctor";
import { PatientData } from "./../../types/type.Patient";

export interface UserState {
  currentUser: DoctorData | PatientData | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<DoctorData | PatientData | null>
    ) => {
      state.currentUser = action.payload;

      state.isLoggedIn = true;
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCurrentUser, removeCurrentUser } = userSlice.actions;
export default userSlice.reducer;
