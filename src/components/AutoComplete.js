import React from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import { setSource } from "../app/sourceSlice";
import { setDestination } from "../app/destSlice";
import { useDispatch } from "react-redux";

const AutoComplete = () => {
  const dispatch = useDispatch();

  const onSource = (viewport, item) => {
    window.localStorage.setItem("s_lat", viewport.latitude);
    window.localStorage.setItem("s_lng", viewport.longitude);
    window.localStorage.setItem("s_name", item.place_name);
    dispatch(
      setSource({
        s_name: window.localStorage.getItem("s_name"),
        s_lat: window.localStorage.getItem("s_lat"),
        s_lng: window.localStorage.getItem("s_lng"),
      })
    );
  };

  const onDestination = (viewport, item) => {
    window.localStorage.setItem("d_lat", viewport.latitude);
    window.localStorage.setItem("d_lng", viewport.longitude);
    window.localStorage.setItem("d_name", item.place_name);
    dispatch(
      setDestination({
        d_name: window.localStorage.getItem("d_name"),
        d_lat: window.localStorage.getItem("d_lat"),
        d_lng: window.localStorage.getItem("d_lng"),
      })
    );
  };

  const ipDes = (props) => <input {...props} placeholder="Enter Destination" />;

  return (
    <>
      <div className="auto_complete">
        <Geocoder
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onSelected={onDestination}
          hideOnSelect={true}
          timeout={500}
          updateInputOnSelect={true}
          inputComponent={ipDes}
        />
      </div>
    </>
  );
};

export default AutoComplete;
