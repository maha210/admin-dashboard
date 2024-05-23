import React, { useState } from 'react';

const BookTable = ({ books, sortColumn, sortDirection, onSort, currentPage, totalPages, onPageChange, onUpdateBook }) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedBook, setEditedBook] = useState(null);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedBook({ ...books[index] });
  };

  const handleSaveClick = () => {
    onUpdateBook(editingIndex, editedBook);
    setEditingIndex(-1);
  };

  const handleCancelClick = () => {
    setEditingIndex(-1);
    setEditedBook(null);
  };

  const handleInputChange = (e, field) => {
    setEditedBook({ ...editedBook, [field]: e.target.value });
  };

  const handleSortClick = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column, direction);
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    cursor: 'pointer',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
  };

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} onClick={() => handleSortClick('title')}>Title</th>
            <th style={thStyle} onClick={() => handleSortClick('author')}>Author</th>
            <th style={thStyle} onClick={() => handleSortClick('first_publish_year')}>First Publish Year</th>
            <th style={thStyle} onClick={() => handleSortClick('subject')}>Subject</th>
            <th style={thStyle} onClick={() => handleSortClick('ratings_average')}>Average Rating</th>
            <th style={thStyle}>Author Birth Date</th>
            <th style={thStyle}>Author Top Work</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td style={tdStyle} colSpan="8">No books available</td>
            </tr>
          ) : (
            books.map((book, index) => (
              <tr key={index}>
                <td style={tdStyle}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedBook.title}
                      onChange={(e) => handleInputChange(e, 'title')}
                    />
                  ) : (
                    book.title
                  )}
                </td>
                <td style={tdStyle}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedBook.author}
                      onChange={(e) => handleInputChange(e, 'author')}
                    />
                  ) : (
                    book.author
                  )}
                </td>
                <td style={tdStyle}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedBook.first_publish_year}
                      onChange={(e) => handleInputChange(e, 'first_publish_year')}
                    />
                  ) : (
                    book.first_publish_year
                  )}
                </td>
                <td style={tdStyle}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedBook.subject}
                      onChange={(e) => handleInputChange(e, 'subject')}
                    />
                  ) : (
                    book.subject
                  )}
                </td>
                <td style={tdStyle}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedBook.ratings_average}
                      onChange={(e) => handleInputChange(e, 'ratings_average')}
                    />
                  ) : (
                    book.ratings_average
                  )}
                </td>
                <td style={tdStyle}>{book.author_birth_date}</td>
                <td style={tdStyle}>{book.author_top_work}</td>
                <td style={tdStyle}>
                  {editingIndex === index ? (
                    <>
                      <button onClick={handleSaveClick}>Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={paginationStyle}>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BookTable;

