import {
    faSun,
    faWind,
    faBolt, 
    faSnowflake,
    faCloudSun, 
    faCloudShowersHeavy
} from '@fortawesome/free-solid-svg-icons';

class StaticData {
    constructor(){
        this.daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    }

    whichDay = unformattedDate => this.daysOfWeek[new Date(unformattedDate).getDay()]
    
    getDate = unformattedDate => {
        const sanitizedDate = new Date(unformattedDate).toDateString();
        const newDate = sanitizedDate.split(" ");
        newDate.shift();
        return newDate.join(" ");
    }
    
    whichWeatherIcon = text => {
        return text.toLowerCase().includes("cloud") ? faCloudSun :
        text.toLowerCase().includes("rain") ? faCloudShowersHeavy :
        text.toLowerCase().includes("showers") ? faCloudShowersHeavy :
        text.toLowerCase().includes("thunder") ? faBolt :
        text.toLowerCase().includes("snow") ? faSnowflake :
        text.toLowerCase().includes("sun") ? faSun :
        text.toLowerCase().includes("wind") ? faWind :
        faSun;
    }
}

export default new StaticData();