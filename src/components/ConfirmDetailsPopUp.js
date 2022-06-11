import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import ApplnTxtInput from "../lib/components/txtinput/ApplnTxtInput";
import * as Yup from "yup";
import ConfirmUserDetailsService from "../service/ConfirmUserDetailsService";
import { Dialog, DialogActions, DialogContent, Divider, Grid } from "@material-ui/core";
import { default as MuiButton } from '@material-ui/core/Button';
import { createStyles, withStyles } from "@material-ui/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

const StyledBlueButton = withStyles(() =>
  createStyles({
    root: {
      float: "right",
      fontWeight: "lighter",
      width: '110px',
      height: '34px',
      fontSize: "14px",
      borderRadius: '3px',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
      color: '#FFFFFF',
      backgroundColor: '#1360D2',
    }
  })
)(MuiButton);

const DialogTitle = withStyles()((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other} style={{ backgroundColor: '#F9FBFF', color: '#163963', textAlign:'center' }}>
      <div style={{ display: 'inline-flex', paddingRight:'20px' }}>
        <img src="./dp_world_logo.svg" height="49px" />
        <hr style={{ backgroundColor: '#163963', width: '1px', height: '57px', marginLeft:'20px' }} />
      </div>
      <img src="./dubai_trade_logo.svg" height="49px" />
      <Divider style={{height:'2px'}}/>
    </MuiDialogTitle>
  );
});

const ConfirmDetailsPopUp = (props) => {
  const [formvalues, setFormvalues] = useState(null);
  const [key, setKey] = useState(false);

  const confirmDetailsForm = {
    mobileNumber: props.userDetails.mobileNumber,
    landLineNumber: props.userDetails.landLineNumber,
    email: props.userDetails.email,
    firstName: props.userDetails.firstName,
    lastName: props.userDetails.lastName,
  };

  const schema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email ")
      .required("Email is Required"),
    mobileNumber: Yup.string()
      .required("Mobile Number is Required")
      .matches(
        /^[0-9]\d{11,11}$/,
        "Format must be 971xxxxxxxxx"
      ),
    landLineNumber: Yup.string()
      .required("Phone Number is Required")
      .matches(
        /^[0-9]\d{10,10}$/,
        "Format must be 971xxxxxxxx"
      ),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required")
  });

  useEffect(() => {
    console.log(" IN popup");
    let obj = {};
    if (props.userDetails) {
      obj = {
        mobileNumber: props.userDetails.mobileNumber,
        landLineNumber: props.userDetails.landLineNumber,
        email: props.userDetails.email,
        firstName: props.userDetails.firstName,
        lastName: props.userDetails.lastName,
      };
      setFormvalues(obj);
      setKey(!key);
      console.log(obj);
    }

    console.log("userDetails ....*****", props.userDetails);
  }, [props.userDetails]);

  return formvalues ? (
    <DataForm intialVals={formvalues} {...props} key={key} />
  ) : (
    <></>
  );

  function DataForm(props) {
    const methods = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: confirmDetailsForm,
    });

    const onSubmit = () => {
      // methods.trigger();
      console.log("inside close");

      if (methods.formState.isValid === true) {
        let values = methods.getValues();
        values.encryptedUsername = props.userDetails.encryptedUsername;
        values.activeCompanyCode = props.userDetails.activeCompanyCode;

        ConfirmUserDetailsService.saveFormData(values)
          .then((response) => {
            if (response.isAxiosError) throw new Error(response.status);
            else return response;
          })
          .then((response) => { })
          .catch((error) => {
            console.log("error", error);
          });

        props.onClose(methods.getValues());
      }
    };

    return (
      <FormProvider {...methods}>
        <form autoComplete="off">
          <Dialog open={props.isopen} PaperProps={{
            style: {
              background: '#F9FBFF 0% 0% no-repeat padding-box',
              boxShadow: '0px 3px 6px #00000029',
              borderRadius: '5px',
              minWidth: '550px',
              minHeight: '450px'
            }
          }}>
            <DialogTitle >
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p style={{ textAlign: 'left', marginBottom: 0 }}>Dear {props.userDetails.userName}</p>
                  <p style={{ textAlign: 'left', marginTop: 0 }}>Welcome to DT Trucking</p>
                  <p style={{ textAlign: 'left' }}>Kindly confirm your contact details to proceed with booking </p>
                </Grid>
                <Grid item xs={6}>
                  <ApplnTxtInput
                    label="First name"
                    name={"firstName"}
                    placeholder={""}
                    id={"firstName"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ApplnTxtInput
                    label="Last name"
                    name={"lastName"}
                    placeholder={""}
                    id={"lastName"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ApplnTxtInput
                    label="Email ID"
                    name={"email"}
                    placeholder={"e.g. xyz@example.com"}
                    id={"email"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ApplnTxtInput
                    name={"landLineNumber"}
                    id={"landLineNumber"}
                    label={"Phone Number"}
                    placeholder={"e.g. 971xxxxxxxx"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ApplnTxtInput
                    name={"mobileNumber"}
                    id={"mobileNumber"}
                    label={"Mobile Number"}
                    placeholder={"e.g. 971xxxxxxxxx"}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <StyledBlueButton
                type="submit"
                variant="contained"
                onClick={methods.handleSubmit(onSubmit)}
              >
                Submit
              </StyledBlueButton>
            </DialogActions>
          </Dialog>
        </form>
      </FormProvider>
    );
  }
};

export default React.memo(ConfirmDetailsPopUp);
