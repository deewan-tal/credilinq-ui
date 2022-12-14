import React from "react";
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface BusinessInformationProps {
    businessUENChange: Function;
    businessNameChange: Function;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 380,
        },
    },

    inputText: {
        margin: theme.spacing(1),
        width: 500,
    }
}));

export function BusinessInformation(props: BusinessInformationProps) {
    const [invalidUEN, setInvalidUEN] = React.useState(false);
    const [invalidName, setInvalidName] = React.useState(false);

    const businessUENChange = (evt: any) => {
        const {
            target: { value },
        } = evt;

        if (value.trim()) { setInvalidUEN(false) } else { setInvalidUEN(true) }
        props.businessUENChange(value)
    }

    const businessNameChange = (evt: any) => {
        const {
            target: { value },
        } = evt;
        if (value.trim()) { setInvalidName(false) } else { setInvalidName(true) }
        props.businessNameChange(value)
    }
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <div>
                    <TextField
                        error={invalidUEN}
                        variant="outlined"
                        onChange={businessUENChange}
                        label="Business UEN"
                        helperText={invalidUEN ? "Invalid Business UEN" : ""}

                    >
                    </TextField>
                    <TextField
                        error={invalidName}
                        variant="outlined"
                        onChange={businessNameChange}
                        label="Business Name"
                        helperText={invalidName ? "Invalid Business Name" : ""}
                    >
                    </TextField>
                </div>
            </div>
        </div >
    )
}