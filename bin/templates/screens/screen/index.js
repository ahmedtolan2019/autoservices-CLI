import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const screen = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import {Box} from "@mui/material";

  
  const ${capName}Screen = () => {
    return (
      <Box p={2} width="100%" height="100%">
        ${capName}Screen
      </Box>
    );
  };
  
  export default ${capName}Screen;
  `;
};
