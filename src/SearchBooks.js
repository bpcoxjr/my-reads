import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onStatusChange: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  // method is called when user enters a value in the input field
  handleSearchQuery = (event) => {
    event.preventDefault()
    let userQuery = event.target.value // grab the value of user input
    this.setState({ query: userQuery }) // eliminate any whitespace and update state
    let trimmedUserQuery = userQuery.trim() // store trimmed query in new variable so user can type space in input field
    this.props.onQuery(trimmedUserQuery) // use onQuery prop to call searchForBooks method in App.js
  }

  // method is called when user clicks back arrow from search bar to reset query back to empty string
  clearSearchQuery = () => {
    this.setState({ query: '' })
    this.props.onQuery('') // this resets search results to empty
  }

  render() {

    const { books, onStatusChange } = this.props
    const { query } = this.state

    books.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" onClick={this.clearSearchQuery} className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={this.handleSearchQuery} value={query} placeholder="Search by title or author..."/>
          </div>
        </div>
        <div className="search-results-stats">
          <h3>Displaying <span className="books-search-tally">{books.length}</span> results</h3>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {books.map((book) => {
            let key = Math.random().toString(36).substr(-8)
            return (
              <li key={key}>
                <Book key={key} bookDetails={book} onStatusChange={onStatusChange}/>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    )

  }

}

export default SearchBooks
