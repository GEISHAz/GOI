import React, { createContext, useContext, useState } from 'react';

const BGMContext = createContext();

export const useBGM = () => useContext(BGMContext);

export const BGMProvider = ({ children }) => {
  const [isBGMVisible, setIsBGMVisible] = useState(true);

  const toggleBGMVisibility = () => {
    setIsBGMVisible(!isBGMVisible);
  };

  return (
    <BGMContext.Provider value={{ isBGMVisible, toggleBGMVisibility }}>
      {children}
    </BGMContext.Provider>
  );
};
