//WindMap component and functionality
//This component is used to display the wind map for the location

// Import React and useState
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import "../CSSFiles/WindMap.css"; //CSS file for component styling
import markerIcon from '../Images/placeholder.png'; //Importing marker icon


function WindMap({data, location}) {
  let lat = data.coord.lat;
  let lon = data.coord.lon;
  console.log(lat,lon);
  console.log("location",location);
  const zoom = 9;
  // const n = Math.pow(2, zoom);
  // const xTile = Math.floor(n * ((lon + 180) / 360));
  // const yTile = Math.floor(n * (1 - (Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI)) / 2);
  // console.log("x: ", xTile, "y: ", yTile);
  // const apikey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const apikey = "ENTER OPEN WEATHER API KEY HERE";
  console.log("The apikey: ", apikey)
  // Generating a unique key based on lat and lon to force re-render
  const mapKey = lat + 'npm install react-leaflet:' + lon;
  const position = [lat,lon]
  const customIcon = new L.Icon({
    iconUrl: markerIcon, // The URL to the image you want to use for the marker
    iconSize: [35, 35], // Size of the icon in pixels
    conAnchor: [17, 35], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
  });

  return (
        <div className='container'>
          <h1 className='wind-title'>WIND MAP</h1>
          <div className='Wind-Map-Container'>
            <MapContainer center={position} zoom={zoom} className='map' key = {mapKey} >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <TileLayer
                url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apikey}`}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} icon = {customIcon} >
                <Popup>
                  <div>
                    {location}
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
   
  );
}

// Export WindMap component
export default WindMap;
