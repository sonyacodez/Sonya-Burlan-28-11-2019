import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import StateStoreContext from '../../stores/StateStore';
import { Tooltip, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartEmpty} from '@fortawesome/free-regular-svg-icons';

export const FavoriteButton = observer(({cityName}) => {
    const stateStore = useContext(StateStoreContext);
    return (
        <Tooltip title="Add to Favorites">
            <IconButton onClick={() => stateStore.addFavoriteCity(cityName)}>
                <FontAwesomeIcon icon={faHeartEmpty} color="red" />
            </IconButton>
        </Tooltip>
    );
});