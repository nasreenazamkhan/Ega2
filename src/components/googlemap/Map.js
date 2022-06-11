import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  StandaloneSearchBox,
  Autocomplete,
  Polygon,
} from "@react-google-maps/api";
import config from "./MapConfig";
import Geocode from "react-geocode";
import "./Map.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const divStyle = {
  color: "#434343",
  fontFamily: "Dubai",
  fontSize: 14,
  maxWidth: "250px",
};

function MapComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: config.apiKey,
    libraries: ["geometry", "places"],
  });
  const [center, setCenter] = useState(config.JNCenter);
  const [state, setState] = useState({
    showingInfoWindow: false,
  });
  const [address, setAddress] = useState(props.address);
  const [searchBox, setSearchBox] = useState();
  const [place, setPlace] = useState();
  const [query, setQuery] = useState("");
  const bounds =
    props.zone === "JAFZAN"
      ? config.JAFZA_NORTH_BOUNDS
      : props.zone === "JAFZAS"
        ? config.JAFZA_SOUTH_BOUNDS
        : config.DUBAI_LOGISTICS_BOUNDS;
  const [map, setMap] = useState();

  const paths =
    props.zone === "JAFZAN"
      ? config.JAFZA_NORTH_POLYGON
      : props.zone === "JAFZAS"
        ? config.JAFZA_SOUTH_POLYGON
        : config.DUBAI_LOGISTICS_POLYGON;

  useEffect(()=>{
    if (props.latLng) { setCenter(props.latLng) }
    else if (props.zone === "JAFZAS") {
      setCenter(config.JSCenter);
      props.handleClick({add: "", loc:""});
    } else if (props.zone === "JAFZAN") {
      setCenter(config.JNCenter);
      props.handleClick({add: "", loc:""});
    } else if(props.zone === "DUBAIS"){
      setCenter(config.DLCenter);
      props.handleClick({add: "", loc:""});
    }
  }, [props.zone]);

  useEffect(() => {
    var str = props.address;
    console.log("address&&&&&", str)
    if (str?.includes(",")) {
      var arr = str?.split(",");
      var fst = arr?.splice(0, 1).join("");
      var rest = arr?.join(",");
      setAddress(rest);
      setPlace(fst);
    } else {
      setAddress(str);
      setPlace("");
    }
    if (props.action === 'VIEW')
      setState({ showingInfoWindow: true });
  }, [props]);
  // .zone,props.latLng,props.address

  const handleMapClick = (...args) => {
    // setCenter({
    //   lat: args[0].latLng.lat(),
    //   lng: args[0].latLng.lng()
    // });
    // console.log("map", map);
    //   var allowedBounds = new window.google.maps.LatLngBounds(
    //     new window.google.maps.LatLng(24.930212749625253, 55.02029718098645),
    //     new window.google.maps.LatLng(24.986664048459883, 55.14006881987789),
    //   );
    //   var boundLimits = {
    //     maxLat : allowedBounds.getNorthEast().lat(),
    //     maxLng : allowedBounds.getNorthEast().lng(),
    //     minLat : allowedBounds.getSouthWest().lat(),
    //     minLng : allowedBounds.getSouthWest().lng()
    // };
    if (centerChanged(args[0].latLng)) {
      setCenter({
        lat: args[0].latLng.lat(),
        lng: args[0].latLng.lng(),
      });
      console.log("map", map);
      setPlace();
      Geocode.fromLatLng(
        args[0].latLng.lat(),
        args[0].latLng.lng(),
        config.apiKey
      ).then(
        (response) => {
          console.log("map", response);
          const address = response.results[0].formatted_address;
          console.log("formatted_address :: " + address);
          setAddress(address);
          props.handleClick({ add: address, loc: response.results[0].geometry.location });

        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const onMarkerClick = (e) => {
    console.log("marker", e);
    setState({
      showingInfoWindow: !state.showingInfoWindow,
    });
  };

  const options = {
    restriction: {
      latLngBounds: bounds,
      strictBounds: false,
    },
    streetViewControl: config.streetViewControl,
    mapTypeControl: config.mapTypeControl,
    rotateControl: false,
    fullscreenControl: false,
    zoom: config.zoomLevel,
    // styles: [{
    // featureType: "poi",
    // elementType: "labels",
    // stylers: [{ visibility: "on" }]}]
    clickableIcons: false,
  };

  // const onLoad = ref => setSearchBox(ref);

  // const onPlacesChanged = (...args) => {
  //   console.log("Search args", args);
  //   console.log('searchBox', searchBox.getPlaces());
  //   const address = searchBox.getPlaces()[0].formatted_address;
  //   const place = searchBox.getPlaces()[0].name;
  //   setAddress(address);
  //   setPlace(place)
  //   props.handleClick(address);
  //   console.log("lat",searchBox.getPlaces()[0].geometry.location.lat());
  //   const lat = searchBox.getPlaces()[0].geometry.location.lat();
  //   const lng = searchBox.getPlaces()[0].geometry.location.lng();
  //   setCenter({
  //     lat: lat,
  //     lng: lng
  //   })
  // }

  const onLoad = (autocomplete) => {
    console.log("autocomplete: ", autocomplete);
    setSearchBox(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchBox !== null) {
      console.log("autocomplete", searchBox.getPlace());
      // var allowedBounds = new window.google.maps.LatLngBounds(
      //   new window.google.maps.LatLng(bounds.south, bounds.west),
      //   new window.google.maps.LatLng(bounds.north, bounds.east),
      // );
      // if(allowedBounds.contains(searchBox.getPlace().geometry.location))
      if (centerChanged(searchBox.getPlace().geometry.location)) {
        setCenter({
          lat: searchBox.getPlace().geometry.location.lat(),
          lng: searchBox.getPlace().geometry.location.lng(),
        });
        const address = searchBox.getPlace().formatted_address;
        const place = searchBox.getPlace().name;
        setAddress(address);
        setPlace(place);
        console.log(place + ", " + address);
        props.handleClick({ add: place + ", " + address, loc: searchBox.getPlace().geometry.location });
        // props.handleClick(place + ", " + address);
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const centerChanged = (latLng) => {
    // props.handleError("");
    const jafza = new window.google.maps.Polygon({
      paths: paths,
    });
    if (window.google.maps.geometry.poly.containsLocation(latLng, jafza))
      return true;
    else {
      setAddress("");
      setPlace("");
      props.handleClick("");
      props.handleError("Location is outside of selected zone");
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onClick={props.action === 'VIEW' ? {} : handleMapClick}
      options={options}
      onLoad={(map) => setMap(map)}
      zoom={2.5}
    >
      <Marker position={center} onMouseOver={onMarkerClick}>
        {state.showingInfoWindow && (
          <InfoWindow position={center} onCloseClick={onMarkerClick}>
            <div style={divStyle}>
              <div>
                <b>
                  <u>{place}</u>
                </b>
              </div>
              <div>
                {address
                  ? address
                  : props.zone == "JAFZAN"
                    ? "JAFZA North Area"
                    : props.zone == "JAFZAS"
                      ? "JAFZA South Area"
                      : "Dubai Logistics City"}
              </div>
            </div>
          </InfoWindow>
        )}
      </Marker>
      {props.action !== 'VIEW' && <div className="Map">
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          bounds={bounds}
          restrictions={{ country: "ae" }}
        >
          <input
            type="text"
            className="test"
            placeholder="Search Location Here"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `300px`,
              height: `32px`,
              padding: `0 8px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "0%",
            }}
          />
        </Autocomplete>
      </div>}
      <Polygon
        paths={paths}
        options={{
          fillColor: "transparent",
          strokeColor: "rgb(5 33 95)",
          strokeOpacity: 1,
          strokeWeight: 1,
          clickable: false,
          draggable: false,
          editable: false,
          geodesic: false,
          zIndex: 1,
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapComponent);
