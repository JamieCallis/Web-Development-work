import React, { Component } from 'react';


class SearchPlaces extends Component {
  state = {
    query: ''
  }

  /***
  * @description - clear the query inside of state.
  */
  clearQuery = () => {
    this.setState({
      query: ''
    })
  }

  /***
  * @description - make a call to the parent to filter the locations
  * @pram {string} - query
  */
  filterLocations = (query) => {
    this.props.callFilter(query)
  }

  /***
  * @description - update the query and call the methods to filter the locations.
  * @pram {string} - query
  */
  updateQuery = (query) => {
    if(query) {
        /*
          * Will wait for the query to be trimmed before continuing. Reason for doing a promise
          * is the update of the query depends on the serialisation of the query.
        */
      	new Promise((resolve) => {
           // performs a regular expression to remove the characters if they exsist in the string query
           let trimmedQuery = query.replace(/^\s+/,'')
           resolve(trimmedQuery)
        }).then((trimmedQuery) => {
          	new Promise((resolve) => {
               	this.setState((state) => ({
        		query: state.query = trimmedQuery
      		}))
             resolve(this.state.query)
             /*
              * Once the query has been updated in state it's then passed through
              * so that the locations can be filtered.
             */
            }).then((query) => {
               	if(query.length > 0) {
                  this.filterLocations(query)
                }
               }
            )
        })
        } else {
          this.clearQuery()
          this.filterLocations(query)
      }
  }

  render() {
    return (
      <form tabIndex="2">
        <input
          onChange={(event) => this.updateQuery(event.target.value)}
          type="text"
          placeholder="filter options"/>
      </form>
    )
  }
}

export default SearchPlaces;
