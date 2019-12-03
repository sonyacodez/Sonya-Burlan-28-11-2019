import React from 'react';
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { DegreeTypeSwitch } from './DegreeTypeSwitch';
import { ToggleTheme } from './ToggleTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome} from '@fortawesome/free-solid-svg-icons';
import { AppBar, IconButton, makeStyles, Toolbar, Tooltip } from '@material-ui/core';

export const Header = observer(() => {
    const classes = useStyles();
    return (
        <AppBar className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <h3 className={classes.title}>Weather App</h3>
                <span>
                    <ToggleTheme/>
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
    title: {
        ['@media (max-width:384px)']: { // eslint-disable-line no-useless-computed-key
            fontSize: "10px"
        }
    },
    iconButton: {
        size: "medium"
    },
    toolbar: {
        justifyContent: "space-between"
    }
}));