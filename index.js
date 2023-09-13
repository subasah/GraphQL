import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//db
import db from './_db.js';

//types 
import { typeDefs } from './schema.js';


const resolvers = {
    Query: {
        games(){
            return db.games
        },
        game(_, args, context){
            return db.games.find((game) => game.id === args.id)
        },
        reviews(){
            return db.reviews
        },
        authors(){
            return db.authors
        },
        author(_, args, context){
            return db.authors.find((author) => author.id === args.id)
        },
        review(_, args, context){
            return db.reviews.find((review) => review.id === args.id)}
    },
    Game: {
        reviews(parent){
            return db.reviews.filter((r)=>r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            return db.reviews.filter((r)=>r.author_id === parent.id)
        }
    }
}
//server setup 

const server = new ApolloServer({
typeDefs,
resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: {port:4000}
})

console.log('server ready at port', 4000);