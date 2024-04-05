import { useEffect, useState } from 'react';
//Import all components
import SearchBar from "./JSFiles/SearchBar";
import PageTitle from "./JSFiles/PageTitle";
import axios from 'axios';
import "./CSSFiles/App.css";
import "./CSSFiles/loading.css";
import WeatherConditionContainer from "./JSFiles/WeatherConditionContainer";
import CurrentTemp from "./JSFiles/CurrentTemp";
import WindMap from "./JSFiles/WindMap";
import Image from "./Images/background.jpg";
import LoadingPageTitle from "./JSFiles/LoadingPageTitle";
import ThreeHourlyForecastContainers from "./JSFiles/ThreeHourlyForecastContainers";
import DayForecastContainer from "./JSFiles/DayForecastContainer";


async function GetImage(SetImageURL, mountain, setLoading){
  setLoading(true);
  // SetImageURL(<img className = "BackgroundStartImage" src={Image} alt="BackgroundImage" />);
  const apikey = 'ENTER UNSPLASH API KEY HERE';
  try 
  {
    const response = await axios.get( `https://api.unsplash.com/search/photos?page=1&query=${mountain}&client_id=${apikey}`);
    console.log(response.data); //You can see all the data in console log
    let url = response.data.results[0].urls.full
    let img = <img className = "BackgroundStartImage" src={url} alt="MountainImage" />;
    SetImageURL(img);
    setLoading(false)
  } 
  catch (error) 
  { 
    console.error(error);
    setLoading(false)
  }
  
}
  
  


//Main App component
function App() {
  const[searchquery, setSearchQuery] = useState("");
  const[observedmountain, setObservedMountain] = useState("");
  const[weatherdata, setWeatherData] = useState("");
  const[forecastdata, SetForecastData] = useState("");
  const[lowdailytempdata, LowSetDailyTempData] = useState([]);
  const[highdailytempdata, HighSetDailyTempData] = useState([]);
  const[daydata, SetDayData] = useState([]);
  const[dayicons, SetDayIcons] = useState([]);
  const[mountainImage, SetMountainImage] = useState("");
  let [loading, setLoading] = useState(false);
  const[typeofTemp, setTypeOfTemp] = useState("°C")

  useEffect(() => {
    if(observedmountain !== ""){
      GetImage(SetMountainImage, observedmountain, setLoading);
    }
  }, [observedmountain]);

  // If statement Splits Loading Screen With Display Screen
  if(weatherdata === ""){
    return(
        <div className="AppLoadingScreen">
          <img className = "BackgroundStartImage" src={Image} alt="BackgroundImage" />
          <SearchBar 
              typeofTemp = {typeofTemp}
              setTypeOfTemp={setTypeOfTemp}
              query ={searchquery} 
              SetQuery = {setSearchQuery}
              SetPageTitle = {setObservedMountain}
              SetWeather={setWeatherData} 
              SetForecastData = {SetForecastData}
              LowSetDailyTempData ={LowSetDailyTempData}
              HighSetDailyTempData ={HighSetDailyTempData}
              SetDayData = {SetDayData}
              SetDayIcons = {SetDayIcons}
              observedmountain={observedmountain}
              weatherdata={weatherdata}
              forecastdata={forecastdata}
              lowdailytempdata={lowdailytempdata}
              highdailytempdata={highdailytempdata}
              daydata={daydata}
              dayicons={dayicons}/>
          <div className='AppContentLoadingScreen'>
          <LoadingPageTitle />
          </div>
        </div>
    
    );
  }
  return (
    <div className="App">
          {loading ? (<div class="loader"></div>): mountainImage}
          <SearchBar
              typeofTemp = {typeofTemp}
              setTypeOfTemp={setTypeOfTemp} 
              query ={searchquery} 
              SetQuery = {setSearchQuery}
              SetPageTitle = {setObservedMountain}
              SetWeather={setWeatherData} 
              SetForecastData = {SetForecastData}
              LowSetDailyTempData ={LowSetDailyTempData}
              HighSetDailyTempData ={HighSetDailyTempData}
              SetDayData = {SetDayData}
              SetDayIcons = {SetDayIcons}
              observedmountain={observedmountain}
              weatherdata={weatherdata}
              forecastdata={forecastdata}
              lowdailytempdata={lowdailytempdata}
              highdailytempdata={highdailytempdata}
              daydata={daydata}
              dayicons={dayicons}/>

          <div className='AppContent'>
            <section className='AppPageContainer'id='WindMapSection'>
              <div className='ContainerContent'>
                <WindMap data = {weatherdata} location = {observedmountain}/>
              </div>
              
            </section>
            <section className='AppPageContainer' id='CurrentWeatherSection'>
              <div className='ContainerContent'>
                <PageTitle Title={observedmountain} />
                {/* Current Temperature Component */}
                <CurrentTemp data={weatherdata} typeofTemp={typeofTemp}/>
                {/* <Warning /> */}
                <ThreeHourlyForecastContainers typeofTemp={typeofTemp} forecastdata={forecastdata}/>
              </div>
            </section>
            <section className='AppPageContainer' id='WeatherConditionSection'>
              <div className='ContainerContent'>
                {/*Weather Condition Container */}
                <WeatherConditionContainer 
                  data={weatherdata}
                />
                 <DayForecastContainer typeofTemp={typeofTemp} lowdailytempdata={lowdailytempdata} highdailytempdata={highdailytempdata} daydata={daydata} dayicons={dayicons}/>
              </div>
            </section>
          </div>
    </div>

  );
}

//Export App component
export default App;
