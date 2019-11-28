import { observable } from 'mobx';

export class StateStore {
    @observable currentCity = '';
    @observable favoriteCities = [];
};

// eslint-disable-next-line new-parens
export const stateStore = new StateStore;
export default stateStore;