import React from "react";
import { Query, Mutation } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        };
        console.log(getAuthorsQuery);
    }
    render() {
        return (
            <Mutation
                mutation={addBookMutation}
                update={(cache, { data: { addBook } }) => {
                    const { books } = cache.readQuery({ query: getBooksQuery });
                    cache.writeQuery({
                        query: getBooksQuery,
                        data: { books: books.concat([addBook]) }
                    });
                }}
            >
                {(addBook) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            let { name, genre, authorId } = this.state;
                            addBook({ variables: { name, genre, authorId } });
                            this.setState({
                                name: "",
                                genre: "",
                                authorId: ""
                            });
                        }}
                    >
                        <div>
                            <label>Book name:</label>
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={(e) =>
                                    this.setState({ name: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Genre:</label>
                            <input
                                type="text"
                                value={this.state.genre}
                                onChange={(e) =>
                                    this.setState({ genre: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label>Author:</label>
                            <select
                                value={this.state.authorId}
                                onChange={(e) =>
                                    this.setState({ authorId: e.target.value })
                                }
                            >
                                <option>Select author</option>
                                <Query query={getAuthorsQuery}>
                                    {({ loading, error, data }) => {
                                        if (loading)
                                            return <option>Loading...</option>;
                                        if (error)
                                            return <option>Error...</option>;
                                        return data.authors.map((author) => (
                                            <option
                                                key={author.id}
                                                value={author.id}
                                            >
                                                {author.name}
                                            </option>
                                        ));
                                    }}
                                </Query>
                            </select>
                        </div>
                        <button>+</button>
                    </form>
                )}
            </Mutation>
        );
    }
}

export default AddBook;
