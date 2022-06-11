import React, { useState } from "react";
import { Formik, Form } from "formik";
import TextInput from "../../lib/components/txtinput/textInput";
import DataTable from "../../lib/components/table/DataTable";
import { COLUMN_TYPE_STRING } from "../../lib/common/Constants";
import AppButton from "../../lib/components/buttons/appButton";
import FormContainer from "../../lib/components/formContainer/formContainer";
import AddVehicleTypeForm from "./AddVehicleTypeForm";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { postHttp } from "../../lib/common/HttpService";
import * as endpointContants from "../../utils/ptmsEndpoints";

let createEditFormData = {
  code: "",
  isActive: true,
  refVehicleTypeLocales: {
    description: "",
    name: "",
  },
};

let action;

function ManageVehicleTypes() {
  let remoteBaseUrl = "/ptms/app/api/secure/vehicleType/search";

  let fmk;

  let vehForm = {
    code: "",
    name: "",
    createdDate: "",
  };

  const tableAction = [{ item: 2, tip: "edit", icon: "edit_headline" }];

  const vehiclesKey = [
    {
      name: "Code",
      type: COLUMN_TYPE_STRING,
      key: "code",
      id: 1,
      sort: true,
      sortActive: true,
    },
    {
      name: "Name",
      type: COLUMN_TYPE_STRING,
      key: "refVehicleTypeLocales.name",
      id: 2,
      sort: true,
      sortActive: true,
    },
    {
      name: "Description",
      type: COLUMN_TYPE_STRING,
      key: "refVehicleTypeLocales.description",
      id: 3,
    },
    {
      name: "Created Date",
      type: COLUMN_TYPE_STRING,
      key: "creationDate",
      id: 4,
      sort: true,
      sortActive: true,
    },
    { name: "Active", type: COLUMN_TYPE_STRING, key: "isActive", id: 5 },
  ];

  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [pstate, setPstate] = useState(0);
  const [remoteUrl, setRemoteURl] = useState(remoteBaseUrl);
  const [formvalues, setFormvalues] = useState(vehForm);
  const [action, setAction] = useState("ADD");

  return (
    <Formik initialValues={formvalues}>
      {(formik) => {
        fmk = formik;
        return (
          <FormContainer title="Manage Vehicle Types">
            <Form autoComplete="off">
              <div className="row">
                <div className="col-md">
                  <TextInput
                    label="Code"
                    name={"code"}
                    id={"code"}
                    helperText="Search by code"
                  />
                </div>
                <div className="col-md">
                  <TextInput
                    label="Name"
                    name={"name"}
                    id={"name"}
                    helperText="Search by name"
                  />
                </div>
                <div className="col-md">
                  <AppDatePicker
                    name={"createdDate"}
                    id={"createdDate"}
                    label={"Creation Date"}
                  />
                </div>
              </div>
              <div className="row button-holder">
                <div className="col">
                  <AppButton
                    text={"Reset"}
                    type={"button"}
                    icon="refresh"
                    handleClick={() => {
                      fmk.resetForm();
                      setPstate(pstate + 1);
                      let finalURL = remoteBaseUrl;
                      setRemoteURl(finalURL);
                    }}
                  ></AppButton>

                  <AppButton
                    text={"Create"}
                    type={"button"}
                    icon="add"
                    handleClick={() => {
                      let formData = {
                        code: "",
                        isActive: false,
                        refVehicleTypeLocales: {
                          description: "",
                          name: "",
                        },
                      };
                      setAction("ADD");
                      createEditFormData = formData;
                      setShowPopup(OTHER_POPUP);
                    }}
                  ></AppButton>
                  <AppButton
                    text={"Search"}
                    type={"button"}
                    icon="search"
                    handleClick={() => {
                      setPstate(pstate + 1);
                      let finalURL =
                        remoteBaseUrl +
                        "?code=" +
                        formik.values.code +
                        "&name=" +
                        formik.values.name +
                        "&createdDate=" +
                        formik.values.createdDate;
                      setRemoteURl(finalURL);
                    }}
                  ></AppButton>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <DataTable
                    refresh={pstate}
                    tableKeys={vehiclesKey}
                    remote={true}
                    remoteUrl={remoteUrl}
                    dataRootKey={"elements"}
                    actions={tableAction}
                    handleClick={(row, index, action, element) => {
                      console.log(row);
                      console.log(index);
                      console.log(action);
                      console.log(element);
                      createEditFormData = row;
                      createEditFormData.isActive =
                        createEditFormData.isActive === "YES" ? true : false;
                      setAction("EDIT");
                      setShowPopup(OTHER_POPUP);
                    }}
                  />
                </div>
              </div>

              <AddVehicleTypeForm
                isopen={showPopup === OTHER_POPUP}
                action={action}
                createEditFormData={createEditFormData}
                onClose={(e) => {
                  setShowPopup(NO_DIALOG);
                }}
                onConfirm={(formVal, action) => {
                  //setShowPopup(NO_DIALOG);
                  //console.log(formVal);
                  //saveForm(formVal);
                  console.log("active flag", formVal.isActive);
                  setShowPopup(NO_DIALOG);
                  let remoteUrl;
                  if (action === "ADD")
                    remoteUrl = endpointContants.createVehicleTypes;
                  // if (action === "EDIT")
                  //   remoteUrl = endpointContants.updateVehcileTypes;
                  let obj = {
                    url: remoteUrl,
                    body: formVal,
                  };
                  postHttp(obj, true)
                    .then((response) => {
                      setPstate(pstate + 1);
                    })
                    .catch((error) => {
                      const errMsg = error.message;
                      console.log(errMsg);
                      //dispatch(fetchUserFailure(errMsg));
                    });
                }}
              />
            </Form>
          </FormContainer>
        );
      }}
    </Formik>
  );
}

export default ManageVehicleTypes;
