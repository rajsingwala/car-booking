import React, { useEffect } from "react";
import Top from "./Top";
import Bottom from "./Bottom";
import { useSelector } from "react-redux";
import { selectS_Lat, selectS_Lng, setSource } from "../../app/sourceSlice";
import { selectD_Lat, selectD_Lng, setDestination } from "../../app/destSlice";
import { useDispatch } from "react-redux";

const Second = () => {
  const s_lat = useSelector(selectS_Lat);
  const s_lng = useSelector(selectS_Lng);
  const d_lat = useSelector(selectD_Lat);
  const d_lng = useSelector(selectD_Lng);

  const dispatch = useDispatch();

  const l_s_lat = window.localStorage.getItem("s_lat");
  const l_s_lng = window.localStorage.getItem("s_lng");
  const l_d_lat = window.localStorage.getItem("d_lat");
  const l_d_lng = window.localStorage.getItem("d_lng");

  useEffect(() => {
    dispatch(setSource({ s_lat: l_s_lat, s_lng: l_s_lng }));
    dispatch(setDestination({ d_lat: l_d_lat, d_lng: l_d_lng }));
  }, [l_s_lat, l_s_lng, l_d_lat, l_d_lng]);

  return (
    <div className="second">
      <div className="second_container">
        <div className="second_container_top">
          <Top s_lat={s_lat} s_lng={s_lng} d_lat={d_lat} d_lng={d_lng} />
        </div>
      </div>
    </div>
  );
};

export default Second;
