import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const useReports = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import { useMemo } from "react";

  const useReports = () => {
  
    const ${camelCaseName.toUpperCase()}_HEADER_REPORTS = useMemo(() => {
      return {
        exportableReports: [
          // {
          //   label: "",
          //   downloadUrl: "",
          //   fileName: "",
          // },
        ],
        keyValueReports: [
          // {
          //   label: "عدد الكل",
          //   key: "${camelCaseName}Count",
          //   initialValue: "Not Active",
          //   hidden: false,
          // },
        ],
      };
    }, []);
  
    return {
      ${camelCaseName.toUpperCase()}_HEADER_REPORTS,
    };
  };
  
  export default useReports;
  
  
  `;
};
