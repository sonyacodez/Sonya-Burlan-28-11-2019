import React, { useContext, useState } from "react";
import toastApiClient from '../../ApiClient/ToastApiClient';
import { observer } from "mobx-react-lite";
import { TextField, makeStyles } from '@material-ui/core';
import StateStoreContext from '../../stores/StateStore';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const SearchCityInput = observer(() => {
    const classes = useStyles();
    const stateStore = useContext(StateStoreContext);
    const [ citySuggestions, setCitySuggestions ] = useState([]);
    return (
        <Autocomplete
            className={classes.root}
            autoComplete={true}
            disableOpenOnFocus={true}
            options={citySuggestions || []}
            getOptionLabel={option => option}
            onInputChange={async(e, value) => {
                if(e){
                    setCitySuggestions(await toastApiClient.searchCityAutoCompleteInput(e.target.value));
                }else{
                    setCitySuggestions([]);
                }
            }}
            onChange={(e, value) => stateStore.currentCity = value}
            renderInput={(params) => 
                <TextField
                    fullWidth
                    {...params}
                    variant="outlined"
                    placeholder="Search City..."
                    onChange={event=>{
                        const userInput = event.target.value;
                        const sanitized = userInput.replace(/[^a-z 0-9]/gi, "");
                        if(userInput !== sanitized){
                            alert("Please use english letters only.");
                            return;
                        }
                        params.inputProps.onChange(event);
                    }}
                />
            }
        />
    );
});

const useStyles = makeStyles(() => ({
    root: {
        ['@media (min-width:800px)']: { // eslint-disable-line no-useless-computed-key
            width: '30%'
        },
        ['@media (max-width:800px)']: { // eslint-disable-line no-useless-computed-key
            width: '240px'
        },
        flexGrow: 1,
        height: "5%",
        paddingTop: "8%",
        paddingBottom: "5%",
        margin: "0 auto"
    }
}));