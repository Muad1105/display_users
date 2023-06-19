import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  section: "",
};

export const userData = createSlice({
  name: "ID",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      console.log(action);
      state.id = action.payload;
    },
    showRequiredSection: (state, action) => {
      console.log(action.payload);
      state.section = action.payload;
    },
  },
});

export const { setUserId, showRequiredSection } = userData.actions;

export default userData.reducer;
