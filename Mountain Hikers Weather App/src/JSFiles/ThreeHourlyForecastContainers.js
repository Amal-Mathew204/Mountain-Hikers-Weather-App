//ThreeHourForecastContainer component and functionality
//This component is used to display the 3-hourly forecast for the day

import "../CSSFiles/ThreeHourlyForecastContainers.css"; //CSS file for component styling
import ThreeHourForecast from "./ThreeHourForecast"; //Importing ThreeHourForecast component

//Component to display the forecast for the day every`3 hours
//Uses ThreeHourForecast Component to display each forecast
function ThreeHourlyForecastContainers({typeofTemp, forecastdata}){
    //If forecastdata is empty, return NotLoading message
    if(forecastdata === "")
    {
        return(<p>NotLoading</p>);
    }
    else
    {   
        //If not empty, then return the forecast
        return(
            
            <section className="ThreeHourlyForecastContainers">
                        {/* Display the ThreeHourForecast component for each hour range  */}
                        <ThreeHourForecast typeofTemp={typeofTemp} weathercode={forecastdata[0].weather[0].icon} time={forecastdata[0].dt_txt} temp={forecastdata[0].main.temp}/> 
                        <ThreeHourForecast typeofTemp={typeofTemp} weathercode={forecastdata[1].weather[0].icon} time={forecastdata[1].dt_txt} temp={forecastdata[1].main.temp}/> 
                        <ThreeHourForecast typeofTemp={typeofTemp} weathercode={forecastdata[2].weather[0].icon} time={forecastdata[2].dt_txt} temp={forecastdata[2].main.temp}/> 
                        <ThreeHourForecast typeofTemp={typeofTemp} weathercode={forecastdata[3].weather[0].icon} time={forecastdata[3].dt_txt} temp={forecastdata[3].main.temp}/> 
                        <ThreeHourForecast typeofTemp={typeofTemp} weathercode={forecastdata[4].weather[0].icon} time={forecastdata[4].dt_txt} temp={forecastdata[4].main.temp}/> 
                        <ThreeHourForecast typeofTemp={typeofTemp} weathercode={forecastdata[5].weather[0].icon} time={forecastdata[5].dt_txt} temp={forecastdata[5].main.temp}/> 
                        <ThreeHourForecast typeofTemp={typeofTemp} weathercode={forecastdata[6].weather[0].icon} time={forecastdata[6].dt_txt} temp={forecastdata[6].main.temp}/> 
                        <ThreeHourForecast typeofTemp={typeofTemp} weathercode={forecastdata[7].weather[0].icon} time={forecastdata[7].dt_txt} temp={forecastdata[7].main.temp}/> 

                        

            </section>
        );
    }
}

//Export the ThreeHourlyForecastContainers component
export default ThreeHourlyForecastContainers;