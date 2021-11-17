import React from "react";
import { Switch, Route } from "react-router-dom";
import LandNav from "./components/LandNav";
import Home from "./pages/Home";
import Second from "./pages/Second/Second";
import "mapbox-gl/dist/mapbox-gl.css";
import Driver1 from "./pages/Driver/Driver1";
import Driver2 from "./pages/Driver/Driver2";
import Passenger1 from "./pages/Passenger/Passenger1";
import Passenger2 from "./pages/Passenger/Passenger2";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/second">
          <LandNav />
          <Second />
        </Route>
        <Route exact path="/driver1">
          <LandNav />
          <Driver1 />
        </Route>
        <Route exact path="/driver2">
          <LandNav />
          <Driver2 />
        </Route>
        <Route exact path="/passenger1">
          <LandNav />
          <Passenger1 />
        </Route>
        <Route exact path="/passenger2">
          <LandNav />
          <Passenger2 />
        </Route>
      </Switch>
    </>
  );
};

export default App;
