import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import { faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = () => {
    const classes = useStyles()
    return (
        <AppBar>
            <Toolbar>
                <h3 className={classes.title}>Weather App</h3>
                <IconButton className={classes.iconButton}>
                    <Link to="/favorites">
                        <FontAwesomeIcon icon={faHeart} color="red" />
                    </Link>
                </IconButton>
                <IconButton className={classes.iconButton} color="inherit">
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} color="black" />
                    </Link>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex-inline"
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    toolbar: {
        opacity: 15,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    iconButton: {
        size: "medium"
    }
}));