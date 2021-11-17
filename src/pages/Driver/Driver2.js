import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectD_a,
  selectP_a,
  selectD_f_d,
  selectT_d,
  selectFare,
} from "../../app/driverSlice";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { selectS_Lat, selectS_Lng } from "../../app/sourceSlice";
import { useHistory } from "react-router";

const Driver2 = () => {
  const p_a = useSelector(selectP_a);
  const d_a = useSelector(selectD_a);
  const d_f_d = useSelector(selectD_f_d);
  const t_d = useSelector(selectT_d);
  const fare = useSelector(selectFare);

  const s_lat = useSelector(selectS_Lat);
  const s_lng = useSelector(selectS_Lng);

  const d_lat = "22.15615081724023";
  const d_lng = "72.80452101050004";

  const history = useHistory();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/raj-rs8/ckvdt5fpreqg914o8ed2g5bwn",
      center: [s_lng, s_lat],
      zoom: 10,
    });

    if (s_lat && s_lng) addToMap(map, s_lat, s_lng, "black");
    if (d_lat && d_lng) addToMap(map, d_lat, d_lng, "#3FB1CE");

    async function getRoute() {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${s_lng},${s_lat};${d_lng},${d_lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );

      const json = await query?.json();
      const data = json?.routes[0];
      const route = data?.geometry?.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 6,
            "line-opacity": 0.8,
          },
        });
      }
      // const instructions = document.getElementById("instructions");
      // const steps = data.legs[0].steps;
    }

    map.fitBounds(
      [
        [s_lng, s_lat],
        [d_lng, d_lat],
      ],
      {
        padding: 60,
      }
    );

    map.on("load", () => {
      getRoute();

      map.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: { s_lng, s_lat },
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });
    });
  }, [s_lat, s_lng]);

  const addToMap = (map, lat, lng, color) => {
    const marker = new mapboxgl.Marker({ color })
      .setLngLat([lng, lat])
      .addTo(map);
  };

  return (
    <div className="driver2">
      <div className="driver2_container">
        <div className="driver2_info">
          <table>
            <thead>
              <th>Passenger Address</th>
              <th>Destination Name</th>
              <th>Distance from Driver</th>
              <th>Total Distance</th>
              <th>Total Fare (₹)</th>
            </thead>
            <tbody>
              <tr>
                <td>{p_a}</td>
                <td>{d_a}</td>
                <td>{d_f_d}</td>
                <td>{t_d}</td>
                <td>{fare}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="map"></div>
        <div className="driver2_pickup">
          <button onClick={() => history.push("/second")}>
            Pickup Passenger
          </button>
        </div>
      </div>
    </div>
  );
};

export default Driver2;
