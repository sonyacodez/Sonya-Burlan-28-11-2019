/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { observer } from "mobx-react-lite";
import { makeStyles } from '@material-ui/core/styles';
import CityStoreContext from '../../../stores/CityStore';
import toastApiClient from '../../../ApiClient/ToastApiClient';

export const CurrentWeather = observer(() => {
    const classes = useStyles();
    const cityStore = useContext(CityStoreContext);
    const [ cityWeather, setCityWeather ] = useState({});
    useEffect(() => {
        const fetchCityWeather = async() => {
            setCityWeather(await toastApiClient.getCurrentCityWeather(cityStore.currentCity))
        }
        fetchCityWeather()
    }, [])
    return (
        <div>
            <Paper className={classes.paper}>
                <div>{cityStore.currentCity}</div>
                <div>{cityWeather.weatherDescription}</div>
                <div>{cityWeather.celsius}</div>
                <div>{cityWeather.fahrenheit}</div>
            </Paper>
        </div>
    );
});

const useStyles = makeStyles(() => ({
    paper: {
        height: 300,
        width: 500
    }
}));