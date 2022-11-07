import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    handleFilter(state, action) {
      const filter = action.payload;
      return filter;
    },
  },
});

export const { handleFilter } = filterSlice.actions;

export default filterSlice.reducer;
