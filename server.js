
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer');
require('dotenv').config()

const corsOptions = {
  Credential: 'true',
  
};


const app = express();

app.use(express.json())
app.options("*" , cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser())


//#region // !Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);



io.on('connection', socket => {
    SocketServer(socket);
})

//#endregion

//#region // !Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/adminRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));
//#endregion
 /*
  var mongoClient = require("mongodb").MongoClient;
  const URI = process.env.COSMOSDB_CONNECTION_STRING;
  mongoClient.connect(URI, function (err, client) {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
  } else {
    console.log("Database Connected!!") 
    const db = client.db('traveler-db');
    const collection = db.collection('db1');
    client.close();
  }
  
  });
  */
  
  
  
  
  
const URI = process.env.MONGO_URI_TEST;
//const URI = process.env.COSMOSDB_CONNECTION_STRING;
mongoose.connect(URI, {
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, err => {
    if(err) throw err;
    console.log("Database Connected!!")
})



const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log("Listening on ", port);
});