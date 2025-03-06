import { configureStore } from "@reduxjs/toolkit";
import personaReducer from "./personaSlice"; // Check path

const store = configureStore({
  reducer: {
    personas: personaReducer
  }
});

export default store;
