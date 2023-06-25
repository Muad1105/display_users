import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  id: "",
  section: "",
  chatUser: [],
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
    chatWithUser: (state, action) => {
      console.log(action);
      //checking for user already present
      console.log(state.chatUser.includes(action.payload));
      if (state.chatUser.includes(action.payload)) {
        console.log("already present", action.payload);
      } else state.chatUser.push(action.payload);
    },
    editChatWithUsers: (state, action) => {
      console.log(action);
      state.chatUser = action.payload;
    },
  },
});

export const {
  setUserId,
  showRequiredSection,
  chatWithUser,
  editChatWithUsers,
} = userData.actions;

export default userData.reducer;
