import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from './select'

function setQuery(state, newQueryvalue) {
  return {
  	query: newQueryvalue
  }
}

class SearchComponent extends Component {
    state = {
      query: ''
    
    }
    handleChangeInQuery = () => {
      this.setState(setQuery)
    }
 	/**
    * @description validate and edit the query
    * @param {string} query - search creiteria
    */
    updateQuery = (query) => {
      if(query) {
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
            }).then((query) => {
               	if(query.length > 0) { 
                  this.props.searchAPIForBooks(this.state.query)
                }  else {
                  this.clearQuery()
                }     
               }
            	
            ) 
        })
      }

    }

	/**
    * @description clear the string query, and search results
    */
    clearQuery = () => {
      this.setState({ query: '' })
      this.props.clearResults()
    }

    render() {
      const { updateCategory, searchResults, searching } = this.props 

     return (

       <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/" onClick={this.clearQuery}>Close</Link>
                <div className="search-books-input-wrapper">
                  <input 
                      onChange={(event) => this.updateQuery(event.target.value)}
                      type="text"
                      placeholder="Search by title or author"
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">{ searchResults.length > 0 && searching === true ? (
                searchResults.map((book) => (
                  <li key={book.id}>
                          <div className="book">
                              <div className="book-top">
                              {book.hasOwnProperty('imageLinks') === true &&  (
                               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                               )}
                                  <div className="book-shelf-changer">
								  {book.hasOwnProperty('shelf') === true ? (
                                  <Select
                                    book={book}
									Shelf={book.shelf}
									updateCategory={updateCategory}
                                    />
                                  ) : (
                                  <Select
                                    Book={book}
									Shelf={"none"}
									updateCategory={updateCategory}
                                    />
                                  )}
                              </div>
                          </div>
                              <div className="book-title">{book.title}</div>

                              <div className="book-authors">{book.authors}</div>
                          </div>
                      </li>
                      ))
               ) : (
                  <div>
                  <h1>No results</h1>

                  <p>search by title, author, or a category</p>
                 </div>
               )}
              </ol>
              </div>
            </div>
     ) 
    }
}

export default SearchComponent