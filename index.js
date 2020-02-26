const express = require("express");
const GraphQLHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(
    "/graphql",
    new GraphQLHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000, () => {
    console.log("listening on port 4000");
});
