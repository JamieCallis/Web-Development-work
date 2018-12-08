import React, { Component } from 'react';
import SearchPlaces from './searchPlaces.js';
import Locations from './locations.js';

class Nav extends Component {
  /***
  * @description - send of request to parent function to filter the properties
  * @pram {string} - query
  */
  callFilter = (query) => {
    this.props.filterLocations(query)
  }

  render() {
    const {menuHidden} = this.props

    if (menuHidden) {
      return (
        <nav aria-hidden="true">
          <SearchPlaces
            callFilter={this.callFilter}/>
          <Locations
            locations={this.props.locations}
            listItemClickEvent={this.props.listItemClickEvent}
          />
        </nav>
      )
    } else {
      return (
        <nav className="open" aria-hidden="false">
          <SearchPlaces
            callFilter={this.callFilter}/>
          <Locations
            locations={this.props.locations}
            listItemClickEvent={this.props.listItemClickEvent}
          />
        </nav>
      )
    }
  }
}

export default Nav;
