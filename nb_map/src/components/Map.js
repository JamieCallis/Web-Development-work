import React, { Component } from 'react';
import { withScriptsjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

class Map extends Component {
  /***
  * @description - function to be passed to check if responses from APIs are working,
    if not output an error message.
  * @pram {bool} - response
  * @ return bool
  */
  markerClickEvent = (index, latlng, venueID) => {
    this.props.markerClickEvent(index, latlng, 16, true)
  }


  componentDidCatch(error, info) {
    console.log(error)
    alert("Error occured while trying to render google maps API please check your connection.")
  }

  render() {
    const GoogleMapActivated = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = {this.props.defaultCenter}
        defaultZoom = { this.props.defaultZoom }
      >
        <MarkerClusterer>
          {this.props.locations.map((location, index) => (
            <Marker
              key={index}
              onClick={(e) => (
                e.preventdefault,
                this.markerClickEvent(index, {lat: location.location.lat, lng: location.location.lng}, location.id)
              )}
              icon={this.props.showInfoIndex === index ?
                this.props.markerIcon : this.props.defaultMarkerIcon}
              position={{lat: location.location.lat, lng: location.location.lng}}
            >
            {this.props.isOpen && this.props.showInfoIndex === index
              && <InfoWindow onCloseClick={this.props.handleInfoWindowCloseEvent}>
                  <div className="location">
                    <h4>{location.name}</h4>
                    <p>{location.location.address}</p>
                    <p>{location.location.city}</p>
                    <p>{location.location.postalCode}</p>
                  </div>
                </InfoWindow>}

            </Marker>
          ))}
        </MarkerClusterer>

      </GoogleMap>
    ));

    return(
        <GoogleMapActivated
          containerElement = { <main className="mapContainer"/>}
          mapElement={<div className="map" />}
          />
    );
  }
}


export default Map;
