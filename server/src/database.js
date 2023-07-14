import {MongoClient} from "mongodb"

let connectedClient;

export const connectClient = async () =>{
    if(connectedClient){
        return connectedClient.db('react-blog-db')
    }
    const client = new MongoClient(`mongodb+srv://node-server:WM83HdEZ9TncyGkD@cluster0.yt9p0jk.mongodb.net/`)
    await client.connect()

    await client.db('react-blog-db')
    await client.db('react-blog-db').command({ping: 1})

    console.info("Successfully connected to the database")

    connectedClient = client
    return connectedClient.db('react-blog-db')
}

export default connectClient

    