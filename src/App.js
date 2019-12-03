import React, { useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import apiClient from './apiclient/apiClient';
import { Home } from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import { Favorites } from "./components/Favorites/Favorites";
import { BrowserRouter, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { makeStyles } from '@material-ui/core';

import "./App.css";

export const App = observer(() => {
    const classes = useStyles();
    const [ imageUrl, setImageUrl ] = useState(async()=>{await apiClient.getCurrentCityWeatherPhoto()});
    useEffect(() => {
        const fetchBackgroundPhoto = async() => {
            setImageUrl(await apiClient.getCurrentCityWeatherPhoto());
        };
        fetchBackgroundPhoto();
    }, []);
    return (
        <div id="App" className={classes.root} style={{ backgroundImage: `url(${imageUrl})` }}>
            <BrowserRouter>
                <header>
                    <Header/>
                </header>
                <div id="route" className={classes.route}>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/favorites" render={() => <Favorites />} />
                </div>
                <ToastContainer />
            </BrowserRouter>
        </div>
    );
});

const useStyles = makeStyles(() => ({
    root: {
        overflowX: "hidden",
        height: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    },
    route: {
        paddingTop: "64px"
    }
}));
