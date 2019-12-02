import React, { useContext, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { makeStyles, Paper, Grid } from '@material-ui/core';
import CityStoreContext from '../../../stores/CityStore';
import toastApiClient from '../../../ApiClient/ToastApiClient';
import {
    faSun,
    faWind,
    faBolt, 
    faSnowflake,
    faCloudSun, 
    faCloudShowersHeavy
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FiveDayForecast = observer(() => {
    const classes = useStyles();
    const cityStore = useContext(CityStoreContext);
    const [ currentCity, setCurrentCity ] = useState(undefined);
    const [ fiveDayForecast, setFiveDayForecast ] = useState([]);
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const whichDay = unformattedDate => daysOfWeek[new Date(unformattedDate).getDay()];
    const weatherIcon = text => {
        return text.toLowerCase().includes("cloud") ? faCloudSun :
        text.toLowerCase().includes("rain") ? faCloudShowersHeavy :
        text.toLowerCase().includes("thunder") ? faBolt :
        text.toLowerCase().includes("snow") ? faSnowflake :
        text.toLowerCase().includes("sun") ? faSun :
        text.toLowerCase().includes("wind") ? faWind :
        null;
    };
    useEffect(() => {
        const fetchFiveDayForecast = async() => {
            setFiveDayForecast(
                await toastApiClient.getFiveDayForecast(cityStore.currentCity, cityStore.temperatureScale)
            );
        };
        if(cityStore.currentCity !== currentCity){
            fetchFiveDayForecast();
            setCurrentCity(cityStore.currentCity);
        }
    }, [currentCity, cityStore.currentCity, cityStore.temperatureScale]);
    return (
        <Grid container spacing={1}>
            {fiveDayForecast.map((day, index) => (
                <Grid className={classes.root} item xs>
                    <div className={classes.fiveDayForecast}>
                        <Paper key={index} className={classes.paper}>
                            <div>{whichDay(day.date)}</div>
                            <FontAwesomeIcon size="5x" icon={weatherIcon(day.weatherDescription)}/>
                            <div>
                                <span className={classes.highTemperature}>{day.highTemperature}</span>
                                <span className={classes.separator}> / </span>
                                <span className={classes.lowTemperature}>{day.lowTemperature}</span>
                            </div>
                        </Paper>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
});

const useStyles = makeStyles(() => ({
    root: {
        display: "flex"
    },
    fiveDayForecast: {
        padding: "1.3vmin",
        flexDirection: "column",
        justifyContent: "center"
    },
    paper: {
        height: '22vh',
        borderRadius: "40px",
        fontSize: "2.3vh"
    },
    highTemperature: {
        color: "red"
    },
    lowTemperature: {
        color: "blue"
    },
    separator: {
        color: "black"
    }
}));