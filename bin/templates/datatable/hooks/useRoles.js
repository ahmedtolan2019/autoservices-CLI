import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const useRoles = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import { useMemo } from 'react';
  import {
    APP_ROLES,
    getHasAccess,
    RESOURCE_NAMES,
  } from 'src/lib/common/react-roles';
  
  const hasAccess = getHasAccess();
  const resourceName = RESOURCE_NAMES.${camelCaseName};
  const resourceRoles = APP_ROLES[resourceName];
  const hasRoleAccess = (role) => hasAccess(resourceName, role);
  export const use${capName}Roles = () => {
    const ${camelCaseName}Roles = useMemo(() => {
      let roles = {
        actions: {
          edit: hasRoleAccess(resourceRoles.edit),
          delete: hasRoleAccess(resourceRoles.delete),
          add: hasRoleAccess(resourceRoles.add),
          downloadExcel:hasRoleAccess(resourceRoles.downloadExcel),
        },
        columns: {},
        filters: {},
        show: {},
      };
      return roles;
    }, []);
    return { ${camelCaseName}Roles };
  };
  

  
  
  `
}