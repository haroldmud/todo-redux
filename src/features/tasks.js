import { createSlice } from "@reduxjs/toolkit";

const addSlice = createSlice({
  name: "add",
  initialState: { value: { tasks: [] } },
  reducers: {
    generator: (state, actions) => {
      state.value.tasks = actions.payload;
    },
    checked: (state, actions) => {
      state.value.tasks = actions.payload;
    },
    deleting: (state, actions) => {
      state.value.tasks = actions.payload;
    },
    editing: (state, actions) => {
      state.value.tasks = actions.payload;
    },
  },
});

export const { generator, checked, deleting, editing } = addSlice.actions;
export default addSlice.reducer;
