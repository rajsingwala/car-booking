import React, { useEffect, useState } from "react";
import LandNav from "../components/LandNav";
import AutoComplete from "../components/AutoComplete";
import { useSelector, useDispatch } from "react-redux";
import { selectS_Name, setSource } from "../app/sourceSlice";
import { selectD_Name } from "../app/destSlice";
import { useHistory } from "react-router-dom";
import { setType } from "../app/typeSlice";

const Home = () => {
  const [typo, setTypo] = useState("");
  const [error, setError] = useState(null);
  const [more, setMore] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const source = useSelector(selectS_Name);
  const dest = useSelector(selectD_Name);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log("dest", dest);
    if (
      dest === null ||
      error !== null ||
      typo === "" ||
      (more && (lat === "" || lng === ""))
    ) {
      setError("Please add all Fields");
      return;
    }
    window.localStorage.setItem("type", typo);
    dispatch(setType({ type: typo }));
    dispatch(
      setSource({
        s_lat: window.localStorage.getItem("s_lat"),
        s_lng: window.localStorage.getItem("s_lng"),
      })
    );
    if (more) {
      window.localStorage.setItem("s_lat", lat);
      window.localStorage.setItem("s_lng", lng);
      dispatch(
        setSource({
          s_lat: window.localStorage.getItem("s_lat"),
          s_lng: window.localStorage.getItem("s_lng"),
        })
      );
    }
    if (typo === "offer") history.push("/driver1");
    else if (typo === "get") history.push("/passenger1");
  };

  useEffect(() => {
    const successCall = (pos) => {
      console.log(pos.coords);
      window.localStorage.setItem("s_lat", pos.coords.latitude);
      window.localStorage.setItem("s_lng", pos.coords.longitude);
    };
    const errCall = (err) => {
      setError(`${err.message}`);
      setMore(true);
    };
    const loc = navigator.geolocation.getCurrentPosition(successCall, errCall, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  }, []);

  return (
    <div className="home">
      <LandNav />
      <div className="home_container">
        <div className="home_content">
          {error && <div className="home_content_error">{error}</div>}
          <h1>Where Do You Want to Travel</h1>
          <div className="home_content_field">
            <div className="home_content_field_top">
              <AutoComplete />
              {more && (
                <>
                  <input
                    type="number"
                    className="home_more_field"
                    placeholder="Enter Lat"
                    onChange={(e) => {
                      setError(null);
                      setLat(e.target.value);
                    }}
                  />
                  <input
                    type="number"
                    className="home_more_field"
                    placeholder="Enter Lng"
                    onChange={(e) => {
                      setError(null);
                      setLng(e.target.value);
                    }}
                  />
                </>
              )}
            </div>
            <div className="home_content_field_mid">
              <div
                className={
                  typo === "get"
                    ? "home_content_field_ride active"
                    : "home_content_field_ride"
                }
                onClick={() => {
                  setTypo("get");
                  setError(null);
                }}
              >
                <div className="home_content_field_ride_img">
                  <h4>Get A Ride</h4>
                  <img src="./get.svg" alt="get" />
                </div>
              </div>

              <div
                className={
                  typo === "offer"
                    ? "home_content_field_ride active"
                    : "home_content_field_ride"
                }
                onClick={() => {
                  setTypo("offer");
                  setError(null);
                }}
              >
                <div className="home_content_field_ride_img">
                  <h4>Offer a Ride</h4>
                  <img src="./offer.svg" alt="offer" />
                </div>
              </div>
            </div>
            <div className="home_content_field_bottom">
              <button onClick={handleSubmit} disabled={error !== null}>
                Let's Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
