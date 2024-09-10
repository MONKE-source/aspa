import React, { createContext, useState } from "react";

// Create a Context
export const WeightContext = createContext();

// Create a Provider Component
export const WeightProvider = ({ children }) => {
  const [weight, setWeight] = useState(null); // Initialize weight state

  return (
    <WeightContext.Provider value={{ weight, setWeight }}>
      {children}
    </WeightContext.Provider>
  );
};
