import axios from 'axios'
// import CityStoreContext from '../stores/CityStore';

class ApiClient {
    constructor() {
        this.urlBase = "https://dataservice.accuweather.com/"
        this.myAPIkey = "4xF5yjmrtLcEEkPmGZr7eyi93iQLrNAk"; 
        this.accessKey = "2c68386b32d6b46ea4dde87b3753597e29be3b00804ea5b7ed42b91dc9fb2dca";
        /* I know this isn't good practice to commit the API key/accesskey, I'm keeping it here for now for simplicity's sake.*/
    }

    searchCityAutoCompleteInput = async(userInput) => {
        const matchingCities = await axios.get(`${this.urlBase}locations/v1/cities/autocomplete?apikey=${this.myAPIkey}&q=${userInput}`);
        return matchingCities.data.map(city => city.LocalizedName);
    };

    getCurrentCityKey = async(currentCity) => {
        const currentCityInfo = await axios.get(`${this.urlBase}locations/v1/cities/autocomplete?apikey=${this.myAPIkey}&q=${currentCity}`);
        return currentCityInfo.data[0].Key;
    };
    
    getCurrentCityWeather = async(currentCity) => {
        const cityKey = await this.getCurrentCityKey(currentCity);
        const currentCityInfo = await axios.get(`${this.urlBase}currentconditions/v1/${cityKey}?apikey=${this.myAPIkey}&details=false`);
        const currentCityWeather = currentCityInfo.data[0];
        return {
            weatherDescription: currentCityWeather.WeatherText,
            celsius: currentCityWeather.Temperature.Metric.Value,
            fahrenheit: currentCityWeather.Temperature.Imperial.Value,
        };
    };

    getFiveDayForecast = async(currentCity, temperatureScalePreference) => {
        const cityKey = await this.getCurrentCityKey(currentCity);
        const temperatureScale = temperatureScalePreference === "celsius" ? true : false;
        const fiveDayForecast = await axios.get(`${this.urlBase}forecasts/v1/daily/5day/${cityKey}?apikey=${this.myAPIkey}&details=false&metric=${temperatureScale}`);
        return fiveDayForecast.data.DailyForecasts.map(day => {
            return {
                weatherDescription: day.Day.IconPhrase,
                highTemperature: day.Temperature.Maximum.Value,
                lowTemperature: day.Temperature.Minimum.Value,
                date: day.Date,
                cityName: currentCity
            }
        });
    };

    getCurrentCityWeatherPhoto = async() => {
        const cityPhoto = await axios.get(`https://source.unsplash.com/1920x1080/?beautiful+nature+sunrises+sunsets+green`);
        return cityPhoto.config.url
    };


    // getLatLongOfAddress = async(address) => {
    //     return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.key}`)
    // }

    // addNewUser = async( name, email, latitude, longitude, address, subscriptionObject) => {
    //     const newUser = {
    //         name,
    //         email,
    //         location: {
    //             latitude,
    //             longitude,
    //             address
    //         },
    //         subscriptionObject: JSON.parse(subscriptionObject)
    //     }
    //     await axios.post(`${this.URLname}/subscribe`, newUser)
    // };

    // updateUserLocation = async(latitude, longitude, address) => await axios.put(`${this.URLname}/updateUserLocation/${UserStore.currentUserID}`, { location: {latitude, longitude, address}});

    // getAllContacts = async () => await axios.get(`${this.URLname}/userContacts/${UserStore.currentUserID}`);

    // deleteUserContact = async(userID, contactID) => await axios.delete(`${this.URLname}/deleteUserContact/${contactID}`);

    // addUserContact = async (name, phoneNumber) => await axios.post(`${this.URLname}/newUserContact/${UserStore.currentUserID}`, { name, phoneNumber });

    // updateUserContactNumber = async (contactID, phoneNumber) => await axios.put(`${this.URLname}/updateUserContactNumber/${contactID}`, { phoneNumber });
}

export default new ApiClient()