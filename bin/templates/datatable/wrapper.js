import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const wrapper = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
        
import React from "react";
import {ProvideDate} from "./contexts/useDateModal";
import {Provide${capName}DataTable} from "./contexts/use${capName}DataTable"
import {${capName}DataTable} from "./${capName}DataTable"


export const ${capName}DataTableWrapper = () => {

    return (
        <ProvideDate>
            <Provide${capName}DataTable>
                < ${capName}DataTable/>
            </Provide${capName}DataTable>

        </ProvideDate>
    )
}


  `;
};
