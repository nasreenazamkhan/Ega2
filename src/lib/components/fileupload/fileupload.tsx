import React, { useEffect, useState } from 'react';
import './filupload.css';
import { Field, FieldProps } from 'formik';
import { IconButton, Icon, Tooltip } from '@material-ui/core';

const Fileupload = (props: any) => {
    const [uploadClass, setUploadClass] = useState('dnd-area');
    const [droppedFile, setDroppedFile] = useState(false);
    const [droppedFileName, setDroppedFileName] = useState('');

    const { label, name, ...rest } = props;
    const fileuploadRef: any = React.createRef();
    useEffect(() => {

    }, []);

    const handleDragOver = (e: any) => {
        setUploadClass('dnd-area dnd-hover');
        e.preventDefault();

    }

    const handleDragLeave = (e: any) => {
        setUploadClass('dnd-area');
        e.preventDefault();
    }


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

    }


    return (
        <>
            <Field name={name}>
                {
                    ({ form, field }: FieldProps) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        const handleDrop = (e: any) => {
                            processFile(e.dataTransfer.files[0]);
                            e.preventDefault();
                        }
                        const processFile = (inpFile: any) => {
                            console.log("processing the file " + inpFile.name);
                            const file = inpFile;

                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            // reader.readAsBinaryString(file);
                            reader.onload = () => {
                                setFieldValue(name, reader.result);
                                setDroppedFile(true);
                                setDroppedFileName(inpFile.name);

                            };
                        }

                        const clearUpload = () => {
                            setDroppedFile(false);
                            setFieldValue(name, '');
                            setDroppedFileName('');
                            fileuploadRef.current.value = '';

                        }

                        const showFileUpload = () => {
                            fileuploadRef.current.click();
                        }
                        const onFilesAdded = (event: any) => {
                            processFile(event.target.files[0]);
                        }

                        return (
                            <>
                                <div>{props.label}</div>
                                <div className="drop-area" >
                                    {!droppedFile && <div className={uploadClass}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                                        onClick={showFileUpload}>
                                        <div>
                                            <IconButton>
                                                <Icon>description</Icon>
                                            </IconButton>
                                            <p>Drag & Drop </p>
                                            <p>Files Here</p>
                                            <p style={{ color: "red" }}>or</p>
                                            <p><span className="upload-browse">browse files</span></p>
                                        </div>
                                    </div>}
                                    {droppedFile && <div className={uploadClass}>
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
                                    </div>}

                                    <input type="file"
                                        id="my_file" style={{ display: 'none' }}
                                        onChange={onFilesAdded}
                                        ref={fileuploadRef} />

                                </div>
                            </>
                        )

                    }
                }
            </Field>

        </>
    )
}

export default Fileupload;
