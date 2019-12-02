import { observable } from 'mobx';
import { createContext } from 'react';
import store2 from 'store2';
import {
    faSun,
    faWind,
    faBolt, 
    faSnowflake,
    faCloudSun, 
    faCloudShowersHeavy
} from '@fortawesome/free-solid-svg-icons';

class StateStore {
    @observable currentCity = "Tel Aviv";
    @observable temperatureScale = "celsius";
    @observable favoriteCities = store2.get("favoriteCities", []);

    daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    updateFavoriteCities = cities => {
        this.favoriteCities = cities;
        store2.set("favoriteCities", cities);
    };

    addFavoriteCity = city => {
        this.favoriteCities.push(city);
        store2.set("favoriteCities", this.favoriteCities);
    };

    deleteFavoriteCity = city => {
        this.favoriteCities = this.favoriteCities.filter(candidate => city !== candidate);
        store2.set("favoriteCities", this.favoriteCities);
    };
    
    whichDay = unformattedDate => this.daysOfWeek[new Date(unformattedDate).getDay()];

    whichWeatherIcon = text => {
        return text.toLowerCase().includes("cloud") ? faCloudSun :
        text.toLowerCase().includes("rain") ? faCloudShowersHeavy :
        text.toLowerCase().includes("showers") ? faCloudShowersHeavy :
        text.toLowerCase().includes("thunder") ? faBolt :
        text.toLowerCase().includes("snow") ? faSnowflake :
        text.toLowerCase().includes("sun") ? faSun :
        text.toLowerCase().includes("wind") ? faWind :
        null;
    };
};

const StateStoreContext = createContext(new StateStore());

export default StateStoreContext;