import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema'

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello alejo'
    })
})

app.listen(3000, () => console.log('server on port 3000'))
