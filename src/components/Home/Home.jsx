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

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex-inline",
        '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.background.default
        }
    }
}), {withTheme: true});