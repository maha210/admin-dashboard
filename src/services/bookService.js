import axios from 'axios';

export const fetchBooks = async (page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const response = await axios.get(
    `https://openlibrary.org/subjects/fiction.json?limit=${pageSize}&offset=${offset}`
  );
  const works = response.data.works.map(work => ({
    title: work.title,
    author: work.authors?.[0]?.name || 'Unknown',
    first_publish_year: work.first_publish_year || 'N/A',
    subject: work.subject?.join(', ') || 'N/A',
    ratings_average: work.ratings_average || 'N/A', // Assume ratings_average available
    author_birth_date: 'N/A', // Not directly available in this endpoint
    author_top_work: 'N/A' // Not directly available in this endpoint
  }));
  return { works, size: response.data.work_count };
};
