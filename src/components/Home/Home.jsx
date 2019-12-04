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
            // '.lightTheme &': {
            //     backgroundColor: "white",
            // },
            // '.darkTheme &': {
            //     backgroundColor: "black",
            // },
            backgroundColor: theme.palette.background.default,
            padding: 0
        }
    }
}), {withTheme: true});