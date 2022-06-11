import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { IconButton, Card, CardContent, Grid, InputLabel, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import JobService from "../../service/JobService";
import SearchInput from "../../lib/components/appComponent/SearchInput";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import SearchDetails from "./SearchDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1200,
  },
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  leftPane: {
    width: "33%",
  },
  middlePane: {
    width: "32%",
  },
  rightPane: {
    width: "35%",
  },
  cardStyle: {
    width: "353px",
    height: "180px",
    marginTop: 30,
    background: "#FF7575 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: 1
  },
  cardStyle1: {
    width: "353px",
    height: "180px",
    marginTop: 30,

    background: "#FFBA42 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: 1
  },
  cardStyle2: {
    width: "353px",
    height: "180px",
    marginTop: 30,

    background: "#59B7FF 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: 1
  },

  cardStyle3: {
    width: "353px",
    height: "180px",
    marginTop: 30,

    background: "#6993FF  0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: 1
  },


}))

const types = [
  {
    value: 'declaration',
    label: 'By declaration number',
  },
  {
    value: 'booking',
    label: 'By booking number',
  },
  {
    value: 'container',
    label: 'By container number',
  },
  {
    value: 'haulier',
    label: 'By haulier code'
  }
];

const LabelHeader = withStyles((theme) => ({
  root: {
    fontSize: "15px",
    color: "#FFFFFF",
    fontFamily: "Dubai Light",
    fontWeight: 600,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    padding: '5px 0px 8px 0px'
  },

}))(InputLabel);

function AdminDashBoard() {

  const classes = useStyles();
  let history = useHistory();
  const [expiredJobs, setExpiredJobs] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const [pendingTokenJobs, setPendingTokenJobs] = useState(null);
  const [pendingDocuments, setPendingDocuments] = useState(null);
  const [hauliers, setHauliers] = useState(null);
  const [searchDetails, setSearchDetails] = useState();
  const [error, showError] = useState(false);
  const [searchedResult, showSearchedResult] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadContainerCount = async () => {
      JobService.fetchExpiredCountForDashBoard()
        .then((response) => {
          console.log(response.data.dataItems[0].EXP);
          setExpiredJobs(response.data.dataItems[0].EXP);
        })
        .catch((error) => {
          console.log("error");
        });
    };

    const loadPendingTokenJobCount = async () => {
      JobService.fetchPendingTokenJobCount()
        .then((response) => {
          console.log("------", response.data.dataItems[0].PTOK);
          console.log("------**", response.data.dataItems[0].PENDING_DOC);
          setPendingTokenJobs(response.data.dataItems[0].PTOK);
          setPendingDocuments(response.data.dataItems[0].PENDING_DOC)
        })
        .catch((error) => {
          console.log("error");
        });
    };

    const loadHaulierCount = async () => {
      JobService.fetchHauliersCountForDTAdmin()
        .then((response) => {
          console.log(response.data.dataItems[0].H);
          setHauliers(response.data.dataItems[0].H);
        })
        .catch((error) => {
          console.log("error");
        });
    }

    loadContainerCount();
    loadPendingTokenJobCount();
    loadHaulierCount();
  }, []);

  const handleSearchClick = (e) => {
    console.log("event", e)
    setSearch(e)
    showSearchedResult(true)
  }

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center" >
        <Grid item container xs={12} sm={10} md={8}>
          <SearchInput
            optionValues={types}
            changeValue={(e) => {
              showError(false);
              showSearchedResult(false);
              setSearchValue(e);
              if (!e)
                showSearchedResult(false);
            }}
            defaultType="booking"
            changeType={(e) => {
              setSearchType(e);
              showSearchedResult(false);
            }}
            searchClick={(e) => {
              setSearchDetails(e);
              if (e.serviceNumber) {
                console.log("search", e)
                handleSearchClick(e)
                showError(false)
              } else {
                showError(true)
              }
            }}
          />
          {error && <LabelHeader style={{ color: '#EA2428', padding: '8px' }}>{`Please Enter ${searchDetails.serviceType} Number`}</LabelHeader>}
        </Grid>
      </Grid>
      {searchedResult && <SearchDetails search={search} onBack={() => showSearchedResult(false)}/>}
      {!searchedResult && <Grid container spacing={1}>
        <Grid item xs={12} sm={4} md={4}>
          <Card className={classes.cardStyle}>
            <CardContent>
              <Grid container>
                <Grid item xs={6} style={{ fontSize: '50px', color: '#FFFFFF', marginTop: "47px", fontFamily: 'Dubai Light', fontWeight: 600 }}>
                  {((expiredJobs) + "").padStart(2, '0')}
                </Grid>
                <Grid item xs={6} >
                  <LabelHeader style={{ fontSize: '23px', marginTop: "12px", marginLeft: "-30px" }}> Expired Jobs</LabelHeader>
                  <LabelHeader style={{ fontSize: '18px', marginLeft: "-30px", opacity: 0.6 }}>Trucks not assigned</LabelHeader>
                  <IconButton onClick={() => { history.push("/expiredJobs") }}
                    style={{ marginTop: "5px", marginLeft: "100px" }}>
                    <ArrowForwardIosRoundedIcon style={{ fontSize: '36px', fill: '#FFFFFF' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card className={classes.cardStyle1}>
            <CardContent>
              <Grid container>
                <Grid item xs={6} style={{ fontSize: '50px', color: '#FFFFFF', marginTop: "47px", fontFamily: 'Dubai Light', fontWeight: 600 }}>
                  {((pendingTokenJobs) + "").padStart(2, '0')}
                </Grid>
                <Grid item xs={6} >
                  <LabelHeader style={{ fontSize: '23px', marginTop: "12px", marginLeft: "-30px" }}> Update Token</LabelHeader>
                  <LabelHeader style={{ fontSize: '18px', marginLeft: "-30px", opacity: 0.6 }}>Generate to start job</LabelHeader>
                  <IconButton onClick={() => { history.push("/tokenCount") }}
                    style={{ marginTop: "5px", marginLeft: "100px" }} >
                    {/* <img src='next.svg' /> */}
                    <ArrowForwardIosRoundedIcon style={{ fontSize: '36px', fill: '#FFFFFF' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card className={classes.cardStyle2}>
            <CardContent>
              <Grid container>
                <Grid item xs={6} style={{ fontSize: '50px', color: '#FFFFFF', marginTop: "47px", fontFamily: 'Dubai Light', fontWeight: 600 }}>
                  {((pendingDocuments) + "").padStart(2, '0')}
                </Grid>
                <Grid item xs={6} >
                  <LabelHeader style={{ fontSize: '23px', marginTop: "12px", marginLeft: "-30px" }}> Verify Documents</LabelHeader>
                  <LabelHeader style={{ fontSize: '18px', marginLeft: "-30px", opacity: 0.6 }}>Invoices / POD</LabelHeader>
                  <IconButton onClick={() => { history.push("/verifyDocumentsAll") }}
                    style={{ marginTop: "5px", marginLeft: "100px" }} >
                    {/* <img src='next.svg' /> */}
                    <ArrowForwardIosRoundedIcon style={{ fontSize: '36px', fill: '#FFFFFF' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card className={classes.cardStyle3}>
            <CardContent>
              <Grid container>
                <Grid item xs={6} style={{ fontSize: '50px', color: '#FFFFFF', marginTop: "47px", fontFamily: 'Dubai Light', fontWeight: 600 }}>
                  {((hauliers) + "").padStart(2, '0')}
                </Grid>
                <Grid item xs={6} >
                  <LabelHeader style={{ fontSize: '23px', marginTop: "12px", marginLeft: "-30px" }}> Hauliers</LabelHeader>
                  <LabelHeader style={{ fontSize: '18px', marginLeft: "-30px", opacity: 0.6 }}>View Haulier Information</LabelHeader>
                  <IconButton onClick={() => { history.push("/haulier-list") }}
                    style={{ marginTop: "5px", marginLeft: "100px" }} >
                    {/* <img src='next.svg' /> */}
                    <ArrowForwardIosRoundedIcon style={{ fontSize: '36px', fill: '#FFFFFF' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>}
    </>
  )

}

export default React.memo(AdminDashBoard);