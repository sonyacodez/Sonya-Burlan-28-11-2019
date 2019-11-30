import React from "react";
import { Home } from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import { Favorites } from "./components/Favorites/Favorites";
import { BrowserRouter, Route, Link } from "react-router-dom";

import "./App.css";

export const App = () => (
    <div className="App">
        <BrowserRouter>
            <header>
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </header>
            <div>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/favorites" render={() => <Favorites />} />
            </div>
            <ToastContainer />
        </BrowserRouter>
    </div>
);
