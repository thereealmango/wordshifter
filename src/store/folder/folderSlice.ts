import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FolderT } from '../../types/Folder';

export interface FolderState {
    folders: FolderT[];
}

const initialState: FolderState = {
    folders: [
        {
            name: 'words from books 1',
            id: 0,
        },
        {
            name: 'words from books 2',
            id: 1,
        },
        {
            name: 'words from books 3',
            id: 2,
        },
    ],
};

export const folderSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        saveFolder: (state, action: PayloadAction<{ name: string }>) => {
            console.log('dispathch!!! save_folder');
            state.folders.push({
                name: action.payload.name,
                id: state.folders.length,
            });
        },
        removeFolder: (state, action: PayloadAction<{ id: number }>) => {
            console.log('dispatch!! remove_folder');
            state.folders = state.folders.filter((folder) => folder.id !== action.payload.id);
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveFolder, removeFolder } = folderSlice.actions;

export default folderSlice.reducer;
