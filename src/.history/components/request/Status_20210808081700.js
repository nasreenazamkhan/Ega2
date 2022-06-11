import React, { useEffect, useState } from "react";
import CustomizedDataTable from "../../lib/components/table/CustomizedDataTable";
import {
  COLUMN_TYPE_STRING,
  COLUMN_TYPE_NUMBER,
} from "../../lib/common/Constants";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import { Typography, Grid } from "@material-ui/core";
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
  { name: "Amount", type: COLUMN_TYPE_STRING, key: "amountPaid", id: 5,sort:true,sortActive:true},
  { name: "Receipt", type: COLUMN_TYPE_STRING, key: "receipt", id: 6 ,sort:true,sortActive:true},
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
  { name: "Status", type: COLUMN_TYPE_STRING, key: "statusCode", id: 4 },
  { name: "Amount", type: COLUMN_TYPE_STRING, key: "amountPaid", id: 5,sort:true,sortActive:true},
  { name: "Verify POD by", type: COLUMN_TYPE_STRING, key: "verifyPodBy", id: 6 ,sort:true,sortActive:true},
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
  { name: "Paid Amount", type: COLUMN_TYPE_STRING, key: "amountPaid", id: 5,sort:true,sortActive:true},
  { name: "Unpaid Amount", type: COLUMN_TYPE_STRING, key: "unpaidAmount", id: 6 ,sort:true,sortActive:true},
];


let remoterequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/search";

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

function Status() {
  let userType = getLoginUserType();
  const [tabLabels, setTabLabels] = useState([
    "ALL",
    "VERIFY POD",
    "MISCELLANEOUS INVOICES",
  ]);
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoterequestDetailsUrl
  );
  const [formvalues] = useState(searchForm);
  const [tabSelected, setTabSelected] = useState("ALL");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [inputType, setInputType] = useState("");
  const [allCount, setAllCount] = useState();
  const [podCount, setPodCount] = useState();
  const [invoiceCount, setInvoiceCount] = useState();
  const [bookingCol,setBookingCol] = useState(BookingCol);
  const consigneeKVmapping = { label: "label", value: "value" };
  const consigneeUrl = `${EndpointContants.fetchConsigneeDetails}`;

  let history = useHistory();
  
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

  useEffect(() => {}, [tabLabels]);

  const updateCount = (e) => {
    var v_allCount = "";
    var v_podCount = "";
    var v_invoiceCount = "";
    if (e) {
      if (tabSelected === "ALL") {
        var v_allCount = "(" + e + " Bookings)";
        setAllCount(v_allCount);
      }
      if (tabSelected === "VERIFY POD") {
        var v_podCount = "(" + e + " Bookings)";
        setPodCount(v_podCount);
      }
      if (tabSelected === "MISCELLANEOUS INVOICES") {
        var v_invoiceCount = "(" + e + " Bookings)";
        setInvoiceCount(v_invoiceCount);
      }
    } else {
      if (tabSelected === "ALL") {
        var v_allCount = "(0 Bookings)";
        setAllCount(v_allCount);
      }
      if (tabSelected === "VERIFY POD") {
        var v_podCount = "(0 Bookings)";
        setPodCount(v_podCount);
      }
      if (tabSelected === "MISCELLANEOUS INVOICES") {
        var v_invoiceCount = "(0 Bookings)";
        setInvoiceCount(v_invoiceCount);
      }
    }

    setTabLabels([
      "ALL " + (allCount === undefined ? v_allCount : allCount),
      "VERIFY POD " + (podCount === undefined ? v_podCount : podCount),
      "MISCELLANEOUS INVOICES " +
        (invoiceCount === undefined ? v_invoiceCount : invoiceCount),
    ]);
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
                          onSelect={() => {}}
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
    let finalURL = "";
    if (e.serviceType === "BOOKING") {
      if (tabSelected === "ALL") {
        finalURL =
          "/ptms/app/api/secure/requestDetails/search?option=" +
          tabSelected +
          "&bookingNumber=" +
          value;
      }
      if (tabSelected === "VERIFY POD") {
        finalURL =
          "/ptms/app/api/secure/requestDetails/search?option=" +
          tabSelected +
          "&bookingNumber=" +
          value +
          "&statusCode=PODUPL";
      }
      if (tabSelected === "MANUAL INVOICES") {
        finalURL =
          "/ptms/app/api/secure/requestDetails/search?option=" +
          tabSelected +
          "&bookingNumber=" +
          value +
          "&statusCode=INVAPPR";
      }
      console.log("url", finalURL);
      setRequestDetailsUrl(finalURL);
      setPstate(pstate + 1);
    } else if (type === "DECLARATION") {
    } else if (type === "CONTAINER") {
      let finalURL =
        "/ptms/app/api/secure/requestDetails/search?option=" +
        tabSelected +
        "&containerNumber=" +
        value;
      console.log("url", finalURL);
      setRequestDetailsUrl(finalURL);
      setPstate(pstate + 1);
    }
  };

  return (
    <>
      <div className="row" style={{ marginBottom: "0px" }}>
        <div className="col-md-12">
          <Grid container md={12} alignItems="flex-end">
            <Grid item xs={10}>
              <SearchInput
                changeValue={(e) => setSearchValue(e)}
                changeType={(e) => setInputType(e)}
                searchClick={(e) =>
                  handleSearchClick(e, searchValue, inputType)
                }
                optionValues={searchOptions}
                defaultType="BOOKING"
              ></SearchInput>
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
                    font: "20px",
                    fontFamily: "Dubai Medium",
                    marginLeft: "5%",
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
            let url = "/ptms/app/api/secure/requestDetails/search";

            setRequestDetailsUrl(url);
            setTabSelected("ALL");
            setSelectedRows([]);
            setBookingCol(BookingCol);
            setPstate(pstate + 1);
          }
          if (e === 1) {
            setTabSelected("VERIFY POD");
            let url =
              "/ptms/app/api/secure/requestDetails/search?option=" +
              tabSelected +
              "&statusCode=PODUPL";
              setBookingCol(BookingColVerPod);
            setRequestDetailsUrl(url);

            setSelectedRows([]);
            setPstate(pstate + 1);
          }
          if (e === 2) {
            setTabSelected("MISCELLANEOUS INVOICES");
            let url =
              "/ptms/app/api/secure/requestDetails/search?option=" +
              tabSelected +
              "&statusCode=INVAPPR";
            setBookingCol(BookingColManInv);
            setRequestDetailsUrl(url);

            setSelectedRows([]);
            setPstate(pstate + 1);
          }
        }}
      ></CustomTabs>

      <CustomizedDataTable
        refresh={pstate}
        tableKeys={bookingCol}
        remote={true}
        remoteUrl={requestDetailsUrl}
        dataRootKey={"elements"}
        actions={actions}
        countData={(e) => updateCount(e)}
        handleClick={(row, index, action, element) => {
          BookingService.fetchPaymentSummary(
            row.bookingNumber
          ).then((response) => {
            console.log("response in payment summary ::", response);
            if(tabSelected==='MISCELLANEOUS INVOICES')
            history.push('./miscellaneousPayment',{statusData: row ,paymentSummary:response, url:requestDetailsUrl});
            else     
            history.push('./paymentSummary',{statusData: row ,paymentSummary:response, url:requestDetailsUrl});
          });
      
      
        }}
        onFilterSelected={(e) => {
          console.log(
            "/ptms/app/api/secure/requestDetails/search?option=" +
              tabSelected +
              "&" +
              "status=" +
              e
          );

          setRequestDetailsUrl(
            "/ptms/app/api/secure/requestDetails/search?option=" +
              tabSelected +
              "&" +
              "status=" +
              e
          );
          setPstate(pstate + 1);
          //setShowClearAll(true);
        }}
      />
    </>
  );
}

export default Status;
