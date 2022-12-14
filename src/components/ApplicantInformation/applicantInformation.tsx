import React from "react";
import {
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export interface ApplicantInformationProps {
    fullnameChange: Function;
    positionChange: Function;
    mobileChange: Function;
    emailChange: Function;
    confirmEmailChange: Function;
    confirmEmailMatch: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 380,
        },
    },
    phone: {
        margin: theme.spacing(1),
        width: '380px'
    }

}));

export function ApplicantInformation(props: ApplicantInformationProps) {
    const [invalidfullname, setInvalidfullname] = React.useState(false);
    const [invalidPosition, setInvalidPosition] = React.useState(false);
    const [invalidMobile, setInvalidMobile] = React.useState(false);
    const [invalidEmail, setInvalidEmail] = React.useState(false);
    const [invalidConfirmEmail, setInvalidConfirmEmail] = React.useState(false);

    const fullnameChange = (evt: any) => {
        const {
            target: { value },
        } = evt;
        if (value.trim()) { setInvalidfullname(false) } else { setInvalidfullname(true) }
        props.fullnameChange(value)
    }

    const positionChange = (evt: any) => {
        const {
            target: { value },
        } = evt;
        if (value.trim()) { setInvalidPosition(false) } else { setInvalidPosition(true) }
        props.positionChange(value)
    }

    const mobileChange = (phone: string) => {
        console.log(phone)
        if (phone.trim()) {
            if (phone.length < 11) {
                setInvalidMobile(true)
            } else {
                setInvalidMobile(false)
            }

        } else {
            setInvalidMobile(true)
        }
        props.mobileChange(phone)
    }

    const emailChange = (evt: any) => {
        const {
            target: { value },
        } = evt;

        if (value.trim()) {
            if (validateEmail(value)) {
                setInvalidEmail(false)
            } else {
                setInvalidEmail(true)
            }
        }
        else {
            setInvalidEmail(true)
        }

        props.emailChange(value)
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    };

    const confirmEmailChange = (evt: any) => {
        const {
            target: { value },
        } = evt;
        if (value.trim()) {
            if (validateEmail(value)) {
                setInvalidConfirmEmail(false)
            } else {
                setInvalidConfirmEmail(true)
            }
        }
        else {
            setInvalidConfirmEmail(true)
        }
        props.confirmEmailChange(value)
    }

    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <div>
                    <TextField
                        error={invalidfullname}
                        variant="outlined"
                        onChange={fullnameChange}
                        label="Full Name"
                        helperText={invalidfullname ? "Invalid Full Name" : ""}
                    >
                    </TextField>
                    <TextField
                        error={invalidPosition}
                        variant="outlined"
                        onChange={positionChange}
                        label="Position within Company"
                        helperText={invalidPosition ? "Invalid Business Name" : ""}
                    >
                    </TextField>
                </div>
                <div style={{ display: 'inline-flex' }}>
                    <PhoneInput
                        country={'in'}
                        onChange={phone => mobileChange(phone)}
                        inputStyle={{
                            width: '380px',
                            height: '56px',
                            borderColor: invalidMobile ? 'red' : ''
                        }}
                        buttonStyle={{ height: '56px' }}
                        containerClass={classes.phone}
                    />
                    <TextField
                        error={invalidEmail}
                        variant="outlined"
                        onChange={emailChange}
                        label="Email Address"
                        helperText={invalidEmail ? "Invalid Email Address" : ""}
                    >
                    </TextField>
                </div>
                <div>
                    <TextField
                        error={invalidConfirmEmail || !props.confirmEmailMatch}
                        variant="outlined"
                        onChange={confirmEmailChange}
                        label="Re-enter Email Address"
                        helperText={invalidConfirmEmail ? "Invalid Re-enter Email Address" : !props.confirmEmailMatch ? "Email does not Match" : ""}
                    >
                    </TextField>
                </div>
            </div>
        </div >
    )
}