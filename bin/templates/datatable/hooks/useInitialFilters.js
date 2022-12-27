import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const useInitialFilters = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `

  import { useMemo } from "react";

  const useInitialFilters = () => {
    const initialFilters = useMemo(
      () => [
        // {
        //   name: "showReports",
        //   label: "Show/Hide Reports",
        //   type: "switch",
        //   initialState: false,
        //   apiKey: "showReports",
        //   isInstantFilter: true,
        // },
        //   {
        //     name: "activeStatus",
        //     label: "Active/Blocked",
        //     type: "switch",
        //     initialState: true,
        //     apiKey: "status",
        //     isInstantFilter: true,
        //   },
  
        // {
        //   name: "_textWithGroupStateName",
  
        //   label: "_textWithGroupLabel",
        //   type: "text",
        //   group: "_textWithGroupGroupQuery",
        //   initialState: "",
        //   apiKey: "_textWithGroupApiKeyInQuery",
        //   isInstantFilter: false,
        // },
        // {
        //   name: "_numberStateName",
        //   label: "_numberLabel",
        //   type: "number",
        //   initialState: "",
        //   apiKey: "_numberApiKeyInQuery",
        //   isInstantFilter: false,
        // },
        // {
        //   name: "userId",
        //   label: "Users",
        //   type: "apiAutoComplete",
        //   initialState: "",
        //   getApiData: {
        //     url: "/user/all?page=1&autoComplete=true",
        //     key: "_id",
        //     searchKey: "search",
        //     value: "_id",
        //     label: {
        //       type: "string", // or "array" or "object" , "string"
        //       apiKey: "name",
        //     },
        //     dependency: [],
        //     variables: [],
        //   },
  
        //   apiKey: "userId",
        //   isInstantFilter: false,
        // },
  
        // {
        //   name: "merchantId",
        //   label: "Merchants",
        //   type: "apiAutoComplete",
        //   initialState: "",
        //   getApiData: {
        //     url: "/merchant/all?page=1&autoComplete=true",
        //     key: "_id",
        //     searchKey: "search",
        //     value: "_id",
        //     label: {
        //       type: "object", // or "array" or "object" , "string"
        //       apiKey: "name",
        //     },
        //     dependency: [],
        //     variables: [],
        //   },
  
        //   apiKey: "merchantId",
        //   isInstantFilter: false,
        // },
        // {
        //   name: "relatedInquiries",
        //   label: "Releated Orders With Inquiry Code",
        //   type: "text",
        //   initialState: "",
        //   apiKey: "relatedWithCode",
        //   isInstantFilter: false,
        // },
        // {
        //   name: "userType",
        //   label: "User Type",
        //   type: "select",
        //   group: "userQuery",
        //   initialState: "",
        //   apiKey: "specialUser",
        //   isInstantFilter: false,
        //   options: [
        //     {
        //       value: "",
        //       label: "All Users",
        //       _id: "none",
        //       apiValue: "",
        //     },
        //     {
        //       value: "normalUsers",
        //       label: "Normal Users ",
        //       _id: "normal",
        //       apiValue: false,
        //     },
        //     {
        //       value: "specialUser",
        //       label: "Special Users",
        //       _id: "retrieval",
        //       apiValue: true,
        //     },
        //   ],
        // },
        // {
        //   name: "ordersType",
        //   label: "Type",
        //   type: "select",
        //   initialState: "",
        //   apiKey: "inquiryType",
        //   isInstantFilter: false,
        //   options: [
        //     {
        //       value: "",
        //       label: "All",
        //       _id: "none",
        //       apiValue: "",
        //     },
        //     {
        //       value: "normal",
        //       label: "Normal Orders",
        //       _id: "normal",
        //       apiValue: "normal",
        //     },
        //     {
        //       value: "retrieval",
        //       label: "Retrieval Orders",
        //       _id: "retrieval",
        //       apiValue: "retrieval",
        //     },
        //     {
        //       value: "replacement",
        //       label: "Replacement Orders",
        //       _id: "replacement",
        //       apiValue: "replacement",
        //     },
        //   ],
        // },
        //   {
        //     name: "reviewStatus",
        //     label: "Review Status",
        //     type: "select",
        //     initialState: "",
        //     apiKey: "hasReviewed",
        //     isInstantFilter: false,
        //     options: [
        //       {
        //         value: "",
        //         label: "All",
        //         _id: "",
        //         apiValue: "",
        //       },
        //       {
        //         value: "reviewed",
        //         label: "Reviewed",
        //         _id: "reviewed",
        //         apiValue: true,
        //       },
        //       {
        //         value: "notReviewed",
        //         label: "Not Reviewed",
        //         _id: "notReviewed",
        //         apiValue: false,
        //       },
        //     ],
        //   },
        // {
        //   name: "_rangeStateName",
        //   label: "_rangeLabel",
        //   type: "range",
        //   initialState: ["_startValue", "_endValue"],
        //   min: "_minValue",
        //   max: "_maxValue",
        //   step: "_stepValue",
        //   isInstantFilter: false,
        //   apiKey: {
        //     start: "_startApiValue",
        //     end: "_endApiValue",
        //   },
        // },
  
        // {
        //   name: "_dateStateName",
        //   label: "_dateLabel",
        //   type: "date",
        //   initialState: "",
        //   isInstantFilter: false,
        //   apiKey: "_dateApiValue",
        // },
        // {
        //   name: "_apiSelectNoDependaciesNoVariablesStateName",
        //   label: "_apiSelectNoDependaciesNoVariablesLabel",
        //   type: "apiSelect",
        //   initialState: "",
        //   getApiData: {
        //     url: "_apiSelectNoDependaciesNoVariablesUrl",
        //     key: "_apiSelectNoDependaciesNoVariablesKey",
        //     value: "_apiSelectNoDependaciesNoVariablesValue",
        //     label: {
        //       type: "string", // or "array" or "object"
        //       apiKey: "_apiSelectNoDependaciesNoVariablesApiKeySelectOption",
        //     },
        //     dependency: [],
        //     variables: [],
        //   },
  
        //   apiKey: "_apiSelectNoDependaciesNoVariablesApikey",
        //   isInstantFilter: false,
        // },
        // {
        //   name: "cancelReasonId",
        //   label: "Select Cancel Reason",
        //   type: "apiSelect",
        //   initialState: "",
        //   hidden: !["6"].includes(orderStatus),
        //   getApiData: {
        //     url: "/cancel-reasons",
        //     key: "_id",
        //     value: "_id",
        //     label: {
        //       type: "object", // or "array" or "object", string
        //       apiKey: "text",
        //     },
        //     dependency: [],
        //     variables: [],
        //   },
  
        //   apiKey: "cancelReasonId",
        //   isInstantFilter: false,
        // },
        // {
        //   name: "driverId",
        //   label: "Select Driver",
        //   type: "apiSelect",
        //   initialState: "",
        //   hidden: ["2"].includes(orderStatus),
        //   getApiData: {
        //     url: "/lookup/driver/all",
        //     key: "_id",
        //     value: "_id",
        //     label: {
        //       type: "string", // or "array" or "object"
        //       apiKey: "name",
        //     },
        //     dependency: [],
        //     variables: [],
        //   },
  
        //   apiKey: "driverId",
        //   isInstantFilter: false,
        // },
        // {
        //   name: "dateRange",
        //   label: "Date Range",
        //   type: "dateRange",
        //   initialState: null,
        //   isInstantFilter: false,
        //   apiKey: {
        //     fromDate: "fromDate",
        //     toDate: "fromDate",
        //   },
        // },
        {
          name: "tableSearch",
          label: "Search",
          type: "text",
          initialState: "",
          apiKey: "search",
          isInstantFilter: false,
        },
      ],
      []
    );
  
    return initialFilters;
  };
  
  export default useInitialFilters;
  
  
  `;
};
