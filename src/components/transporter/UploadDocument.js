import React, { useEffect, useRef, useState } from "react";
import "../../lib/components/fileupload/filupload.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import UploadService from "../../service/FileUploadService";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { interval } from "rxjs";
import { default as MuiButton } from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
  },
  menuButton: {
    marginRight: theme.spacing(100),
  },
  title: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
  center: {
    display: "none",
  },
  input: {
    padding: '0px 10px 0px 5px'
  },
  buttonRoot: {
    backgroundColor: "#1360D2",
    boxShadow: '0px 1px 4px #00000029',
    borderRadius: '3px',
    opacity: 1,
    fontSize: '14px',
    padding: '5px 35px 5px 35px',
    fontFamily: 'Dubai Light',
    fontWeight: 600
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    border: '1px solid #1360D2',
    boxShadow: '0px 1px 4px #00000029',
    borderRadius: '3px',
    opacity: 1,
    fontSize: '14px',
    padding: '5px 35px 5px 35px',
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    color: '#1360D2'
  },
  buttonDisabled: {
    backgroundColor: "#FFFFFF",
    color: "#0E1B3D"
  }
}));

const CssTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      color: '#0E1B3D',
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
    '& label.Mui-focused': {
      color: '#0E1B3D',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#168FE4BC',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#168FE4BC',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
      '&:hover fieldset': {
        borderColor: '#168FE4BC',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#168FE4BC',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
    },
  },
})(TextField);

const SearchButton = withStyles(() =>
  createStyles({
    root: {
      border: '1px dashed #1360D2',
      boxShadow: '0px 1px 4px #00000029',
      color: '#1360D2',
      fontSize: '14px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      padding: '4px 15px 4px 15px',
      backgroundColor: '#FFF',
      borderRadius:'3px',
      marginTop: '8px',
      '&:hover': {
        color: '#1360D2',
      }
    },
  })
)(MuiButton);

const UploadDocument = (props) => {
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(0);
  const allowedFileTypes = ['pdf', 'doc', 'png', 'docx', 'jpg', 'jpeg', 'JPG'];
  const uploadType = props.popUpParams.uploadType;
  const [showFileSizeError, setShowFileSizeError] = useState(false);
  const [showTotalFileError, setShowTotalFileError] = useState(false);
  const [showFileFormatError, setShowFileFormatError] = useState(false);
  const [fileList, setFileList] = useState([]);
  const fileUploadRef = useRef(null);
  const userData = useSelector(state => state.loginUser);
  const userType = userData.user.user_type;
  const [lengthMsg, setMaxLengthMsg] = useState('');
  const [remarks, setRemarks] = useState('');

  let history = useHistory();
  let listOfFiles = [];
  const selectFile = (event) => {
    setSelectedFiles(event.target.files[0]);
  }
  const timer = useRef();
  const totalFileSize = useRef(0);

  useEffect(() => {
    if (selectedFiles) {
      selectedFiles.progress = 0;
      listOfFiles = fileList;
      if (fileList.length < 4) {
        setMessage("");
        setShowFileFormatError(false);
        setShowFileSizeError(false);
        let currentFile = selectedFiles;
        let type = currentFile.name.split('.')[currentFile.name.split('.').length-1];
        currentFile.progress = 20;
        currentFile.fileType = type;
        // setTotalFilesize(prev => {let t = totalFileSize + currentFile.size; return t});
        if (allowedFileTypes.some(item => type === item)) {
         let totalUploadedFileSize = totalFileSize.current + currentFile.size;
          if (currentFile.size <= 2000000 && totalUploadedFileSize <= 2000000) {
            timer.current = setInterval(() => {
              setProgress((prevProgress) => (prevProgress == 100 ? prevProgress : prevProgress + 20));
              currentFile.progress = currentFile.progress == 100 ? currentFile.progress : currentFile.progress + 20;
              selectedFiles.progress = currentFile.progress;
              setCurrentFile(currentFile);
            }, 200)
            totalFileSize.current = totalFileSize.current + currentFile.size;
            listOfFiles.push(currentFile);
            setFileList(listOfFiles);
           
          }
          else {
            setShowFileSizeError(true);
          }
        }
        else {
          setShowFileFormatError(true);
        }
      } else {
        setShowTotalFileError(true);
      }
    }
  }, [selectedFiles]);

  const RenderToolBar = () => {
    if (fileList.length > 0 && selectedFiles?.progress === 100) {
      return (
        <Toolbar>
          <label>
            <input
              type="button"
              name="image"
              id="image"
              className={classes.center}
              onClick={() => { }}
            />
            {uploadType === 'invoice' &&
              <img
                src="./uploaded_invoice.png"
                style={{
                  position: "relative",
                  marginLeft: "65%",
                  width: "62%",
                }}
              />}
            {uploadType === 'POD' &&
              <img
                src="./uploaded_pod.png"
                style={{
                  position: "relative",
                  marginLeft: "65%",
                  width: "62%",
                }}
              />}
            {uploadType === 'token' &&
              <img
                src="./uploaded_token.svg"
                style={{
                  position: "relative",
                  marginLeft: "100%",
                  width: "185px",
                }}
              />}
            <div></div>
          </label>
        </Toolbar>
      )
    }
    else {
      return (
        <Toolbar>
          <label>
            <input
              type="file"
              name="image"
              id="image"
              style={{ display: 'none' }}
              className={classes.center}
              onChange={selectFile}
            />
            {uploadType === 'invoice' &&
              <img
                src="./upload_invoice.png"
                style={{
                  position: "relative",
                  marginLeft: "65%",
                  width: "62%",
                }}
              />}
            {uploadType === 'POD' &&
              <img
                src="./upload_pod.png"
                style={{
                  position: "relative",
                  marginLeft: "68%",
                  width: "62%",
                }}
              />}
            {uploadType === 'token' &&
              <img
                src="./upload_token.svg"
                style={{
                  position: "relative",
                  marginLeft: "100%",
                  width: "185px",
                }}
              />}
          </label>
        </Toolbar>
      )
    }
  }

  const deleteUploadedFile = (fileIndex) => {
    if (fileList.length !== 0) {
      setFileList(prev => {
        prev.splice(fileIndex, 1);
        return prev
      })
      setSelectedFiles(undefined);
      setCurrentFile(undefined);
    }

    if (fileList.length == 0) {
      setFileList([]);
      setSelectedFiles(undefined);
      setCurrentFile(undefined);
      setProgress(0)
      props.onClose()
    }
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{
            position: "relative",
            marginTop: "50px",
            height: "70px",
            centerTitle: true,
            backgroundColor: "#0E1B3D",
            marginBottom: '50px'
          }}
        >
          <RenderToolBar />
        </AppBar>
      </div>
      {fileList.length > 0 && (
        <>
          {fileList.map((element, index) => (
            <Grid container key={index} alignItems="center" justify="center" style={{
              paddingLeft: '100px', paddingRight: '100px', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '12px', color: '#0E1B3D', marginBottom: '20px'
            }}>
              <Grid item xs={1} >
                {element.fileType == "pdf" && <img src="./pdf_icon.svg" height="32px" />}
                {element.fileType == "png" && <img src="./png_icon.svg" height="32px" />}
                {["jpg", "jpeg", "JPG"].includes(element.fileType) && <img src="./jpg_icon.svg" height="32px" />}
                {["doc", "docx"].includes(element.fileType) && <img src="./doc_icon.svg" height="32px" />}
              </Grid>
              <Grid item xs={10} style={{ paddingLeft: '10px' }}>
                <ProgressBar variant="success" now={element.progress} style={{ height: '9px' }} />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => deleteUploadedFile(index)}>
                  <img src="./trash.svg" height="16px" />
                </IconButton>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={10} >
                {element.name}
              </Grid>
              <Grid item xs={1}>
                {element.progress}%
              </Grid>
            </Grid>))}
          <Grid container alignItems="center" justify="center" style={{ paddingLeft: '70px', paddingRight: '70px' }}>
            <Grid item xs={12}>
              <CssTextField
                placeholder={userType === "ADMIN" ? "Admin Comments (if any)" : "Transporter comments (if any)"}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                inputProps={{
                  maxLength: 250,
                }}
                InputProps={{
                  className: classes.input
                }}
                onChange={(e) => {
                  if (userType === "ADMIN")
                    props.popUpParams.adminComments = e.target.value
                  else
                    props.popUpParams.transporterComment = e.target.value;
                  setRemarks(e.target.value)
                  if (e.target.value.length >= 230)
                    setMaxLengthMsg(250 - e.target.value.length + ' characters left.')
                  else
                    setMaxLengthMsg('')
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ textAlign: 'left', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#ff0101', paddingLeft: '5px' }}>
                {lengthMsg}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#777777', textAlign: 'end', paddingRight: '5px' }}>
                {remarks.length + '/' + 250}</Typography>
            </Grid>
            {uploadType !== 'token' && <Grid item xs={4}>
              <input
                style={{ display: "none" }}
                type="file"
                ref={fileUploadRef}
                onClick={(event)=> { 
                  event.currentTarget.value = null
                }}
                onChange={selectFile}
              />
              <label htmlFor="contained-button-file">
                <SearchButton
                  variant="outlined"
                  // style={{
                  //   border: '1px dashed #1A77A5',
                  //   borderRadius: '3px',
                  //   color: '#1A77A5',
                  //   fontSize: '14px',
                  //   padding: '4px 20px 4px 20px',
                  //   fontFamily: 'Dubai Light',
                  //   fontWeight: 600,
                  //   marginTop: '8px'
                  // }}
                  onClick={() => {
                    fileUploadRef.current.click();
                  }}>
                  Add more files
                </SearchButton>
              </label>
            </Grid>}
            {/* </Grid>
              <Grid container> */}
            <Grid item xs={4} >
              <Button
                classes={{ root: classes.buttonRoot, disabled: classes.buttonDisabled }}
                disabled={fileList.length == 0}
                onClick={() => {
                  if (uploadType !== 'token') {
                    UploadService.upload(fileList, props.popUpParams, (event) => {
                      // setProgress(Math.round((100 * event.loaded) / event.total));
                    })
                      .then((response) => {
                        if (response.isAxiosError) {
                          setProgress(0);
                          setMessage("Could not submit the file/files!");
                          setCurrentFile(undefined);
                        }
                        else {
                          setSuccess(1);
                          props.onSuccess(response.data.dataItems[0]);
                        }
                      })
                      .catch(() => {
                        setProgress(0);
                        setMessage("Could not submit the file/files!");
                        setCurrentFile(undefined);
                      });
                    setSelectedFiles(undefined);
                  } else {
                    props.onSuccess({ files: fileList, comments: props.popUpParams.adminComments });
                  }
                }}>Submit</Button>
            </Grid>
            {uploadType === 'token' && <Grid item xs={4}>
              <Button
                classes={{ root: classes.cancelButton }}
                onClick={() => {
                  props.onClose();
                }
                }>Cancel</Button>
            </Grid>}
          </Grid>
          {uploadType !== 'token' && <Grid item style={{ textAlign: 'center', fontWeight: 600, fontSize: '12px', color: "#0E1B3D", paddingTop: '20px' }}>
            *Document will be sent to DT admin after uploading and will notify you if gets successfully verified
          </Grid>}

        </>
      )}
      {fileList.length === 0 &&
        <Grid container alignItems="center" justify="center" style={{
          paddingLeft: '130px', paddingRight: '130px', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '12px', color: '#0E1B3D', marginBottom: '20px'
        }}>
          <Grid item xs={11}>
            <ProgressBar variant="success" now={0} style={{ height: '9px' }} />
          </Grid>
          <Grid item xs={10}>
            {'.pdf, .doc, .docx, .png, .jpg, .jpeg accepted'}
          </Grid>
          <Grid item xs={1}>
            {0}%
          </Grid>
        </Grid>}
      {message && (
        <Grid container alignItems="center" justify="center">
          <Grid item style={{ fontWeight: 600, fontSize: '14px', color: "#FF0000", fontFamily: 'Dubai Light' }}>
            {message}
          </Grid>
        </Grid>
      )}

      <Grid container alignItems="center" justify="center">
        <Grid item style={{ fontWeight: 600, fontSize: '14px', color: "#C62926", fontFamily: 'Dubai Light' }}>
          {showTotalFileError && 'Maximum number of files allowed to upload is 4'}
          {showFileSizeError && `Total file size of ${(totalFileSize.current * 0.000001).toFixed(2)}MB exeeding the maximum file size of 2 MB.`}
          {showFileFormatError && 'File format is not supported'}
        </Grid>
      </Grid>

      {/* {progress === 0 && !message && (
        <Grid container alignItems="center" justify="center">
          <Grid item style={{ fontWeight: 600, fontSize: '14px', color: "#0E1B3D" }}>
            Only files with the following extensions are allowed *.pdf,.doc,.png,.jpg,.jpeg
          </Grid>
        </Grid>
      )} */}
      {(props.popUpParams.status == "PODREJ" && fileList.length == 0) &&
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <p
              style={{
                textAlign: "center",
                position: "relative",
                color: "#0E1B3D",
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              {`Uploaded ${uploadType} has been rejected by ${props.popUpParams.rejectedBy?.toLowerCase()}, please upload a new updated copy for verification.`}
            </p>
            <p style={{
              textAlign: "center",
              position: "relative",
              color: "red",
              fontWeight: 600,
              fontSize: '14px'
            }}>Reason: {props.popUpParams.rejectedBy == 'ADMIN' ? props.popUpParams.comments.adminComment : props.popUpParams.comments.importerComment}</p>
          </div>
        </div>}
      {fileList.length === 0 && uploadType !== 'token' &&
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8} style={{ textAlign: 'center', fontWeight: 600, fontSize: '12px', color: "#0E1B3D" }}>
            {props.popUpParams.customMessage ? props.popUpParams.customMessage :
              `Please note: Document will be sent to DT admin after uploading and will notify you if gets successfully verified`
            }
          </Grid>
        </Grid>}
      {props.popUpParams.message !== undefined && selectedFiles?.progress === 100 && <div className="row">

        <div className="col-md-2"></div>
        <div className="col-md-8">
          <p
            style={{
              textAlign: "center",
              position: "relative",
              color: "grey",
            }}
          >
            {props.popUpParams.message[0]}
          </p>
          <p
            style={{
              textAlign: "center",
              position: "relative",
              fontColor: "#0E1B3D",
              fontWeight: "bold"
            }}
          >
            {props.popUpParams.message[1]}{props.popUpParams.message[2]}
          </p>
          <br></br>
          <p
            style={{
              textAlign: "center",
              position: "relative",
              color: "#0E1B3D",
            }}
          >
            {props.popUpParams.message[3]} </p>
          <p>
            {props.popUpParams.message[4]}
          </p>
        </div>
      </div>}
    </>
  );
};

export default UploadDocument;
