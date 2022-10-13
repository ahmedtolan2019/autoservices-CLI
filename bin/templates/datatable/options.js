import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const options = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  export const use${capName}Options = () => {
    let options = {
      pageSize: 10,
      actionsColumnIndex: -1,
      searchAutoFocus: false,
      search: false,
    };
    return {options};
  };
  

  `;
};
