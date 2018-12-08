import React, { Component } from 'react';

class Locations extends Component {

  /***
  * @description - list item client event handler.
  * @pram {integer} - index
  * @pram {object} - latlong
  */
  listItemClickEvent = (index, latlng) => {
    this.props.listItemClickEvent(index, latlng, 16, true);
  }

  render() {
    return(
      <div className="locationholder" id="location-list" >
        {this.props.locations.map((location, index) => (
          <div className="location" aria-labelledby="location-list" tabIndex="3"
            key={index}
            onKeyPress={(e) => (
              e.preventdefault,
              this.listItemClickEvent(index, {lat: location.location.lat, lng: location.location.lng})
            )}
            onClick={(e) => (
              e.preventdefault,
              this.listItemClickEvent(index, {lat: location.location.lat, lng: location.location.lng})
            )}
          >
            <h4>{location.name}</h4>
            <p>{location.location.postalCode}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Locations;
