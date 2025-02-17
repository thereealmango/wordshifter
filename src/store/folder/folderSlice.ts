import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FolderT } from "../../types/Folder";

export interface FolderState {
  folders: FolderT[];
}

const initialState: FolderState = {
  folders: [
    {
      name: "words from books 1",
      id: 0,
    },
    {
      name: "words from books 2",
      id: 1,
    },
    {
      name: "words from books 3",
      id: 2,
    },
  ],
};

export const folderSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    saveFolder: (state, action: PayloadAction<{ name: string }>) => {
      console.log("dispathch!!! save_folder");
      state.folders.push({
        name: action.payload.name,
        id: state.folders.length,
      });
    },
    editFolder: (
      state,
      action: PayloadAction<{ name: string; id: Number }>
    ) => {
      const { id, name } = action.payload;
      const index = state.folders.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.folders[index] = { ...state.folders[index], name };
      }
    },
    removeFolder: (state, action: PayloadAction<number>) => {
      console.log("dispatch!! remove_folder");
      state.folders = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
    },
    removeFolders: (state, action: PayloadAction<Number[]>) => {
      console.log("dispatch!! remove_many_foldersss");
      state.folders = state.folders.filter(
        (folder) => !action.payload.includes(folder.id)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveFolder, removeFolder, removeFolders, editFolder } =
  folderSlice.actions;

export default folderSlice.reducer;
