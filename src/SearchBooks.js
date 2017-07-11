import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

  state = {
    query: ''
  }

  // method is called when user enters a value in the input field
  handleSearchQuery = (event) => {
    event.preventDefault()
    let userQuery = event.target.value // grab the value of user input
    this.setState({ query: userQuery.trim() }) // eliminate any whitespace and update state
    this.props.onQuery(this.state.query) // use onQuery prop to call searchForBooks method in App.js
  }

  // method is called when user clicks back arrow from search bar to reset query back to empty string
  clearSearchQuery = () => {
    console.log('clearing search query...')
    this.setState({ query: '' })
    this.props.onQuery('') // this resets search results to empty
  }

  render() {

    const { books, onStatusChange } = this.props
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" onClick={this.clearSearchQuery} className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={this.handleSearchQuery} value={query} placeholder="Search by title or author..."/>
          </div>
        </div>
        {/* only show results tally if user has entered a query */}
        { query !== '' &&
          <div className="search-results-stats">
            <h3>Displaying {books.length} results</h3>
          </div>
        }
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
