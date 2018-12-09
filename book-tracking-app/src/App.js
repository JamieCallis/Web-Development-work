import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchComponent from './search'
import ListBookContent from './ListBookContent'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
    state = {
      searching: false,
      books: [],
      searchResults: []
    }

	/**
      * @description After rendering of UI, is called, handles the collection of data from the API, and re-renders the UI
    */
	componentDidMount() {
      BooksAPI.getAll().then((books) =>  {
       	this.setState({books}) 
      })
    }

	/**
    * @description send a request to the booksAPI to update the shelf category information
    * @param {object} book - Current object book
    * @param {string} newShelfValue - the new shelf category
    */
	updateCategory = (book, newShelfValue) => {
        book.shelf = newShelfValue
        BooksAPI.update(book, newShelfValue).then(() => {
        this.setState(state => ({ books: state.books.filter(b => b.id !== book )
            .concat(book)}))
            }
          )
    }
	
	/**
    * @description check the search results, against the currently categoried books, and if they match update the shelf information in the search results
    */
	checkAgainstCurrentBooks = (Searchlength) => {
      // validation check to make sure there are items in the searchResults state array
      if(Searchlength > 0 ) {
      // performs a double loop to check all items in teh searchResults against, the current books with shelf categories
      // if any match tehn update the shelf category information
      let newSearchState = this.state.searchResults.map((book) => {
        this.state.books.map((checkBook) => {
        	if(book.id === checkBook.id) {
            	book.shelf = checkBook.shelf
            }
          	return book.shelf
        })
        return book
      }) 
      return newSearchState
    }
      return []
    }
	
	/**
    * @description perform a search on the books API and update the search results
    * @param {string} query - the search criteria
    */
   performSearch = (query) => {
   	return new Promise((resolve) => {
       BooksAPI.search(query).then((SearchResults) => {
       	this.setState({searchResults: SearchResults})
        resolve(this.state.searchResults.length)
       })
     })
   }

  /**
  * @description update searchResults with an updated array with correct shelfs 
  * param {number} length - the amount of search results
  */
   performCheck = (length) => {
     return new Promise((resolve) => {
       this.setState({
         searchResults: this.checkAgainstCurrentBooks(length)
       })
  		resolve()
     })
   	
   }

	/**
    * @description allow the search results to show
    */
	setSearch = () => {
      this.setState({searching: true})
    }

   searchAPIForBooks = (query) => {
      this.clearResults()
	  // checks that they query string length is greater than 0 
      this.performSearch(query).then(this.performCheck).then(this.setSearch)
   }

	/**
    * @description clears the search results
    */
    clearResults = () => {
      this.setState({searching: false, searchResults: []})
    }
	
	/**
    * @description handle the routing, and rendering of components
    */
    render() {
      
      return (
          <div className="app">
              <Route exact path="/" render={() => (
                  <ListBookContent
                      books={this.state.books}
                      updateCategory={this.updateCategory}
                  />
              )}/>

              <Route path="/search" render={() => (
                  <SearchComponent 
                      searching={this.state.searching}
                      searchResults={this.state.searchResults}
                      updateCategory={this.updateCategory}
                      clearResults={this.clearResults}
                      searchAPIForBooks={this.searchAPIForBooks}
                  />
              )}/>
          </div>
      )
    }
}

export default BooksApp
