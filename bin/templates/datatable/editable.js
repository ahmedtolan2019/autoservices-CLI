import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const editable = (name, deleteUrl) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
            

import { useEffect } from "react";
import toast from "react-hot-toast";
import Axios from "src/common/axios";

export const use${capName}Editable = (all${capName}Query) => {

    const controller = new AbortController();

    useEffect(() => {
      return () => controller.abort();
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    let editable = {
      onRowDelete: (oldData) =>
      toast.promise(
        Axios.delete(\`/${deleteUrl}/\${oldData._id}\`, {
          signal: controller.signal
        })
          .then(() => {
            all${capName}Query.refetch();
          })
          .catch(() => {}),
        {
          loading: "Deleting...",
          success: "Deleted successfully",
          error: "Error deleting!",
        }
      ),
      };
      return {editable};



}



  `;
};
