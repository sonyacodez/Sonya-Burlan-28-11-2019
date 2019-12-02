import React, { useContext, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { makeStyles, Grid } from '@material-ui/core';
import StateStoreContext from '../../../stores/StateStore';
import toastApiClient from '../../../ApiClient/ToastApiClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FiveDayForecast = observer(() => {
    const classes = useStyles();
    const stateStore = useContext(StateStoreContext);
    const [ currentCity, setCurrentCity ] = useState(undefined);
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
    }, [currentCity, stateStore.currentCity, stateStore.temperatureScale]);
    return (
        <Grid container className={classes.root} spacing={1}>
            {fiveDayForecast.map((day, index) => (
                <Grid item xs={12} key={index} className={classes.fiveDayForecast}>
                    <div className={classes.fiveDayForecast}>
                        <div>{stateStore.whichDay(day.date)}</div>
                        <div><FontAwesomeIcon size="5x" icon={stateStore.whichWeatherIcon(day.weatherDescription)}/></div>
                        <div>
                            <span className={classes.highTemperature}>{day.highTemperature}°</span>
                            <span className={classes.separator}> / </span>
                            <span className={classes.lowTemperature}>{day.lowTemperature}°</span>
                        </div>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
});

const useStyles = makeStyles(() => ({
    root: {
        display: "grid",
        gridTemplateColumns: "5fr 5fr 5fr 5fr 5fr",
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