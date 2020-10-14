import React, { createContext, useState } from "react";
import {Database} from "./Database"
const AppContext = createContext(undefined);
const AppDispatchContext = createContext(undefined);

function AppProvider({ children }) {
    const [appDetails, setAppDetails] = useState({
      database: 0,
      version:0
    });
  
    return (
      <AppContext.Provider value={appDetails}>
        <AppDispatchContext.Provider value={setAppDetails}>
          {children}
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    );
  }
  
  export { AppProvider, AppContext, AppDispatchContext };

