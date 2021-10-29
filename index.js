const express = require('express');
const equipes = require('./equipes.json');
const app = express();
app.listen(82,()=>console.log("Hello ExpressJS"));

app.get('/equipes',(req,res)=>{
    res.send("Liste des équipes!");
});