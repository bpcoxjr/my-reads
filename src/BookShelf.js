import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import sortBy from 'sort-by'
import Book from './Book.js'

class BookShelf extends Component {

  render() {

    const { category, books, onStatusChange } = this.props

    books.sort(sortBy('title'))

    return (
      <div>
        <div className="bookshelf">
          <h3 className="bookshelf-title">{ category }</h3>
          <div className="bookshelf-books">
            <ol className="books-grid">
              <CSSTransitionGroup
              transitionName="shelf-move"
              transitionEnter={true}
              transitionEnterTimeout={500}
              transitionLeave={true}
              transitionLeaveTimeout={500}
              >
                {books.map((book) => (
                  <li key={book.id}>
                    <Book id={book.id} bookDetails={book} onStatusChange={onStatusChange}/>
                  </li>
                ))}
              </CSSTransitionGroup>
            </ol>
          </div>
        </div>
      </div>
    )

  }

}

export default BookShelf
