import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const actions = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  let allCap = camelCaseName.toUpperCase();
  return `

  import { useNavigate,useLocation } from "react-router-dom";
  import { useQueryFilters } from "src/lib/common/react-query-filters";
  import use${capName}Constants from "../constants";


  export const use${capName}Actions = (all${capName}Query) => {
    const navigate = useNavigate();
    const location = useLocation();
  const { queryUrl, page } = useQueryFilters();
  
    let actions = [
      {
        icon: "refresh",
        tooltip: "Refresh Data",
        isFreeAction: true,
        onClick: () => all${capName}Query.refetch(),
      },
      // {
      //   icon: "edit",
      //   tooltip: "Edit this One",
      //   isFreeAction: false,
      //   onClick: (event, rowData) => {
      //     navigate(\`/admin/${name}/edit/\$\{rowData._id\}\`, 
      // {
          //   state: {
          //     fromPath: routerLocation.pathname,
          //     [${allCap}_ROUTER_STATE_KEY]: {
          //       queryUrl,
          //       page,
          //     },
          //   },
          // });
      //   },
      // },
      // {
      //   icon: "add",
      //   tooltip: "Add One",
      //   isFreeAction: true,
      //   onClick: () => navigate(\`/admin/${name}/add\`),
      // },
    ];
  
    return { actions };
  };
  
  `;
};
