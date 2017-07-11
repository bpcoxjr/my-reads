import React, { Component } from 'react'

class Book extends Component {

  // called when user chooses an option from the select drop-down menu; passes selection to onStatusChange prop
  handleShelfSelection = (event) => {
    event.preventDefault()
    const targetShelf = event.target.value
    console.log('moving to shelf: ', targetShelf)
    this.props.onStatusChange(this.props.bookDetails, targetShelf)
  }

  render() {

    const { bookDetails } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${bookDetails.imageLinks.thumbnail}')` }}>
            <div className="overlay">
              <div className="info"></div>
            </div>
          </div>
          <div className="book-shelf-changer">
            <select onChange={this.handleShelfSelection} value={bookDetails.shelf}>
              <option value="disabled" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookDetails.title}</div>
          <div className="book-authors">
            {bookDetails.authors.map((author) => (
              <p key={author}>{author}</p>
            ))}
          </div>
      </div>
    )

  }

}

export default Book
