import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map() {
  const defaultProps = {
    center: {
      lat: 11.99835602,
      lng: 100.01502627,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div
      style={{
        height: "25vw",
        width: "90%",
        margin: "-20vw auto 0",
        zIndex: "1",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
