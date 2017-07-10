import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

class SearchBooks extends Component {

  state = {
    query: ''
  }

  // method is called when user enters a value in the input field
  handleSearchQuery = (event) => {
    console.log('user entering query...')
    let userQuery = event.target.value // grab the value of user input
    this.setState({ query: userQuery.trim() }) // eliminate any whitespace and update state
    this.props.onQuery(this.state.query) // use onQuery prop to call searchForBooks method in App.js
  }

  // method is called when user clicks back arrow from search bar to reset query back to empty string
  clearSearchQuery = () => {
    console.log('clearing search query...')
    this.setState({ query: '' })
    this.props.onQuery('')
  }

  render() {

    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" onClick={this.clearSearchQuery} className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange={this.handleSearchQuery} value={query} type="text" placeholder="Search by title or author..."/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )

  }

}

export default SearchBooks
