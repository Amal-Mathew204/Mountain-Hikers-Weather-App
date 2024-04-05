//PageTitle component and functionality
//This component is used to display the home page

import React from "react"; //Import React library
import "../CSSFiles/PageTitle.css"; //CSS file for component styling

//Component to display the name of the mountain being viewed
function PageTitle({Title}) //TItle is the name of the mountain
{
    return (
        <h1 className="TitleMountain">{Title}</h1>
    );
}
//Export PageTitle component
export default PageTitle;