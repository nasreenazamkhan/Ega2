import React, { useEffect, useState } from "react";
import "./filupload.css";
import { IconButton, Icon, Tooltip } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

const ApplnFileUpload = (props: any) => {
  const [uploadClass, setUploadClass] = useState("dnd-area");
  const [droppedFile, setDroppedFile] = useState(false);
  const [droppedFileName, setDroppedFileName] = useState("");
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;

  const { label, name, ...rest } = props;
  const fileuploadRef: any = React.createRef();
  useEffect(() => {}, []);

  const handleDragOver = (e: any) => {
    setUploadClass("dnd-area dnd-hover");
    e.preventDefault();
  };

  const handleDragLeave = (e: any) => {
    setUploadClass("dnd-area");
    e.preventDefault();
  };

  const checkValidFileTypes = (file: any) => {
    // console.log(file.type);
    let validType = false;
    // if (!this.allowedFileTypes)
    //   return true;

    // for (let i = 0; i < this.allowedFileTypes.length; i++) {
    //   if (file.type.indexOf(this.uploadTypeMapping[this.allowedFileTypes[i]]) !== -1) {
    //     validType = true;
    //     break;
    //   }
    // }
    return validType;
  };

  const handleDrop = (e: any) => {
    processFile(e.dataTransfer.files[0]);
    e.preventDefault();
  };
  const processFile = (inpFile: any) => {
    console.log("processing the file " + inpFile.name);
    const file = inpFile;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.readAsBinaryString(file);
    reader.onload = () => {
      setValue(name, reader.result);
      setDroppedFile(true);
      setDroppedFileName(inpFile.name);
    };
  };

  const clearUpload = () => {
    setDroppedFile(false);
    setValue(name, "");
    setDroppedFileName("");
    setUploadClass("dnd-area");
    fileuploadRef.current.value = "";
  };

  const showFileUpload = () => {
    fileuploadRef.current.click();
  };
  const onFilesAdded = (event: any) => {
    setUploadClass("dnd-area dnd-hover");
    processFile(event.target.files[0]);
  };

  return (
    <>
      <Controller
        name={props.name}
        control={control}
        render={(renderProps) => (
          <>
            <div>{props.label}</div>
            <div className="drop-area">
              {!droppedFile && (
                <div
                  className={uploadClass}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={showFileUpload}
                >
                  <div>
                    <IconButton>
                      <Icon>description</Icon>
                    </IconButton>
                    <p>Drag & Drop </p>
                    <p>Files Here</p>
                    <p style={{ color: "red" }}>or</p>
                    <p>
                      <span className="upload-browse">browse files</span>
                    </p>
                  </div>
                </div>
              )}
              {droppedFile && (
                <div className={uploadClass}>
                  <div className="file-dropped">
                    <span className="fileLoaded">
                      {droppedFileName}
                      <Tooltip title="delete" placement="top" arrow>
                        <IconButton className="del-icon" onClick={clearUpload}>
                          <Icon>delete</Icon>
                        </IconButton>
                      </Tooltip>
                    </span>
                  </div>
                </div>
              )}

              <input
                type="file"
                id="my_file"
                style={{ display: "none" }}
                onChange={onFilesAdded}
                ref={fileuploadRef}
              />
            </div>
          </>
        )}
      />
    </>
  );
};

export default ApplnFileUpload;
