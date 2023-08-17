import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import PostRoute from './routes/PostRoute.js'
import cors from 'cors'
import UploadRoute from './routes/UploadRoute.js'
import ChatRoute from './routes/ChatRoute.js'
import MessageRoute from './routes/MessageRoute.js'
const app = express();

// to serve images for public
app.use(express.static('public'))
app.use('/images',express.static("images"));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors())
dotenv.config()
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(process.env.PORT, () => console.log("listening"))).catch((error) => console.log(error));

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)
app.use('/message',MessageRoute)

