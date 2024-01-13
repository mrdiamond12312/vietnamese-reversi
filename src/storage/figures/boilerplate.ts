import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
  
};

export const boilerplateSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    someDispatch: (state, action: PayloadAction<any>) => {
      console.log(state, action)
    },
  },
});

// Action creators are generated for each case reducer function
export const { someDispatch } = boilerplateSlice.actions;

export default boilerplateSlice.reducer;
