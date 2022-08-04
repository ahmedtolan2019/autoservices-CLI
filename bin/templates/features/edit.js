import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const editFeature = (name, editUrl, getOneUrl) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import toast from "react-hot-toast";
  import { useMutation, useQuery } from "react-query";
  import { useParams } from "react-router-dom";
  import Axios from "src/common/axios";
  
  const useEdit${capName} = () => {
    const { id: ${camelCaseName}Id } = useParams();
    //get ${camelCaseName} by id
    const ${camelCaseName}ByIdQuery = useQuery(
      ["${name}", ${camelCaseName}Id],
      () => {
        return toast
          .promise(Axios.get("/${getOneUrl}/" + ${camelCaseName}Id), {
            loading: "Loading one...",
            success: "Loaded successfully",
            error: "Error loading one",
          })
          .then((res) => res.data);
      }
    );
  
    const edit${capName}Mutation = useMutation((values) =>
      toast
        .promise(Axios.put("/${editUrl}", values), {
          loading: "Editting One...",
          success: "Edited successfully",
          error: "Error editing One",
        })
        .then((res) => res.data)
    );
  
    return {
      edit${capName}Mutation,
      ${camelCaseName}ByIdQuery,
    };
  };
  
  export default useEdit${capName};
  
  `;
};
