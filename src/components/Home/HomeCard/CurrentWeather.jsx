import React, { useContext, useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { makeStyles } from '@material-ui/core/styles';
import StateStoreContext from '../../../stores/StateStore';
import toastApiClient from '../../../ApiClient/ToastApiClient';
import { FavoriteButton } from '../../Buttons/FavoriteButton';
import { UnFavoriteButton } from '../../Buttons/UnFavoriteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import staticData from '../../../staticData';

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
        if(stateStore.currentCity !== currentCity){
            fetchCityWeather();
            setCurrentCity(stateStore.currentCity);
        }
    }, [currentCity, stateStore]);
    return (
        <div className={classes.root}>
            <br></br>
            <div className={classes.currentInfo}>
                <h1>{stateStore.currentCity}</h1>
                <div>{cityWeather ? staticData.getDate(cityWeather.dateAndTime) : null}</div>
            </div>
            <div className={classes.icon}>
                <FontAwesomeIcon size="8x" 
                    icon={cityWeather ? staticData.whichWeatherIcon(cityWeather.weatherDescription || "") : null}/>
            </div>
            <div className={classes.temperature}>
                {cityWeather ? (stateStore.temperatureScale === "celsius" ? 
                cityWeather.celsius : cityWeather.fahrenheit) : null}°
            </div>
            <div className={classes.button}>
                {stateStore.favoriteCities.includes(stateStore.currentCity) ?
                <UnFavoriteButton cityName={stateStore.currentCity}/> : 
                <FavoriteButton cityName={stateStore.currentCity}/>}
            </div>
            <br></br>
        </div>
    );
});

const useStyles = makeStyles(() => ({
    root: {
        display: "grid",
        gridTemplateColumns: " 0.5fr 3fr 2fr 4fr 1fr",
        justifyContent: "flex-end"
    },
    temperature: {
        fontSize: "12vh",
        textAlign: "end",
        paddingTop: "3vh"
    },
    currentInfo: {
        fontSize: "2.3vh"
    },
    icon: {
        paddingTop: "3vh"
    },
    button: {
        fontSize: "5vw",
        textAlign: "center"
    }
}));