import React, { useContext, useState } from "react";
import toastApiClient from '../../ApiClient/ToastApiClient';
import { observer } from "mobx-react-lite";
import TextField from '@material-ui/core/TextField';
import CityStoreContext from '../../stores/CityStore';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const SearchCityInput = observer(() => {
    const cityStore = useContext(CityStoreContext);
    const [ citySuggestions, setCitySuggestions ] = useState([]);
    return (
        <Autocomplete
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
            onChange={(e, value) => cityStore.currentCity = value}
            renderInput={(params) => 
                <TextField {...params} variant="outlined" fullWidth
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