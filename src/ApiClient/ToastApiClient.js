import apiClient from './apiClient';
import { toast } from 'react-toastify';

class ToastApiClient {
    searchCityAutoCompleteInput = async(userInput) => {
        try{
            return await apiClient.searchCityAutoCompleteInput(userInput);
        }catch(error){
            toast.error(`This city does not exist. Please type in a valid city name.`);
        }
    };
    getCurrentCityWeather = async() => {
        try{
            return await apiClient.getCurrentCityWeather();
        }catch(error){
            toast.error(`Unable to reach server: ${error}`);
        }
    };
    //maybe displayError function to prevent repetition
}

export default new ToastApiClient();
