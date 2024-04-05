//CurrentTemp component and functionality
//This component is used to display the current temperature of the mountain

import "../CSSFiles/CurrentTemp.css"; //CSS file for component styling

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
       return Math.round((val * 9/5) + 32);
    }
}

//Current Tempurature component, takes in weather data from openweather api and displays current tempurature
function CurrentTemp({typeofTemp, data})
{
        console.log("Weather Icon" + data.weather[0].icon);
        //Get icon from openweather api
        let image = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        return(
            <section className="CurrentTempContainer">
                <p className="Header">Current Temperature</p>
                <div className="CurrentTempCard">
                    {/* Insert icon here from method parameter */}
                    <img src={image} alt="WeatherIcon"></img>
                    {/* Display temperature in Celsius */}
                    <p className="Temp">{setTypeOfTemp(typeofTemp, JSON.stringify(Math.round(data.main.temp - 273.15))) + typeofTemp}</p>
                </div>
            </section>
        );
    
    
}
// Export CurrentTemp component
export default CurrentTemp;