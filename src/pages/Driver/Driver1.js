import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setDriver } from "../../app/driverSlice";

// get name from lat-lng
// https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?types=address&access_token=pk.eyJ1IjoianNjYXN0cm8iLCJhIjoiY2s2YzB6Z25kMDVhejNrbXNpcmtjNGtpbiJ9.28ynPf1Y5Q8EyB_moOHylw

const data_arr = [
  {
    p_a: "athwalines",
    d_a: "city-light",
    d_f_d: "1km",
    t_d: "10km",
    fare: "100",
    status: "Accept",
  },
  {
    p_a: "surat",
    d_a: "ahmedabad",
    d_f_d: "3km",
    t_d: "250km",
    fare: "5000",
    status: "Accepted",
  },
  {
    p_a: "gandhinagar",
    d_a: "mumbai",
    d_f_d: "2km",
    t_d: "650km",
    fare: "8000",
    status: "Rejected",
  },
];

const Driver1 = () => {
  const [arr, setArr] = useState([]);
  const [bool_p_a, setBool_p_a] = useState(false);
  const [bool_d_a, setBool_d_a] = useState(false);
  const [bool_d_f_d, setBool_d_f_d] = useState(false);
  const [bool_t_d, setBool_t_d] = useState(false);
  const [bool_fare, setBool_fare] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setArr(data_arr);
  }, []);

  const filter = (acc) => {
    let tmp = [...arr];
    if (acc === "p_a") {
      bool_p_a
        ? tmp.sort((a, b) => (a.p_a < b.p_a ? -1 : 1))
        : tmp.sort((a, b) => (a.p_a > b.p_a ? -1 : 1));
      setBool_p_a(!bool_p_a);
      setArr(tmp);
    }
    if (acc === "d_a") {
      bool_d_a
        ? tmp.sort((a, b) => (a.d_a < b.d_a ? -1 : 1))
        : tmp.sort((a, b) => (a.d_a > b.d_a ? -1 : 1));
      setBool_d_a(!bool_d_a);
      setArr(tmp);
    }
    if (acc === "d_f_d") {
      bool_d_f_d
        ? tmp.sort((a, b) => (a.d_f_d < b.d_f_d ? -1 : 1))
        : tmp.sort((a, b) => (a.d_f_d > b.d_f_d ? -1 : 1));
      setBool_d_f_d(!bool_d_f_d);
      setArr(tmp);
    }
    if (acc === "t_d") {
      bool_t_d
        ? tmp.sort((a, b) => (a.t_d < b.t_d ? -1 : 1))
        : tmp.sort((a, b) => (a.t_d > b.t_d ? -1 : 1));
      setBool_t_d(!bool_t_d);
      setArr(tmp);
    }
    if (acc === "fare") {
      bool_fare
        ? tmp.sort((a, b) => (a.fare < b.fare ? -1 : 1))
        : tmp.sort((a, b) => (a.fare > b.fare ? -1 : 1));
      setBool_fare(!bool_fare);
      setArr(tmp);
    }
  };

  const handleInfo = (data) => {
    dispatch(
      setDriver({
        d_a: data.d_a,
        p_a: data.p_a,
        d_f_d: data.d_f_d,
        t_d: data.t_d,
        fare: data.fare,
      })
    );
  };

  return (
    <div className="driver1">
      <div className="driver1_bg"></div>
      <div className="driver1_container">
        <table>
          <thead>
            <th onClick={() => filter("p_a")}>Passenger Address</th>
            <th onClick={() => filter("d_a")}>Destination Name</th>
            <th onClick={() => filter("d_f_d")}>Distance from Driver</th>
            <th onClick={() => filter("t_d")}>Total Distance</th>
            <th onClick={() => filter("fare")}>Total Fare (₹)</th>
            <th>Action</th>
          </thead>
          <tbody>
            {arr.map((data, i) => (
              <tr key={i}>
                <td>{data.p_a}</td>
                <td>{data.d_a}</td>
                <td>{data.d_f_d}</td>
                <td>{data.t_d}</td>
                <td>{data.fare}</td>
                <td>
                  <button
                    className="table_btn"
                    onClick={() => handleInfo(data)}
                  >
                    {data.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="driver1_btn">
          <button onClick={() => history.push("/driver2")}>
            Go To Passenger
          </button>
        </div>
      </div>
    </div>
  );
};

export default Driver1;
