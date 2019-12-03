import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import apiClient from './ApiClient/apiClient';
import StateStoreContext, { StateStore } from './stores/StateStore';

const stateStore = new StateStore();

(async() => {
    try {
        stateStore.currentCity = await apiClient.getUserCurrentAddressCity();
    }catch(error){
        stateStore.currentCity = "Tel Aviv";
        console.error(`Unable to fetch user GeoLocation.`);
    }
})();

ReactDOM.render(<StateStoreContext.Provider value={stateStore}><App/></StateStoreContext.Provider>, document.getElementById('root'));

serviceWorker.unregister();
