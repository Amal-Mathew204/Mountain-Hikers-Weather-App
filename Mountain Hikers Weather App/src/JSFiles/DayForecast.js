//DayForecast component and functionality
//This component is used to display the forecast for the next week
//This component is to display a single day with temperature and icon

import "../CSSFiles/DayForecast.css"; //CSS file for component styling

// Set the type of temperature to display based on units selected
function setTypeOfTemp(typeofTemp, val){
    // console.log(val)
    val = Number(val);
    // console.log(val)
    // If the type of temperature is in Celsius, return the value
    if(typeofTemp === "°C"){
        return val;
    }
    else{
        // If the type of temperature is in Fahrenheit, convert the value to Fahrenheit and return it
       return (Math.round(((val * 9/5) + 32)));
    }
}

//Day Forecast component to display weather data for the next 7 days
//Component to display a day's forecast weather icon, high and low temperature
function DayForecast({typeofTemp, day, weathericon, lowtemp, hightemp}) {
    //display days as 3 letters only
    const dayAbbr = day ? day.substring(0, 3) : '';
    //Get icon from openweather api
    let image = `https://openweathermap.org/img/wn/${weathericon}@2x.png`;
    return (
        <section className="DayForecast">
            {/* Display day of forecast throguh days list in DayForecastContainer */}
            <p className="Day">{dayAbbr}</p>
            <img src={image} alt="WeatherIcon"></img>
            {/* Get low and high temperatures */}
            <p className="Temp1">
                <span className="TempLabel">Low:</span> 
                <span className="TempValue">{setTypeOfTemp(typeofTemp, lowtemp)+ typeofTemp}</span>
            </p>
            <p className="Temp2">
                <span className="TempLabel">High:</span> 
                <span className="TempValue">{setTypeOfTemp(typeofTemp, hightemp) + typeofTemp}</span>
            </p>
        </section>
    );
}
//Export DayForecast component
export default DayForecast;
