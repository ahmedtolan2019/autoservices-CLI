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
  import { downloadServerExcel } from 'src/data-tables/helpers/downloadServerExcel';
  import { use${capName}Roles } from '../hooks/use${capName}Roles';


  export const use${capName}Actions = (all${capName}Query) => {
    const { ${camelCaseName}Roles } = use${capName}Roles();

    const navigate = useNavigate();
    const routerLocation = useLocation();
    const ${allCap}_ROUTER_STATE_KEY = use${capName}Constants();

  const { queryUrl, page } = useQueryFilters();
  
    let actions = [
      {
        icon: "refresh",
        tooltip: "Refresh Data",
        isFreeAction: true,
        onClick: () => all${capName}Query.refetch(),
      },
      {
        icon: "edit",
        tooltip: "Edit this One",
        hidden: !(${camelCaseName}Roles.actions.edit ? true : false),
        isFreeAction: false,
        onClick: (event, rowData) => {
          navigate(\`/admin/${name}/edit/\$\{rowData._id\}\`, 
      {
            state: {
              fromPath: routerLocation.pathname,
              [${allCap}_ROUTER_STATE_KEY]: {
                queryUrl,
                page,
              },
            },
          });
        },
      },
      {
        icon: "add",
        tooltip: "Add One",
        hidden: !(${camelCaseName}Roles.actions.add ? true : false),
        isFreeAction: true,
        onClick: () => navigate(\`/admin/${name}/add\`),
      },
      {
        icon: 'download',
        tooltip: 'Export ${capName}',
        isFreeAction: true,
        onClick: () =>
          downloadServerExcel({
            downloadUrl: \`/download_url\${queryUrl}\`,
            filename: '${camelCaseName}',
            noQuery: true,
          }),
        hidden: !(${camelCaseName}Roles.actions.downloadExcel ? true : false),
      },
    ];
  
    return { actions };
  };
  
  `;
};
