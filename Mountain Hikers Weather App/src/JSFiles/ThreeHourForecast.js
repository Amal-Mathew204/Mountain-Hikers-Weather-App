//ThreeHourForecast component and functionality
//This component is used to display the 3-hour forecast

import "../CSSFiles/ThreeHourForecast.css"; //CSS file for component styling

//Convert the temperature from Kelvin to Celsius
function ConvertTemp(temp){
    return ((Math.round(temp - 273.15)*100)/100);
}

//Format the time to display the hour and the minute
//Format the time to display only the hour and minute
function FormatTime(time){
    return new Date(time).toLocaleString([], { hour: '2-digit', minute: '2-digit' })
}


function setTypeOfTemp(typeofTemp, val){
    // console.log(val)
    val = Number(val);
    // console.log(val)
    if(typeofTemp === "°C"){
        return val;
    }
    else{
       return (Math.round(((val * 9/5) + 32)));
    }
}


//Component to display the 3-hour forecast
//Component to display the three hour forecast
function ThreeHourForecast({typeofTemp, weathercode, temp, time}){
    let image = `https://openweathermap.org/img/wn/${weathercode}@2x.png`; //weather icon from APIs
    console.log(image);
    return(
        <section className="ThreeHourForecastContainer">
            <div className="ThreeHourForecastCard">
                {/* Insert Time Data here */}
                <p id="Time">{FormatTime(time)}</p>
                <img className="icon" src={image} alt="WeatherIcon"></img>
                <p id="Temperature">{setTypeOfTemp(typeofTemp, ConvertTemp(temp)) + typeofTemp}</p>
            </div>
        </section>
    );
}


//Export ThreeHourForecast component
export default ThreeHourForecast;