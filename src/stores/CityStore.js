import { observable } from 'mobx';
import { createContext } from 'react';

class CityStore {
    @observable currentCity = "Tel Aviv";
    @observable temperatureScale = "celsius";
    @observable favoriteCities = [];
};

const CityStoreContext = createContext(new CityStore());

export default CityStoreContext;