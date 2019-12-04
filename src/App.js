import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import apiClient from './apiclient/apiClient';
import { Home } from "./components/Home/Home";
import { makeStyles } from '@material-ui/core';
import { ToastContainer } from "react-toastify";
import StateStoreContext from './stores/StateStore';
import { Header } from "./components/Header/Header";
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { Favorites } from "./components/Favorites/Favorites";
import "./App.css";

const lightTheme = createMuiTheme();
const darkTheme = createMuiTheme({palette: {type: "dark"}});

export const App = observer(() => {
    const classes = useStyles();
    const stateStore = useContext(StateStoreContext);
    const themeClassName = stateStore.currentTheme === 'light' ? 'lightTheme' : 'darkTheme';
    const [ imageUrl, setImageUrl ] = useState(async()=>{await apiClient.getCurrentCityWeatherPhoto()});
    useEffect(() => {
        const fetchBackgroundPhoto = async() => {
            setImageUrl(await apiClient.getCurrentCityWeatherPhoto());
        };
        fetchBackgroundPhoto();
    }, []);
    return (
        <ThemeProvider theme={stateStore.currentTheme === 'light' ? lightTheme : darkTheme}>
            <div id="App" className={`${classes.root} ${themeClassName}`} style={{ backgroundImage: `url(${imageUrl})` }}>
                <BrowserRouter>
                    <Header/>
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
