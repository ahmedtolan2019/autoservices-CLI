import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const editable = (name, deleteUrl) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
            

import toast from "react-hot-toast";
import Axios from "src/common/axios";
import { use${capName}Roles } from '../hooks/use${capName}Roles';

export const use${capName}Editable = (all${capName}Query) => {
  const { ${camelCaseName}Roles } = use${capName}Roles();
    
    let editable = {
      isDeletable: () => (${camelCaseName}Roles.actions.delete ? true : false),
      onRowDelete: (oldData) =>
      toast.promise(
        Axios.delete(\`/${deleteUrl}/\${oldData._id}\`),
        {
          loading: "Deleting...",
          success: "Deleted successfully",
          error: "Error deleting!",
        }
      ).then(() => {
        all${capName}Query.refetch();
      })
      .catch(() => {}),
      };
      return {editable};



}



  `;
};
