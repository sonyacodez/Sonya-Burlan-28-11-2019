import * as mobx from 'mobx';

export class StateStore {
    @mobx.observable currentCity = '';
};

export const stateStore = new StateStore;
export default stateStore;