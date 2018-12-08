import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import MapsDataAPI from './components/MapsDataAPI.js'
import Header from './components/header.js'
import Footer from './components/footer.js'
import SearchPlaces from './components/searchPlaces.js'
import Nav from './components/nav.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class App extends Component {
  state = {
    locations: [],
    originalLocations:[],
    isOpen: false,
    defaultCenter: {lat: 51.481583,lng: -3.179090},
    center: {lat: 51.481583,lng: -3.179090},
    showInfoIndex: 1,
    markerIcon: {},
    defaultMarkerIcon: {},
    defaultZoom: 13,
    zoom: 13,
    menuHidden: true
  }

  /***
  * @description - function to be passed to check if responses from APIs are working,
    if not output an error message.
  * @pram {bool} - response
  * @ return bool
  */
  handleErrors = (response) => {
    if(!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }


  /***
  * @description - Will get the marker and set the defaultMarker, and markerIcon.
  */
  componentWillMount() {

    let defaultIcon = {
      url: 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png'
    }

    this.setState({
      defaultMarkerIcon: defaultIcon,
      markerIcon: defaultIcon
    })
  }

  /***
  * @description - Get all the locations for the map from MapDataAPI. Then
    populate the locations, and original locations array. Catch any errors,
    and inform the user.
  */
  componentDidMount() {
   let MapDataAPI = new MapsDataAPI();

   MapDataAPI.getAllLocations().then((locations) => {
     this.setState({
       locations: locations,
       originalLocations: locations
     })
   }).catch((error) => {
     alert('Error while getting all locations data from FourSqaure API, Sorry!');
     console.log('error while getting all locations')
    })
   }

   /***
   * @description - Filter the locations based on the users inputted search query.
   * @pram {string} - query
   */
  filterLocations = (query) => {
    const match = new RegExp(escapeRegExp(query), 'i')

    if(query === '') {
      this.updateLocations([], query)
    } else {
      let filteredlist = this.state.originalLocations.filter(location => match.test(location.name))
      this.updateLocations(filteredlist, query)
    }
  }

  /***
  * @description - Update locations. If the query isn't empty then use the new array.
  Otherwise reset the locations array with the default locations.
  * @pram {array} - newLocationArray
  * @pram {string} - query
  */
  updateLocations = (newLocationArray, query) => {
    if(query) {
      this.setState({
        locations: newLocationArray
      })
    } else {
      this.setState({
        locations: this.state.originalLocations
      })
    }
  }

  /*
    Map Code
  */

  /***
  * @description - Update the marker toogle, and set the markerIcon to a new marker.
  * @pram {integer} - index
  * @pram {object} - latlng
  * @pram {integer} - zoom
  * @pram {bool} - bool
  */
  markerToogle = (index, latlng, zoom, bool) => {
    let newIcon = {
      path: 'M 125, 5 155, 90 245, 90 175, 145 200, 230 125, 180 50, 230 75, 145 5, 90 95, 90 z',
      fillColor: 'yellow',
      fillOpacity: 0.8,
      scale: 0.1,
      strokeColor: 'red',
      strokeWeight: 3
    }

    this.setState({
      showInfoIndex: index,
      center: latlng,
      zoom: zoom,
      isOpen: bool,
      markerIcon: newIcon
    })
  }

  /***
  * @description - function to be passed to check if responses from APIs are working,
    if not output an error message.
  * @pram {integer} - index
  * @pram {object} - latlng
  * @pram {integer} - zoom
  * @pram {bool} - bool
  */
  handleMarkerClickEvent = (index, latlng, zoom, bool) => {
    this.markerToogle(index, latlng, zoom, bool)
  }

  /***
  * @description - On closing of the info window reset the center, zoom, isOpen,
    and markerIcon.
  * @pram {object} - event
  */
  handleInfoWindowCloseEvent = (event) => {
    // reset the state values to the default
    this.setState((state) => ({
      center: state.defaultCenter,
      zoom: state.defaultZoom,
      isOpen: false,
      markerIcon: state.defaultMarkerIcon
    }))
  }

  /*
    side navigation
  */
  /***
  * @description - calls markerToogle.
  * @pram {integer} - index
  * @pram {object} - latlng
  * @pram {integer} - zoom
  * @pram {bool} - bool
  * @ return bool
  */
  listItemClickEvent = (index, latlng, zoom, bool) => {
    this.markerToogle(index, latlng, zoom, bool)
  }

  /*
    header
 */

 /***
 * @description - update the menuHidden in state to toggle the side navigation.
 * @pram {bool} - bool
 * @ return bool
 */
  menuToggleChange = (bool) => {
    this.setState({
      menuHidden: bool
    })
  }


  render() {
    return (
      <div className="App">
        <Nav
          menuHidden={this.state.menuHidden}
          locations={this.state.locations}
          listItemClickEvent={this.listItemClickEvent}
          filterLocations={this.filterLocations}
        />

        <div className="main-body">
          <Header
            menuHidden={this.state.menuHidden}
            menuToggleChange={this.menuToggleChange}
          />
          <Map
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            defaultMarkerIcon={this.state.defaultMarkerIcon}
            locations={this.state.locations}
            markerClickEvent={this.handleMarkerClickEvent}
            isOpen={this.state.isOpen}
            showInfoIndex={this.state.showInfoIndex}
            markerIcon={this.state.markerIcon}
            handleInfoWindowCloseEvent={this.handleInfoWindowCloseEvent}
          />
          <Footer/>
        </div>


      </div>
    )
  }
}

export default App;
