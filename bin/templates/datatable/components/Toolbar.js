import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const Toolbar = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import { MTableToolbar } from "material-table";
  // import ActiveBlockSwitch from "src/data-tables/components/Switch";
  // import { SearchBySelect } from "./SearchBySelect";
  
  // import { RangeDatePicker } from "./RangeDatePicker";
  // import ActiveBlockSwitch from "src/data-tables/components/Switch";
  
  export const Toolbar = (props) => {
    return (
      <div
        style={{
          // position: "relative",
          // paddingTop: 15,
          backgroundColor: "#328ed01e",
          borderRadius: "10px 10px 0 0",
          // paddingBottom: 15,
        }}
      >
        <MTableToolbar
          {...props}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        />
      
      </div>
    );
  };
  
  `;
};
