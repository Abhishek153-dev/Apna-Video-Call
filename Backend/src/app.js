import express from 'express';
import { createServer} from "node:http";
import { Server } from "socket.io";
import mongoose from 'mongoose';
import { connectToSocket } from './controllers/socketManger.js';
import cors from 'cors';
import userRoutes from './routes/usersroutes.js';

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
    return res.json({message: "hello world"});
});

const start = async () => {
    const connectiondb = await mongoose.connect("mongodb://abhishekrathore_user:abhi11@ac-n7a7j3u-shard-00-00.6jkoo72.mongodb.net:27017,ac-n7a7j3u-shard-00-01.6jkoo72.mongodb.net:27017,ac-n7a7j3u-shard-00-02.6jkoo72.mongodb.net:27017/?ssl=true&replicaSet=atlas-9y8bzk-shard-0&authSource=admin&appName=Cluster0");

    console.log("Database connected successfully");
  server.listen(app.get("port"), () => {
        console.log("Server is running on port 8000");
    });

}

start();


