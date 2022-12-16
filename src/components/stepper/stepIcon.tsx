import React from 'react';
import {
    makeStyles,
} from '@material-ui/core';
import Check from '@material-ui/icons/Check';

const useQontoStepIconStyles = makeStyles({
    circle: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#ec0055',
        textAlign: 'center',
        color: '#ffffff'
    },
    completed: {
        color: '#ffffff',
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#2e7d32'
    },
});

export interface IStepIcon {
    completed: boolean;
    icon: React.ReactNode;
}

export function StepIcon(props: IStepIcon) {
    const classes = useQontoStepIconStyles();
    const { completed, icon } = props;

    return (
        <div>
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} >{icon}</div>}
        </div>
    );
}
