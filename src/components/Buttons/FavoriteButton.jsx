import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button } from '@material-ui/core';
import CityStoreContext from '../../stores/CityStore';

export const FavoriteButton = observer(({cityName}) => {
    const cityStore = useContext(CityStoreContext);
    return (
        <Button onClick={() => cityStore.addFavoriteCity(cityName)} >
            Add to Favorites
        </Button>
    );
});