import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const editFormWrapper = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
      



import { Formik } from "formik";
import * as Yup from "yup";
import { Container } from "@mui/material";

import EditForm from "./EditForm";

const INITIAL_FORM_STATE = {
  nameAr: "",
  nameEn: "",
};

const FORM_VALIDATION = Yup.object().shape({
  nameAr: Yup.string().required("Required"),
  nameEn: Yup.string().required("Required"),
});

const Edit${capName}FormWrapper = () => {
  return (
    <Container maxWidth="md">
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
      >
        <EditForm />
      </Formik>
    </Container>
  );
};

export default Edit${capName}FormWrapper;







  `;
};
