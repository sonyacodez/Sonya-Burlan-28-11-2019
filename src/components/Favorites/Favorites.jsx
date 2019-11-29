import React from "react";
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { SingleFavorite } from './SingleFavorite';

export const Favorites = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {[0, 1, 2].map(value => (
                        <Grid key={value} item>
                            <Paper className={classes.paper} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1
    },
    paper: {
      height: 200,
      width: 300
    }
}));