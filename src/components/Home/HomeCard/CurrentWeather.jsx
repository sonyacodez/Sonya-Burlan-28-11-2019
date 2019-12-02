import React, { useContext, useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { observer } from "mobx-react-lite";
import { FavoriteButton } from '../../Buttons/FavoriteButton';
import { makeStyles } from '@material-ui/core/styles';
import StateStoreContext from '../../../stores/StateStore';
import toastApiClient from '../../../ApiClient/ToastApiClient';
import { UnFavoriteButton } from '../../Buttons/UnFavoriteButton';

export const CurrentWeather = observer(() => {
    const classes = useStyles();
    const stateStore = useContext(StateStoreContext);
    const [ cityWeather, setCityWeather ] = useState({});
    const [ currentCity,setCurrentCity ] = useState(undefined);
    useEffect(() => {
        const fetchCityWeather = async() => {
            setCityWeather(
                await toastApiClient.getCurrentCityWeather(stateStore.currentCity)
            );
        };
        if(currentCity !== stateStore.currentCity){
            fetchCityWeather();
            setCurrentCity(stateStore.currentCity);
        }
    }, [currentCity, stateStore.currentCity]);
    return (
        <div>
            <Paper className={classes.paper}>
                <div>{stateStore.currentCity}</div>
                <div>{cityWeather.weatherDescription}</div>
                <div>{cityWeather.celsius}</div>
                <div>{cityWeather.fahrenheit}</div>
            </Paper>
            {stateStore.favoriteCities.includes(stateStore.currentCity) ?
            <UnFavoriteButton cityName={stateStore.currentCity}/> : 
            <FavoriteButton cityName={stateStore.currentCity}/>}
        </div>
    );
});

const useStyles = makeStyles(() => ({
    paper: {
        width: "100%",
        height: "20vh",
        borderRadius: "40px"
    }
}));