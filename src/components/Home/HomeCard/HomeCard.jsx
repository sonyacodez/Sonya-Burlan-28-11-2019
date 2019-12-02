import React from 'react';
import { CurrentWeather } from './CurrentWeather';
import { FiveDayForecast } from './FiveDayForecast';
import { Grid, Paper, makeStyles } from '@material-ui/core';

export const HomeCard = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.root} container spacing={0}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Paper className={classes.paper}>
                        <CurrentWeather/>
                        <FiveDayForecast/>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        display: "grid"
    },
    paper: {
        opacity: 0.75,
        borderRadius: "40px",
        boxShadow: "5px 5px 30px 7px rgba(255,255,255,1), -5px -5px 30px 7px rgba(255,255,255,1)"
    }
}));
