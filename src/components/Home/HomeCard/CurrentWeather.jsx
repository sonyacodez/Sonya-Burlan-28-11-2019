import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { observer } from "mobx-react-lite";
import apiClient from '../../../ApiClient/apiClient';
import { makeStyles } from '@material-ui/core/styles';
import CityStoreContext from '../../../stores/CityStore';

export const currentWeather = observer(() => {
    const cityStore = useContext(CityStoreContext);
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            {cityStore.currentCity}
            {apiClient.getCurrentCityLocationKey()}
        </Paper>
    );
});

const useStyles = makeStyles(() => ({
    paper: {
        height: 300,
        width: 500
    }
}));