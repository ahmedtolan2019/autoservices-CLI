import { capFirst } from "../../../utils/capFirst.js";
import { dashedToCamelCase } from "../../../utils/dashedToCamelCase.js";

export const editForm = (name) => {
  let capName = capFirst(dashedToCamelCase(name));
  let camelCaseName = dashedToCamelCase(name);
  return `
  import { Form, useFormikContext } from "formik";

  import { Button, Card, Grid, Stack, Typography } from "@mui/material";
  import TextfieldWrapper from "src/components/common/FormUI/FormTextField";
  
  import SelectWrapper from "src/components/common/FormUI/FormSelect";
  
  import ApiSelectFieldWrapper from "src/components/common/FormUI/ApiSelectField";


  import { MultiSelectWrapper } from "src/components/common/FormUI/FormMultiSelect";
  
  import ButtonWrapper from "src/components/common/FormUI/FormButton";
  
  import ImageInputWrapper from "src/components/common/FormUI/FormImageInput";
  
  import { ArrowBack } from "@mui/icons-material";
  
  import { cloudinary } from "src/common/cloudinary";
  import FormArrayAddWrapper from "src/components/common/FormUI/FormArrayAdd";

  
  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  
  import useEdit${capName} from "src/features/${camelCaseName}s/useEdit${capName}";
  
  const fields = [
    { name: "nameAr", label: "${capName} Name Ar", fieldType: "text", gridXs: 6 },
    { name: "nameEn", label: "${capName} Name En", fieldType: "text", gridXs: 6 },
  ];
  
  const EditForm = () => {
    const navigate = useNavigate();
    const { values, setFieldValue } = useFormikContext();
    const { edit${capName}Mutation, ${camelCaseName}ByIdQuery } = useEdit${capName}();
  
    useEffect(() => {
      if (${camelCaseName}ByIdQuery.data) {
        setFieldValue("nameAr", "${camelCaseName}ByIdQuery.data.body.name.ar");
        setFieldValue("nameEn", "${camelCaseName}ByIdQuery.data.body.name.en");
      }
    }, [${camelCaseName}ByIdQuery.data]);
  
    if (!${camelCaseName}ByIdQuery.data) {
      return null;
    }
  
    return (
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
                <Typography variant="h3">Edit ${capName}</Typography>
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
                    multiline={field.multiline}
                    formInfoGridXs={field.formInfoGridXs}
                    FormInfo={undefined}
                    formAlarmInfo={field.formAlarmInfo}
                    FormAlarmInfoChildren={undefined}
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
                    // fileUrl={\`\${cloudinary.imageBaseUrl}/\${${camelCaseName}ByIdQuery?.data?.body?.flag}\`}
                    gridXs={field.gridXs}
                  />
                );
              }
              if (field.fieldType === "arrayAdd") {
                return (
                  <FormArrayAddWrapper
                    label={field.label}
                    btnText={field.btnText}
                    chipIcon={field.chipIcon}
                    name={field.name}
                    key={field.name}
                    subFields={field.subFields}
                    initialSubFieldsState={field.initialSubFieldsState}
                    subFieldsValidationSchema={
                      field.subFieldsValidationSchema
                    }
                  />
                );
              }
              if (field.fieldType === "apiSelect") {
                return (
                  <ApiSelectFieldWrapper
                    getApiData={field.getApiData}
                    gridXs={field.gridXs}
                    initialOptions={field.initialOptions}
                    label={field.label}
                    name={field.name}
                    key={field.name}
                    parentKey={name}
                    parentFormValues={values}
                    disableSelected={field.disableSelected}
                    selectedValueType={field.selectedValueType}
                  />
                );
              }
              return null;
            })}
  
            <ButtonWrapper
              loading={edit${capName}Mutation?.isLoading}
              gridXs={12}
              onClick={() => {
                console.log(values);
                let formData = {
                 
                };
                console.log(formData);
                edit${capName}Mutation.mutate(formData, {
                  onSuccess: () => {
                    navigate(-1);
                  },
                });
              }}
            >
              Save ${capName}
            </ButtonWrapper>
          </Grid>
        </Card>
      </Form>
    );
  };
  
  export default EditForm;
  
  `;
};
