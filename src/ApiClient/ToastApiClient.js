import apiClient from './apiClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ToastApiClient {
    searchCityAutoCompleteInput = async(userInput) => {
        try{
            return await apiClient.searchCityAutoCompleteInput(userInput);
        }catch(error){
            toast.error(`This city does not exist. Please type in a valid city name.`);
        }
    };
    getCurrentCityWeather = async(currentCity) => {
        try{
            return await apiClient.getCurrentCityWeather(currentCity);
        }catch(error){
            toast.error(`Unable to reach server: ${error}`);
        }
    };
    getFiveDayForecast = async(currentCity, temperatureScalePreference) => {
        try{
            return await apiClient.getFiveDayForecast(currentCity, temperatureScalePreference);
        }catch(error){
            toast.error(`Unable to reach server: ${error}`);
        }
    };
}

export default new ToastApiClient();
