import React, { useContext, useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { observer } from "mobx-react-lite";
import { FavoriteButton } from '../../Buttons/FavoriteButton';
import { makeStyles } from '@material-ui/core/styles';
import CityStoreContext from '../../../stores/CityStore';
import toastApiClient from '../../../ApiClient/ToastApiClient';
import { UnFavoriteButton } from '../../Buttons/UnFavoriteButton';

export const CurrentWeather = observer(() => {
    const classes = useStyles();
    const cityStore = useContext(CityStoreContext);
    const [ cityWeather, setCityWeather ] = useState({});
    const [ currentCity,setCurrentCity ] = useState(undefined);
    useEffect(() => {
        const fetchCityWeather = async() => {
            setCityWeather(
                await toastApiClient.getCurrentCityWeather(cityStore.currentCity)
            );
        };
        if(currentCity !== cityStore.currentCity){
            fetchCityWeather();
            setCurrentCity(cityStore.currentCity);
        }
    }, [currentCity, cityStore.currentCity]);
    return (
        <div>
            <Paper className={classes.paper}>
                <div>{cityStore.currentCity}</div>
                <div>{cityWeather.weatherDescription}</div>
                <div>{cityWeather.celsius}</div>
                <div>{cityWeather.fahrenheit}</div>
            </Paper>
            {cityStore.favoriteCities.includes(cityStore.currentCity) ?
            <UnFavoriteButton cityName={cityStore.currentCity}/> : 
            <FavoriteButton cityName={cityStore.currentCity}/>}
        </div>
    );
});

const useStyles = makeStyles(() => ({
    paper: {
        height: 300,
        width: 500
    }
}));