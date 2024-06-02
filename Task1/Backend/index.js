import express from 'express';
import {MongoClient} from 'mongodb';
import bodyparser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;
const uri = "mongodb+srv://user_sai:12151@democluster.pxgddik.mongodb.net/?retryWrites=true&w=majority&appName=DemoCluster";
const client = new MongoClient(uri);
const db = client.db("db");
const collection = db.collection("IMDB");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get("/movielist",async(req,res)=>{
   try{
     await client.connect(); 
     const response = await collection.find({}).toArray();
     res.json(response[0].categories[0].movielist);
   }catch(err){
      console.log(err);
   }
})

app.get("/actorlist",async(req,res)=>{
   try{
     await client.connect(); 
     const response = await collection.find({}).toArray();
     res.json(response[0].categories[1].actors);
   }catch(err){
      console.log(err);
   }
})

app.get("/producerlist",async(req,res)=>{
   try{
     await client.connect(); 
     const response = await collection.find({}).toArray();
     res.json(response[0].categories[2].producers);
   }catch(err){
      console.log(err);
   }
})


app.post("/add/movielist",async(req,res)=>{
  const arr = {};
  console.log(req.body);
 try{
  await client.connect();
     const movielist = await collection.find({}).toArray();
     const response =  movielist[0].categories[0].movielist;
     arr.id = response.length + 1;
     arr.actor = req.body.actor;
     arr.producer = req.body.producer;
     arr.name = req.body.name;
     arr.year = req.body.year;
     arr.poster = req.body.poster;
     arr.plot = req.body.plot;
     const addmovie = await collection.updateOne({}, { $push: { "categories.$[c].movielist": arr } }, { arrayFilters: [{ "c.category_name": "movies" }] });
     res.json(addmovie);
     if(addmovie){
      console.log(addmovie)
     }else{
      console.log("error");
     }
 }catch(err){
  console.log(err)
 }
})

app.post("/edit/movielist",async(req,res)=>{
  try{ 
   console.log(req.body);
   await client.connect();
      const id = req.body.id;
      const editmovie = await collection.updateOne({
         "categories.category_name": "movies", "categories.movielist.id": id
      }, { $set: { "categories.$[a].movielist.$[b]": {
         "id": req.body.id,
         "actor": req.body.actor,
         "producer": req.body.producer,
         "name": req.body.name,
         "year": req.body.year,
         "poster": req.body.poster,
         "plot": req.body.plot
      } } }, { arrayFilters: [{ "a.category_name": "movies" },{ "b.id": req.body.id }] });
      console.log("editmovie",editmovie);
      if (editmovie.modifiedCount > 0) {
         console.log("Movie updated successfully");
         res.json({ success: true });
       } else {
         console.log("No document matched the provided query criteria");
         res.status(404).json({ success: false, message: "No document matched the provided query criteria" });
       }
  }catch(err){
   console.log(err)
  }
 })

app.post("/add/actors",async(req,res)=>{
  const arr = {};
  console.log(req.body);
 try{
  await client.connect();
     const AllData = await collection.find({}).toArray();
     const response =  AllData[0].categories[1].actors;
     console.log(response);
     arr.id = response.length + 1;
     arr.name = req.body.name;
     arr.DOB = req.body.DOB;
     arr.Bio = req.body.BIO;
     arr.gender = req.body.gender;
     const addactor = await collection.updateOne({}, { $push: { "categories.$[c].actors": arr } }, { arrayFilters: [{ "c.category_name": "actors" }] });
     res.json(addactor);
     if(addactor){
      console.log(addactor)
     }else{
      console.log("error");
     }
 }catch(err){
  console.log(err)
 }
})


app.post("/add/producers",async(req,res)=>{
   const arr = {};
   console.log(req.body);
  try{
   await client.connect();
      const AllData = await collection.find({}).toArray();
      const response =  AllData[0].categories[2].producers;
      console.log(response);
      arr.id = response.length + 1;
      arr.name = req.body.name;
      arr.DOB = req.body.DOB;
      arr.Bio = req.body.BIO;
      arr.gender = req.body.gender;
      const addproducer = await collection.updateOne({}, { $push: { "categories.$[c].producers": arr } }, { arrayFilters: [{ "c.category_name": "producers" }] });
      res.json(addproducer);
      if(addproducer){
       console.log(addproducer)
      }else{
       console.log("error");
      }
  }catch(err){
   console.log(err)
  }
 })



app.listen(port,()=>{
    console.log("listening port");
})