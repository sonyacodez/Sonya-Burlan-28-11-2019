import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import StateStoreContext from '../../stores/StateStore';
import { DegreeTypeSwitch } from './DegreeTypeSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome} from '@fortawesome/free-solid-svg-icons';
import { AppBar, IconButton, makeStyles, Toolbar, Tooltip } from '@material-ui/core';

export const Header = observer(() => {
    const stateStore = useContext(StateStoreContext);
    const classes = useStyles()
    return (
        <AppBar className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <h3>Weather App</h3>
                <span>
                    <DegreeTypeSwitch/>
                    <Tooltip title="Favorites">
                        <IconButton className={classes.iconButton}>
                            <Link to="/favorites">
                                <FontAwesomeIcon icon={faHeart} color="red" />
                            </Link>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Home">
                        <IconButton className={classes.iconButton}>
                            <Link to="/">
                                <FontAwesomeIcon icon={faHome} color="black" />
                            </Link>
                        </IconButton>
                    </Tooltip>
                </span>
            </Toolbar>
        </AppBar>
    );
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex"
    },
    iconButton: {
        size: "medium"
    },
    toolbar: {
        justifyContent: "space-between"
    }
}));