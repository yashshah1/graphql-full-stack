import { gql } from "apollo-boost";

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const addBookMutation = gql`
    mutation addBook($name: String!, $genre: String!, $authorId: String!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name
            genre
            authorId
        }
    }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation };
