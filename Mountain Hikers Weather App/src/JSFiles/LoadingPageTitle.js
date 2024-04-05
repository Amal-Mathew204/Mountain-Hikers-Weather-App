//LoadingPageTitle component and functionality
//This component is used to display the title of the loading page

import "../CSSFiles/LoadingPageTitle.css"; //CSS file for component styling

//Component to display the title of the loading page
function LoadingPageTitle() {
    return(
        <section className="TitleContainer">
            <h1 className="Title">Start Your Adventure</h1>
        </section>
    );
}
//Export LoadingPageTitle component
export default LoadingPageTitle;