import React, { useContext, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { makeStyles } from '@material-ui/core';
import StateStoreContext from '../../../stores/StateStore';
import toastApiClient from '../../../ApiClient/ToastApiClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import staticData from '../../../staticData';

export const FiveDayForecast = observer(() => {
    const classes = useStyles();
    const stateStore = useContext(StateStoreContext);
    const [ currentCity, setCurrentCity ] = useState(undefined);
    const [ currentTemperatureScale, setCurrentTemperatureScale ] = useState(undefined);
    const [ fiveDayForecast, setFiveDayForecast ] = useState([]);
    useEffect(() => {
        const fetchFiveDayForecast = async() => {
            setFiveDayForecast(
                await toastApiClient.getFiveDayForecast(stateStore.currentCity, stateStore.temperatureScale)
            );
        };
        if(stateStore.currentCity !== currentCity){
            fetchFiveDayForecast();
            setCurrentCity(stateStore.currentCity);
        }
        if(stateStore.temperatureScale !== currentTemperatureScale){
            fetchFiveDayForecast();
            setCurrentTemperatureScale(stateStore.temperatureScale);
        }
    }, [currentCity, currentTemperatureScale, stateStore.currentCity, stateStore.temperatureScale]);
    return (
        <div className={classes.root}>
            {fiveDayForecast.map((day, index) => (
                <div key={index} className={classes.fiveDayForecast}>
                    <div>{staticData.whichDay(day.date)}</div>
                    <div>
                        <FontAwesomeIcon size="5x" icon={staticData.whichWeatherIcon(day.weatherDescription)}/>
                    </div>
                    <div>
                        <span className={classes.highTemperature}>{day.highTemperature}°</span>
                        <span className={classes.separator}> / </span>
                        <span className={classes.lowTemperature}>{day.lowTemperature}°</span>
                    </div>
                </div>
            ))}
        </div>
    );
});

const useStyles = makeStyles(() => ({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(111px, 1fr))",
        gridRowGap: "1em"
    },
    fiveDayForecast: {
        padding: "1.3vmin",
        borderRadius: "40px",
        fontSize: "2.3vh",
        textAlign: "center",
        '& div': {
            paddingBottom: "1vh"
        }
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