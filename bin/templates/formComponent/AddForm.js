import { capFirst } from "../../utils/capFirst.js";
import { dashedToCamelCase } from "../../utils/dashedToCamelCase.js";

export const addForm = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import { Formik, Form } from "formik";
  import * as Yup from "yup";
  import {
    Button,
    Card,
    Container,
    Grid,
    Stack,
    Typography,
  } from "@material-ui/core";
  import TextfieldWrapper from "src/components/common/FormUI/FormTextField";
  import SelectWrapper from "src/components/common/FormUI/FormSelect";
  import { MultiSelectWrapper } from "src/components/common/FormUI/FormMultiSelect";
  import ButtonWrapper from "src/components/common/FormUI/FormButton";
  import ImageInputWrapper from "src/components/common/FormUI/FormImageInput";
  import { ArrowBack } from "@material-ui/icons";
  import { useNavigate } from "react-router-dom";
  import useAdd${capName} from "src/features/${camelCaseName}s/useAdd${capName}";
  const INITIAL_FORM_STATE = {
    nameAr: "",
    nameEn: "",
  };
  
  const FORM_VALIDATION = Yup.object().shape({
    nameAr: Yup.string().required("Required"),
    nameEn: Yup.string().required("Required"),
  });
  
  const fields = [
    { name: "nameAr", label: "${capName} Name Ar", fieldType: "text", gridXs: 6 },
    { name: "nameEn", label: "${capName} Name En", fieldType: "text", gridXs: 6 },
  ];
  
  const Add${capName}FormWrapper = () => {
    const navigate = useNavigate();
    const { add${capName}Mutation } = useAdd${capName}();
  
    return (
      <Container maxWidth="md">
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            console.log(values);
            let formData = {
              
            };
            add${capName}Mutation.mutate(formData, {
              onSuccess: () => navigate("/admin/${name}"),
            });
          }}
        >
          <Form>
            <Card sx={{ padding: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack spacing={3} alignItems="start">
                    <Button
                      startIcon={<ArrowBack />}
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </Button>
                    <Typography variant="h3">Add ${capName}</Typography>
                  </Stack>
                </Grid>
                {fields.map((field) => {
                  if (field.fieldType === "text") {
                    return (
                      <TextfieldWrapper
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        gridXs={field.gridXs}
                      />
                    );
                  }
                  if (field.fieldType === "select") {
                    return (
                      <SelectWrapper
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        gridXs={field.gridXs}
                        options={field.options}
                      />
                    );
                  }
                  if (field.fieldType === "multi-select") {
                    return (
                      <MultiSelectWrapper
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        gridXs={field.gridXs}
                        options={field.options}
                      />
                    );
                  }
                  if (field.fieldType === "file") {
                    return (
                      <ImageInputWrapper
                        key={field.name}
                        name={field.name}
                        gridXs={field.gridXs}
                      />
                    );
                  }
                  return null;
                })}
  
                <ButtonWrapper loading={add${capName}Mutation?.isLoading} gridXs={12}>
                  Add ${capName}
                </ButtonWrapper>
              </Grid>
            </Card>
          </Form>
        </Formik>
      </Container>
    );
  };
  
  export default Add${capName}FormWrapper;
  
  `;
};
