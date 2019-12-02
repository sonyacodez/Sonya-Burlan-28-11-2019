/* eslint-disable react-hooks/exhaustive-deps */
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
        gridTemplateColumns: "5fr 5fr 5fr 5fr",
        gridTemplateRows: "5fr 5fr",
        gridRowGap: "1em",
        alignItems: "center"
    },
    cardsList: {
        zIndex: 0,
        width: "100%",
        display: "grid",
        justifyContent: "space-around",
        flexWrap: "wrap"
    }
}))

// <Grid container className={classes.root} spacing={2}>
// <Grid item xs={12}>
//     <Grid className={classes.cardsList} container justify="center" spacing={2}>
//         {stateStore.favoriteCities.map((city, index) => (
//             <SingleFavorite hover={true} key={index} id={index} cityName={city}/>
//         ))}
//     </Grid>
// </Grid>
// </Grid>