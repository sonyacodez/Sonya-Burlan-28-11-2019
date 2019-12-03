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
        gridTemplateColumns: "repeat(auto-fit,minmax(150px, 1fr))",
        height: "90vh",
        alignItems: "center"
    },
    cardsList: {
        zIndex: 0,
        width: "100%",
        display: "grid",
        justifyContent: "space-around",
        flexWrap: "wrap"
    }
}));