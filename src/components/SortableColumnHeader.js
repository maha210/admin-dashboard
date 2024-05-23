import React from 'react';

const SortableColumnHeader = ({ column, sortColumn, sortDirection, onSort, children }) => {
  const handleSort = () => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column, direction);
  };

  return (
    <th onClick={handleSort}>
      {children} {sortColumn === column ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
    </th>
  );
};

export default SortableColumnHeader;
