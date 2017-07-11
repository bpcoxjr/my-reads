import React, { Component } from 'react'
import Book from './Book.js'

class BookShelf extends Component {

  render() {

    const { category, books, onStatusChange } = this.props

    return (
      <div>
        <div className="bookshelf">
          <h3 className="bookshelf-title">{ category }</h3>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <Book id={book.id} bookDetails={book} onStatusChange={onStatusChange}/>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )

  }

}

export default BookShelf
