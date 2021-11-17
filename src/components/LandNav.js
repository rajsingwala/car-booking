import React from "react";
import { useHistory, useLocation } from "react-router";
import AutoComplete from "./AutoComplete";

const LandNav = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className={location.pathname === "/" ? "land_nav" : "land_nav_next"}>
      <h1 onClick={() => history.push("/")}>Car-Booking</h1>
      <div className="land_nav_logo">
        <img
          src="../logo.png"
          alt="ethereum"
          onClick={() => history.push("/")}
        />
      </div>
    </div>
  );
};

export default LandNav;
