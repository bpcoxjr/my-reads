import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListAllBooks from './ListAllBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks/>
        )}/>
        <Route exact path='/' render={() => (
          <ListAllBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
