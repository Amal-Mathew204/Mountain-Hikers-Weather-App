//WeatherCondition component and functionality
//This component is used to display the weather condition with colour coded range

import "../CSSFiles/WeatherCondition.css"; //CSS file for component styling

//Component to display the weather condition
function WeatherCondition({value, unit, condition, yellow_limit, red_limit, lowreading})
{
    let divStyle = {
      background: 'rgba(173, 215, 159,0.8)'
    }
    // Set the background colour based on the value
    if(yellow_limit !== undefined && red_limit !== undefined)
    {
      if(lowreading === false){
        if(value > yellow_limit){
          divStyle = {
            background: 'rgba(255,230,150,0.8)'
          }
        }
        if(value > red_limit){
          divStyle = {
            background: 'rgba(252, 120, 105,0.8)'
          }
        }
      }
      else{
        if(value < yellow_limit){
          divStyle = {
            background: 'rgba(255,220,150,0.8)'
          }
        }
        if(value < red_limit){
          divStyle = {
            background: 'rgba(252, 100, 100,0.8)'
          }
        }
      }
      
    }
    // console.log(value)
    // console.log(divStyle)


    // Display condition and value
    return(
        <div className="Weather-card" style={divStyle}>
          <p className="Condition">{value + unit}</p>
          <p className="Type">{condition}</p>
        </div>
    );

}
//Export WeatherCondition component
export default WeatherCondition;