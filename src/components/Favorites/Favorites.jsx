import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import StateStoreContext from '../../stores/StateStore';
import { makeStyles } from '@material-ui/core/styles';
import { SingleFavorite } from './SingleFavorite';

export const Favorites = observer(() => {
    const classes = useStyles();
    const stateStore = useContext (StateStoreContext);
    return (
        <div className={classes.root}>
            {stateStore.favoriteCities.map((city, index) => (
                <SingleFavorite hover={true} key={index} id={index} cityName={city}/>
            ))}
        </div>
    );
});


const useStyles = makeStyles(() => ({
    root: {
        display: "grid",
        height: "90vh",
        justifyItems: "space-evenly",
        ['@media (min-width:768px)']: { // eslint-disable-line no-useless-computed-key
            gridTemplateColumns: "1fr 1fr 1fr 1fr"
        },
        ['@media (max-width:768px) and (min-width: 576px)']: { // eslint-disable-line no-useless-computed-key
            gridTemplateColumns: "1fr 1fr 1fr"
        },
        ['@media (max-width:576px) and (min-width: 384px)']: { // eslint-disable-line no-useless-computed-key
            gridTemplateColumns: "1fr 1fr"
        },
        ['@media (max-width:384px)']: { // eslint-disable-line no-useless-computed-key
            gridTemplateColumns: "1fr"
        }
    },
    cardsList: {
        zIndex: 0,
        width: "100%"
    }
}));