import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const addFeature = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  
  `;
};
