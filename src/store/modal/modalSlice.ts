import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
    show: boolean;
    contentName: string;
}

const initialState: ModalState = {
    show: false,
    contentName: undefined,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ show: boolean; contentName: string }>) => {
            console.log('dispathch!!!');
            state.show = action.payload.show;
            state.contentName = action.payload.contentName;
        },
    },
});

// Action creators are generated for each case reducer function
export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;
