import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
//import DocumentPopup from "./DocumentPopup.css";
//import ApplnFileUpload from "../../lib/components/fileupload/ApplnFileUpload";
//import UploadDocument from "./UploadDocument";
import { useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { Grid, Icon, SvgIcon, TextField } from "@material-ui/core";
import RequestContainerService from "../../service/RequestContainerService";
import { Star, StarBorder, StarBorderRounded, StarOutlined, StarRate, StarRateRounded, StarRounded } from "@material-ui/icons";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    marginTop:'30px'
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{textAlign:'center'}}>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon style={{ fill: '#0E1B3D' }} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CssTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      color: '#383838',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
      top: '-10px',
      fontSize: '14px'
    },
    '& .MuiOutlinedInput-input': {
      padding: '8px',
      fontSize: '14px',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
    },
    '& .MuiOutlinedInput-multiline':{
      padding: '0px 14px'
    },
    '& label.Mui-focused': {
      color: '#383838',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#CFCFCF',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#CFCFCF',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
      '&:hover fieldset': {
        borderColor: '#CFCFCF',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#CFCFCF',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
    },
  },
})(TextField);

export default function PodApprovedPopup(props) {
  console.log("props in PodApprovedPopup", props);

  const [open, setOpen] = React.useState(true);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [jobnumber, setJobnumber] = React.useState("");
  const [value, setValue] = React.useState(0);

  let history = useHistory();

  useEffect(() => {
    console.log("props in POD Approved popup ::", props);
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };
  const saveRatingAndFeedback = () => {
    console.log("saveRatingAndFeedback ::", props.container);
    RequestContainerService.saveRatingAndFeedback(
      props.container
    ).then((response) => {
      props.refresh();
      props.onClose();
    }).catch(() => {
      console.log("error");
      props.refresh();
      props.onClose();
    });
  }

  function StarCustomIcon() {
    // <SvgIcon><img src="white-star.svg"/></SvgIcon>
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        // maxWidth={"md"}
        PaperProps={{
          style: { borderRadius: '0px', width: '609px', minHeight: '400px' }
        }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          onClose={handleClose}
        >
          <img src="./successful_tick.svg" height="100px" />
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} style={{ color: '#609E2E', fontSize: '26px', fontWeight: 600, textAlign: 'center', paddingTop: 0 }}>
              POD Approved
            </Grid>
            <Grid item xs={12} style={{ color: '#606060', fontSize: '17px', fontWeight: 600, fontFamily: 'Dubai Light', textAlign: 'center', padding: '30px', paddingBottom: '20px' }}>
              The POD of container #{props.container.container_number} has been approved and marked as delivered once DT Admin approves.
            </Grid>
            <Grid item xs={12} style={{ color: '#383838', fontSize: '18px', fontWeight: 600, fontFamily: 'Dubai Light', textAlign: 'center' }}>
              Would you like to rate the transporter service ?
            </Grid>
          </Grid>
          {/* <StarBorderRounded fontSize="large" style={{ fill: '#383838' }} /> <StarRateRounded fontSize="large" style={{ fill: '#1360D2' }} />*/}
          <Grid item xs={12} style={{textAlign: 'center', paddingBottom:'20px' }}>
            <Rating
              name="customized-color"
              defaultValue={value}
              precision={0.5}
              icon={<StarRounded style={{fill:'#FFD607', fontSize:"40px"}}/>}
              emptyIcon={<StarBorderRounded style={{fill:'#494949', fontSize:"40px"}}/>}
              onChange={(event, newValue) => {
                console.log("rating value ::", newValue);
                setValue(newValue);
                props.container.rating = newValue;
              }} 
              />
          </Grid>
          <Grid item xs={12} style={{textAlign: 'center', marginLeft:'50px', marginRight:'50px' }}>
          <CssTextField
            placeholder="Enter Feedback/suggestion (if any)"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              props.container.feedback = e.target.value;
            }}
          />
          </Grid>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          <Button
            style={{
              backgroundColor: "#1360D2",
              boxShadow: '0px 1px 4px #00000029',
              borderRadius: '3px',
              opacity: 1,
              marginBottom:'25px',
              fontSize: '14px',
              padding: '5px 30px 5px 30px',
              fontFamily: 'Dubai Light',
              fontWeight: 600
            }}
            onClick={(e) => {
              saveRatingAndFeedback()
              props.onClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
