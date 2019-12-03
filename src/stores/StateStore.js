import { observable } from 'mobx';
import { createContext } from 'react';
import store2 from 'store2';

export class StateStore {
    @observable currentTheme = "light";
    @observable currentCity = "Tel Aviv";
    @observable temperatureScale = "celsius";
    @observable favoriteCities = store2.get("favoriteCities", []);

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
};

const StateStoreContext = createContext(new StateStore());

export default StateStoreContext;