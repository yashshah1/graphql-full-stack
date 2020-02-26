import React from "react";
import { Query } from "react-apollo";
import { getBooksQuery } from "../queries";

const BookList = () => {
    return (
        <div>
            <Query query={getBooksQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <h1>Loading...</h1>;
                    if (error) return <h1>error...</h1>;
                    return (
                        <ul>
                            {data.books.map((book) => (
                                <li key={book.id}>{book.name} </li>
                            ))}
                        </ul>
                    );
                }}
            </Query>
        </div>
    );
};
export default BookList;
