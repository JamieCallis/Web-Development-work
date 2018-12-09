import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './shelf'

class ListBookContent extends Component {
  
  
  render() {
    
   	const { books, updateCategory } = this.props
    
    let currentlyReading, wantToRead, Read
    
    // create copies of the books props array, and filter the information based on the shelf category
    currentlyReading = books.slice(0).filter((book) => book.shelf === "currentlyReading")
    wantToRead = books.slice(0).filter((book) => book.shelf === "wantToRead")
    Read = books.slice(0).filter((book) => book.shelf === "read")
   
  	return (
    	<div className="list-books">
      
      	<div className="list-books-title">
              <h1>MyReads</h1>
      	</div>
      	<div className="list-books-content">
			<Shelf
      			categoryName={"Currently Reading"}
      			bookArray={currentlyReading}
				updateCategory={updateCategory}
      		/>
			<Shelf
      			categoryName={"Want To Read"}
      			bookArray={wantToRead}
				updateCategory={updateCategory}
      		/>
			<Shelf
      			categoryName={"Read"}
      			bookArray={Read}
				updateCategory={updateCategory}
      		/>
        </div>  
      	<div className="open-search">
        	<Link to="/search">Add a book</Link>
        </div>
      </div>
    )  
  }
}

export default ListBookContent