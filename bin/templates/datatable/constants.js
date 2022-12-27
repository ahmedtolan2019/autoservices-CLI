import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const constants = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
    
import { useMemo } from "react";

const use${capName}Constants = () => {
  const ${camelCaseName.toUpperCase()}_ROUTER_STATE_KEY = useMemo(() => {
    return '${camelCaseName}QueryStateStatus';
  }, []);
  return ${camelCaseName.toUpperCase()}_ROUTER_STATE_KEY;
};

export default use${capName}Constants;


  `;
};
