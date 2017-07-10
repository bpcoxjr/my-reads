import React, { Component } from 'react'
import Book from './Book.js'

class BookShelf extends Component {

  render() {

    return (
      <div>
        <div className="bookshelf">
          <h3 className="bookshelf-title">Want to Read</h3>
          <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <Book/>
            </li>
          </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h3 className="bookshelf-title">Currently Reading</h3>
          <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <Book/>
            </li>
          </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h3 className="bookshelf-title">Read</h3>
          <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <Book/>
            </li>
          </ol>
          </div>
        </div>
      </div>
    )

  }

}

export default BookShelf
