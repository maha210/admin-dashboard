import React, { useEffect, useState } from 'react';
import BookTable from './components/BookTable';
import LoginForm from './components/LoginForm';
import { fetchBooks } from './services/bookService';

const App = () => {
  const [books, setBooks] = useState([]);
  const [sortColumn, setSortColumn] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const loadBooks = async () => {
        try {
          const data = await fetchBooks(currentPage, 10); // Fetch 10 books per page
          setBooks(data.works);
          setTotalPages(Math.ceil(data.size / 10)); // Update total pages based on total results
        } catch (error) {
          console.error("Failed to fetch books:", error);
        }
      };

      loadBooks();
    }
  }, [currentPage, isAuthenticated]);

  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
    const sortedBooks = [...books].sort((a, b) => {
      if (direction === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setBooks(sortedBooks);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredBooks = books.filter(book =>
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const handleUpdateBook = (index, updatedBook) => {
    const updatedBooks = books.map((book, i) => (i === index ? updatedBook : book));
    setBooks(updatedBooks);
  };

  const handleDownloadCSV = () => {
    const csvContent = [
      ['Title', 'Author', 'First Publish Year', 'Subject', 'Average Rating', 'Author Birth Date', 'Author Top Work'],
      ...books.map(book => [
        book.title,
        book.author,
        book.first_publish_year,
        book.subject,
        book.ratings_average,
        book.author_birth_date,
        book.author_top_work
      ])
    ]
    .map(e => e.join(","))
    .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'books.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogin = (username, password) => {
    // Simple hardcoded authentication logic for demonstration purposes
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const appStyle = {
    padding: '20px',
  };

  const inputStyle = {
    padding: '10px',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div style={appStyle}>
      <input
        type="text"
        placeholder="Search by author"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleDownloadCSV} style={{ marginBottom: '20px', padding: '10px' }}>
        Download CSV
      </button>
      <BookTable
        books={books}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onUpdateBook={handleUpdateBook}
      />
    </div>
  );
};

export default App;
