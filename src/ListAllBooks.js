import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListAllBooks extends Component {

  render() {

    const { books, onStatusChange } = this.props
    const shelfCategories = [ 'currentlyReading', 'wantToRead', 'read' ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelfCategories.map((category) => {
            let sortedBooks = books.filter((book) => (book.shelf === category))
            return <BookShelf key={category} books={sortedBooks} onStatusChange={onStatusChange} category={category}/>
          })}
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )

  }

}

export default ListAllBooks
