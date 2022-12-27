import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const wrapper = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import React from "react";
  import { ProvideQueryFilters } from "src/lib/common/react-query-filters/useQueryFilters";
  // import { ProvideHeaderReports } from "src/lib/common/react-reports-header/useHeaderReports";
  // import use${capName}Constants from "./constants";
  import useInitialFilters from "./hooks/useInitialFilters";
  // import useReports from "./hooks/useReports";
  import { ${capName}DataTable } from "./${capName}DataTable";
  
  const ${capName}DataTableWrapper = () => {
    const initialFilters = useInitialFilters();
    const ${camelCaseName.toUpperCase()}_ROUTER_STATE_KEY = useOrdersConstants();
    // const { ${camelCaseName.toUpperCase()}_HEADER_REPORTS } = useReports();
    return (
      <>
        <ProvideQueryFilters
          filtersFields={initialFilters}
          locationStateKeyName={${camelCaseName.toUpperCase()}_ROUTER_STATE_KEY}
        >
        {/* <ProvideHeaderReports reports={${camelCaseName.toUpperCase()}_HEADER_REPORTS}> */}
            < ${capName}DataTable />
            {/* </ProvideHeaderReports> */}
        </ProvideQueryFilters>
      </>
    );
  };
  
  export default ${capName}DataTableWrapper;
  

  `;
};
