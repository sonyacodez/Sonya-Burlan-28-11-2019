/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { makeStyles, Paper } from '@material-ui/core';
import CityStoreContext from '../../../stores/CityStore';
import toastApiClient from '../../../ApiClient/ToastApiClient';

export const FiveDayForecast = observer(() => {
    const classes = useStyles();
    const cityStore = useContext(CityStoreContext);
    const [ fiveDayForecast, setFiveDayForecast ] = useState([]);
    useEffect(() => {
        const fetchFiveDayForecast = async() => {
            setFiveDayForecast(
                await toastApiClient.getFiveDayForecast(cityStore.currentCity, cityStore.temperatureScale)
            );
        };
        fetchFiveDayForecast();
    }, []);
    return (
        <div>
            {fiveDayForecast.map(day => (
                <Paper className={classes.paper}>
                    <div>{day.weatherDescription}</div>
                    <div>{day.highTemperature}</div>
                    <div>{day.lowTemperature}</div>
                    <div>{day.date}</div>
                </Paper>
            ))}
        </div>
    );
});

const useStyles = makeStyles(() => ({
    paper: {
        height: 150,
        width: 200
    }
}));