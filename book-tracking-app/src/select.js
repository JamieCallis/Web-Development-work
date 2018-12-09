import React from 'react'

function Select(props) {
  
  return(
  	<select value={props.Shelf} onChange={(event) => props.updateCategory(props.Book, event.target.value)} >
    <option value="move" disabled>Move to...</option>
    <option value="currentlyReading">Currently Reading</option>
    <option value="wantToRead">Want to Read</option>
    <option value="read">Read</option>
    <option value="none">None</option>
    </select>
  )
}

export default Select