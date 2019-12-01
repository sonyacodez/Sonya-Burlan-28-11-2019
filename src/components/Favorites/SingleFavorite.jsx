/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Grid, Paper } from '@material-ui/core';
import CityStoreContext from '../../stores/CityStore';
import { makeStyles } from '@material-ui/core/styles';
import toastApiClient from "../../ApiClient/ToastApiClient";
import { UnFavoriteButton } from "../Buttons/UnFavoriteButton";

export const SingleFavorite = observer(({id, cityName}) => {
    const classes = useStyles();
    const cityStore = useContext(CityStoreContext);
    const [ favCityWeather, setFavCityWeather ] = useState({});
    const temperatureScale = cityStore.temperatureScale === "celsius" ? "celsius" : "fahrenheit";
    useEffect(() => {
        const fetchFavCityWeather = async() => {
            setFavCityWeather(await toastApiClient.getCurrentCityWeather(cityName));
        };
        fetchFavCityWeather();
    }, []);
    const updateCurrentCity = () => cityStore.currentCity = cityName;
    return (
        <Grid item>
            <Link to="/">
                <Paper id={id} className={classes.paper} onClick={updateCurrentCity}>
                    <div>{cityName}</div>
                    <div>{favCityWeather[temperatureScale]}</div>
                    <div>{favCityWeather.weatherDescription}</div>
                </Paper>
            </Link>
            <UnFavoriteButton cityName={cityName}/>
        </Grid>
    );
});

const useStyles = makeStyles(() => ({
    paper: {
      height: 200,
      width: 300
    }
}));