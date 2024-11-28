import React from "react";
import './mobile.css'
const Mobilex = (props) =>{
    const {mobileM} = props;

    const logo = () =>{
        mobileM();
    }
    return(
        <div className="HeadxXx">
            <img src="https://raw.githubusercontent.com/KesterJosh/Website-SampleX/main/logo1.png" className="logox"/>
            <img src="https://raw.githubusercontent.com/KesterJosh/Website-SampleX/main/Menu.png" className="logoy" onClick={logo}/>
        </div>
    );
}

export default Mobilex;