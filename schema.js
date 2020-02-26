const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = require("graphql");

const axios = require("axios");

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return axios
                    .get("http://localhost:3000/books/")
                    .then((res) => res.data)
                    .then((books) =>
                        books.filter((book) => book.authorId === parent.id)
                    );
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: "BookType",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return axios
                    .get("http://localhost:3000/authors/" + parent.authorId)
                    .then((res) => res.data);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return axios
                    .get("http://localhost:3000/books/" + args.id)
                    .then((res) => res.data);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: { genre: { type: GraphQLString } },
            resolve(parent, args) {
                return axios
                    .get("http://localhost:3000/books")
                    .then((res) => res.data);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return axios
                    .get("http://localhost:3000/authors/" + args.id)
                    .then((res) => res.data);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            args: { genre: { type: GraphQLString } },
            resolve() {
                return axios
                    .get("http://localhost:3000/authors/")
                    .then((res) => res.data);
            }
        }
    }
});

// const mutation = new GraphQLObjectType({
//     name: "Mutations",
//     fields: {
//         addBook: {
//             type: BookType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) },
//                 genre: { type: new GraphQLNonNull(GraphQLString) },
//                 authorId: { type: new GraphQLNonNull(GraphQLString) }
//             },
//             resolve(parent, args) {
//                 return axios
//                     .post("http://localhost:3000/books", args)
//                     .then(({ data }) => data)
//                     .catch((err) => {});
//             }
//         }
//     }
// });

const mutation = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return axios
                    .post("http://localhost:3000/books", args)
                    .then((res) => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
