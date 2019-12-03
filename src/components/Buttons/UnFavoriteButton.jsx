import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import StateStoreContext from '../../stores/StateStore';
import { Tooltip, IconButton } from '@material-ui/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UnFavoriteButton = observer(({cityName}) => {
    const stateStore = useContext(StateStoreContext);
    return (
        <Tooltip title="Remove from Favorites">
            <IconButton
                    onClick={() => stateStore.deleteFavoriteCity(cityName)}>
                <FontAwesomeIcon icon={faHeart} color="red" />
            </IconButton>
        </Tooltip>
    );
});