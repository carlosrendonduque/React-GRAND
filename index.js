const {ApolloServer}=require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const connectDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

//Connect to Database
connectDB();

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req})=>{
    //console.log(req.headers['authorization'])
    const token = req.headers['authorization'] || ''; 
    if(token){
      try {
        const user =  jwt.verify(token, process.env.SECRET);
        //console.log(user);
        return{
          user
        }
      } catch (error) {
        console.log('Error!!!');
        console.log(error);
      }
    }
  
  }

});

//start server
server.listen({ port: process.env.PORT || 4005 }).then( ({url}) => {
  console.log(`Server ready in URL ${url}`)
})