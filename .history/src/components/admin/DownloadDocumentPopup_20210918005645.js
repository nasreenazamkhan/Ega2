import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import "../../lib/components/fileupload/filupload.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "bootstrap/dist/css/bootstrap.min.css";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { saveAs } from 'file-saver';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  TextField,
  Button,
  withStyles,
  createStyles
} from "@material-ui/core";
import JSZip from "jszip";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  root: {
  },
  flexGrow: 3,
  menuButton: {
    color: "#fff",
    textTransform: "none",
    fontFamily:'Dubai Light',
    fontWeight:600
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
  inputTextField: {
    padding: '0px 10px 0px 5px'
  },
}));

const StyledButton1 = withStyles(() =>
    createStyles({
        root: {
            width: "100px",
            height: "39px",
            boxShadow: "0px 1px 4px #00000029",
            borderRadius: "3px",
            opacity: 1,
            alignSelf: "right",
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            fontSize: '0.8rem',
        },
    })
)(Button);

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

const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      borderBottom: 'none',
      fontSize: '0.9rem',
      whiteSpace: 'nowrap',
      padding: '5px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      color: '#848484',
      width: '160px'
    },
    body: {
      fontSize: '0.9rem',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      color: '#434343',
      borderBottom: '0px',
      padding: '5px',
    },
  }),
)(TableCell);

export default function DownloadDocumentPopUp(props) {
  const [open, setOpen] = React.useState(true);
  const [,setRefresh] = React.useState(false);
  const classes = useStyles();
  const [message, setMessage] = React.useState({
    downloadAll: '',
    podApprove: ''
  });
  const userData= useSelector(state => state.loginUser);
  const userType=userData.user.user_type;

  const handleClose = () => {
    props.onClose()
  }

  useEffect(() => {
    props.fileList.forEach(element => {
      let type = element.fileName.split('.')[1];
      element.fileType = type;
    });
    setRefresh(true);
    console.log(props.container);
    if (userType ==='ADMIN' && props.container.refStatus.code === 'PODUPL' && props.canApprove)
      setMessage({
        ...message,
        podApprove: "POD not approved by importer do you want to continue?"
      })
  }, [])

  const downloadFile = (file) => {
    const linkSource = `data:${file.filetype};base64,${file.fileContent}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = file.fileName;
    downloadLink.target = "_blank";
    // alert(downloadLink);
    downloadLink.click();
  }

  const downloadAllFiles = () => {
    // window.alert('testing')
     const zip = new JSZip();
      let count = 0;
      const filename=props.container.container_number
      const zipFilename = filename +".zip";
      let size = 0;
      props.fileList.forEach(file=>{
        size = size + file.fileSize;
      })
      console.log(props.fileList);
      props.fileList.forEach(file=>{
        if(size <= 500000){
          try {
            const fileContent = file.fileContent;
            zip.file(file.fileName, fileContent, {base64:true});
            count++;
            if(count === props.fileList.length) {
              zip.generateAsync({type:'blob'}).then(function(content) {
                saveAs(content, zipFilename);
              });
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          setMessage({
            ...message,
            downloadAll: "File Size is large Please download single file."
          })
        }
      });
  }

  const RenderToolBar = () => {
    return (
      <Toolbar>
        <label for="image">
          <input
            type="button"
            name="image"
            id="image"
            className={classes.center}
            onClick={() => {
              downloadAllFiles()
            }}
          />
          <img
            src="./pod_download_all.png"
            style={{
              marginLeft: "90%",
              width: "80%",
            }}
          />
        </label>
      </Toolbar>
    )
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: '0px', width: '610px', minHeight: '300px' }
        }}
      >
           <DialogTitle
        style={{
          backgroundColor: "#FFF",
          color: "black",
          textAlign: "left",
        }}
      >
        <IconButton
          className="icon-button"
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
        <DialogContent style={{ paddingLeft: 0, paddingRight: 0, flex:'none' }}>
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
          <Table>
            <TableBody>
              {message.podApprove && <TableRow>
                <StyledTableCell align="center" style={{ color: '#007CD3' }}>
                  {message.podApprove}
                </StyledTableCell>
              </TableRow>}
              {message.downloadAll && <TableRow>
                <StyledTableCell align="center" style={{ color: '#EA2428' }}>
                  {message.downloadAll}
                </StyledTableCell>
              </TableRow>}
              <TableRow>
                <StyledTableCell>
                  <Grid container style={{ paddingLeft: '50px', paddingTop: '20px', marginBottom:'0px !important' }}>
                    {props.fileList.map((file) => (<>
                      <Grid item style={{ width: '40px' }}>
                        {(file.fileType === "JPG" || file.fileType === "jpg" || file.fileType === "jpeg") && <img src="./jpg_icon.svg" />}
                        {file.fileType === "pdf" && <img src="./pdf_icon_small.svg" />}
                        {(file.fileType === "doc" || file.fileType === "docx") && <img src="./doc_icon.svg" />}
                        {(file.fileType === "png") && <img src="./png_icon.svg" />}
                      </Grid>
                      <Grid item style={{ fontSize: '14px', paddingBottom: '35px', paddingTop: '10px', minWidth: '160px' }}>{file.fileName}</Grid>
                      <Grid item xs={1} style={{ paddingRight: '70px', paddingTop: '5px' }}><img src="./pod_download.svg"
                        onClick={() => downloadFile(file)
                        }
                      />
                      </Grid></>))}
                  </Grid>
                </StyledTableCell>
              </TableRow>
              {(['PODUPL', 'PODIMPAPPR'].includes(props.container.refStatus.code) && props.canApprove) && <TableRow >
                <StyledTableCell style={{paddingLeft:'40px', paddingRight:'40px'}}>
                  <CssTextField
                    placeholder="Review Comments"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      className: classes.inputTextField,
                    }}
                    onChange={(e) => {
                      props.container.remarks =
                        e.target.value;
                    }}
                  />
                </StyledTableCell>
              </TableRow>}
            </TableBody>
          </Table>
        </DialogContent>
        {(['PODUPL', 'PODIMPAPPR'].includes(props.container.refStatus.code) && props.canApprove) &&
          <DialogActions style={{ alignSelf: "center", marginBottom:'40px' }}>
            <StyledButton1
              style={{background:'#63BB7A',marginRight:'80px'}}
              onClick={() => {
                props.onApprove()
              }}
            >
              Approve
            </StyledButton1>
            <StyledButton1
              style={{background:'#FF7275'}}
              onClick={() => {
                props.onReject()
              }}
            >
              Reject
            </StyledButton1>
          </DialogActions>
        }
      </Dialog>
    </div>
  );
}
