import React, { useEffect, useState } from "react";
import CustomizedDataTable from "../../lib/components/table/CustomizedDataTable";
import {
  COLUMN_TYPE_STRING,
  COLUMN_TYPE_NUMBER,
} from "../../lib/common/Constants";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import { Typography, Grid ,Link,InputLabel,IconButton, Icon, InputAdornment, OutlinedInput,makeStyles } from "@material-ui/core";
import { default as MuiButton } from "@material-ui/core/Button";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { FormProvider, useForm } from "react-hook-form";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import Button from "@material-ui/core/Button";
import * as EndpointContants from "../../utils/ptmsEndpoints";
import ApplnAutoCompleteAsync from "../../lib/components/autocomplete/ApplnAutoCompleteAsync";
import { getLoginUserType } from "../../lib/common/storeAccess";
import { Formik, Form } from "formik";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import AppAutoCompleteAsyc from "../../lib/components/autocomplete/appAutoCompleteAsyc";
import SearchInput from "../../lib/components/appComponent/SearchInput";
import BookingService from "../../service/BookingService";
import { useHistory } from "react-router-dom";


const actions = [{ item: 1, tip: "action", icon: "edit_headline" }];

const BookingCol = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "referenceNumber",
    id: 0,
    sort: true,
    sortActive: true,
  },
  {
    name: "Booked on",
    type: COLUMN_TYPE_STRING,
    key: "creationDate",
    id: 1,
    sort: true,
    sortActive: true,
  },
  {
    name: "Containers",
    type: COLUMN_TYPE_NUMBER,
    key: "noOfContainers",
    id: 2,
    sort: true,
    sortActive: true,
  },
  {
    name: "Trucks",
    type: COLUMN_TYPE_NUMBER,
    key: "noOfTrucks",
    id: 3,
    sort: true,
    sortActive: true,
  },
  {
    name: "Amount",
    type: COLUMN_TYPE_STRING,
    key: "transporterAmount",
    id: 5,
    sort: true,
    sortActive: true
  },
];

let remoterequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/bookingForTransporter";

const searchForm = {
  fromDate: "",
  toDate: "",
  consigneeName: "",
};

const StyledButton = withStyles((theme) =>
  createStyles({
    root: {
      width: "145px",
      height: "34px",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 1px 5px #00000029",
      border: "1px solid #0568AE",
      borderRadius: "8px",
      opacity: 1,
    },
  })
)(MuiButton);

let searchDetails = {
  toDate: "",
  fromDate: "",
  consigneeName: "",
};

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#BDBDBD",
      color: "#686868",
      borderRadius: '3px',
      boxShadow: '0px 0px 5px #00000029',
    },
    '&$focused $notchedOutline': {
      borderColor: "#BDBDBD",
      borderWidth: 1.5,
      boxShadow: '0px 0px 5px #00000029',
    },
    '&:hover $notchedOutline':{
      borderColor: "#BDBDBD !important",
      boxShadow: '0px 0px 5px #00000029',
    },
    "& .MuiInputBase-input": {
      fontFamily: 'Dubai Light',
      fontSize: '14px',
      fontWeight: 600,
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  },
  focused: {},
  notchedOutline: {},
}));

function TransporterStatus() {
  let userType = getLoginUserType();
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoterequestDetailsUrl
  );
  const [formvalues] = useState(searchForm);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [inputType, setInputType] = useState("");
  const [summaryCount, setSummaryCount] = useState(0);
  let history=useHistory();


  const consigneeKVmapping = { label: "label", value: "value" };
  const consigneeUrl = `${EndpointContants.fetchConsigneeDetails}`;
  const outlinedInputClasses = useOutlinedInputStyles();


  const methods = useForm({
    // resolver: yupResolver(validationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: searchDetails,
  });

  let fmk;

  const searchOptions = [
    {
      value: "BOOKING",
      label: "By Booking Number",
    },
  ];



  const updateCount = (e) => {
    console.log("count in update count", e);
    setSummaryCount(e.summaryCount);
  };

  const onSearch = (values) => {
    let finalURL =
      "/ptms/app/api/secure/requestDetails/bookingForTransporter?option=ALL&toDate=" +
      values.toDate +
      "&fromDate=" +
      values.fromDate +
      "&consigneeName=" +
      values.consigneeName;
    setRequestDetailsUrl(finalURL);
    setPstate(pstate + 1);
  };

  const RenderSmartSearch = () => {
    if (showSmartSearch) {
      return (
        <Formik initialValues={formvalues} enableReinitialize>
          {(formik) => {
            fmk = formik;
            return (
              <>
                <Form autoComplete="off">
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={2}>
                      <AppDatePicker
                        name={"fromDate"}
                        id={"fromDate"}
                        label={"From Date"}
                        iconColor="#0568AE"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <AppDatePicker
                        name={"toDate"}
                        id={"toDate"}
                        label={"To Date"}
                        iconColor="#0568AE"
                      />
                    </Grid>

                    {userType === "CLEARING_AGENT" && (
                      <Grid item xs={3}>
                        <AppAutoCompleteAsyc
                          name={"consigneeName"}
                          label="Consignee Name"
                          style={{ marginTop: "2px" }}
                          kvMapping={consigneeKVmapping}
                          remoteUrl={consigneeUrl}
                          onSelect={() => { }}
                        />
                      </Grid>
                    )}

                    <Grid item xs={3}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => onSearch(formik.values)}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </>
            );
          }}
        </Formik>
      );
    } else {
      return <></>;
    }
  };

  const handleSearchClick = async (e, value, type) => {
    console.log("value after search click ::", value);
    console.log("type ::", e);
    let finalURL = "";
  
      finalURL =
        "/ptms/app/api/secure/requestDetails/bookingForTransporter?bookingNumber=" +
        value;
      console.log("url", finalURL);
      setRequestDetailsUrl(finalURL);
      setPstate(pstate + 1);
   
  };

  return (
    <>
      <div className="row" style={{ marginBottom: "0px" }}>
        <div className="col-md-12">
        <Grid container alignItems="flex-end">
        <Grid item xs={10} sm={8}>
          <OutlinedInput
            style={{ width: '1000px', height: '46px' }}
            placeholder="Search with Booking Number"
            classes={outlinedInputClasses}
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            color="secondary"
           
           
            startAdornment= {
              <InputAdornment position="start">
                <IconButton onClick={handleSearchClick}>
                  <Icon >search</Icon>
                </IconButton>
              </InputAdornment>
            }
            endAdornment= {
              <InputAdornment >
                <IconButton onClick={()=>{
                  setSearchValue("");
                  setRequestDetailsUrl("/ptms/app/api/secure/requestDetails/fetchDocumentCount");
                  setPstate(pstate + 1);}}>
                <Icon >clear</Icon>
                </IconButton>
              </InputAdornment>
                }
              
          />
        </Grid>
        </Grid>
        </div>
      </div>
      <Grid container>
          <Grid item>
          <Link href="#" onClick={()=>{history.push("/transporterDashboard")}}>
     <span style={{ fontSize: "22px",color:'#0E1B3D' ,fontFamily:'Dubai Medium' }}>
                    Home
                      </span>
      </Link> 

          </Grid>
          <Grid item>
          <span style={{ fontSize: "22px",color:'#5E5E5E',fontFamily:'Dubai Medium' }}>
                  /Status
                      </span>
            </Grid>
            </Grid>
      <br></br>
      <InputLabel style={{ fontSize: "18px",color:'#0E1B3D',fontFamily:'Dubai Medium'  }}> *Please click on the booking number to view list of containers details
  </InputLabel>

  <br></br>

  <InputLabel style={{ fontSize: "18px",color:'#0E1B3D',fontFamily:'Dubai Medium' }}> Displaying {summaryCount} bookings  </InputLabel> 

      <RenderSmartSearch />

      <CustomizedDataTable
        refresh={pstate}
        tableKeys={BookingCol}
        remote={true}
        remoteUrl={requestDetailsUrl}
        dataRootKey={"elements"}
        actions={actions}
        screen={"Transporter"}
        countData={(e) => updateCount(e)}
        handleClick={(row, index, action, element) => {
          BookingService.fetchPaymentSummary(
            row.referenceNumber
          ).then((response) => {
            history.push('./transporterStatusDetails', { statusData: row, paymentSummary: response});
          });

        }}
        />
    </>
  );
}

export default TransporterStatus;
