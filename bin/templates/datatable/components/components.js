import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const components = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import React from "react";
  import { Toolbar } from "../components/Toolbar";
  
  export const use${capName}Components = (swichChecked, setSwichChecked) => {
    const getComponents = () => ({
      Toolbar: (props) => (
        <Toolbar
          {...props}
          swichChecked={swichChecked}
          handleSwitchChange={setSwichChecked}
        />
      ),
    });
    return { getComponents };
  };
  
  `;
};
