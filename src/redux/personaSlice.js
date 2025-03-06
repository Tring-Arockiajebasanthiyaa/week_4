import { createSlice } from "@reduxjs/toolkit";

const personaSlice = createSlice({
  name: "personas",
  initialState: [],
  reducers: {
    addPersona: (state, action) => {
      state.push(action.payload);
    },
    updatePersona: (state, action) => {
      const index = state.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deletePersona: (state, action) => {
      return state.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPersona, updatePersona, deletePersona } = personaSlice.actions;
export default personaSlice.reducer;
