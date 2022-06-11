import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { Divider, Grid } from "@material-ui/core";
import ApplnTxtInput from "../../lib/components/txtinput/ApplnTxtInput";
import { AppDialog } from "../../lib/components/dialog/dialogBox";
import AppButton from "../../lib/components/buttons/appButton";
import ApplnSwitch from "../../lib/components/switch/ApplnSwitch";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";
import { postHttp, getHttp } from "../../lib/common/HttpService";
import * as endpointContants from "../../utils/ptmsEndpoints";
import MapComponent from "../googlemap/Map";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  
  confirmButton: {
    // background: "#C62926",
    // color: "#fff",
    // textTransform: "none",
    // float:"center"
    background: "transparent linear-gradient(180deg, #1E84EA 0%, #2673CE 67%, #364F91 100%) 0% 0% no-repeat padding-box;",
  },
}));

const ContactDetails = (props) => {
  console.log("Contact details::", props);
  const [formvalues, setFormvalues] = useState(null);
  const [key, setKey] = useState(false);

  const [pstate, setPstate] = useState(0);
  const [formData, setFormData] = useState("");
  const classes = useStyles();
 

  let contactDetails = {
    dropAddress: props.createEditFormData.dropAddress,
    consigneeContactName: props.createEditFormData.consigneeContactName,
    consigneeContactNumber: props.createEditFormData.consigneeContactNumber,
    consigneeContactEmail: props.createEditFormData.consigneeContactEmail,
    phoneNumber: props.createEditFormData.phoneNumber,
    addressLine1: props.createEditFormData.addressLine1
  };
  const onSubmit = (values, f) => {
    console.log(f);
    console.log(values);
    f.resetForm();
    props.onConfirm(values, props.action);
  };

  const validationSchema = Yup.object({
    consigneeContactName: Yup.string().required("Consignee Name is Required"),
    consigneeContactNumber: Yup.string()
    .required("Mobile Number is Required")
    .matches(/^[0-9]\d{11,11}$/, "Format must be 971xxxxxxxxx"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]\d{10,10}$/, "Format must be 971xxxxxxxx"),
    
   
  });

  useEffect(() => {
    console.log(" IN popup");
    let obj = {};
    if (props.createEditFormData) {
      obj = {
        dropAddress: props.createEditFormData.dropAddress,
        consigneeContactName: props.createEditFormData.consigneeContactName,
        consigneeContactNumber: props.createEditFormData.consigneeContactNumber,
        consigneeContactEmail: props.createEditFormData.consigneeContactEmail,
        phoneNumber: props.createEditFormData.phoneNumber,
        addressLine1: props.createEditFormData.addressLine1
      };
      setFormvalues(obj);
      setKey(!key);
      console.log(obj);
    }

    // console.log(props.createEditFormData);
  }, []);

  return formvalues ? (
    <DataForm intialVals={formvalues} {...props} key={key} />
  ) : (
    <></>
  );

  function DataForm(props) {
    console.log("props in dataForm:", props);
    const methods = useForm({
       resolver: yupResolver(validationSchema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: contactDetails,
    });

    const handleClose = () => {
      methods.trigger();
      console.log("inside close");
      props.onClose(methods.getValues());
    };

    const handleConfirm = (e, action) => {
      console.log("clicked");
      methods.trigger();
      if (methods.formState.isValid === true) {
        let values = methods.getValues();
        console.log("value ::", values);
        e.consigneeContactName = values.consigneeContactName;
        e.consigneeContactNumber = values.consigneeContactNumber;
        e.phoneNumber = values.phoneNumber;
        e.dropAddress = values.dropAddress;
        e.container_number = props.createEditFormData.container_number;
        e.dpwTransactionId = props.createEditFormData.dpwTransactionId;
        e.requestDetailsNumber = props.createEditFormData.requestDetailsNumber;
        e.addressLine1 = values.addressLine1;
        console.log("eeeeeeee", e);
        const remoteUrl = endpointContants.updateRequestContainerDetails;
          
        let obj = {
          url: remoteUrl,
          body: e,
        };
        postHttp(obj, true)
          .then((response) => {
            setPstate(pstate + 1);
          })
          .catch((error) => {
            // const errMsg = error.message;
            // dispatch(fetchUserFailure(errMsg));
          });

        props.onConfirm();
      }
    };

    return (
      <>
        <FormProvider {...methods}>
          {
            <form autoComplete="off">
              <div className="col-md">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h2>Contact Details</h2>
                  </Grid>
                  <Divider />
                  <Grid item xs={12}>
                    <ApplnTxtInput
                      label="Drop Address"
                      name={"dropAddress"}
                      id={"dropAddress"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ApplnTxtInput
                      label="Contact Person"
                      name={"consigneeContactName"}
                      id={"consigneeContactName"}
                      helperText="Please Enter Consignee Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ApplnTxtInput
                      label="Mobile Number"
                      name={"consigneeContactNumber"}
                      id={"consigneeContactNumber"}
                      helperText="Please Enter Consignee Number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ApplnTxtInput
                      label="Phone Number"
                      name={"phoneNumber"}
                      id={"phoneNumber"}
                      helperText="Please Enter Phone Number"
                     
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ApplnTxtInput
                      label="Address Line 1"
                      name={"addressLine1"}
                      id={"addressLine1"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <AppButton
                    text={"Confirm"}
                    type={"button"}
                    css={classes.confirmButton}
                   
                    backgroundColor="#C62926"
                    handleClick={handleConfirm}
                    ></AppButton>
                    </Grid>
                </Grid>
              </div>
            </form>
          }
        </FormProvider>
      </>
    );
  }
};

export default React.memo(ContactDetails);
