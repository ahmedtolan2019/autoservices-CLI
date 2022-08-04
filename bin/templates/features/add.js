import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const addFeature = (name, addUrl) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import toast from "react-hot-toast";
  import { useMutation } from "react-query";
  import Axios from "src/common/axios";
  
  const useAdd${capName} = () => {
    // Add ${capName}
    const add${capName}Mutation = useMutation((values) =>
      toast
        .promise(Axios.post("/${addUrl}", values), {
          loading: "Adding One...",
          success: "Added successfully",
          error: "Error Adding one",
        })
        .then((res) => res.data)
    );
  
    return {
      add${capName}Mutation,
    };
  };
  
  export default useAdd${capName};
  
  `;
};
