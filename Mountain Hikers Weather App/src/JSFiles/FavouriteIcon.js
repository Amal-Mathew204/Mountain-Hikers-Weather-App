//FavouriteIcon component and functionality
//This component is used to display a heart icon and a side menu

//Import React and useState and icons
import React, { useState } from 'react';
import * as fa from 'react-icons/fa';
//Import SideMenu component
import SideMenu from './SideMenu';

//FavouriteIcon component to display a heart icon and a side menu
function FavouriteIcon({SetPageTitle, SetWeather, SetForecastData, LowSetDailyTempData, HighSetDailyTempData, SetDayData, SetDayIcons, observedmountain, weatherdata, forecastdata, lowdailytempdata, highdailytempdata, daydata, dayicons}) {
    const [isOpen, setIsMenu] = useState(false); //state is closed by default

    // Function to handle the click event on the heart icon
    const handleIconClick = () => {
        setIsMenu(!isOpen);
    };

    return (
            <section className='Icon'>
                 {/* Favourite heart icon */}
                <fa.FaHeart onClick={handleIconClick} />
                {/* Return SideMenu component to display saved location */}
                <SideMenu 
                    isOpen = {isOpen}
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
            </section>
    );
}

// Export FavouriteIcon component
export default FavouriteIcon;