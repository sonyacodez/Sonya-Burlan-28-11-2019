import React, { useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import apiClient from './ApiClient/apiClient';
import { Home } from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import { Favorites } from "./components/Favorites/Favorites";
import { BrowserRouter, Route } from "react-router-dom";
import { Header } from "../src/components/Header";

import "./App.css";

export const App = observer(() => {
    const [ imageUrl, setImageUrl ] = useState(async()=>{await apiClient.getCurrentCityWeatherPhoto()});
    useEffect(() => {
        const fetchBackgroundPhoto = async() => {
            setImageUrl(await apiClient.getCurrentCityWeatherPhoto());
        };
        fetchBackgroundPhoto();
    }, []);
    return (
        <div className="App" style={{ backgroundImage: `url(${imageUrl})`, height: "100%" }}>
            <BrowserRouter>
                <header>
                    <Header/>
                </header>
                <div>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/favorites" render={() => <Favorites />} />
                </div>
                <ToastContainer />
            </BrowserRouter>
        </div>
    );
});
