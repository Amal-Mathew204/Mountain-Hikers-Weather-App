//DayForecastContainer component and functionality
//This component is used to display the forecast for the next week using DayForecast components for each day

import "../CSSFiles/DayForecastContainer.css"; //CSS file for component styling
//Day Forecast component to display weather data for the next 7 days
import DayForecast from "./DayForecast";

//Component to display week forecast, weather icon, high and low temperatures
function DayForecastContainer({typeofTemp, lowdailytempdata, highdailytempdata, daydata, dayicons}){
    // If the data is not loaded, display an error message
    if(lowdailytempdata === ""){
        return <p>error loading</p>;
    }
    else
    {
        return(
            //Display the DayForecast component for each day of the week
            <section className="DayForecastContainer">
                <DayForecast typeofTemp={typeofTemp} lowtemp={lowdailytempdata[0]} hightemp={highdailytempdata[0]} day={daydata[0]} weathericon={dayicons[0]}/>
                <DayForecast typeofTemp={typeofTemp} lowtemp={lowdailytempdata[1]} hightemp={highdailytempdata[1]} day={daydata[1]} weathericon={dayicons[1]}/>
                <DayForecast typeofTemp={typeofTemp} lowtemp={lowdailytempdata[2]} hightemp={highdailytempdata[2]} day={daydata[2]} weathericon={dayicons[2]}/>
                <DayForecast typeofTemp={typeofTemp} lowtemp={lowdailytempdata[3]} hightemp={highdailytempdata[3]} day={daydata[3]} weathericon={dayicons[3]}/>
                <DayForecast typeofTemp={typeofTemp} lowtemp={lowdailytempdata[4]} hightemp={highdailytempdata[4]} day={daydata[4]} weathericon={dayicons[4]}/>

            </section>
        );
    }
    
};
//Export DayForecastContainer component
export default DayForecastContainer;