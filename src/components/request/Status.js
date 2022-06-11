import React, { useEffect, useState } from "react";
import CustomizedDataTable from "../../lib/components/table/CustomizedDataTable";
import {
  COLUMN_TYPE_STRING,
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_BOOLEAN
} from "../../lib/common/Constants";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import { Typography, Grid, OutlinedInput, makeStyles, InputAdornment, IconButton, Link } from "@material-ui/core";
import { default as MuiButton } from "@material-ui/core/Button";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as EndpointContants from "../../utils/ptmsEndpoints";
import { getLoginUserType } from "../../lib/common/storeAccess";
import { Formik, Form } from "formik";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import AppAutoCompleteAsyc from "../../lib/components/autocomplete/appAutoCompleteAsyc";
import BookingService from "../../service/BookingService";
import { useHistory } from "react-router-dom";
import { Cancel, Clear } from "@material-ui/icons";

import { useLocation } from "react-router-dom";


const actions = [{ item: 1, tip: "action", icon: "edit_headline" }];

const BookingCol = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "bookingNumber",
    id: 0,
    sort: true,
    sortActive: true,
  },
  {
    name: "Booked on",
    type: COLUMN_TYPE_STRING,
    key: "bookedOn",
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
    name: "Status",
    type: COLUMN_TYPE_STRING,
    key: "statusCode",
    id: 4
  },
  {
    name: "Amount",
    type: COLUMN_TYPE_STRING,
    key: "totalAmount",
    id: 5,
    sort: true,
    sortActive: true
  },
  {
    name: "Receipt",
    type: COLUMN_TYPE_BOOLEAN,
    key: "receipt",
    id: 6,
    sort: true,
    sortActive: false
  },
];

const BookingColVerPod = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "bookingNumber",
    id: 0,
    sort: true,
    sortActive: true,
  },
  {
    name: "Booked on",
    type: COLUMN_TYPE_STRING,
    key: "bookedOn",
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
    name: "Status",
    type: COLUMN_TYPE_STRING,
    key: "statusCode",
    id: 4
  },
  {
    name: "Amount",
    type: COLUMN_TYPE_STRING,
    key: "totalAmount",
    id: 5,
    sort: true,
    sortActive: true
  },
  {
    name: "Verify POD by",
    type: COLUMN_TYPE_STRING,
    key: "verifyPodBy",
    id: 6,
    sort: true,
    sortActive: true
  },
];

const BookingColManInv = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "bookingNumber",
    id: 0,
    sort: true,
    sortActive: true,
  },
  {
    name: "Booked on",
    type: COLUMN_TYPE_STRING,
    key: "bookedOn",
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
  { name: "Status", type: COLUMN_TYPE_STRING, key: "statusCode", id: 4 },
  { name: "Paid Amount", type: COLUMN_TYPE_STRING, key: "amountPaid", id: 5, sort: true, sortActive: true },
  { name: "Unpaid Amount", type: COLUMN_TYPE_STRING, key: "unpaidAmount", id: 6, sort: true, sortActive: true },
];

const searchForm = {
  fromDate: "",
  toDate: "",
  consigneeName: "",
};

const StyledButton = withStyles(() =>
  createStyles({
    root: {
      width: "145px",
      height: "34px",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 1px 5px #00000029",
      border: "1px solid #0E1B3D",
      borderRadius: "3px",
      opacity: 1,
    },
  })
)(MuiButton);

const SearchButton = withStyles(() =>
  createStyles({
    root: {
      width:'50px'
     
    },
  })
)(MuiButton);

const useOutlinedInputStyles = makeStyles(() => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#BDBDBD",
      color: "#686868",
      borderRadius: '3px',
      boxShadow: '0px 0px 5px #00000029',
    },
    "& .MuiInputBase-input": {
      fontFamily: 'Dubai Light',
      fontSize: '14px',
      fontWeight: 600,
      borderColor: "#BDBDBD",
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: '10px',
      paddingRight: '10px',
      borderColor: "#BDBDBD",
    },
    '&$focused $notchedOutline': {
      borderColor: "#BDBDBD",
      borderWidth: 1.5,
      boxShadow: '0px 0px 5px #00000029',
    },
    '&:hover $notchedOutline': {
      borderColor: "#BDBDBD !important",
      boxShadow: '0px 0px 5px #00000029',
    },
  },
  focused: {},
  notchedOutline: {},
}));

let searchDetails = {
  toDate: "",
  fromDate: "",
  consigneeName: "",
};

function Status() {

  const outlinedInputClasses = useOutlinedInputStyles();
  let userType = getLoginUserType();
  const [tabLabels, setTabLabels] = useState([
    "ALL",
    "VERIFY POD",
    "MISCELLANEOUS INVOICES",
  ]);
  const [pstate, setPstate] = useState(0);
  const location = useLocation();


  let remoterequestDetailsUrl = "/ptms/app/api/secure/requestDetails/search?option=ALL";


  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoterequestDetailsUrl
  );
  const [formvalues] = useState(searchForm);
  const [tabSelected, setTabSelected] = useState("ALL");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [inputType, setInputType] = useState("");
  const [bookingCol, setBookingCol] = useState(BookingCol);
  const consigneeKVmapping = { label: "label", value: "value" };
  const consigneeUrl = `${EndpointContants.fetchConsigneeDetails}`;
  const [showRecords, setShowRecords] = useState("NO_RECORDS");

  const [countData, setCountData] = useState({
    allCount: 0,
    podCount: 0,
    invoiceCount: 0
  });

  let history = useHistory();
  let fmk;
  useEffect(() => { }, [tabLabels]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    var bookingNumber = query.get('bookingNumber');
    var payment = query.get('payment');
    var success = query.get('success');
    var referenceNumber = query.get('referenceNumber');
    console.log("in test")
    if (payment) {
      var requestData;
      BookingService.fetchRequestDetails(
        bookingNumber
      ).then((response) => {
        console.log(response);
        requestData = response.elements[0];
        // BookingService.fetchPaymentSummary(
        //   bookingNumber
        // ).then((response) => {
          history.push("/importerPayment", {
            statusData: requestData, payment: payment, success: success,bookingNumber:bookingNumber,
            referenceNumber: referenceNumber, showRecords: "PAYMENT_RESPONSE", url: requestDetailsUrl, statusSelectedTab: "MISCELLANEOUS INVOICES"
          })
        // })
      })
    }
    else {
      setShowRecords("ALL_RECORDS");
    }
  }, [])

  const updateCount = (e) => {
    if (tabSelected == "ALL") {
      setCountData((prev) => ({
        ...prev,
        podCount: e.podCount,
        allCount: e.allCount,
        invoiceCount: e.invoiceCount
      }))
      setTabLabels([
        `ALL (${e.allCount} Bookings)`,
        `VERIFY POD (${countData?.podCount !== 0 ? countData?.podCount : e.podCount} Bookings)`,
        `MISCELLANEOUS INVOICES (${countData?.invoiceCount !== 0 ? countData?.invoiceCount : e.invoiceCount} Bookings)`
      ]);
    }
    if (tabSelected == "VERIFY POD") {
      setCountData((prev) => ({
        ...prev,
        podCount: e.podCount
      }))
      setTabLabels([
        `ALL (${countData.allCount} Bookings)`,
        `VERIFY POD (${e.podCount} Bookings)`,
        `MISCELLANEOUS INVOICES (${countData.invoiceCount} Bookings)`
      ]);
    }
    if (tabSelected === "MISCELLANEOUS INVOICES") {
      setCountData((prev) => ({
        ...prev,
        invoiceCount: e.invoiceCount
      }))
      setTabLabels([
        `ALL (${countData.allCount} Bookings)`,
        `VERIFY POD (${countData.podCount} Bookings)`,
        `MISCELLANEOUS INVOICES (${e.invoiceCount} Bookings)`
      ]);
    }
  };

  const onSearch = (values) => {
    if (tabSelected === "ALL") {
      let finalURL =
        "/ptms/app/api/secure/requestDetails/search?option=" +
        tabSelected +
        "&toDate=" +
        values.toDate +
        "&fromDate=" +
        values.fromDate +
        "&consigneeName=" +
        values.consigneeName;
      setRequestDetailsUrl(finalURL);
      setPstate(pstate + 1);
    }
    if (tabSelected === "VERIFY POD") {
      let finalURL =
        "/ptms/app/api/secure/requestDetails/search?option=" +
        tabSelected +
        "&toDate=" +
        values.toDate +
        "&fromDate=" +
        values.fromDate +
        "&consigneeName=" +
        values.consigneeName +
        "&statusCode=PODUPL";
      setRequestDetailsUrl(finalURL);
      setPstate(pstate + 1);
    }
    if (tabSelected === "MISCELLANEOUS INVOICES") {
      let finalURL =
        "/ptms/app/api/secure/requestDetails/search?option=" +
        tabSelected +
        "&toDate=" +
        values.toDate +
        "&fromDate=" +
        values.fromDate +
        "&consigneeName=" +
        values.consigneeName +
        "&statusCode=INVAPPR";
      setRequestDetailsUrl(finalURL);
      setPstate(pstate + 1);
    }
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
                    <Grid xs={12}>
                      <Typography style={{ fontSize: '16px', fontWeight: 600, paddingLeft: '5px' }}>Booked On Date Range :</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <AppDatePicker
                        name={"fromDate"}
                        id={"fromDate"}
                        placeholder={"From Date"}
                        iconColor="#0568AE"
                        width={"170px"}
                        height={"36px"}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <AppDatePicker
                        name={"toDate"}
                        id={"toDate"}
                        placeholder={"To Date"}
                        iconColor="#0568AE"
                        width={"170px"}
                        height={"36px"}
                      />
                    </Grid>

                    {userType === "CLEARING_AGENT" && (
                      <Grid item xs={3}>
                        <AppAutoCompleteAsyc
                          name={"consigneeName"}
                          placeholder="Consignee Name"
                          defaultValue={fmk.values.consigneeName}
                          height={"36px"}
                          kvMapping={consigneeKVmapping}
                          remoteUrl={consigneeUrl}
                          onSelect={(name, value, label) =>{
                            fmk.values.consigneeName = {label: label, value:value};
                           }}
                        />
                      </Grid>
                    )}

                    <Grid item xs={4}>
                      <SearchButton
                        onClick={() => onSearch(fmk.values)}
                      >
                        Search
                      </SearchButton>
                    </Grid>
                    <Grid item xs={1}>
                      <Link
                      style={{ color: "#1360D2", textDecoration: "underline", fontSize: "16px", fontFamily: "Dubai Light", fontWeight: 600 }}
                      onClick={() => {
                        fmk.fromDate = "";
                        fmk.toDate = "";
                        fmk.consigneeName = {label:'', value:''}
                        let finalURL =
                          "/ptms/app/api/secure/requestDetails/search?option=" +
                          tabSelected ;
                        setRequestDetailsUrl(finalURL);
                        setPstate(pstate + 1);
                      }}
                      >
                        Clear All
                      </Link>
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

  const handleSearchClick = async () => {
    let finalURL = "";
    if (tabSelected === "ALL") {
      finalURL =
        "/ptms/app/api/secure/requestDetails/search?option=" +
        tabSelected +
        "&bookingNumber=" +
        searchValue;
    }
    if (tabSelected === "VERIFY POD") {
      finalURL =
        "/ptms/app/api/secure/requestDetails/search?option=" +
        tabSelected +
        "&bookingNumber=" +
        searchValue +
        "&statusCode=PODUPL";
    }
    if (tabSelected === "MISCELLANEOUS INVOICES") {
      finalURL =
        "/ptms/app/api/secure/requestDetails/search?option=" +
        tabSelected +
        "&bookingNumber=" +
        searchValue +
        "&statusCode=INVAPPR";
    }
    console.log("url", finalURL);
    setRequestDetailsUrl(finalURL);
    setPstate(pstate + 1);
  };

  return (
    <>
      <div className="row" style={{ marginBottom: "0px", marginTop: '12px' }}>
        <div className="col-md-12">
          <Grid container alignItems="flex-end">
            <Grid item xs={10}>
              <OutlinedInput
                type="text"
                style={{ width: '1000px', height: '46px' }}
                classes={outlinedInputClasses}
                placeholder="Search with booking number. E.g 123456789, 12456389"
                size="small"
                value={searchValue}
                variant="outlined"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position='start'>
                    <IconButton onClick={handleSearchClick}>
                      <img src="./search.svg" height="20px" />
                    </IconButton>
                  </InputAdornment>
                }
                endAdornment= { searchValue && (
                  <IconButton
                    onClick={() => {
                      setSearchValue("");
                      setRequestDetailsUrl(remoterequestDetailsUrl);
                      setPstate(pstate+1)
                    }}
                  ><Clear style={{fill:'#0E1B3D', fontSize:'20px'}}/>
                  </IconButton>)
                }
              />
            </Grid>
            <Grid item xs={2}>
              <StyledButton
                onClick={() => {
                  setShowSmartSearch(!showSmartSearch);
                }}
              >
                <img src="./add_filters.svg" />
                <Typography
                  style={{
                    color: "#0E1B3D",
                    fontSize: "16px",
                    fontFamily: "Dubai Regular",
                    fontWeight: 600,
                    paddingLeft: '5px'
                  }}
                >
                  {" "}
                  Add Filters
                </Typography>
              </StyledButton>
            </Grid>
          </Grid>
        </div>
      </div>
      <Typography variant="h1" style={{ textAlign: "left" }}>
        Status
      </Typography>
      <br></br>
      <RenderSmartSearch />
      <CustomTabs
        labelList={tabLabels}
        onSelected={(e) => {
          console.log("selected", e);
          if (e === 0) {
            setTabSelected("ALL");
            let url = "/ptms/app/api/secure/requestDetails/search?option=ALL";
            setRequestDetailsUrl(url);
            setSelectedRows([]);
            setBookingCol(BookingCol);
            setPstate(pstate + 1);
          }
          if (e === 1) {
            setTabSelected("VERIFY POD");
            let url =
              "/ptms/app/api/secure/requestDetails/search?option=VERIFY POD" +
              "&statusCode=PODUPL";
            setBookingCol(BookingColVerPod);
            setRequestDetailsUrl(url);
            setSelectedRows([]);
            setPstate(pstate + 1);
          }
          if (e === 2) {
            setTabSelected("MISCELLANEOUS INVOICES");
            let url =
              "/ptms/app/api/secure/requestDetails/search?option=MISCELLANEOUS INVOICES" +
              "&statusCode=INVAPPR";
            setBookingCol(BookingColManInv);
            setRequestDetailsUrl(url);
            setSelectedRows([]);
            setPstate(pstate + 1);
          }
        }}
      ></CustomTabs>

      {showRecords === 'ALL_RECORDS' && <CustomizedDataTable
        refresh={pstate}
        tableKeys={bookingCol}
        remote={true}
        remoteUrl={requestDetailsUrl}
        dataRootKey={"elements"}
        actions={actions}
        countData={(e) => updateCount(e)}
        handleClick={(row) => {
          // BookingService.fetchPaymentSummary(
          //   row.bookingNumber
          // ).then((response) => {
            // console.log("response in payment summary ::", response);
            if (!["SUCC", "PPAY", "FPAY"].includes(row.statusCode))
              history.push('./importerPayment', { statusData: row, url: requestDetailsUrl, statusSelectedTab: tabSelected });
            else
              history.push('./paymentSummary', { statusData: row, url: requestDetailsUrl });
          // });
        }}
        onFilterSelected={(e) => {
          console.log(
            remoterequestDetailsUrl +
            "?" +
            "status=" +
            e
          );
          let url = remoterequestDetailsUrl + "&" + "status=" + e;
          setRequestDetailsUrl(url);
          setPstate(pstate + 1);
          //setShowClearAll(true);
        }}
      />
      }
    </>
  );
}

export default Status;
