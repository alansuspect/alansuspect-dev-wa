import fetchBooks from '../fetchBooks.js';
import fetch from 'node-fetch';

const fetchAuthorName = async (authorUrl) => {
    try {
        const response = await fetch(`${authorUrl}.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch author: ${response.statusText}`);
        }
        const authorData = await response.json();
        return authorData.name || 'Unknown Author';
    } catch (error) {
        console.error(`Error fetching author ${authorUrl}:`, error);
        return 'Unknown Author';
    }
};

export default async () => {
    try {
        const books = await fetchBooks();
        // console.log('Fetched books:', books);
        
        const processedBooks = await Promise.all(
            books.map(async (book) => {
                let authorNames = 'Unknown Author';
                
                if (book.authors && book.authors.length > 0) {
                    const authorPromises = book.authors.map(authorUrl => fetchAuthorName(authorUrl));
                    const names = await Promise.all(authorPromises);
                    authorNames = names.join(', ');
                }
                
                return {
                    ...book,
                    authorNames
                };
            })
        );

        return {
            books: processedBooks || []
        };
    } catch (error) {
        console.error('Error fetching books:', error);
        return {
            books: []
        };
    }
};
