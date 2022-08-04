import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const dateModel = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
            

import { useState, useContext, createContext } from "react";
const ctx = createContext();
const { Provider } = ctx;

export const ProvideDate = ({ children }) => {
  const value = useProvideDate();
  return <Provider value={value}>{children}</Provider>;
};

export const useDateModal = () => {
  return useContext(ctx);
};
const useProvideDate = () => {
  const [modalDateOpen, setModalDateOpen] = useState(false);
  const [dateValue, setDateValue] = useState(null);

  const handeDateChange = (date) => {
    setDateValue(date);
  };

  const handleOpenModal = () => {
    setModalDateOpen(true);
  };

  const handleCloseModal = () => {
    setModalDateOpen(false);
  };
  return {
    dateValue,
    modalDateOpen,
    handeDateChange,
    handleOpenModal,
    handleCloseModal,
  };
};



  `;
};
