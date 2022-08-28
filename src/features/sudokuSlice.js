import { createSlice } from '@reduxjs/toolkit';
import { Vibration } from 'react-native';

const initialState = {
    block: 2,
    level: 2,
    vibration: true,
};

const sudokuSlice = createSlice({
    name: 'sudoku',
    initialState,
    reducers: {
        setBlock: (state, action) => {
            state.block = action.payload;
        },
        setVibration: (state, action) => {
            state.vibration = action.payload;
        },
    },
});

export const { setBlock, setVibration } = sudokuSlice.actions;

export default sudokuSlice.reducer;
