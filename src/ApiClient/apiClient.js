import axios from 'axios'
// import CityStoreContext from '../stores/CityStore';

class ApiClient {
    constructor() {
        this.myAPIkey = "7piXiklcmUThM1THayaEtmHnRzmqzbVo"; /* I know this isn't good practice to commit the API key, I'm keeping it here for now for simplicity's sake.*/
    }

    searchCityAutoCompleteInput = async(userInput) => {
        const matchingCities = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.myAPIkey}&q=${userInput}`);
        return matchingCities.data.map(city => city.LocalizedName);
    };

    getCurrentCityLocationKey = async() => {
        const city = "Tel Aviv";
        const currentCityInfo = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.myAPIkey}&q=${city}`);
        console.log(currentCityInfo.data[0].Key);
    };
    
    getCurrentCityWeather = async() => {
        const cityKey = await this.getCurrentCityLocationKey();
        const currentCityInfo = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${this.myAPIkey}&details=false`);
        const currentCityWeather = currentCityInfo.data[0];
        return {
            weather: currentCityWeather.WeatherText,
            celsius: currentCityWeather.Temperature.Metric.Value,
            fahrenheit: currentCityWeather.Temperature.Imperial.Value,
        };
    };

    // getLatLongOfAddress = async(address) => {
    //     return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.key}`)
    // }

    // findUser = async(name, email) => await axios.get(`${this.URLname}/existingUser/${name}/${email}`);

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

    // updateUser = async(latitude, longitude, address, subscription) => {
    //     const subscriptionObject = JSON.parse(subscription)
    //     await axios.put(`${this.URLname}/updateUser/${UserStore.currentUserID}`, { latitude, longitude, address, subscriptionObject })
    // }

    // updateUserLocation = async(latitude, longitude, address) => await axios.put(`${this.URLname}/updateUserLocation/${UserStore.currentUserID}`, { location: {latitude, longitude, address}});

    // getAllContacts = async () => await axios.get(`${this.URLname}/userContacts/${UserStore.currentUserID}`);

    // deleteUserContact = async(userID, contactID) => await axios.delete(`${this.URLname}/deleteUserContact/${contactID}`);

    // addUserContact = async (name, phoneNumber) => await axios.post(`${this.URLname}/newUserContact/${UserStore.currentUserID}`, { name, phoneNumber });

    // updateUserContactNumber = async (contactID, phoneNumber) => await axios.put(`${this.URLname}/updateUserContactNumber/${contactID}`, { phoneNumber });
}

export default new ApiClient()