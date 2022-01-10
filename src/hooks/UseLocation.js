import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UseLocation = () => {
    const [state, setState] = useState({
        longitude: 0,
        latitude: 0,
      });

    const obtenerD = ()=>{
        navigator.geolocation.getCurrentPosition(
            function (position) {
              setState({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              });
            },
            function (error) {
              console.error("Error Code = " + error.code + " - " + error.message);
            },
            {
              enableHighAccuracy: true,
            }
          );
    }
    
      return [state, obtenerD];
    };
export default UseLocation
