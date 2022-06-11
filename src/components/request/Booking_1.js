import React, { useEffect, useState } from "react";
import CollapseDataTable from "../../lib/components/table/CollapseDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import Button from "@material-ui/core/Button";
import Toast from "../../lib/components/toast/ErrorToast";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import AppAutoCompleteAsyc from "../../lib/components/autocomplete/appAutoCompleteAsyc";
import * as EndpointContants from "../../utils/ptmsEndpoints";
import { Grid, Typography } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { getLoginUserType } from "../../lib/common/storeAccess";
import SearchInput from "../../lib/components/appComponent/SearchInput";
import { default as MuiButton } from '@material-ui/core/Button';
import { useLocation } from "react-router-dom";
import BookingService from "../../service/BookingService";
import InfoBox from './../../lib/components/infoBox/InfoBox';
import number from 'number-to-words';

const boeDetailsColImp = [
  {
    name: "Declaration Number",
    type: COLUMN_TYPE_STRING,
    key: "referenceNumber",
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
    name: "Delivery Order Validity",
    type: COLUMN_TYPE_STRING,
    key: "deliveryOrderValidity",
    id: 3,
    sort: true,
    sortActive: true,
  },
  
  {
    name: "Delivery Order Status", 
    type: COLUMN_TYPE_STRING, 
    key: "status", 
    id: 4, 
    sort: true,
    sortActive: true,
  }
];
const boeDetailsCol = [
  {
    name: "Declaration Number",
    type: COLUMN_TYPE_STRING,
    key: "referenceNumber",
    id: 1,
    sort: true,
    sortActive: true,
  },
  {
    name: "Consignee Details",
    type: COLUMN_TYPE_STRING,
    key: "consigneeDetails",
    id: 5,
    sort: true,
    sortActive: true,

  },
  {
    name: "Containers",
    type: COLUMN_TYPE_NUMBER,
    key: "noOfContainers",
    id: 2,
    sort: true,
    sortActive: true
  },
  {
    name: "Delivery Order Validity",
    type: COLUMN_TYPE_STRING,
    key: "deliveryOrderValidity",
    id: 3,
    sort: true,
    sortActive: true,

  },
  {
    name: "Delivery Order Status", type: COLUMN_TYPE_STRING, key: "status", id: 4,
    sort: true,
    sortActive: true,
  },
];

const containerDetailsCol = [
  { name: "Container Number", key: "containerNoForDisplay", id: 1 },
  { name: "Container Wt.", key: "containerWeight", id: 2 },
  { name: "Hold Authority", key: "holdAuthority", id: 3 },
  { name: "Pickup", key: "pickupLocation", id: 4 },
  { name: "Storage Paid Till", key: "storagePaidTill", id: 5 },
];
let remoteboeDetailsUrl = "/ptms/app/api/secure/boe/search?option=ALL";

const StyledButton = withStyles(() =>
  createStyles({
    root: {
      color: '#0568AE',
      border: "none",
      boxShadow: "none",
      float: "right"
    }
  })
)(MuiButton);

let statusArr=[];

function Booking() {
  const location = useLocation();
  let tabValue = "ALL";
  let isActiveValue = false;
  let isExpiredvalue = false;
  let fromDateValue = '';
  let toDateValue = '';

  if (location.state !== undefined) {
    const queryParams = new URLSearchParams(location.state.url.substr(location.state.url.indexOf('?')));
    tabValue = queryParams.get('option');
    isActiveValue = queryParams.get('status') === 'ACTIVE' ? true : false;
    isExpiredvalue = queryParams.get('status') === 'EXPIRED' ? true : false;
    if (queryParams.get('status') === 'ALL') {
      isActiveValue = true;
      isExpiredvalue = true;
    }
    fromDateValue = queryParams.get('fromDate');
    toDateValue = queryParams.get('toDate');
  }

  const searchForm = {
    fromDate: fromDateValue ? fromDateValue : '',
    toDate: toDateValue ? toDateValue : '',
    consigneeName: "",
  };

  let userType = getLoginUserType();
  const [pstate, setPstate] = useState(0);
  const [boeDetailsUrl, setBoeDetailsUrl] = useState(location?.state?.url ? location.state.url : remoteboeDetailsUrl);
  const [tabLabels, setTabLabels] = useState(["ALL", "TODAY"]);
  const [tabSelected, setTabSelected] = useState(tabValue);
  const [isActiveSelected, setIsActiveSelected] = useState(isActiveValue);
  const [isExpiredSelected, setIsExpiredSelected] = useState(isExpiredvalue);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allCount, setAllCount] = useState();
  const [todayCount, setTodayCount] = useState();
  const [expiredCount, setExpiredCount] = useState();
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [formvalues] = useState(searchForm);
  const [showClearAll, setShowClearAll] = useState(false);
  const [showToaster, setShowToaster] = useState(true);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [inputType, setInputType] = useState("");
  const [draftCount, setDraftCount] = useState(0);
  const consigneeKVmapping = { label: "label", value: "value" };
  const consigneeUrl = `${EndpointContants.fetchConsigneeDetails}`;

  const actions = [
    { item: 0, tip: "view", color: "#0568AE", icon: "add", icon1: "minimize" },
  ];
  let fmk;

  useEffect(() => {
    BookingService.fetchDraftCount().then((response) => {
      console.log(response)
      setDraftCount(response);
    })
      .catch(() => {
        console.log("error");
      });
  }, []);

  const SearchButton = withStyles(() =>
    createStyles({
      root: {
        border: "1px solid #CCCCCC",
        fontSize: "16px",
        fontFamily: 'Dubai Medium',
        color: '#848484'

      },
    })
  )(MuiButton);

  const searchOptions = [
    {
      value: "DECLARATION",
      label: "By Declaration Number",
    },
  ];

  let history = useHistory();

  const actionsOnDataSelect = (selectedData) => {
    if (tabSelected === "ALL") {
      setTabLabels([
        tabSelected + "(" + selectedData.length + "/" + allCount + " Selected)",
        "TODAY(" + todayCount + ")",
      ]);
    }
    if (tabSelected === "TODAY") {
      setTabLabels([
        "ALL(" + allCount + ")",
        tabSelected +
        "(" +
        selectedData.length +
        "/" +
        todayCount +
        " Selected )",
      ]);
    }
  };

  const updateCount = (e) => {
    if (e) {
      if (e.allCount !== 0) {
        var v_allCount =
          " (" + selectedRows.length + "/" + e.allCount + " Selected)";
        setAllCount(e.allCount);
        var expired = e.allExpiredCount;
        setExpiredCount(expired);
      } else {
        setAllCount(0);
        var v_allCount = "(0)";
      }
      var todayCount = " (" + e.todayCount + ")";
      setTodayCount(e.todayCount);

      setTabLabels(["ALL" + v_allCount, "TODAY" + todayCount]);
    }
  };

  const onSearch = async (values, status) => {
    setIsActiveSelected(false);
    setIsExpiredSelected(false);
    statusArr.push(status)
    // alert('statusArr0 - '+ statusArr);
    if(statusArr.filter(st => st==status).length >= 2) {
      statusArr = statusArr.filter(s=>s !== status)
      alert('statusArr1 - '+ statusArr);
    }
    // alert('statusArr2 - '+ statusArr);
    let statusSelected = '';

    if (statusArr.includes("ACTIVE") && statusArr.includes("EXPIRED")) {
      statusSelected = 'ALL';
      alert('ALL - '+ statusArr);
      setIsActiveSelected(true);
      setIsExpiredSelected(true);
    }
    else if (statusArr.includes("ACTIVE")) {
      alert('ACTIVE - '+ statusArr);
      setIsActiveSelected(true);
      statusSelected = 'ACTIVE';
    }
    else if (statusArr.includes("EXPIRED")) {
      alert('EXPIRED - '+ statusArr);
      setIsExpiredSelected(true);
      statusSelected = 'EXPIRED';
    }
    console.log("values.toDate", values.toDate);
    console.log("values.fromDate", values.fromDate);

    let finalURL =
      "/ptms/app/api/secure/boe/search?option=" +
      tabSelected +
      "&toDate=" +
      values.toDate +
      "&fromDate=" +
      values.fromDate +
      "&consigneeName=" +
      values.consigneeName + "&status=" +
      statusSelected;
    setBoeDetailsUrl(finalURL);
    setPstate(pstate + 1);
    formvalues.fromDate = values.fromDate;
    formvalues.toDate = values.toDate;

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
                      <Typography style={{fontSize:'16px', fontWeight:600, paddingLeft:'5px'}}>DO Validity Date Range :</Typography>
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
                          label="Consignee Name"
                          style={{ marginTop: "2px" }}
                          kvMapping={consigneeKVmapping}
                          remoteUrl={consigneeUrl}
                          onSelect={() => { }}
                        />
                      </Grid>
                    )}

                    <Grid item >
                      <SearchButton
                        style={{background: isActiveSelected ? '#168FE4' : '#FFFFFF', color: isActiveSelected ? '#FFFFFF' : '#848484'}}
                        onClick={() => {
                          onSearch(formik.values, "ACTIVE")
                          // isExpiredSelected ? onSearch(formik.values, ["ACTIVE", "EXPIRED"]) : onSearch(formik.values, ["ACTIVE"]);
                        }}
                      >
                        Active
                      </SearchButton>
                    </Grid>
                    <Grid item xs={6}>
                      <SearchButton
                        style={{background: isExpiredSelected ? '#168FE4' : '#FFFFFF', color: isExpiredSelected ? '#FFFFFF' : '#848484'}}
                        onClick={() => {
                          onSearch(formik.values, "EXPIRED")
                          // isActiveSelected ? onSearch(formik.values, ["ACTIVE", "EXPIRED"]) : onSearch(formik.values, ["EXPIRED"]);
                        }}
                      >
                        Expired
                      </SearchButton>
                    </Grid>
                    <Grid item >
                      <Link
                        style={{ color: "#168FE4", textDecoration: "underline", fontSize: "16px", fontFamily: "Dubai Light", fontWeight:600 }}
                        href="#"
                        onClick={() => {
                          setIsActiveSelected(false);
                          setIsExpiredSelected(false);
                          formvalues.fromDate = "";
                          formvalues.toDate = "";
                          let finalURL =
                            "/ptms/app/api/secure/boe/search?option=" +
                            tabSelected +
                            "&consigneeName=" +
                            formik.values.consigneeName + "&status=" +
                            'ALL';
                          setBoeDetailsUrl(finalURL);
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

  // const globalSearch = () => {
  //   console.log("global Search", globalSearchOption);
  //   let finalURL =
  //     "/ptms/app/api/secure/boe/search?option=" +
  //     tabSelected +
  //     "&" +
  //     globalSearchOption +
  //     "=" +
  //     globalSearchValue.value;
  //   console.log("url", finalURL);
  //   setBoeDetailsUrl(finalURL);
  //   setPstate(pstate + 1);
  // };

  const handleSearchClick = async (e, value) => {

    let finalURL =
      "/ptms/app/api/secure/boe/search?option=" +
      tabSelected +
      "&bookingNumber=" +
      value;
    console.log("url", finalURL);
    setBoeDetailsUrl(finalURL);
    setPstate(pstate + 1);
  }

  const removeContainersSelected = (row) => {
    const ind = [];
    selectedRows.forEach((data, index) =>
      data.boeNumber === row.referenceNumber ? ind.push(index) : null
    );
    const indSet = new Set(ind);
    const arrayWithValuesRemoved = selectedRows.filter(
      (value, i) => !indSet.has(i)
    );
    return arrayWithValuesRemoved;
  };

  const addOrRemoveSelectedData = (row, action, element) => {
    var selectedData = [];
    switch (action) {
      case "collapseRowChecked":
        if (row.checked) {
          selectedData = selectedRows;
          selectedData.push(row);
          setSelectedRows(selectedData);
          actionsOnDataSelect(selectedData);
        } else {
          var i = selectedRows.findIndex(
            (e) =>
              e.container_number === row.container_number &&
              e.boeNumber === row.boeNumber
          );
          selectedRows.splice(i, 1);
          selectedData = selectedRows;
          actionsOnDataSelect(selectedData);
        }
        break;
      case "collapseRowHeaderChecked":
        if (row.checked) {
          const filteredRows = removeContainersSelected(row);

          row.containerList.forEach(function (item) {
            selectedData = filteredRows;
            selectedData.push(item);
          });
          setSelectedRows(selectedData);
          actionsOnDataSelect(selectedData);
        } else {
          row.containerList.forEach(function (item) {
            var i = selectedRows.findIndex(
              (e) =>
                e.container_number === item.container_number &&
                e.boeNumber === item.boeNumber
            );
            selectedRows.splice(i, 1);
            selectedData = selectedRows;

            actionsOnDataSelect(selectedRows);
          });
        }
        break;
      case "collapseHeaderChecked":
        if (element) {
          row.forEach(function (item) {
            item.containerList.forEach(function (container) {
              selectedData.push(container);
            });
          });
          setSelectedRows(selectedData);
          actionsOnDataSelect(selectedData);
        } else {
          row.forEach(function (item) {
            item.containerList.forEach(function (container) {
              var i = selectedRows.findIndex(
                (e) =>
                  e.container_number === container.container_number &&
                  e.boeNumber === container.boeNumber
              );
              selectedRows.splice(i, 1);
              selectedData = selectedRows;
            });
          });
          actionsOnDataSelect(selectedData);
        }
        break;
      default:
    }
    console.log("selected Data", selectedRows);
  };

  return (
    <>
      {showToaster && expiredCount !== 0 && expiredCount !== undefined && (
        <Toast
          icon="error"
          title="Expired"
          message={expiredCount + " containers have expired"}
          showToast={() => {
            setShowToaster(false);
          }}
          position="top-right"
        />
      )}
      {draftCount > 0 && (
        <InfoBox
          message={number.toWords(draftCount)[0].toUpperCase() + number.toWords(draftCount).slice(1) + " transactions has been saved as drafts, click on the drafts button and select the transaction to start from were left off."}
          buttonNames={["Drafts"]}
          onSelect={(e) => {
            console.log(e)
            if (e === 'Drafts') {
              history.push("/drafts");
            }
          }}
        >
        </InfoBox>)}
          <Grid container alignItems="flex-end">
            <Grid item xs={8}>
              <SearchInput
                changeValue={(e) => setSearchValue(e)}
                changeType={(e) => setInputType(e)}
                searchClick={(e) => handleSearchClick(e, searchValue, inputType)}
                optionValues={searchOptions}
                defaultType="DECLARATION"
                width={800}
              ></SearchInput>
            </Grid>
            <Grid item xs={4} >
              <StyledButton
                style={{paddingLeft:'20px', paddingRight:'20px',
                boxShadow: '0px 1px 5px #00000029',
                border: '1px solid #0568AE'}}
                onClick={() => {
                  setShowSmartSearch(!showSmartSearch);
                }}
              ><img src="./add_filters.svg" />
              <Typography
                style={{
                  color: "#0E1B3D",
                  fontSize: "16px",
                  fontFamily: "Dubai Regular",
                  fontWeight:600,
                  paddingLeft:'5px'
                  // marginLeft: "5%",
                }}
              >
                Add Filters
              </Typography>
              </StyledButton>
            </Grid>
          </Grid>
      <div className="row">
        <div className="col-md-10"></div>
        <div className="col-md-2">
        </div>
      </div>
      <Typography style={{fontWeight:600, fontSize:'22px'}}>My Bookings</Typography>
      <br></br>
      <RenderSmartSearch />
      <div className="row" style={{ marginBottom: "0px" }}>
        <div className="col-md-10" style={{ paddingRight: "0px" }}>
          <CustomTabs
            labelList={tabLabels}
            onSelected={(e) => {
              if (e === 1) {
                let url = `/ptms/app/api/secure/boe/search?option=TODAY&allCount=${allCount}`;
                setShowToaster(false);
                setBoeDetailsUrl(url);
                setTabSelected("TODAY");
                setSelectedRows([]);
                setPstate(pstate + 1);
              } else {
                setBoeDetailsUrl(`/ptms/app/api/secure/boe/search?option=ALL`);
                setShowToaster(true);
                setTabSelected("ALL");
                setSelectedRows([]);
                setPstate(pstate + 1);
              }
            }}
            defaultSelected={tabSelected === 'TODAY' ? 1 : 0}
            style={{ marginBottom: '0px', paddingRight: '0px' }}></CustomTabs>
        </div>
        {selectedRows.length === 0 &&
          <div className="col-md-2">
            <Button
              variant="contained"
              style={{ 
                float: "right", 
                color:'#FFFFFF', 
                borderRadius:'7px',
                fontFamily:'Dubai Light',
                fontWeight:600,
                fontSize:'16px',
                background: 'transparent linear-gradient(180deg, #AEB2BB 0%, #848484 67%, #848484 100%) 0% 0% no-repeat padding-box' 
              }}
              disabled
            >
              Book Truck
            </Button>
          </div>}

        {selectedRows.length !== 0 &&
          <div className="col-md-2">
            <Button
              variant="contained"
              color="primary"
              style={{ 
                float: "right",
                borderRadius:'7px',
                fontFamily:'Dubai Light',
                fontWeight:600,
                fontSize:'16px',
                background: 'transparent linear-gradient(180deg, #1E84EA 0%, #2673CE 67%, #364F91 100%) 0% 0% no-repeat padding-box',
                boxShadow: '0px 1px 4px #00000029'
              }}
              onClick={() => {
                console.log("clicked selected Data is ", selectedRows);
                history.push("/createRequest", {
                  containerData: selectedRows, url: boeDetailsUrl
                });
              }}
            >
              Book Truck
            </Button>
          </div>
        }
      </div>
      <div className="row">
        <div className="col">
          <CollapseDataTable
            refresh={pstate}
            tableKeys={
              userType === "CLEARING_AGENT" ? boeDetailsCol : boeDetailsColImp
            }
            remote={true}
            remoteUrl={boeDetailsUrl}
            dataRootKey={"elements"}
            chkbox={true}
            actions={actions}
            collapsableTableKeys={containerDetailsCol}
            collapseTableList="containerList"
            keyTest="container_number"
            handleClick={(row, index, action, element) => {
              console.log("inside parent handleclick");
              addOrRemoveSelectedData(row, action, element);
            }}
            collapseChkBox={true}
            selectedData={selectedRows}
            countData={(e) => updateCount(e)}
            groupBy={"boeNumber"}
            onFilterSelected={(e) => {
              console.log(
                "/ptms/app/api/secure/boe/search?option=" +
                tabSelected +
                "&" +
                "status=" +
                e
              );
              setBoeDetailsUrl(
                "/ptms/app/api/secure/boe/search?option=" +
                tabSelected +
                "&" +
                "status=" +
                e
              );
              setPstate(pstate + 1);
              setShowClearAll(true);
            }}
            showLinks={false}
          />
        </div>
      </div>
    </>
  );
}
export default React.memo(Booking);
