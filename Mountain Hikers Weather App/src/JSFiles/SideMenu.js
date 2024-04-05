//SideMenu component and functionality
//This component is used to display a side menu to view and load saved locations

import '../CSSFiles/SideMenu.css'; //CSS file for component styling
//Import react and useState and menu component
import React, { useEffect } from 'react';
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

//Function to save mountain data to local storage
function SaveData(observedmountain, weatherdata, forecastdata, lowdailytempdata, highdailytempdata, daydata, dayicons, setmountainsinLocalStorage){
        // console.log(weatherdata);
        let data = [weatherdata, forecastdata, lowdailytempdata, highdailytempdata, daydata, dayicons];
        console.log('data', data);
        localStorage.setItem(observedmountain, JSON.stringify(data));
        // console.log(localStorage.getItem(observedmountain));
        GetMountainsFromLocalStorage(setmountainsinLocalStorage);

}

 /*
 default keys that need to be filtered:
        length
        clear
        getItem
        key
        removeItem
        set
 */
//Function to get mountains from local storage
function GetMountainsFromLocalStorage(setmountainsinLocalStorage){
    console.log('keys in local storage');
    let arr = []
    for(var key in localStorage){
        if(isDefaultKey(key) === false)
        {
            console.log(key);
            arr.push(key);
        }
        
    }
    setmountainsinLocalStorage(arr);
    console.log("mountains in local storage: ", arr);
}

// Function to check if key is a default key
function isDefaultKey(key){
    let defaultkey = ["length", "clear", "getItem", "key", "removeItem", "set", "setItem"];
    return defaultkey.includes(key);
}

// Function to clear all mountains from local storage
function clearMountains(setmountainsinLocalStorage){
    localStorage.clear();
    setmountainsinLocalStorage([]);
}

//Function to load mountain data from local storage
function LoadMountainData(mountain, SetPageTitle, SetWeather, SetForecastData, LowSetDailyTempData, HighSetDailyTempData, SetDayData, SetDayIcons){
    let data = localStorage.getItem(mountain);
    SetPageTitle(mountain);
    data = JSON.parse(data);
    SetWeather(data[0]);
    SetForecastData(data[1]);
    LowSetDailyTempData(data[2]);
    HighSetDailyTempData(data[3]);
    SetDayData(data[4]);
    SetDayIcons(data[5]);
    
}

//Function to clear mountain data 
function DeleteMountainData(mountain, setmountainsinLocalStorage){
    localStorage.removeItem(mountain);
    GetMountainsFromLocalStorage(setmountainsinLocalStorage);
}

//Side menu component
const SideMenu=({isOpen, observedmountain, weatherdata, forecastdata, lowdailytempdata, highdailytempdata, daydata, dayicons, SetPageTitle, SetWeather, SetForecastData, LowSetDailyTempData, HighSetDailyTempData, SetDayData, SetDayIcons})=>{
    const[mountainsinLocalStorage, setmountainsinLocalStorage] = useState([]); //Store mountains in local storage
    //Get mountains from local storage
    useEffect(() => {
        GetMountainsFromLocalStorage(setmountainsinLocalStorage)
      },[]);
    let button;
    //Display save button if there is data to save
    if(weatherdata !== ""){
        button = (
            <button className="mainbuttons" onClick={() => {
                SaveData(observedmountain, weatherdata, forecastdata, lowdailytempdata, highdailytempdata, daydata, dayicons, setmountainsinLocalStorage)
            }}>{'Save Data'}</button>
        );
    };

    //Side menu component
    return (
        // need to pass the use state isOpen so the menu knows when to open and close
        <Menu className='Side-menu' isOpen={isOpen}> 
            {button}  
            {/* Button to clear all saved locations */}
            <button className="mainbuttons" onClick={()=>{clearMountains(setmountainsinLocalStorage)}}>Clear All Stored Locations</button>
            <p className="Heading">Stored Locations</p>
            {/* Display stored mountains */}
            <div className="StoredMountainsContainer">
              {
                mountainsinLocalStorage.length > 0 && mountainsinLocalStorage.map((mountain) => (
                <div className="storedmountain">
                    <p>{mountain}</p>
                {/*Button to load data for saved locations*/}
                  <button className="loadStoredMountain" value={mountain}
                  onClick={(event) =>{
                    LoadMountainData(event.target.value, SetPageTitle, SetWeather, SetForecastData, LowSetDailyTempData, HighSetDailyTempData, SetDayData, SetDayIcons)
                  }}>Load</button>
                {/*Button to delete a saved locations*/}
                  <button className="deleteStoredMountain" value={mountain} onClick={(event) =>{
                    DeleteMountainData(event.target.value, setmountainsinLocalStorage)
                  }}>Delete</button>
                </div>
                ))}
            </div>
        </Menu>
    )
};

//Export SideMenu component
export default SideMenu;