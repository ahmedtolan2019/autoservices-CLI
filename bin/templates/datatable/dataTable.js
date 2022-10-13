import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const dataTable = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import { MainDataTable } from "src/data-tables/components/MainDataTable";
  import { use${capName}DataTable } from "./contexts/use${capName}DataTable";
  import { useQueryFilters } from "src/lib/common/react-query-filters";

  export const ${capName}DataTable = () => {
    const {
     
     
     
      all${capName}Query,
      columns,
      actions,
      editable,
      options,
      getComponents,
      cellEditable,
    } = use${capName}DataTable();

    const { page, setPage } = useQueryFilters();
  
    return (
      <MainDataTable
        title="${capName}"
        options={options}
        columns={columns}
        actions={actions}
        isLoading={all${capName}Query?.isLoading}
        data={
          typeof all${capName}Query.data === "undefined"
            ? []
            : all${capName}Query?.data?.body?.docs
        }
        // cellEditable={cellEditable}
        components={getComponents()}
        onSearchChange={(search) => {
          // setSearch(search);
          console.log("search", search);
        }}
        page={page}
        onChangePage={(page) => {
          setPage(page);
        }}
        totalCount={
          all${capName}Query?.data?.body?.totalDocs ??
          all${capName}Query?.data?.body?.length
        }
        // editable={editable}
        // cellEditable={cellEditable}
      />
    );
  };
  
  `;
};
