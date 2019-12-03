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
            <div>
                {stateStore.favoriteCities.includes(stateStore.currentCity) ?
                <UnFavoriteButton cityName={stateStore.currentCity}/> : 
                <FavoriteButton cityName={stateStore.currentCity}/>}
            </div>
        </div>
    );
});

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        ['@media (min-width:768px)']: { // eslint-disable-line no-useless-computed-key
            flexDirection: "row", 
            flexWrap: "wrap",
            maxWidth: "1200px",
            justifyContent: "space-between",
            textAlign: "left", 
            margin: "auto"
        }
    },
    temperature: {
        fontSize: "12vh",
        textAlign: "end",
        paddingTop: "3vh"
    },
    currentInfo: {
        fontSize: "2.3vh",
        padding: "0 2vw"
    },
    icon: {
        paddingTop: "3vh"
    }
}));