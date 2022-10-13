import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const wrapper = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
        
import React from "react";
// import {ProvideDate} from "./contexts/useDateModal";
import {Provide${capName}DataTable} from "./contexts/use${capName}DataTable"
import {${capName}DataTable} from "./${capName}DataTable"
import { ProvideQueryFilters } from "src/lib/common/react-query-filters/useQueryFilters";


export const ${capName}DataTableWrapper = () => {

    return (
        <>
        <ProvideQueryFilters
        filtersFields={initialFilters}
        locationStateKeyName="${camelCaseName}Query"
      >
            <Provide${capName}DataTable>
                < ${capName}DataTable/>
            </Provide${capName}DataTable>
            </ProvideQueryFilters>
        </>
    )
}

const initialFilters = [
  // {
  //   name: "_switchStateName",
  //   label: "_switchLabel",
  //   type: "switch",
  //   initialState: true,
  //   apiKey: "_switchApiKeyInQuery",
  //   isInstantFilter: true,
  // },

  // {
  //   name: "_textStateName",

  //   label: "_textLabel",
  //   type: "text",
  //   initialState: "",
  //   apiKey: "_textApiKeyInQuery",
  //   isInstantFilter: false,
  // },
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
  //   name: "_selectStateName",
  //   label: "_selectLabel",
  //   type: "select",
  //   initialState: "",
  //   apiKey: "_selectApiKeyInQuery",
  //   isInstantFilter: false,
  //   options: [
  //     {
  //       value: "",
  //       label: "None",
  //       _id: "none",
  //       apiValue: "",
  //     },
  //     {
  //       value: "_option1Value",
  //       label: "_option1Label",
  //       _id: "_option1Id",
  //       apiValue: "_option1ApiValue",
  //     },
  //     {
  //       value: "_option2Value",
  //       label: "_option2Label",
  //       _id: "_option2Id",
  //       apiValue: "_option2ApiValue",
  //     },
  //   ],
  // },
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
  {
    name: "dateRange",
    label: "Date Range",
    type: "dateRange",
    initialState: null,
    isInstantFilter: false,
    apiKey: {
      fromDate: "fromDate",
      toDate: "fromDate",
    },
  },
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
  //   name: "_apiSelectWithDependaciesWithVariablesStateName",
  //   label: "_apiSelectWithDependaciesWithVariablesLabel",
  //   type: "apiSelect",
  //   initialState: "",
  //   getApiData: {
  //     url: "_url/{_varName}",
  //     key: "_key to get from api",
  //     value: "_value of key to get from api",
  //     label: {
  //       type: "string", // or "array" or "object"
  //       apiKey: "name",
  //     },
  //     dependency: ["_dependencyStateName"],
  //     variables: [
  //       {
  //         urlKey: "_varName",
  //         value: "_dependencyStateName",
  //       },
  //     ],
  //   },

  //   apiKey: "_apiSelectWithDependaciesWithVariablesApikey",
  //   isInstantFilter: false,
  // },
];



  `;
};
