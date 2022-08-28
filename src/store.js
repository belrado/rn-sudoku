import { configureStore } from '@reduxjs/toolkit';
import sudokuReducer from './features/sudokuSlice';

export const store = configureStore({
    reducer: {
        sudoku: sudokuReducer,
    },
});

export const RootState = store.getState();
