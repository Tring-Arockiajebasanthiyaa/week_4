import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem("personas");
  return storedData ? JSON.parse(storedData) : [];
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("personas", JSON.stringify(state));
};

const personaSlice = createSlice({
  name: "personas",
  initialState: loadFromLocalStorage(),
  reducers: {
    addPersona: (state, action) => {
      if (action.payload?.id) {
        state.push(action.payload);//payload - data that the action carries
        saveToLocalStorage(state); // Save after adding
      }
    },
    updatePersona: (state, action) => {
      const { id } = action.payload;
      if (!id) return;

      const index = state.findIndex((p) => p.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
        saveToLocalStorage(state); // Save after updating
      }
    },
    deletePersona: (state, action) => {
      const newState = state.filter((p) => p.id !== action.payload);
      saveToLocalStorage(newState); // Save after deleting
      return newState;
    },
    clearPersonas: () => {
      localStorage.removeItem("personas"); // Clear local storage
      return []; // Reset state
    },
  },
});

export const { addPersona, updatePersona, deletePersona,clearPersonas } = personaSlice.actions;
export default personaSlice.reducer;
