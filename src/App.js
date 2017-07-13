import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListAllBooks from './ListAllBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  state = {
    results: [],
    books: []
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

  /* called from handleShelfSelection method in Book.js via StatusChange prop when user assigns/reassigns book status; updates the status of chosen book and then re-renders all books via fetchAllBooks method */
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetchAllBooks()
    })
  }

  //  called from handleSearchQuery in SearchBooks.js when user enters query
  searchForBooks = (query) => {
    if ( query === '') {
      this.setState({ results: [] })
      return
    } else {
      BooksAPI.search(query, 20).then((results) => {
        results = results.length >= 1 ? this.setState({ results }) : this.setState({ results: [] })
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
