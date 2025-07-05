import React from "react";
import "./mobile.css";
import { ListIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Mobilex = (props) => {
  const { mobileM } = props;

  const logo = () => {
    mobileM();
  };
  return (
    <div className="HeadxXx">
      <Link to="/">
        <img
          src="https://raw.githubusercontent.com/KesterJosh/Website-SampleX/main/logo1.png"
          className="logox"
        />
      </Link>
      <ListIcon onClick={logo} className="logoy" />
    </div>
  );
};

export default Mobilex;
