import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const RangeDatePicker = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
      

import React from "react";
import { MainDatePicker } from "src/data-tables/components/RangeDatePicker";
import { useDateModal } from "../contexts/useDateModal";

export const RangeDatePicker = () => {

    const {
        dateValue,
        handeDateChange,
        modalDateOpen,
        handleOpenModal,
        handleCloseModal,
      } = useDateModal();
      return (
        <MainDatePicker
          dateValue={dateValue}
          dateModelOpen={modalDateOpen}
          setDateModelOpen={handleOpenModal}
          setDateModelClose={handleCloseModal}
          handleChange={handeDateChange}
        />
      );


}


  `;
};
