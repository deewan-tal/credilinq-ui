

import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Box
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
}))

export function Header() {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position='static' style={{ backgroundColor: '#190553' }}>
                <Toolbar>
                    <Typography>Credilinq.AI</Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Typography style={{ padding: '12px' }}>SME HealthCheck - Application Form</Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
