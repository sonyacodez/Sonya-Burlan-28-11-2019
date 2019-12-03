import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import StateStoreContext from '../../stores/StateStore';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';

export const DegreeTypeSwitch = observer(() => {
    const stateStore = useContext(StateStoreContext);
    const classes = useStyles();
    return (
        <span>
            <Tooltip title="Change Temperature to Celsius">
                <span>
                    <IconButton className={classes.degreeType}
                            disabled={stateStore.temperatureScale === "celsius" ? true : false}
                            onClick={() => {
                                stateStore.temperatureScale === "celsius" ? 
                                stateStore.temperatureScale = "fahrenheit" : 
                                stateStore.temperatureScale = "celsius"
                            }}>
                        °C
                    </IconButton>
                </span>
            </Tooltip>
            <span className={classes.spliter}> | </span>
            <Tooltip title="Change Temperature to Fahrenheit">
                <span>
                    <IconButton className={classes.degreeType}
                            disabled={stateStore.temperatureScale === "fahrenheit" ? true : false}
                            onClick={() => {
                                stateStore.temperatureScale === "celsius" ? 
                                stateStore.temperatureScale = "fahrenheit" : 
                                stateStore.temperatureScale = "celsius"
                            }}>
                        °F
                    </IconButton>
                </span>
            </Tooltip>
        </span>
    );
});

const useStyles = makeStyles(() => ({
    degreeType: {
        color: "white",
        size: "medium"
    },
    spliter: {
        color: "black"
    }
}));