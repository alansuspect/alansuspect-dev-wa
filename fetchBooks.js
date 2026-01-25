// fetchBooks.js
import fetch from 'node-fetch';

const fetchBooks = async () => {
    const baseUrl = 'https://books.alansuspect.dev/user/read/books/read';
    const shelfUrl = `${baseUrl}.json`;

    const shelfResponse = await fetch(shelfUrl);
    if (!shelfResponse.ok) {
        throw new Error(`Failed to fetch shelf data: ${shelfResponse.statusText}`);
    }

    const shelfData = await shelfResponse.json();
    const totalPages = new URL(shelfData.last).searchParams.get('page');
    const books = [];

    for (let page = 1; page <= totalPages; page++) {
        const pageUrl = `${baseUrl}.json?page=${page}`;
        const response = await fetch(pageUrl);
        if (!response.ok) {
            throw new Error(`Error fetching page ${page}: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.orderedItems) {
            books.push(...data.orderedItems);
        }
    }

    // Sort books by published date (most recent first)
    return books.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
};

export default fetchBooks;
