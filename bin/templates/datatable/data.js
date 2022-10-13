import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const data = (name, getDataUrl) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import { useEffect, useState } from "react";
  import { useQuery } from "react-query";
  
  import Axios from "src/common/axios";
  // import { getDateQuery } from "src/data-tables/helpers/getDateQuery";
  // import { useDateModal } from "../contexts/useDateModal";
  import toast from "react-hot-toast";
  import { useQueryFilters } from "src/lib/common/react-query-filters";
  import { useLocation } from "react-router-dom";

  
  export const use${capName}Data = () => {
    const controller = new AbortController();
    const location = useLocation();
    const { page, queryUrl, setPage } = useQueryFilters();

    useEffect(() => {

      if (location.state?.${camelCaseName}Query?.page) {
        setPage(location.state?.${camelCaseName}Query?.page);
      }


      return () => controller.abort();
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const all${capName}Query = useQuery(
      ["${camelCaseName}", queryUrl, page, location.state?.${camelCaseName}Query?.page, location.state?.${camelCaseName}Query?.queryUrl],
      () => {
        let url = "/${getDataUrl}?";
  
       // let queryText = \`\$\{search ? \`&search=\$\{search\}\` : ""\}\`;
  
        // let queryDate = getDateQuery(dateValue);
  
       
  
        url += \`page=\${page + 1}\${
          location.state?.${camelCaseName}Query?.queryUrl && !queryUrl
            ? location.state?.${camelCaseName}Query?.queryUrl
            : queryUrl
        }\`;
  
        //console.log(url);
        return Axios.get(url)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          toast.error(err.message);
        });
      },
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );
  
    return {
      all${capName}Query,
    };
  };
  
  `;
};
