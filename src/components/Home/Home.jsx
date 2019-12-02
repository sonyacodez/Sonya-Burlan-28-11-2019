import React from "react";
import { SearchCityInput } from './SearchCityInput';
import { HomeCard } from './HomeCard/HomeCard';
import { makeStyles } from '@material-ui/core';

export const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <SearchCityInput/>
            <HomeCard/>
        </div>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        display: "flex-inline",
        '& .MuiOutlinedInput-root': {
            backgroundColor: "white",
            padding: 0
        }
    }
}));