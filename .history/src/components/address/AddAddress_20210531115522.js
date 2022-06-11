import React, { Fragment, useEffect, useState } from "react";

import AddressService from "./AddressService";
import { NO_DIALOG } from "../../lib/common/Constants";
import { Typography } from "@material-ui/core";
import { getHttp } from "../../lib/common/HttpService";
import AddressCard from "./AddressCard";
import { Formik, Form } from "formik";



import TextInput from "../../lib/components/txtinput/textInput";
import AppButton from "../../lib/components/buttons/appButton";
import AddAddressCard from "./AddAddressCard";
import "../../assets/styles.css";

import { Grid, Card, CardContent, CardHeader } from "@material-ui/core/";

let remoteBaseUrl = "/ptms/app/api/secure/address/search";



let addressForm = {
  searchField: "",
};

function AddAddress() {

  const [addressData, setAddressData] = useState([]);
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [pstate, setPstate] = useState(0);
  const [action, setAction] = useState(" ");
  const [remoteUrl, setRemoteURl] = useState(remoteBaseUrl);
  const [formData, setFormData] = useState("");
  const [formvalues, setFormvalues] = useState(addressForm);
  const [searchData, setSearchData] = useState("");
  const [data, setData] = useState("");
  const [render, setRender] = useState(0);
  let fmk;

  // useEffect(() => {
  //   const loadAddress = async () => {
  //     AddressService.fetchAddress()
  //       .then((response) => {
  //         console.log("response in ::", response);

  //         console.log("length", response.length);
  //         console.log("response.addressDtoList ::",response.addressDtoList);
  //         setAddressData(response.addressDtoList);
  //         console.log("addressData", addressData);
  //       })
  //       .catch((error) => {
  //         console.log("error");
  //       });
  //   };

  //   loadAddress();
  // }, [data,render]);

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

  const refresh = (e) => {
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
                  style={{width:"182px"}}
                     item
                  xs={2}
                    // sm={6}
                    // md={4}
                    //key={addressData.indexOf(address)}
                    container
                    spacing={0}
                    //class="dotted"
                  >
                    <Fragment>
                      
                    <AddAddressCard render= {refresh}/>
                   
                    </Fragment>
                  </Grid>
                  {( addressData!== undefined ) &&
                    addressData.map((address, inx) => (
                      // <div className="col-md-4" key={inx}>

                      <Grid
                     
                        item
                        
                         xs={2}
                        // md={4}
                        key={addressData.indexOf(address)}
                        container
                        spacing={0}
                      >
                        <Grid 
                          style={{width:"182px"}}>
                        <AddressCard
                          address={address}
                          editFlag="true"
                          deleteFlag="true"
                          render={refresh}
                          saved={(e) => {
                            //  this.forceUpdate();
                            // setShowPopup(NO_DIALOG);
                            //   props.saved('xyz')
                            console.log("rendered....");
                            setData(e);
                          }}
                          divider=""
                          />
                          </Grid>
                      </Grid>
                    ))
                  }
                 
                  {/* <AddAddressCard /> */}
                </Grid>
              </Form>
            
          </>
        );
      }}
    </Formik>
  );
}

export default AddAddress;