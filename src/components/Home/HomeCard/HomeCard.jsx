import React from 'react';
import { CurrentWeather } from './CurrentWeather';
import { FiveDayForecast } from './FiveDayForecast';
import { Grid, Paper, makeStyles } from '@material-ui/core';

export const HomeCard = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Grid className={classes.root} container justify="center" spacing={2}>
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
        height: "80vh"
    },
    paper: {
        color: "black",
        height: "50vh",
        width: "60%",
        opacity: 0.75,
        borderRadius: "40px",
        boxShadow: "5px 5px 30px 7px rgba(10,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22)"
    }
}));
