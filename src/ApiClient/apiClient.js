import axios from 'axios'

class ApiClient {
    constructor() {
        this.urlBase = "https://dataservice.accuweather.com/";
        this.myAPIkey = "FLl5nDX04W80jklSsfnYDFTJE7iYbWsQ";
        this.GeoAPIKey = "AIzaSyB7bTH7gOg_LUILwwIFYuXSiCwDR1beic8";
        /* I know this isn't good practice to commit the API key/accesskey, I'm keeping it here for now for simplicity's sake.*/
    }

    searchCityAutoCompleteInput = async(userInput) => {
        const matchingCities = await axios.get(`${this.urlBase}locations/v1/cities/autocomplete?apikey=${this.myAPIkey}&q=${userInput}`);
        return matchingCities.data.map(city => city.LocalizedName);
    };

    getDecodedAddress = async(lat, lng) => {
        return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.GeoAPIKey}`);
    };

    getUserCurrentAddressCity = () => {
        return new Promise((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const address = await this.getDecodedAddress(pos.coords.latitude, pos.coords.longitude)
                const city = address.data.results[0].formatted_address.split(",")[1].trim("");
                resolve(city);
            },
            (error)=>{
                reject(error);
            });
        });
    };

    getCurrentCityKey = async(currentCity) => {
        if(!currentCity){
            return "215854";
        }
        const currentCityInfo = await axios.get(`${this.urlBase}locations/v1/cities/autocomplete?apikey=${this.myAPIkey}&q=${currentCity}`);
        if(!currentCity || !currentCityInfo || !currentCityInfo.data || !currentCityInfo.data[0]){
            return "215854";
        }
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
            dateAndTime: currentCityWeather.LocalObservationDateTime
        };
    };

    getFiveDayForecast = async(currentCity, temperatureScalePreference) => {
        const cityKey = await this.getCurrentCityKey(currentCity);
        const temperatureScale = temperatureScalePreference === "celsius" ? true : false;
        const fiveDayForecast = await axios.get(`${this.urlBase}forecasts/v1/daily/5day/${cityKey}?apikey=${this.myAPIkey}&details=false&metric=${temperatureScale}`);
        return fiveDayForecast.data.DailyForecasts.map(day => ({
            weatherDescription: day.Day.IconPhrase,
            highTemperature: day.Temperature.Maximum.Value,
            lowTemperature: day.Temperature.Minimum.Value,
            date: day.Date,
            cityName: currentCity
        }));
    };

    getCurrentCityWeatherPhoto = async() => {
        const cityPhoto = await axios.get(`https://source.unsplash.com/1920x1080/?+nature+europe+countryside+water`);
        return cityPhoto.config.url
    };
}

export default new ApiClient()