import React, { Component } from 'react'
import ReactModal from 'react-modal'

class Book extends Component {

  state = {
    displayModal: false
  }

  // called when user chooses an option from the select drop-down menu; passes selection to onStatusChange prop
  handleShelfSelection = (event) => {
    event.preventDefault()
    const targetShelf = event.target.value
    this.props.onStatusChange(this.props.bookDetails, targetShelf)
  }

  // called when user hovers book cover thumbnail image and clicks to display modal with more info
  toggleModal = () => {
    if (this.state.displayModal === false) {
      this.setState({ displayModal: true })
    } else {
      this.setState({ displayModal: false })
    }
  }

  render() {

    const { bookDetails } = this.props

    // had to add in these ternary operators because an error was being thrown if thumbnail or authors was unknown
    let thumbnail = bookDetails.imageLinks ? bookDetails.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'
    let authors = bookDetails.authors ? bookDetails.authors : []

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${thumbnail}')` }}>
            <div className="book-overlay" onClick={this.toggleModal}>
              <div className="get-more-info">
                <h3>more</h3>
              </div>
            </div>
          </div>
          <div className="book-shelf-changer">
            <select onChange={this.handleShelfSelection} value={bookDetails.shelf}>
              <option value="disabled" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {bookDetails.title}
        </div>
        {/* Using ternary operator here to display 'author unknown' text if bookDetails.authors returns no value */}
        <div className="book-authors">
          {authors.length ? authors.map((author, index) => (
            <p key={index}>{author}</p>
          )): <p>Author Unknown</p>}
        </div>
        {/* displayed when user hovers book thumbnail image and clicks */}
        <ReactModal isOpen={this.state.displayModal} contentLabel="modal" className={{ base: 'base-modal', afterOpen: 'base-modal' }}>
          <div className="modal-flex-container">
            <div className="modal-book-cover" style={{ backgroundImage: `url('${thumbnail}')`, width: 128, height: 193 }}>
            </div>
            <div className="modal-book-details">
              <div>
                <h3 className="modal-header">Published By</h3>
                <p className="modal-detail">{bookDetails.publisher}</p>
              </div>
              <div>
                <h3 className="modal-header">On</h3>
                <p className="modal-detail">{bookDetails.publishedDate}</p>
              </div>
              <div>
              <h3 className="modal-header">Author(s)</h3>
              <p className="modal-detail">{bookDetails.authors}</p>
              </div>
            </div>
          </div>
          <div className="modal-description-container">
            <h3 className="modal-description-detail-header">Description</h3>
            <p className="modal-book-detail">{bookDetails.description}</p>
          </div>
          <div className="close-button-container">
            <button className="close-modal-button" onClick={this.toggleModal}>close</button>
          </div>
        </ReactModal>
      </div>
    )

  }

}

export default Book
