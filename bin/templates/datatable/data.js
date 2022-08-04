import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const data = (name, getDataUrl) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import { useEffect, useState } from "react";
  import { useQuery } from "react-query";
  
  import Axios from "src/common/axios";
  import { getDateQuery } from "src/data-tables/helpers/getDateQuery";
  import { useDateModal } from "../contexts/useDateModal";
  import toast from "react-hot-toast";
  
  export const use${capName}Data = (search, page, dateValue, swichChecked) => {
    const controller = new AbortController();
    useEffect(() => {
      return () => controller.abort();
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const all${capName}Query = useQuery(
      ["followParts", search, page, dateValue, swichChecked],
      () => {
        let url = "/${getDataUrl}?";
  
        let queryText = \`\$\{search ? \`&search=\$\{search\}\` : ""\}\`;
  
        // let queryDate = getDateQuery(dateValue);
  
        let queryReplacing = \`\$\{
          swichChecked === true ? \`&replacement=true\` : \`\`
        \}\`;
  
        url += \`page=\$\{page + 1\}\$\{queryText\}\$\{queryReplacing\}\`;
  
        //console.log(url);
        return toast
          .promise(Axios.get(url), {
            loading: "Loading Data",
            success: "Data Loaded successfully",
            error: "Error Loading Data",
          })
          .then((res) => res.data);
      }
    );
  
    return {
      all${capName}Query,
    };
  };
  
  `;
};
