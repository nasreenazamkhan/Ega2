import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Card, CardContent, Grid, InputLabel } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import JobService from "../../service/JobService";
import SearchInput from "../../lib/components/appComponent/SearchInput";


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
    height: "166px",
    marginTop: 30,

    background: "#FF7575 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: 1
  },

  cardStyle1: {
    width: "353px",
    height: "166px",
    marginTop: 30,

    background: "#FFBA42 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: 1
  },

  cardStyle2: {
    width: "353px",
    height: "166px",
    marginTop: 30,

    background: "#59B7FF 0% 0% no-repeat padding-box",
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
    value:'haulier',
    label:'By haulier code'
  }
];


function AdminDashBoard() {

  const classes = useStyles();
  let history = useHistory();
  const [expiredJobs, setExpiredJobs] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const [pendingTokenJobs, setPendingTokenJobs] = useState(null);
  const [pendingDocuments, setPendingDocuments] = useState(null);
  const [searchDetails, setSearchDetails] = useState();

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
          console.log("------**", response.data.dataItems[0].PMTTOK);
          setPendingTokenJobs(response.data.dataItems[0].PTOK + response.data.dataItems[0].PMTTOK);
          setPendingDocuments(response.data.dataItems[0].INVSUBMT + response.data.dataItems[0].PODUPL)
        })
        .catch((error) => {
          console.log("error");
        });
    };

    loadContainerCount();
    loadPendingTokenJobCount();
  }, []);

  const handleSearchClick = (e) => {
    console.log("event", e)
    let searchD = { "search": e, "from": true }
    setSearchDetails(e);
    history.push("/search-by-service", searchD);
  }

  return (

    <>

      <Grid container direction="row" justify="center" alignItems="center" >
        {/* <Paper className={classes.paper}> */}
        <Grid item container xs={12} sm={10} md={8}>
          <SearchInput optionValues={types}
            changeValue={(e) => setSearchValue(e)}
            defaultType="booking"
            changeType={(e) => setSearchType(e)}
            searchClick={(e) => {
              console.log("search",e)
              handleSearchClick(e, searchValue, searchType)
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} md={4}>
          <Card className={classes.cardStyle}>
            <CardContent>
              <Grid container>
                <Grid item xs={6} style={{ fontSize: '50px', color: '#FFFFFF', marginTop: "47px" }}>
                  {((expiredJobs) + "").padStart(2, '0')}
                </Grid>
                <Grid item xs={6} >
                  <InputLabel style={{ fontSize: '23px', color: '#FFFFFF', marginTop: "28px", marginLeft: "-30px", opacity: 1 }}> Expired Jobs</InputLabel>
                  <InputLabel style={{ fontSize: '18px', color: '#FFFFFF', opacity: 0.9, marginLeft: "-30px" }}>Trucks not assigned</InputLabel>
                  <IconButton onClick={() => {
                    history.push("/expiredJobs");
                  }}
                    style={{ marginTop: "14px", marginLeft: "105px" }}
                  ><img src='next.svg' /></IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <Card className={classes.cardStyle1}>
            <CardContent>
              <Grid container>
                <Grid item xs={6} style={{ fontSize: '50px', color: '#FFFFFF', marginTop: "47px" }}>
                  {((pendingTokenJobs) + "").padStart(2, '0')}
                </Grid>
                <Grid item xs={6} >
                  <InputLabel style={{ fontSize: '23px', color: '#FFFFFF', marginTop: "28px", marginLeft: "-30px", opacity: 1 }}> Update Token</InputLabel>
                  <InputLabel style={{ fontSize: '18px', color: '#FFFFFF', opacity: 0.9, marginLeft: "-30px" }}>Generate to start job</InputLabel>
                  <IconButton onClick={() => {
                    history.push("/assignToken");
                  }} style={{ marginTop: "14px", marginLeft: "105px" }} >
                    <img src='next.svg' />
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
                <Grid item xs={6} style={{ fontSize: '50px', color: '#FFFFFF', marginTop: "47px" }}>
                  {((pendingDocuments) + "").padStart(2, '0')}
                </Grid>
                <Grid item xs={6} >
                  <InputLabel style={{ fontSize: '23px', color: '#FFFFFF', marginTop: "28px", marginLeft: "-30px", opacity: 1 }}> Verify Documents</InputLabel>

                  <InputLabel style={{ fontSize: '18px', color: '#FFFFFF', opacity: 0.9, marginLeft: "-30px" }}>Invoices/POD</InputLabel>
                  <IconButton onClick={() => {
                    history.push("/verifyDocument");
                  }} style={{ marginTop: "14px", marginLeft: "105px" }} >
                    <img src='next.svg' />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )

}

export default React.memo(AdminDashBoard);