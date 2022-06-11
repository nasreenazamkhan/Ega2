import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import ApplnTxtInput from "../lib/components/txtinput/ApplnTxtInput";
import * as Yup from "yup";

import { AppDialog } from "../lib/components/dialog/dialogBox";
import { useHistory } from "react-router-dom";

import ConfirmUserDetailsService from "../service/ConfirmUserDetailsService";

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
    mobileNumber:Yup.string()
    .required("Mobile Number is Required")
    .matches(
      /^[0-9]\d{11,11}$/,
      "Format must be 971xxxxxxxxx"
    ),
    landLineNumber:Yup.string()
    .required("Landline Number is Required")
    .matches(
      /^[0-9]\d{10,10}$/,
      "Format must be 971xxxxxxxx"
    ),
    firstName:Yup.string().required("First name is required"),
    lastName:Yup.string().required("Last name is required")
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

    console.log("userDetails ....*****",props.userDetails);
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

    const handleClose = () => {
      methods.trigger();
      console.log("inside close");
     
    if( methods.formState.isValid === true)  
       {
        let values = methods.getValues();
        values.encryptedUsername = props.userDetails.encryptedUsername;
        values.activeCompanyCode = props.userDetails.activeCompanyCode;

        ConfirmUserDetailsService.saveFormData(values)
          .then((response) => {
            if (response.isAxiosError) throw new Error(response.status);
            else return response;
          })
          .then((response) => {})
          .catch((error) => {
            console.log("error", error);
          });

        props.onClose(methods.getValues());
      }
    };

    return (
      <>
        <AppDialog
          title="Confirm Details"
          closeTxt="Confirm"
          isopen={props.isopen}
          onClose={handleClose}
        >
          <FormProvider {...methods}>
            {
              <form autoComplete="off">
                <p> Dear {props.userDetails.userName}</p>
                <p>Welcome to DT Trucking</p>
                <p>
                  Kindly confirm your contact details to proceed with booking
                </p>

                <div className="row">
                  <div className="col-md">
                    <ApplnTxtInput
                      label="First name"
                      name={"firstName"}
                      id={"firstName"}
                    />
                  </div>

                  <div className="col-md">
                    <ApplnTxtInput
                      label="Last name"
                      name={"lastName"}
                      id={"lastName"}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md">
                    <ApplnTxtInput
                      label="Email"
                      name={"email"}
                      id={"email"}
                      fieldIcon="email"
                    />
                  </div>

                  <div className="col-md">
                    <ApplnTxtInput
                      name={"mobileNumber"}
                      id={"mobileNumber"}
                      label={"Mobile Number"}
                      helperText={"'e.g. 971xxxxxxxxx'"}
                      fieldIcon="phone"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md">
                    <ApplnTxtInput
                      name={"landLineNumber"}
                      id={"landLineNumber"}
                      label={"Land Line Number"}
                      helperText={"'e.g. 971xxxxxxxx'"}
                      fieldIcon="phone"
                    />
                  </div>
                </div>
              </form>
            }
          </FormProvider>
        </AppDialog>
      </>
    );
  }
};

export default React.memo(ConfirmDetailsPopUp);
