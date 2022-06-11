import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Choose, When } from "@material-ui/core";
import TextInput from "../../lib/components/txtinput/textInput";
import { AppDialog } from "../../lib/components/dialog/dialogBox";
import AppSwitch from "../../lib/components/switch/appSwitch";
import LabelComponent from "../../lib/components/static/LabelComponent";

const AddVehicleTypeForm = (props) => {
  const [formvalues, setFormvalues] = useState({});

  const onSubmit = (values, f) => {
    f.resetForm();
    props.onConfirm(values, props.action);
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Code is Required"),
    isActive: Yup.string().required("Active flag is Required"),
    refVehicleTypeLocales: Yup.object({
      description: Yup.string().required("Description is Required"),
      name: Yup.string().required("Name is Required"),
    }),
  });
  useEffect(() => {
    console.log("On load");
    setFormvalues(props.createEditFormData);
  });

  const handleConfirm = (fmk) => {
    fmk.submitForm();
  };

  const handleClose = (fmk) => {
    fmk.resetForm();
    props.onClose();
  };

  const isAdd = props.action;

  return (
    <Formik
      initialValues={formvalues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <>
            <AppDialog
              title="Create/Edit Vehicle Type"
              confirmTxt="Submit"
              onClose={() => {
                handleClose(formik);
              }}
              isopen={props.isopen}
              isConfirm={true}
              onConfirm={() => {
                handleConfirm(formik);
              }}
            >
              <Form autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {isAdd === "ADD" ? (
                      <TextInput
                        label="Code"
                        name={"code"}
                        id={"code"}
                        helperText="Please Enter Code"
                      />
                    ) : (
                      <LabelComponent label="Code" values={props.code} />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      label="Name"
                      name={"refVehicleTypeLocales.name"}
                      id={"name"}
                      helperText="Please Enter Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      label="Description"
                      name={"refVehicleTypeLocales.description"}
                      id={"description"}
                      helperText="Please Enter Description"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AppSwitch
                      onText="Yes"
                      offText="No"
                      name={"isActive"}
                      label="Active"
                    />
                  </Grid>
                </Grid>
              </Form>
            </AppDialog>
          </>
        );
      }}
    </Formik>
  );
};
export default React.memo(AddVehicleTypeForm);
