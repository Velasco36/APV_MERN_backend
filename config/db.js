import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const db = await mongoose.connect(
            process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        
    );

    

    const url = `${db.connection.host}:${db.connection.port}`
    console.log(`MOngoDB conectado en: ${url} `)
    } catch (error){
        console.log(`error: ${error.mensaje}`);
        process.exit(1);
    }
};

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:<password>@cluster0.b3kodcr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/
export default connectDB;