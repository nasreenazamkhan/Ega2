import React, { useEffect, useState } from "react";
import BookingService from "../../service/BookingService";
import { Card, CardHeader, InputLabel, makeStyles, withStyles, Grid, IconButton, Breadcrumbs } from "@material-ui/core/";
import { Link, useHistory, useLocation } from "react-router-dom";
import ErrorToast from "../../lib/components/toast/ErrorToast";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import ConfirmDialog from "../../lib/components/dialog/confirmDialog";

const useStyles = makeStyles((theme) => ({
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontWeight: 600,
    fontSize: '17px'
  },
  cancelButton: {
    border: "1px solid #0E1B3D",
    color: "#0E1B3D",
    width: '100px', 
    height: '35px',
    paddingRight: '15px',
    fontSize: '12px', 
    fontFamily: 'Dubai Light', 
    fontWeight: 600,
    borderRadius: '3px'
  },
  confirmButton: {
    backgroundColor: "#1360D2",
    color: "#fff",
    width: '100px',
    height: '35px',
    fontSize: '12px', 
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    borderRadius: '3px'
  },
  margin:{
    '&.MuiGrid-container': {
      marginBottom: '0px !important'
    }
  }
}));

const LabelData = withStyles((theme) => ({
  root: {
    fontSize: '16px',
    color: '#494949',
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    marginLeft: "10px",
    padding:'20px 0px 15px 0px'
  },
}))(InputLabel);

function Drafts() {
  const [draftList, setDraftList] = useState([]);
  const [showToaster, setShowToaster] = useState("NOTOASTER");
  const [showConfirm, setShowConfirm] = useState(false);
  const [render, setRender] = useState(0);
  const classes = useStyles();

  const location = useLocation();

  const activeStepMap = new Map([["Enter Drop Location Details",1], ["Complete Payment",2]]);

  let history = useHistory();

  useEffect(() => {
    BookingService.fetchAllDrafts().then((response) => {
      console.log(response);
      setDraftList(response.data.dataItems);
    })
      .catch((error) => {
        console.log("error");
      });
  }, [render]);

  const renderCard = (draft, index) => {
    return (
      <Card style={{
        width: "1200px", minHeight: "30px",
        marginTop: "20px",
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid #E2E2E2',
        borderRadius: '5px',
        opacity: '1',
        paddingLeft: '25px'
      }}>
        <Grid container spacing={1} alignItems="center" className={classes.margin}>
          <Grid item xs={2}>
            <LabelData>
              Draft {index + 1}
            </LabelData>
          </Grid>
          <Grid item xs={6}>
            <LabelData>
              Created On : {draft.creationDate}
            </LabelData>
          </Grid>
          <Grid item xs={3}>
            <LabelData>
              {draft.currentStep}
            </LabelData>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => {
                setShowConfirm(true);
              }}
            >
              <img src="./delete.svg"  />
            </IconButton>
            <IconButton
              onClick={() => {
                const activeStep = activeStepMap.get(draft.currentStep);
                let containerData = JSON.parse(draft.requestDetailsDraft);
                containerData.encryptedDraftId = draft.encryptedDraftId
                history.push("/createRequest", {
                  activeStep: activeStep-1, 
                  containerData: containerData,
                  url : location.state.url
                })
              }}
            >
              {<img src="./next_page.svg" />}
            </IconButton>
          </Grid>
        </Grid>
        {showConfirm && <ConfirmDialog
            fullWidth={true}
            isopen={showConfirm}
            title={"Attention!"}
            children={"Are You sure to delete the draft?"}
            confirmTxt={"Yes"}
            closeTxt={"No"}
            confirmButtonCss={classes.confirmButton}
            closeButtonCss={classes.cancelButton}
            onClose={() => {
              setShowConfirm(false);
            }}
            onConfirm={(e) => {
              setShowConfirm(false);
              BookingService.deleteDraft({ encryptedDraftId: draft.encryptedDraftId }).then((response) => {
                setShowToaster('SUCCESS');
                setRender(render + 1);
              })
                .catch((error) => {
                  setShowToaster('ERROR');
                  setRender(render + 1);
                });
            }}
          />}
      </Card>
    )
  }

  return (
    <>
      <Grid item xs={12} style={{ marginBottom: 0, marginTop: '20px' }}>
        <Breadcrumbs aria-label="breadcrumb" classes={{
          root: classes.breadCrumRoot,
          separator: classes.separator,
        }}>
          <Link onClick={() => history.push("/myRequests")} style={{ color: '#848484' }}>
            My Bookings
          </Link>
          <Link onClick={(e) => e.preventDefault()} style={{ color: '#0E1B3D' }}>
            Draft
          </Link>
        </Breadcrumbs>
      </Grid>
      {draftList && draftList.map((draft, inx) => {
        return (
          renderCard(draft, inx)
        )
      })}

      {showToaster === 'SUCCESS' &&
        <SuccessToast
          icon="check_circle"
          title="Delete Successful"
          message="Draft Deleted Successfuly"
          showToast={() => { setShowToaster('NOTOASTER') }}
          position="top-right"
        />}
      {showToaster === 'ERROR' &&
        <ErrorToast
          icon="error"
          title="Draft Delete Fail"
          message="Unable to delete draft"
          showToast={() => { setShowToaster('NOTOASTER') }}
          position="top-right"
        />}
    </>
  )
}
export default React.memo(Drafts);
