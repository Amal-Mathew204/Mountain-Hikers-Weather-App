//WeatherConditionContainer component and functionality
//This component is used to display the four weather conditions
//Wind Speed, Cloud Cover, Pressure and Precipitation

import WeatherCondition from "./WeatherCondition";  //import WeatherCondition component to display condition with icon
import "../CSSFiles/WeatherConditionContainer.css"; //CSS file for component styling


//Component to display weather conditions
function WeatherConditionContainer({data})
{
    console.log(data.rain)
    return(
            <div className="Container">
                {/* Conditions for Wind Speed */}
                <WeatherCondition 
                    
                    value={JSON.stringify(data.wind.speed)}
                    unit={" km/h"}
                    condition={"Wind Speed"}
                    yellow_limit={64}
                    red_limit={80}
                    lowreading={false}
                />
                {/* Conditions for Cloud Cover */}
                <WeatherCondition 
                    value={JSON.stringify(data.clouds.all)}
                    unit={" %"}
                    condition={"Cloud Cover"}
                    yellow_limit={60}
                    red_limit={80}
                    lowreading={false}
                />
                {/* Condition for Pressure */}
                {/* https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4684554/#:~:text=Specifically%2C%20we%20found%20that%20the,is%20consistent%20with%20our%20finding. */}
                <WeatherCondition 
                    value={JSON.stringify(data.main.pressure)}
                    unit={" hPa"}
                    condition={"Pressure"}
                    yellow_limit={1010}
                    red_limit={1003}
                />
                {/* Condition for Precipitation */}
                <WeatherCondition 
                value={GetRain(data)}
                unit={" mm"}
                condition={"Precipitation"}
                yellow_limit={"4"}
                red_limit={"8"}
                lowreading={false}/>
                

            </div>
            
    );
}

//Function to get the precipitation value
function GetRain(data){
    if(data.rain === undefined){
        return "0";

    }
    else{
        return JSON.stringify(data.rain["1h"]);
    }
}

//Export WeatherConditionContainer component
export default WeatherConditionContainer;