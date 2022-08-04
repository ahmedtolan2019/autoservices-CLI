import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const useDataTable = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `

  import { useState, useContext, createContext } from "react";
  import { useDateModal } from "./useDateModal";
  
  import { use${capName}Data } from "../helpers/use${capName}Data";
  import { use${capName}Columns } from "../helpers/use${capName}Columns";
  import { use${capName}Actions } from "../helpers/use${capName}Actions";
  import { use${capName}Editable } from "../helpers/use${capName}Editable";
  import { use${capName}CellEditable } from "../helpers/use${capName}CellEditable";
  import { use${capName}Components } from "../helpers/use${capName}Components";
  import { use${capName}Options } from "../helpers/use${capName}Options";
  
  const ctx = createContext();
  const { Provider } = ctx;
  
  export const Provide${capName}DataTable = ({ children }) => {
    const value = useProvide${capName}DataTable();
    return <Provider value={value}>{children}</Provider>;
  };
  
  export const use${capName}DataTable = () => {
    return useContext(ctx);
  };
  const useProvide${capName}DataTable = () => {
    //states
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(0);
    const { dateValue } = useDateModal();
    //handle contacted switch
    const [swichChecked, setSwichChecked] = useState(false);
  
    //columns
    const { columns } = use${capName}Columns();
  
    //data
    const { all${capName}Query } = use${capName}Data(
      search,
      page,
      dateValue,
      swichChecked
    );
  
    //actions
    const { actions } = use${capName}Actions(all${capName}Query);
  
    //editable
    const { editable } = use${capName}Editable(all${capName}Query);
  
    //cellEditable
    const { cellEditable } = use${capName}CellEditable(all${capName}Query);
  
    //components
    const { getComponents } = use${capName}Components(
      swichChecked,
      setSwichChecked
    );
  
    //options
    const { options } = use${capName}Options();
  
    return {
      columns,
      all${capName}Query,
      actions,
      editable,
      cellEditable,
      getComponents,
      options,
      search,
      setSearch,
      page,
      setPage,
      dateValue,
    };
  };
  

  `;
};
