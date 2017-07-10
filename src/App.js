import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListAllBooks from './ListAllBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

  state = {
    results: []
  }

  searchForBooks = (query) => {
    console.log('searching for books...')
    if ( query === '') {
      this.setState({ results: [] })
      return
    } else {
      BooksAPI.search(query, 20).then((results) => {
        if (results) {
          console.log('found some books...')
          console.log(results)
        } else {
          console.log('nothing found...')
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks onQuery={(query) => {
            this.searchForBooks(query)
          }}/>
        )}/>
        <Route exact path='/' render={() => (
          <ListAllBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
