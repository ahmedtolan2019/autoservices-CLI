import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const data = (name, getDataUrl) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  let allCap = camelCaseName.toUpperCase();
  return `
  import { useEffect, useState } from "react";
  import { useQuery } from "react-query";
  
  import Axios from "src/common/axios";
  import toast from "react-hot-toast";
  import { useQueryFilters } from "src/lib/common/react-query-filters";
  import { useLocation } from "react-router-dom";
  // import useHeaderReports from "src/lib/common/react-reports-header/useHeaderReports";
  import use${capName}Constants from "./constants";

  
  export const use${capName}Data = () => {
    const location = useLocation();
    const { page, queryUrl, setPage, formikValues } = useQueryFilters();
    const ${allCap}_ROUTER_STATE_KEY = use${capName}Constants();
    // const {
    //   handleKeyValueReportsChange,
    //   initialKeyValueReportsState,
    //   setLoadingReports,
    // } = useHeaderReports();

    useEffect(() => {
      if (routerLocation.state?.[${allCap}_ROUTER_STATE_KEY]?.page)
      setPage(routerLocation.state?.[${allCap}_ROUTER_STATE_KEY]?.page);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const all${capName}Query = useQuery(
      ["${camelCaseName}", queryUrl, page, location.state?.${camelCaseName}Query?.page, location.state?.${camelCaseName}Query?.queryUrl],
      () => {
        // formikValues["showReports"] && setLoadingReports(true);


        let url = "/${getDataUrl}?"; 
       
          url += \`page=\${page + 1}\${
          location.state?.${camelCaseName}Query?.queryUrl && !queryUrl
            ? location.state?.${camelCaseName}Query?.queryUrl
            : queryUrl
        }\`;
  
        return Axios.get(url)
        .then((res) => {
          return res.data;
        })
      },
      {
        // onSuccess: (data) => {
        //   let reportsObj =
        //     Object.keys(data?.body.reports).length === 0
        //       ? initialKeyValueReportsState
        //       : data?.body.reports;
         
        //   Object.keys(reportsObj).forEach((key) => {
        //     handleKeyValueReportsChange(key, reportsObj[key]);
        //   });
        //   setLoadingReports(false);
        // },
      }
    );
  
    return {
      all${capName}Query,
    };
  };
  
  `;
};
