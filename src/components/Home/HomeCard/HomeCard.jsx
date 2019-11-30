import React from 'react';
import { CurrentWeather } from './CurrentWeather';
import { FiveDayForecast } from './FiveDayForecast';
import { Grid, Paper, makeStyles } from '@material-ui/core';

export const HomeCard = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={0}>
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
    paper: {
        height: 300,
        width: 500
    }
}));
