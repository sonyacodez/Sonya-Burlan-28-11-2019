import React, { useContext } from "react";

import { observer } from "mobx-react-lite";
import { Button } from '@material-ui/core';
import CityStoreContext from '../../stores/CityStore';

export const UnFavoriteButton = observer(({cityName}) => {
    const cityStore = useContext(CityStoreContext);
    return (
        <Button onClick={() => cityStore.deleteFavoriteCity(cityName)} >
            Delete from Favorites
        </Button>
    );
});