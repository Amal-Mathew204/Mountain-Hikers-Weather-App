//SearchBar component and functionality
//This component is used to search for a mountain and get the weather data for that mountain

//Importing Required Files & Packages
import axios from 'axios';
import { useEffect, useState } from 'react';

import "../CSSFiles/SearchBar.css"; //CSS file for component styling

//Import FavouriteIcon component
import FavouriteIcon from './FavouriteIcon';

//Make HTTP Request to OpenWeatherMap API to get data
const fetchForcastData = async (lat, lon, SetForecastData, LowSetDailyTempData, HighSetDailyTempData, SetDayData, SetDayIcons) => { 
  //apikey for API
  // const apikey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const apikey = "ENTER OPEN WEATHER API KEY HERE";
  try 
  {
    const response = await axios.get( `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`);
    //console.log(response.data); //You can see all the data in console log
    console.log(response.data.list);
    // Set Forecast Data and get daily temperature data
    SetForecastData(response.data.list);
    GetDailyTemp(response.data.list, LowSetDailyTempData, HighSetDailyTempData, SetDayData, SetDayIcons);
  } 
  catch (error) 
  { 
    console.error(error);

  }  
};

//Get the mode for the weather icon codes
function GetModeVal(arr){
  let modecount = -1;
  let modeval = "";
  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    let cmpval = arr[i];
    for (let j = 0; j < arr.length; j++) {
      if(cmpval === arr[j])
      {
        count++;
      }
    }
    if(modecount < count)
    {
      modecount = count;
      modeval = cmpval;
    }
  }

  return modeval;
}

//Get daily temperature data
function GetDailyTemp(forecast, LowSetDailyTempData, HighSetDailyTempData, SetDayData, SetDayIcons)
{
  //Arrays for low and high temperatures
  let lowarr = [];
  let higharr = [];
  //Array for WHAT
  let daysofweather = [];
  //Aray for weather icon codes
  let dayweathericonscodes = [];
  //Array for days of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
  //Get the day of the week of the first day of the forecast
  let observedday = new Date(forecast[0].dt_txt).getDay();
  let index = 1;

  let date = forecast[0].dt_txt.split(" ")[0];
  let lowestTemp= ConvertTemp(forecast[0].main.temp_min);
  let highestTemp = ConvertTemp(forecast[0].main.temp_max);
  let icons = [forecast[0].weather[0].icon];
  //get averages of 3hr temps of days and store them in array
  //array will contain average temps of each day
  while (index !== forecast.length) {
    if(forecast[index].dt_txt.split(" ")[0] === date)
    {
      let lowtemp = ConvertTemp(forecast[index].main.temp_min);
      let hightemp = ConvertTemp(forecast[index].main.temp_max);
      icons.push(forecast[index].weather[0].icon);
      if(lowestTemp > lowtemp){
        lowestTemp = lowtemp;
      }
      if(highestTemp < hightemp){
        highestTemp = hightemp;
      }
    }
    else
    {
      lowarr.push(Math.round((lowestTemp)*100)/100);
      higharr.push(Math.round((highestTemp)*100)/100);

      dayweathericonscodes.push(GetModeVal(icons));

      daysofweather.push(daysOfWeek[observedday]);

      icons = [forecast[index].weather[0].icon];
      lowestTemp= ConvertTemp(forecast[index].main.temp_min);
      highestTemp = ConvertTemp(forecast[index].main.temp_max);

      date = forecast[index].dt_txt.split(" ")[0];

      observedday++;
      if(observedday === daysOfWeek.length){
        observedday = 0;
      }
    }
    index++;
  }
  //ensure last day is added
  lowarr.push(Math.round((lowestTemp)*100)/100);
  higharr.push(Math.round((highestTemp)*100)/100);
  daysofweather.push(daysOfWeek[observedday]);
  dayweathericonscodes.push(GetModeVal(icons));


  LowSetDailyTempData(lowarr);
  HighSetDailyTempData(higharr);
  SetDayData(daysofweather);
  SetDayIcons(dayweathericonscodes);

  // console.log(lowarr);
  // console.log(higharr);
  console.log(daysofweather);
  console.log(dayweathericonscodes);
}

//Converts temperature from Kelvin to Celsius
function ConvertTemp(temp){
  return ((Math.round(temp - 273.15)*100)/100);
}



// Makes an HTTP GET request to the GeoNames API, searching for geographical features with the feature code for mountains (MT), limited to a maximum of 5 results.
// Parses the response to extract mountain names, latitudes, and longitudes, and updates the component's state with these values.
// Sets a flag (gotmountain) to true if mountains are found, or false if an error occurs during the fetch operation.

// Fetches geographical information about mountains matching the query from the GeoNames API.
// query - term entered by user, State setter functions to update the component's state with the names, latitudes, and longitudes of the found mountains, respectively.

const fetchGeoLocation = async (query, SetSources, SetSourceLats, SetSourcesLons) => { 
  let gotmountain = true;
  const username = "ENTER GEONAMES USERNAME HERE";
  try 
  {
    console.log({query});
    const response = await axios.get(`http://api.geonames.org/searchJSON?q=${query}&featureCode=MT&maxRows=5&username=${username}`);
    console.log(response.data); //You can see all the weather data in console log
    let source = [];
    response.data.geonames.forEach(element => {
      source.push(element.name);
    });
    let lats = [];
    response.data.geonames.forEach(element => {
      lats.push(element.lat);
    });
    let lons = [];
    response.data.geonames.forEach(element => {
      lons.push(element.lng);
    });

    SetSources(source);
    SetSourceLats(lats);
    SetSourcesLons(lons);
    console.log(source);
    
  } catch (error) 
    { 
      console.error(error);
      gotmountain = false;
    }

    return gotmountain;
  };

// Makes an HTTP GET request to the OpenWeatherMap API using the provided latitude and longitude.
// On success, updates the component's state with the fetched weather data, serialized as a JSON string.

// lat, lon: Latitude and longitude for which to fetch the weather data.
// SetWeather: A state setter function to update the component's state with the weather data.

  const fetchWeatherData = async (lat, lon, SetWeather) => { 
  
    // const apikey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const apikey = "f3b51bd14627722ae6a18f51259d5351";
    try 
    {
      const response = await axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);
      console.log(response.data); //You can see all the weather data in console log
      SetWeather(response.data);
    } 
    catch (error) 
    { 
      console.error(error);

    }
    
    
  };


//Reference: https://www.scaler.com/topics/react/react-searchbar/

// Displays an input field where users can type the name of a mountain. 
// As the user types, the fetchGeoLocation function is called to update the list of matching mountains.
// Displays a list of buttons for each found mountain. 
// Clicking a button fetches and displays the weather data for the selected mountain by calling fetchWeatherData.

// query, SetQuery, SetPageTitle, SetWeather: Passed to the component to manage the search query, update the page title, and manage weather data state externally.

function SearchBar({typeofTemp, setTypeOfTemp, query, SetQuery, SetPageTitle, SetWeather, SetForecastData, LowSetDailyTempData, HighSetDailyTempData, SetDayData, SetDayIcons, observedmountain, weatherdata, forecastdata, lowdailytempdata, highdailytempdata, daydata, dayicons})
{

    const[mountains, SetMountains] = useState([]);
    const[lats, SetLats] = useState("");
    const[lons, SetLons] = useState("");
    const[buttonMessage, SetButtonMessage] = useState("");

    useEffect(()=>{
      if(typeofTemp === "°C"){
        SetButtonMessage("Switch to °F")
      }
      else
      {
        SetButtonMessage("Switch to °C")
      }
    },[typeofTemp]) 

    return(
      <div className='search-bar-container'>
        <div className='sideMenu'>
          <FavouriteIcon
          observedmountain={observedmountain}
          weatherdata={weatherdata}
          forecastdata={forecastdata}
          lowdailytempdata={lowdailytempdata}
          highdailytempdata={highdailytempdata}
          daydata={daydata}
          dayicons={dayicons}
          SetPageTitle = {SetPageTitle}
          SetWeather={SetWeather} 
          SetForecastData = {SetForecastData}
          LowSetDailyTempData ={LowSetDailyTempData}
          HighSetDailyTempData ={HighSetDailyTempData}
          SetDayData = {SetDayData}
          SetDayIcons = {SetDayIcons}
          />
        </div>
          <section className='search'>
              <input
                  className='search-bar'
                  placeholder='Enter Mountain Here'
                  value = {query}
                  onChange={(event) => {
                    SetQuery(event.target.value);
                    fetchGeoLocation(event.target.value, SetMountains, SetLats, SetLons);}} />

            {/* Display search results */}
            <div className="SearchResults">
              {
                query.length > 0 && mountains.map((mountain) => (
                
                <div className="mountainsearchresult">
                  <button className="mountainresultval" value={mountain} onClick={(event) => 
                    {
                      SetPageTitle(event.target.value);
                      SetQuery("");
                      let index = mountains.indexOf(event.target.value);
                      fetchWeatherData(lats[index], lons[index], SetWeather);
                      fetchForcastData(lats[index], lons[index], SetForecastData, LowSetDailyTempData, HighSetDailyTempData, SetDayData, SetDayIcons)

                    }
                  }>{mountain}</button>
                  </div>
                ))}
            </div>
        </section>
        {/* Button to change Temperature units between Celsius and Fahrenheit */}
        <div className='ToggleTempContainer'>
          <button className='ToggleTempButton' onClick={()=>{
            if(typeofTemp === "°C"){
              setTypeOfTemp("°F")
            }
            else
            {
              setTypeOfTemp("°C")
            }
            console.log(typeofTemp)
          }}>{buttonMessage}</button>
        </div>
      </div>
        
    );

}

//Export Search Bar Component
export default SearchBar;