import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import apiClient from './apiclient/apiClient';
import { Home } from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import StateStoreContext from './stores/StateStore';
import { Favorites } from "./components/Favorites/Favorites";
import { BrowserRouter, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { makeStyles } from '@material-ui/core';
// import { ThemeProvider } from 'styled-components';
// import { lightTheme, darkTheme } from './globalstyles/theme';
import { GlobalStyles } from './globalstyles/global';
import "./App.css";

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { ThemeProvider } from '@material-ui/styles';
const lightTheme = createMuiTheme();
const darkTheme = createMuiTheme({palette: {type: "dark"}});

export const App = observer(() => {
    const classes = useStyles();
    const stateStore = useContext(StateStoreContext);
    const [ imageUrl, setImageUrl ] = useState(async()=>{await apiClient.getCurrentCityWeatherPhoto()});
    useEffect(() => {
        const fetchBackgroundPhoto = async() => {
            setImageUrl(await apiClient.getCurrentCityWeatherPhoto());
        };
        fetchBackgroundPhoto();
    }, []);
    const themeClassName = stateStore.currentTheme === 'light' ? 'lightTheme' : 'darkTheme';
    return (
        <ThemeProvider theme={stateStore.currentTheme === 'light' ? lightTheme : darkTheme}>
            {GlobalStyles}
            <div id="App" className={`${classes.root} ${themeClassName}`} style={{ backgroundImage: `url(${imageUrl})` }}>
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
        </ThemeProvider>
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
