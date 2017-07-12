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
    console.log('moving to shelf: ', targetShelf)
    this.props.onStatusChange(this.props.bookDetails, targetShelf)
  }

  toggleModal = () => {
    if (this.state.displayModal === false) {
      this.setState({ displayModal: true })
    } else {
      this.setState({ displayModal: false })
    }
  }

  render() {

    const { bookDetails } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${bookDetails.imageLinks.thumbnail}')` }}>
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
        <div className="book-authors">
          {bookDetails.authors.map((author) => (
            <p key={author}>{author}</p>
          ))}
        </div>
        <ReactModal isOpen={this.state.displayModal} contentLabel="modal" className={{ base: 'base-modal', afterOpen: 'base-modal' }}>
          <div className="modal-flex-container">
            <div className="modal-book-cover" style={{ backgroundImage: `url('${bookDetails.imageLinks.thumbnail}')`, width: 128, height: 193 }}>
            </div>
            <div className="modal-book-details">
              <div>
                <h3 className="modal-header">Publisher</h3>
                <p className="modal-detail">{bookDetails.publisher}</p>
              </div>
              <div>
                <h3 className="modal-header">Published</h3>
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
