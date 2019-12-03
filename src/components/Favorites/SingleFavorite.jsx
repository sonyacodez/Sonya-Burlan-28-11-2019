import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Paper } from '@material-ui/core';
import StateStoreContext from '../../stores/StateStore';
import { makeStyles } from '@material-ui/core/styles';
import toastApiClient from "../../ApiClient/ToastApiClient";
import { TrashButton } from "../Buttons/TrashButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import staticData from '../../staticData';

export const SingleFavorite = observer(({id, cityName}) => {
    const classes = useStyles();
    const stateStore = useContext(StateStoreContext);
    const [ favCityWeather, setFavCityWeather ] = useState({});
    const temperatureScale = stateStore.temperatureScale === "celsius" ? "celsius" : "fahrenheit";
    useEffect(() => {
        const fetchFavCityWeather = async() => {
            setFavCityWeather(await toastApiClient.getCurrentCityWeather(cityName));
        };
        fetchFavCityWeather();
    }, [cityName]);
    const updateCurrentCity = () => stateStore.currentCity = cityName;
    return (
        <div>
            <Paper id={id} className={classes.card} onClick={updateCurrentCity}>
                <Link to="/" className={classes.cardInfo}>
                    <div className={classes.title}>{cityName}</div>
                    <div className={classes.icon}>
                        <FontAwesomeIcon size="4x" 
                            icon={staticData.whichWeatherIcon(favCityWeather.weatherDescription || "")}/>
                    </div>
                    <div className={classes.temperature}>{favCityWeather[temperatureScale]}°</div>
                </Link>
                <span className={classes.button}>
                    <TrashButton cityName={cityName}/>
                </span>
            </Paper>
        </div>
    );
});

const useStyles = makeStyles(() => ({
    card: {
        display: "grid",
        position: "relative",
        gridTemplateColumns: "4fr 0.4fr",
        height: "30vh",
        margin: "5%",
        borderRadius: "40px",
        boxShadow: "5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22)",
        '&:hover': {
            transform: "scale(0.9, 0.9)",
            boxShadow: "5px 5px 30px 15px rgba(0,0,0,0.25), -5px -5px 30px 15px rgba(0,0,0,0.22)"
        },
        cursor: "pointer",
        transition: "0.4s",
        opacity: 0.75
    },
    cardInfo: {
        display: "grid",
        gridTemplateRows: "0.5fr 1.5fr 1fr",
        alignItems: "center",
        color: "black",
        textDecoration: "none"
    },
    title: {
        fontSize: "3vh",
        textAlign: "center",
        paddingTop: "1vh",
        paddingBottom: "1vh"
    },
    temperature: {
        textAlign: "center",
        fontSize: "3vh"
    },
    icon: {
        textAlign: "center"
    },
    button: {
        position: "absolute",
        bottom: "2.5%",
        right: "2.5%",
        textAlign: "center"
    }
}));