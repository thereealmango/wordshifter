import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  show: boolean;
  contentName: string;
  id?: number;
}

const initialState: ModalState = {
  show: false,
  contentName: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      console.log("dispathch!!!");
      state.show = action.payload.show;
      state.contentName = action.payload.contentName;
      if (action.payload.id) {
        state.id = action.payload.id;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;
