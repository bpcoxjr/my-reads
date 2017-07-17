import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListAllBooks from './ListAllBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  state = {
    results: [],
    books: [],
    currentBooks: []
  }

  // runs behind the scenes automatically by React every time app loads
  componentDidMount() {
    this.fetchAllBooks();
  }

  // gets called every time componentDidMount method runs to set state on all books
  fetchAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /* called from handleShelfSelection method in Book.js via StatusChange prop when user assigns/reassigns book status; updates the status of chosen book and then re-renders all books */
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  /* called from searchForBooks when responding to query to find matches between books already on a shelf and books in search results, via each book's unique ID, and sets the status of the book in the search results to match its current shelf status (currently reading/want to read/read) and if it is none of those status is set simply to 'none'*/
  handleResultsStatus = (results, books) => {
    const currentBooks = results.map((result) => {
      for (let book of books) {
        if (result.id === book.id) { // if the ID of a search result equals the id of a book already on a shelf
          result.shelf = book.shelf // set its shelf equal to the shelf of the already present book
          return book
        } else { // otherwise set its shelf to 'none'
          result.shelf = 'none'
        }
      }
      return true
    })
    this.setState({ currentBooks, results })
  }

  //  called from handleSearchQuery in SearchBooks.js when user enters query
  searchForBooks = (query) => {
    if ( query === '') {
      this.setState({ results: [] })
      return
    } else {
      BooksAPI.search(query, 20).then((results) => {
        if (results.length >= 1) {
          this.handleResultsStatus(results, this.state.books)
        } else {
          this.setState({ results: [] })
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            books={this.state.results}
            onQuery={(query) => {
              this.searchForBooks(query)
            }}
            onStatusChange={(book, shelf) => {
              this.updateBook(book, shelf)
            }}
          />
        )}/>
        <Route exact path='/' render={() => (
          <ListAllBooks
            books={this.state.books}
            onStatusChange={(book, shelf) => {
              this.updateBook(book, shelf)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
