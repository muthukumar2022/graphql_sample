const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const mongoose=require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers=require('./resolvers');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/graphqltable',{ useNewUrlParser: true})
.then((db)=>{console.log('DB Connect')})
.catch((err)=>{console.log(err)})




const serverStart=async()=>{
    const app=express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })
  await apolloServer.start()
 apolloServer.applyMiddleware({app:app})
  app.listen(4000,()=>{console.log('server running *4000')})
}

serverStart()

















// const express=require('express');
// const {ApolloServer}=require('apollo-server-express')
// const mongoose=require('mongoose');
// const typeDefs = require('./typeDefs');
// const resolvers =require ('./resolvers');


// mongoose.set('strictQuery', false);
// mongoose.connect("mongodb://localhost:27017/graphqltable",{ useNewUrlParser: true})
// .then((db)=>{console.log("DB CONNECT")})
// .catch((err)=>{console.log(err)})


// const startServer = async()=>{
//     const app=express();
//     const apolloServer=new ApolloServer({
//         typeDefs,
//         resolvers,
//     });
//     await apolloServer.start();
//     apolloServer.applyMiddleware({app:app});
//     app.listen(4000,()=>{console.log("Server running *4000")})

// }
// startServer();



