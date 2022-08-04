import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const columns = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);

  return `
    
import moment from "moment";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: localStorage.getItem("timeZone"),
};

export const use${capName}Columns = () => {
  let columns = [
    { title: "${capName} ID", field: "_id", editable: "never", hidden: true },    
  ];
  return { columns };
};


    `;
};
