/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Grid } from '@material-ui/core';
import { observer } from "mobx-react-lite";
import CityStoreContext from '../../stores/CityStore';
import { makeStyles } from '@material-ui/core/styles';
import { SingleFavorite } from './SingleFavorite';

export const Favorites = observer(() => {
    const classes = useStyles();
    const cityStore = useContext(CityStoreContext);
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {cityStore.favoriteCities.map((city, index) => (
                        <SingleFavorite key={index} id={index} cityName={city}/>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
});


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1
    }
}));