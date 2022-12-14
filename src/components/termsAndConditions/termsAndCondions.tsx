import React from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export function getConditions() {
    return {
        one: "I assure that uploaded bank statements and provided complany information matches and are of same company,if there is a mismatch then my report will not be generated",
        two: "I understand that this is a general report based on the bank statement and credilinq is not providing a solution or guiding me for my bisiness growth",
        three: "I duly accept the Terms & Conditions",
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControlLabel-root': {
            marginBottom: theme.spacing(1)
        },
    },
}));

export function TermsAndConditions(props: { setTermsAndConditions: Function }) {
    const conditions = getConditions();

    const [termsAccepted, setTermsAcceptance] = React.useState({
        one: false,
        two: false,
        three: false,
    });

    const handleChange = (event: any) => {
        console.log(event)
        const updatedTermsAcceptance = {
            ...termsAccepted, [event.target.name]: event.target.checked
        }
        setTermsAcceptance(updatedTermsAcceptance);
        props.setTermsAndConditions(conditions, updatedTermsAcceptance);
    };

    const classes = useStyles();

    return (
        <div >
            <div style={{ display: 'flex' }} className={classes.root}>
                <FormControl component="fieldset">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={termsAccepted.one} onChange={(e) => handleChange(e)} name="one" />}
                            label={conditions['one']}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={termsAccepted.two} onChange={(e) => handleChange(e)} name="two" />}
                            label={conditions['two']}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={termsAccepted.three} onChange={(e) => handleChange(e)} name="three" />}
                            label={conditions['three']}
                        />
                    </FormGroup>
                </FormControl>

            </div>
        </div>
    )
}