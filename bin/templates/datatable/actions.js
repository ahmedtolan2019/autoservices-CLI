import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const actions = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `

  import { useNavigate } from "react-router-dom";

  export const use${capName}Actions = (all${capName}Query) => {
    const navigate = useNavigate();
  
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
        isFreeAction: false,
        onClick: (event, rowData) => {
          navigate(\`/admin/${name}/edit/\$\{rowData._id\}\`);
        },
      },
      {
        icon: "add",
        tooltip: "Add One",
        isFreeAction: true,
        onClick: () => navigate(\`/admin/${name}/add\`),
      },
    ];
  
    return { actions };
  };
  
  `;
};
