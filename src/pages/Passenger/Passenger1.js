import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

const data_arr = [
  {
    d_f_d: "1km",
    fare: "100",
    status: "Accept",
  },
  {
    d_f_d: "3km",
    fare: "5000",
    status: "Accepted",
  },
  {
    d_f_d: "2km",
    fare: "8000",
    status: "Rejected",
  },
];

const Passenger1 = () => {
  const [arr, setArr] = useState([]);
  const [bool_d_f_d, setBool_d_f_d] = useState(false);
  const [bool_fare, setBool_fare] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setArr(data_arr);
  }, []);

  const filter = (acc) => {
    let tmp = [...arr];
    if (acc === "d_f_d") {
      bool_d_f_d
        ? tmp.sort((a, b) => (a.d_f_d < b.d_f_d ? -1 : 1))
        : tmp.sort((a, b) => (a.d_f_d > b.d_f_d ? -1 : 1));
      setBool_d_f_d(!bool_d_f_d);
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

  return (
    <div className="driver1">
      <div className="driver1_bg"></div>
      <div className="driver1_container">
        <table>
          <thead>
            <th onClick={() => filter("d_f_d")}>Distance from Driver</th>
            <th onClick={() => filter("fare")}>Total Fare (₹)</th>
            <th>Action</th>
          </thead>
          <tbody>
            {arr.map((data, i) => (
              <tr key={i}>
                <td>{data.d_f_d}</td>
                <td>{data.fare}</td>
                <td>
                  <button className="table_btn">{data.status}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="driver1_btn">
          <button onClick={() => history.push("/driver2")}>Go To Driver</button>
        </div>
      </div>
    </div>
  );
};

export default Passenger1;
