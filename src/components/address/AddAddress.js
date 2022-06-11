import React, { Fragment, useEffect, useState } from "react";
import AddressService from "./AddressService";
import { Typography } from "@material-ui/core";
import { getHttp } from "../../lib/common/HttpService";
import AddressCard from "./AddressCard";
import { Formik, Form } from "formik";
import AddAddressCard from "./AddAddressCard";
import "../../assets/styles.css";
import { Grid } from "@material-ui/core/";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import ErrorToast from "../../lib/components/toast/ErrorToast";

let remoteBaseUrl = "/ptms/app/api/secure/address/search";

let addressForm = {
  searchField: "",
};

function AddAddress() {

  const [addressData, setAddressData] = useState([]);
  const [pstate, setPstate] = useState(0);
  const [formvalues, setFormvalues] = useState(addressForm);
  const [searchData, setSearchData] = useState("");
  const [render, setRender] = useState(0);
  const [newAdd, setNewAdd] = useState(false);
  const [editAdd, setEditAdd] = useState(false);
  const [showToaster, setShowToaster] = useState('NOTOASTER');
  let fmk;

  useEffect(() => {
    setAddressData([]);
    const loadAddress = async () => {
      AddressService.fetchAddress()
        .then((response) => {
          console.log("response in ::", response);
          console.log("length", response.length);
          console.log("response.addressDtoList ::", response.addressDtoList);
          if (newAdd || editAdd) {
            let test = response.addressDtoList.reduce((prev, current) =>
              (prev.lastModifiedDate > current.lastModifiedDate) ? prev : current
            )
            let i = response.addressDtoList.findIndex((x) => (x.code === test.code));
            response.addressDtoList[i].selected = true;
          }
          console.log("response.addressDtoList ::", response.addressDtoList);
          setAddressData(response.addressDtoList);
          console.log("addressData", addressData);
        })
        .catch(() => {
          console.log("error");
        });
    };

    loadAddress();
  }, [render]);

  useEffect(() => {
    console.log("rendered");
  }, [searchData]);



  const onSubmit = (f) => {
    console.log("form", f);
    let finalURL = remoteBaseUrl + "?searchField=" + f.searchField;
    let obj = {
      url: finalURL,
    };
    getHttp(obj, true).then((response) => {
      console.log("search response ::", response);
      setSearchData(response);
      setAddressData(response);
      setPstate(pstate + 1);
    });
  };

  const refresh = () => {
    console.log("heloo add address")
    setRender(render + 1);
  }

  return (
    <Formik initialValues={formvalues} onSubmit={onSubmit}>
      {(formik) => {
        fmk = formik;
        return (
          <>
            <Form autoComplete="off">
              {/* <div className="row">
                  <div className="col-md">
                    <TextInput
                      label="search"
                      name={"searchField"}
                      id={"searchField"}
                      helperText=" "
                    />
                  </div>
                  <div className="col-md">
                    <AppButton
                      text={"Search"}
                      type={"submit"}
                      icon="search"
                    ></AppButton>
                  </div>
                </div> */}
              <Typography variant="subtitle1">SAVED ADDRESS</Typography>
              <br></br>
              <Grid container
                spacing={4}>
                <Grid
                  style={{ width: "182px" }}
                  item
                  xs={2}
                  container
                  spacing={0}
                >
                  <Fragment>
                    <AddAddressCard render={() => {
                      setNewAdd(true);
                      refresh();
                      setShowToaster('SUCCESS');
                    }} />
                  </Fragment>
                </Grid>
                {(addressData !== undefined) &&
                  addressData.map((address) => (
                    <Grid
                      item
                      xs={2}
                      key={addressData.indexOf(address)}
                      container
                      spacing={0}
                    >
                      <Grid
                        style={{ width: "182px" }}>
                        <AddressCard
                          address={address}
                          editFlag="true"
                          deleteFlag="true"
                          addressList={addressData}
                          render={() => {
                            setShowToaster('ERROR');
                            refresh();
                          }}
                          saved={(e) => {
                            //  this.forceUpdate();
                            // setShowPopup(NO_DIALOG);
                            //   props.saved('xyz')
                            console.log("rendered....");
                            setShowToaster('SUCCESS');
                            setNewAdd(false)
                            setEditAdd(true)
                            refresh();
                          }}
                          divider=""
                        />
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Form>
            {showToaster === 'SUCCESS' && <SuccessToast
              icon={<img src='./check-success-green.svg' height="32px" />}
              title={newAdd ? "Address added succesfully" : "Address updated succesfully"}
              message=""
              showToast={() => { setShowToaster('NOTOASTER') }}
              position="top-right"
            />}
            {showToaster === 'ERROR' &&
              <ErrorToast
                icon={<img src='./check-success-red.svg' height="32px" />}
                title="Address deleted succesfully"
                showToast={() => { setShowToaster('NOTOASTER') }}
                position="top-right"
              />}
          </>
        );
      }}
    </Formik>
  );
}

export default AddAddress;