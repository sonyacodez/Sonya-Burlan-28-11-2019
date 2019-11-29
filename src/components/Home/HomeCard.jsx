import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import CityStoreContext from '../../stores/CityStore';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button, CardContent, CardActions, Typography } from '@material-ui/core';

export const HomeCard = observer(() => {
    const cityStore = useContext(CityStoreContext);
    const classes = useStyles();
    return (
        <Grid container 
                alignItems="center" 
                justify="center" 
                className={classes.root} 
                spacing={0}>
            <Grid item xs={12}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {cityStore.currentCity}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
});

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    card: {
        height: 300,
        width: 500,
        marginLeft: "33vw",
        marginTop: "15vh",
    }
}));
  