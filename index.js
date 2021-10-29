const express = require('express');
//const equipesData = require('./equipes.json');
const app = express();
app.use(express.json());
/// Connexion à la base de données
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'bdmonapi';
let db 
MongoClient.connect(url, function(err, client) {
 db = client.db(dbName);
console.log("Connexion réussi avec Mongo");
});

/// fin connexion
app.listen(82,()=>console.log("Hello ExpressJS"));

app.get('/equipes', (req,res) => {
      db.collection('equipe').find({}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
    })
    
    app.get('/equipes/:id', async (req,res) => {
          const id = parseInt(req.params.id)
          try {
              const docs = await db.collection('equipe').find({id}).toArray()
              res.status(200).json(docs)
          } catch (err) {
              console.log(err)
              throw err
          }
        })
        app.post('/equipes', async (req,res) => {
              try {
                  const equipeData = req.body
                  const equipe = await db.collection('equipe').insertOne(equipeData)
                  res.status(200).json(equipe)
              } catch (err) {
                  console.log(err)
                  throw err
              }
            })
            app.put('/equipes/:id', async (req,res) => {
                  try {
                      const id = parseInt(req.params.id)
                      const replacementEquipe = req.body
                      const equipe = await db.collection('equipe').replaceOne({id},replacementEquipe)
                      res.status(200).json(equipe)
                  } catch (err) {
                      console.log(err)
                      throw err
                  }
                })
                app.delete('/equipes/:id', async (req,res) => {
                      try {
                          const id = parseInt(req.params.id)
                          const equipe = await db.collection('equipe').deleteOne({id})
                          res.status(200).json(equipe)
                      } catch (err) {
                          console.log(err)
                          throw err
                      } 
                    })
                    
/*
app.get('/equipes',(req,res)=>{
    //res.send("<h1 align=center>Liste des équipes!<h1>");
    res.status(200).json(equipesData);
});

app.get('/equipes/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const equipe = equipesData.find(equipe =>equipe.id===id);
    res.status(200).json(equipe);
});

app.post('/equipes',(req,res)=>{
    equipesData.push(req.body);
    res.status(200).json(equipesData);
});

app.put('/equipes/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const equipe = equipesData.find(equipe =>equipe.id===id);
    equipe.name =req.body.name;
    equipe.country =req.body.country;
    res.status(200).json(equipe);
});

app.delete('/equipes/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const equipe = equipesData.find(equipe =>equipe.id===id);
    equipesData.splice(equipesData.indexOf(equipe),1);
    res.status(200).json(equipesData);
});*/