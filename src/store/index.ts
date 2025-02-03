import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../store/modal/modalSlice';
import folderReducer from '../store/folder/folderSlice';

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        folder: folderReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// lol
export type AppDispatch = typeof store.dispatch;
