import React from 'react'
import Select from './select'
function Shelf(props) {
  return( 
	<div className="bookshelf">
            <h2 className="bookshelf-title">{props.categoryName}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
      			{props.bookArray.map((book) => (
      				
                <li key={book.id}>
              			<div className="book">
                			<div className="book-top">
                  				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    			<div className="book-shelf-changer">
                      			<Select 
									Book={book}
									Shelf={book.shelf}
									updateCategory={props.updateCategory}
								/>
                                
                    		</div>
                    	</div>
                      		<div className="book-title">{book.title}</div>
                      		<div className="book-authors">{book.authors}</div>
                    	</div>
					</li>
      				))}
  				</ol>
          	</div>
          </div>
 		)
};

export default Shelf