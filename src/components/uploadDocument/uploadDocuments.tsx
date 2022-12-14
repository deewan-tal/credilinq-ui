import React from "react";
import {
    TableHead,
    TableRow,
    TableCell,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import { makeStyles, } from '@material-ui/core/styles';
import { DropzoneArea, FileObject } from "material-ui-dropzone";
import DoneIcon from "@material-ui/icons/Done";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import * as api from "../../services/api.request";


const useStyles = makeStyles(theme => ({
    dropZone: {
        height: '100%',
        fullWidth: 'true',
        paddingTop: '50px',
    },
    dropZoneText: {
        fontSize: '15px !important',
    },
}));

export enum UploadStatus {
    'INPROGRESS' = 'inProgress',
    'SUCCESS' = 'success',
    'FAILED' = 'failed'
}

export function UploadDocument(props: { onUploadDocument: Function, onDeleteDocument: Function }) {
    const classes = useStyles();
    const [status, setStatus] = React.useState(UploadStatus.INPROGRESS);

    const onUploadDocument = async (files: File[]) => {
        if (!files.length) return;
        console.log('uploaded file');
        const uploadedFile = files[files.length - 1];
        console.log(uploadedFile);

        // let formData = new FormData();
        // formData.append('file', uploadedFile);

        // const url = api.getBaseApiUrl() + '/form/upload';
        // try {
        //     const response = await api.callAPI(url, 'POST', formData, {
        //         'Content-Type': "multipart/form-data"
        //     });
        //     console.log(response);
        // } catch (err) {
        //     console.log(err);
        //     console.log('failed file upload');
        // }

        props.onUploadDocument(files);
    }

    const onDeleteFile = (file: File) => {
        console.log('file removed');
        props.onDeleteDocument(file);

    }

    const filePreview = (file: FileObject, classes: any) => {
        return (
            <div className="preview">
                {file.file.name}<HighlightOffIcon />
            </div>
        )
    }

    return (
        <div>
            <TableHead>
                <TableRow>
                    <TableCell style={{ borderBottom: 'none', padding: '0 5px 5px 0' }}>
                        <div style={{ width: '360px', float: 'left' }}>
                            <DropzoneArea
                                onChange={(e) => onUploadDocument(e)}
                                onDelete={(e) => onDeleteFile(e)}
                                showPreviews={true}
                                showPreviewsInDropzone={false}
                                dropzoneText={`click to upload or drag and drop bank statements`}
                                dropzoneClass={classes.dropZone}
                                showAlerts={['error']}
                                acceptedFiles={['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']}
                                dropzoneProps={{}}
                                // previewGridProps={{
                                //     container: { direction: 'row', xs: true, spacing: 1 },
                                //     item: { direction: 'row', xs: true, }
                                // }}
                                dropzoneParagraphClass={classes.dropZoneText}
                                getPreviewIcon={(file, classes) => filePreview(file, classes)}
                                getFileLimitExceedMessage={(num) => 'file upload limit exceeds'}
                            />
                        </div>
                    </TableCell>
                    <TableCell style={{ borderBottom: 'none', padding: '5px' }}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText secondary="PDFs (not scanned coppies) of company's active operating bank account(s) statements for the past 6 months"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    {/* <DoneIcon /> */}
                                </ListItemIcon>
                                <ListItemText secondary="Example: if today is 2 july 22, then please upload bank statement from Jan 22 to Jun 22(both months inclusive)"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText secondary="If Your Company is multi-banked then please upload 6 months bank statements for each bank account"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText secondary="If your file is password protected, we request you to remove the password and upload the file to avoid submission failure"></ListItemText>
                            </ListItem>
                        </List>
                    </TableCell>
                </TableRow>
            </TableHead>
        </div >
    )
}