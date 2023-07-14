import fs from "fs";
import path from "path";
import admin from "firebase-admin";
import express from  "express";
import connectClient from "./database.js";
import cors from "cors";

import 'dotenv/config';

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const credentials = JSON.parse(
    fs.readFileSync("./credential.json")
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});
 
const server = express()

server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, '../build')))

server.get(/^(?!\/api).+/, (req, res)=>{
    req.sendFile(path.join(__dirname, '../build/index.html'));
})

//middleware to autheticate the user tokens
server.use( async (req, res, next) =>{
    const {authtoken} = req.headers;

    if(authtoken){
        try{
            const user = await admin.auth().verifyIdToken(authtoken)
            req.user = user
        }catch(e){
            return res.sendStatus(400);
        }
    }
    req.user = req.user || {}
    next();  
})


server.get("/api/articles/:name", async (req, res)=>{
    const {name} = req.params;
    const {uid} = req.user

    const client = await connectClient();

    const article = await client.collection('blogs').findOne({name})
    //res.send(article)
    if(article){
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid)
        res.json(article);
    }
    else{
        res.sendStatus(404)
    }
})

server.use((req, res, next)=>{
    if(req.user){
        next();
    }
    else{
        res.sendStatus(401);
    }
})

server.put("/api/:name/upvote", async(req, res)=>{
    const {name} = req.params;
    const {uid} = req.user;

    const client = await connectClient();

    const article = await client.collection('blogs').findOne({name})
    
    if(article){
        const upvoteIds = article.upvoteIds || []
        const canUpvote = uid && !upvoteIds.includes(uid)

        if(canUpvote){
            await client.collection("blogs").updateOne({name}, {
                $inc: {upvote:1}, 
                $push: {upvoteIds: uid},
            })
        }
        const UpdatedArticle = await client.collection('blogs').findOne({name})
        res.json(UpdatedArticle);
    }
    else{
        res.send('That article doesn\'t exist');
    }
})
server.post("/api/articles/:name/comments", async (req, res)=>{
    //const name = req.params.name
    const {name} = req.params;
    const {comment} = req.body;
    const {email} = req.user;
    

    const client = await connectClient();

    await client.collection('blogs').updateOne({name}, {
        $push: {comments: {postedBy: email, comment}}, 
    })
    const article = await client.collection('blogs').findOne({name})

    if(article){
        res.json(article)  
    }
    else{
        res.send('That article doesn\'t exist')
    }
})
const PORT = process.env.PORT || 8000

server.listen(PORT, ()=>{
    console.log("Server is listening on port", PORT)
})