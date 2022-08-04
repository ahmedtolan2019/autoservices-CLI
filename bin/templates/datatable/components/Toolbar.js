import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const Toolbar = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  
  `;
};
