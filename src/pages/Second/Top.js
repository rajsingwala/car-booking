import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AutoComplete from "../../components/AutoComplete";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Top = ({ s_lat, s_lng, d_lat, d_lng }) => {
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
      const instructions = document.getElementById("instructions");
      const steps = data.legs[0].steps;

      let tripInstructions = "";
      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }
      instructions.innerHTML = `
      <p><strong>Trip Distance: ${(data.distance / 1000).toFixed(
        1
      )} km  </strong></p>
      <p><strong>Trip Duration: ${
        (data.duration / 3600).toFixed(1) > 1
          ? (data.duration / 3600).toFixed(1)
          : (data.duration / 60).toFixed(1)
      } ${(data.duration / 3600).toFixed(1) > 1 ? "hr" : "min"}  </strong></p>
        <p><strong>Trip Fare: ${new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(
          (data?.duration / 60) * 2 + (data.distance / 1000) * 5
        )}</strong></p>`;
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
  }, [s_lat, s_lng, d_lat, d_lng]);

  const addToMap = (map, lat, lng, color) => {
    const marker = new mapboxgl.Marker({ color })
      .setLngLat([lng, lat])
      .addTo(map);
  };

  return (
    <div id="map">
      <div id="instructions"></div>
      <div className="map_search"></div>
    </div>
  );
};

export default Top;
