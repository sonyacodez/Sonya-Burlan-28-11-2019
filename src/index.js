import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import ApiClient from './apiclient/apiClient';
import StateStoreContext, { StateStore } from './stores/StateStore';

const stateStore = new StateStore();

// (async() => {
//     try {
//         stateStore.currentCity = await ApiClient.getUserCurrentAddressCity();
//     }catch(error){
//         console.error(`Unable to fetch user GeoLocation.`);
//     }
// })();

ReactDOM.render(<StateStoreContext.Provider value={stateStore}><App/></StateStoreContext.Provider>, document.getElementById('root'));

serviceWorker.unregister();
