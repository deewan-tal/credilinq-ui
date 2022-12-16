import React from 'react';
import {
    makeStyles,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
} from '@material-ui/core';
import { Form } from 'reactstrap';
import { Section } from '../common/section';
import { BusinessInformation } from '../businessInformation/businessInformation';
import { ApplicantInformation } from '../ApplicantInformation/applicantInformation';
import { UploadDocument } from '../uploadDocument/uploadDocuments';
import { TermsAndConditions } from '../termsAndConditions/termsAndCondions';
import * as api from "../../services/api.request";
import { StepIcon } from '../stepper/stepIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(1),
    },
    resetContainer: {
        padding: theme.spacing(3),
    }
}));


function getSteps() {
    return ['Business Information', 'Applicant Information', 'Upload Documents', 'Terms & Conditions'];
}


export function ApplicationForm() {
    const [businessUEN, setBusinessUEN] = React.useState('');
    const [businessName, setBusinessName] = React.useState('');
    const [fullname, setFullname] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [confirmEmail, setConfirmEmail] = React.useState('');
    const [confirmEmailMatch, setConfirmEmailMatch] = React.useState(true);
    const [filenames, setFilenames] = React.useState([] as string[]);
    const [termsAndConditions, setTermsAndConditions] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);

    const classes = useStyles();
    const steps = getSteps();

    const handleSteps = () => {
        if (businessUEN && businessName) {
            setActiveStep(1);
        } else {
            setActiveStep(0);
            return;
        }

        if (fullname && position && mobile && email && confirmEmail) {
            setActiveStep(2);
        } else {
            setActiveStep(1);
            return;
        }
    }

    const businessUENChange = (uen: string) => {
        setBusinessUEN(uen);
        handleSteps();
    }

    const businessNameChange = (name: string) => {
        setBusinessName(name);
        handleSteps();
    }

    const fullnameChange = (name: string) => {
        setFullname(name);
        handleSteps();
    }

    const positionChange = (position: string) => {
        setPosition(position);
        handleSteps();
    }

    const mobileChange = (mobile: string) => {
        setMobile(mobile);
        handleSteps();
    }

    const emailChange = (email: string) => {
        setEmail(email);
        handleSteps();
    }

    const confirmEmailChange = (confirmEmail: string) => {
        setConfirmEmail(confirmEmail);
        if (email) {
            if (email === confirmEmail) {
                setConfirmEmailMatch(true)
            } else {
                setConfirmEmailMatch(false)
            }
        }
        handleSteps();
    }

    const onUploadDocument = (files: File[]) => {
        const fileuploadnames = files.map(file => file.name);
        setFilenames(fileuploadnames);
        if (fileuploadnames.length > 0) {
            setActiveStep(3)
        } else {
            setActiveStep(2);
        }
    }

    const onDeleteDocument = (file: File) => {
        const updatedFiles = filenames.filter(filename => filename !== file.name);
        setFilenames(updatedFiles);
        if (updatedFiles.length > 0) {
            setActiveStep(3)
        } else {
            setActiveStep(2);
        }
    }

    const setConditions = (conditions: any, active: any) => {
        setTermsAndConditions({ conditions, active })
        setActiveStep(4)
    }

    const onSubmit = async (evt: any) => {
        evt.preventDefault();
        console.log('submitting')
        const data = { businessUEN, businessName, fullname, position, mobile, email, filenames, termsAndConditions };
        console.log(data);
        const url = api.getBaseApiUrl() + '/form/submit';
        const response = await api.callAPI(url, 'POST', data);
        console.log(response.data);
    }

    const switchComponents = (index: number) => {
        switch (index) {
            case 0:
                return (
                    <BusinessInformation
                        businessUENChange={businessUENChange}
                        businessNameChange={businessNameChange}
                    />
                )
            case 1:
                return (
                    <ApplicantInformation
                        fullnameChange={fullnameChange}
                        positionChange={positionChange}
                        mobileChange={mobileChange}
                        emailChange={emailChange}
                        confirmEmailChange={confirmEmailChange}
                        confirmEmailMatch={confirmEmailMatch}
                    />
                )
            case 2:
                return (
                    <UploadDocument
                        onUploadDocument={onUploadDocument}
                        onDeleteDocument={onDeleteDocument}
                    />
                )
            case 3:
                return (
                    <TermsAndConditions setTermsAndConditions={setConditions} />
                )
            default:
                return 'Unknown step';
        }
    }

    return (
        <div>
            <Form>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label} expanded={true}>
                                <StepLabel
                                    StepIconComponent={StepIcon}
                                    StepIconProps={{ icon: index + 1 }}
                                >
                                    <Section name={label}></Section>
                                </StepLabel>
                                <StepContent >
                                    {switchComponents(index)}
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: '10px 0px 10px 87%' }}
                    onClick={(e) => onSubmit(e)}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
}
