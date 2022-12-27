import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const cellEditable = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
          
import { useEffect } from "react";
import Axios from "src/common/axios";
import toast from "react-hot-toast";

export const use${capName}CellEditable = (all${capName}Query) => {
 

    let cellEditable = {

        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {

          const toastPromise =  new Promise((resolve, reject) => {
            Axios.put(\`path-to-update-this-cell\`).then((response) => {
              rowData[columnDef.field] = newValue;
              all${capName}Query.refetch();
              resolve();
            }).catch((err)=>{
                console.log(err);
            });
          });

          toast.promise(toastPromise, {
            loading: "Loading",
            success: "Updating Successful",
            error: "Error when Updating",
          });

          return toastPromise
        },

      };

      return {cellEditable};

}



  `;
};
